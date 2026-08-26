import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { THESIS_CLAIMS, THESIS_EDGES } from '../content/chainfren-thesis/claims.mjs'
import { THESIS_MAP_LAYOUT } from '../content/chainfren-thesis/map-layout.mjs'
import { DEFAULT_MAP_CLAIM, canLoadDesktopMap, resolveMapClaim } from '../lib/thesis/ownership-map.mjs'
import { validateClaims, validateEdges, validateLayout } from '../lib/thesis/schema.mjs'

const root = new URL('..', import.meta.url)
const source = (path) => readFileSync(new URL(path, root), 'utf8')
const CANVAS = { width: 1280, height: 540 }
const NODE = { width: 240, height: 60, edgePadding: 8 }

const nodeRect = ({ x, y }, padding = 0) => ({
  left: x - padding,
  right: x + NODE.width + padding,
  top: y - padding,
  bottom: y + NODE.height + padding,
})

const rectanglesOverlap = (one, two) => (
  one.left <= two.right
  && one.right >= two.left
  && one.top <= two.bottom
  && one.bottom >= two.top
)

const segmentIntersectsRectangle = (start, finish, rect) => {
  let low = 0
  let high = 1
  const delta = { x: finish.x - start.x, y: finish.y - start.y }
  for (const [origin, change, min, max] of [
    [start.x, delta.x, rect.left, rect.right],
    [start.y, delta.y, rect.top, rect.bottom],
  ]) {
    if (change === 0) {
      if (origin < min || origin > max) return false
      continue
    }
    const first = (min - origin) / change
    const second = (max - origin) / change
    low = Math.max(low, Math.min(first, second))
    high = Math.min(high, Math.max(first, second))
    if (low > high) return false
  }
  return true
}

test('ownership map route supplies a server-readable claim outline', () => {
  assert.equal(existsSync(new URL('app/(mainpage)/thesis/map/page.jsx', root)), true)
  const page = source('app/(mainpage)/thesis/map/page.jsx')
  const tree = source('app/(mainpage)/thesis/components/OwnershipTree.jsx')

  assert.match(page, /OwnershipTree/)
  assert.match(page, /OwnershipMapLoader/)
  assert.doesNotMatch(page, /['"]use client['"]|useState|useEffect/)
  assert.match(tree, /<details[^>]*open=\{type === ['"]mission['"]\}/)
  assert.match(tree, /const labels = \{[^}]*mission: ['"]Mission['"]/)
  assert.match(tree, /href=\{`\/thesis\/read\/\$\{claim\.chapterSlug\}`\}/)
  assert.match(tree, /<article/)
})

test('desktop map remains a desktop-only lazy client enhancement with accessible controls', () => {
  const loader = source('app/(mainpage)/thesis/components/OwnershipMapLoader.jsx')
  const desktop = source('app/(mainpage)/thesis/components/OwnershipMapDesktop.jsx')

  assert.match(loader, /window\.matchMedia\(['"]\(min-width: 960px\)['"]\)/)
  assert.match(loader, /import\(['"]\.\/OwnershipMapDesktop['"]\)/)
  assert.match(loader, /addEventListener\(['"]change['"]/)
  assert.match(desktop, /aria-label=['"]Ownership claim map['"]/) 
  assert.match(desktop, /aria-live=['"]polite['"]/) 
  assert.match(desktop, /Zoom in/)
  assert.match(desktop, /Fit map/)
  assert.match(desktop, /replaceState/)
  assert.match(desktop, /\?claim=/)
  assert.doesNotMatch(desktop, /react-flow|d3|cytoscape/i)
})

test('map data covers every claim and only connects known layout endpoints', () => {
  const claimIds = new Set(THESIS_CLAIMS.map((claim) => claim.id))
  assert.equal(claimIds.size, 12)
  assert.deepEqual(new Set(Object.keys(THESIS_MAP_LAYOUT)), claimIds)
  for (const edge of THESIS_EDGES) {
    assert(claimIds.has(edge.from))
    assert(claimIds.has(edge.to))
    assert(THESIS_MAP_LAYOUT[edge.from])
    assert(THESIS_MAP_LAYOUT[edge.to])
  }
  assert.doesNotThrow(() => validateLayout(THESIS_MAP_LAYOUT, claimIds))
  assert.doesNotThrow(() => validateEdges(THESIS_EDGES, claimIds))
})

test('map nodes fit the canvas and rendered rectangles never overlap', () => {
  const entries = Object.entries(THESIS_MAP_LAYOUT)
  for (const [id, position] of entries) {
    const rect = nodeRect(position)
    assert(rect.left >= 0 && rect.top >= 0 && rect.right <= CANVAS.width && rect.bottom <= CANVAS.height, `${id} must fit inside the canvas`)
  }
  for (let first = 0; first < entries.length; first += 1) {
    for (let second = first + 1; second < entries.length; second += 1) {
      const [firstId, firstPosition] = entries[first]
      const [secondId, secondPosition] = entries[second]
      assert.equal(rectanglesOverlap(nodeRect(firstPosition), nodeRect(secondPosition)), false, `${firstId} must not overlap ${secondId}`)
    }
  }
})

test('every straight edge clears every padded non-endpoint node rectangle', () => {
  for (const edge of THESIS_EDGES) {
    const from = THESIS_MAP_LAYOUT[edge.from]
    const to = THESIS_MAP_LAYOUT[edge.to]
    const start = { x: from.x + NODE.width / 2, y: from.y + NODE.height / 2 }
    const finish = { x: to.x + NODE.width / 2, y: to.y + NODE.height / 2 }
    for (const [claimId, position] of Object.entries(THESIS_MAP_LAYOUT)) {
      if (claimId === edge.from || claimId === edge.to) continue
      assert.equal(
        segmentIntersectsRectangle(start, finish, nodeRect(position, NODE.edgePadding)),
        false,
        `${edge.from} -> ${edge.to} must clear ${claimId}`,
      )
    }
  }
})

const hasDirectedPath = (start, finish) => {
  const next = new Map()
  for (const { from, to } of THESIS_EDGES) next.set(from, [...(next.get(from) || []), to])
  const pending = [start]
  const visited = new Set()
  while (pending.length) {
    const current = pending.shift()
    if (current === finish) return true
    if (visited.has(current)) continue
    visited.add(current)
    pending.push(...(next.get(current) || []))
  }
  return false
}

test('the map preserves the public value path and company execution paths', () => {
  for (const [sourceId, targetId] of [
    ['african-attention-value', 'attention-to-participation'],
    ['attention-to-participation', 'participation-to-ownership'],
    ['participation-to-ownership', 'ownership-to-value'],
    ['ownership-to-value', 'african-built-ecosystem'],
    ['chainfren-mission', 'distribution-first'],
    ['distribution-first', 'tivi-flagship'],
    ['chainfren-mission', 'tivi-flagship'],
  ]) assert.equal(hasDirectedPath(sourceId, targetId), true, `${sourceId} must resolve to ${targetId}`)
})

test('each claim resolves through schema, layout, and the chapter link component', () => {
  assert.doesNotThrow(() => validateClaims(THESIS_CLAIMS, new Set([
    'the-gap', 'the-trap', 'the-unlock', 'the-thesis', 'the-company', 'what-we-build', 'how-we-work', 'the-road-ahead', 'build-with-us',
  ]), new Set()))
  for (const claim of THESIS_CLAIMS) {
    assert(THESIS_MAP_LAYOUT[claim.id])
    assert.equal(resolveMapClaim(THESIS_CLAIMS, claim.id), claim.id)
  }
})

test('desktop edges expose direction, relation text, and accessible claim titles', () => {
  const desktop = source('app/(mainpage)/thesis/components/OwnershipMapDesktop.jsx')
  assert.match(desktop, /<marker\s+id="ownership-arrow"/)
  assert.match(desktop, /markerEnd="url\(#ownership-arrow\)"/)
  assert.match(desktop, /className={styles\.mapEdgeLabel}/)
  assert.match(desktop, /\{edge\.relation\}/)
  assert.match(desktop, /aria-label={`\${sourceClaim\.title} \${edge\.relation} \${targetClaim\.title}`}/)
  assert.match(desktop, /<title>\{`\${sourceClaim\.title} \${edge\.relation} \${targetClaim\.title}`\}<\/title>/)
})

test('the non-JavaScript outline exposes the exact ordered relationships', () => {
  const page = source('app/(mainpage)/thesis/map/page.jsx')
  const tree = source('app/(mainpage)/thesis/components/OwnershipTree.jsx')
  assert.match(page, /import\s*{\s*THESIS_CLAIMS,\s*THESIS_EDGES\s*}/)
  assert.match(page, /<OwnershipTree\s+claims={THESIS_CLAIMS}\s+edges={THESIS_EDGES}\s*\/>/)
  assert.match(tree, /function OwnershipTree\(\{ claims, edges \}\)/)
  assert.match(tree, /<ol className={styles\.ownershipRelationships}>/)
  assert.match(tree, /\{edges\.map\(\(edge\)\s*=>/)
  assert.match(tree, /claimsById\.get\(edge\.from\)/)
  assert.match(tree, /claimsById\.get\(edge\.to\)/)
  assert.match(tree, /\{edge\.relation\}/)
  assert.match(tree, /aria-label="Exact ordered claim relationships"/)
})

test('the Hub ownership-map card uses the canonical plain route', () => {
  const hub = source('app/(mainpage)/thesis/components/ThesisHub.jsx')
  assert.match(hub, /\{ href: ['"]\/thesis\/map['"], title: ['"]The ownership map['"]/)
  assert.doesNotMatch(hub, /claimHref|\/thesis\/map\?claim=/)
  assert.match(hub, /<Link key={href} href={href}/)
})

test('map deep links choose a valid claim and default invalid or absent claim IDs', () => {
  assert.equal(DEFAULT_MAP_CLAIM, 'african-attention-value')
  assert(THESIS_CLAIMS.some(({ id }) => id === DEFAULT_MAP_CLAIM))
  assert.equal(resolveMapClaim(THESIS_CLAIMS, 'chainfren-mission'), 'chainfren-mission')
  assert.equal(resolveMapClaim(THESIS_CLAIMS, 'not-a-claim'), 'african-attention-value')
  assert.equal(resolveMapClaim(THESIS_CLAIMS, null), 'african-attention-value')
})

test('map deep links fall back to the first available claim when the named default changes', () => {
  const renamedClaims = [{ id: 'new-center' }, { id: 'another-claim' }]
  assert.equal(resolveMapClaim(renamedClaims, 'removed-default'), 'new-center')
  assert.equal(resolveMapClaim(renamedClaims, null), 'new-center')
})

test('the mobile loader receives no map records and the desktop enhancement owns its data', () => {
  const page = source('app/(mainpage)/thesis/map/page.jsx')
  const loader = source('app/(mainpage)/thesis/components/OwnershipMapLoader.jsx')
  const desktop = source('app/(mainpage)/thesis/components/OwnershipMapDesktop.jsx')

  assert.match(page, /<OwnershipMapLoader\s*\/>/)
  assert.doesNotMatch(loader, /function OwnershipMapLoader\([^)]*props/)
  assert.match(desktop, /THESIS_CLAIMS/)
  assert.match(desktop, /THESIS_EDGES/)
  assert.match(desktop, /THESIS_MAP_LAYOUT/)
})

test('desktop map chunk is eligible only at the 960px breakpoint', () => {
  assert.equal(canLoadDesktopMap(false), false)
  assert.equal(canLoadDesktopMap(true), true)
})

test('claim links in the outline and desktop detail panel are full touch targets', () => {
  const styles = source('app/(mainpage)/thesis/thesis.module.css')

  assert.match(styles, /\.ownershipTree h3 a\s*\{[^}]*display:\s*inline-flex[^}]*min-height:\s*44px/s)
  assert.match(styles, /\.ownershipTree article > a\s*\{[^}]*display:\s*inline-flex[^}]*min-height:\s*44px/s)
  assert.match(styles, /\.mapDetails a\s*\{[^}]*display:\s*inline-flex[^}]*min-height:\s*44px/s)
})

test('a valid claim deep link expands and focuses the outline claim', () => {
  const page = source('app/(mainpage)/thesis/map/page.jsx')
  const island = source('app/(mainpage)/thesis/components/ClaimDeepLink.jsx')

  assert.match(page, /<ClaimDeepLink\s*\/>/)
  assert.match(island, /['"]use client['"]/)
  assert.match(island, /URLSearchParams\(window\.location\.search\)\.get\(['"]claim['"]\)/)
  assert.match(island, /closest\(['"]details['"]\)/)
  assert.match(island, /\.focus\(/)
  assert.doesNotMatch(island, /behavior:\s*['"]smooth['"]/)
  assert.doesNotMatch(island, /THESIS_CLAIMS/)
})
