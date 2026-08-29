import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { THESIS_CLAIMS, THESIS_EDGES } from '../content/chainfren-thesis/claims.mjs'
import * as mapGeometry from '../content/chainfren-thesis/map-layout.mjs'
import { DEFAULT_MAP_CLAIM, canLoadDesktopMap, resolveMapClaim } from '../lib/thesis/ownership-map.mjs'
import { validateClaims, validateEdges, validateLayout } from '../lib/thesis/schema.mjs'

const root = new URL('..', import.meta.url)
const source = (path) => readFileSync(new URL(path, root), 'utf8')
const { THESIS_MAP_LAYOUT } = mapGeometry
const CANVAS = mapGeometry.THESIS_MAP_GEOMETRY?.canvas || { width: 1280, height: 540 }
const NODE = mapGeometry.THESIS_MAP_GEOMETRY?.node || { width: 240, height: 60, edgePadding: 8 }
const LABEL = mapGeometry.THESIS_MAP_GEOMETRY?.label || {
  characterWidth: 7,
  horizontalPadding: 16,
  height: 18,
  clearance: 18,
  arrowClearance: 20,
}

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

const pointOnRectangleBoundary = (point, rect) => (
  (point.x === rect.left || point.x === rect.right) && point.y >= rect.top && point.y <= rect.bottom
) || (
  (point.y === rect.top || point.y === rect.bottom) && point.x >= rect.left && point.x <= rect.right
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

const routeFor = (edge) => mapGeometry.THESIS_MAP_ROUTES?.[edge.id] || {
  points: [
    { x: THESIS_MAP_LAYOUT[edge.from].x + NODE.width / 2, y: THESIS_MAP_LAYOUT[edge.from].y + NODE.height / 2 },
    { x: THESIS_MAP_LAYOUT[edge.to].x + NODE.width / 2, y: THESIS_MAP_LAYOUT[edge.to].y + NODE.height / 2 },
  ],
  labelSegment: 0,
}

const segments = (points) => points.slice(1).map((finish, index) => ({ start: points[index], finish }))
const pointEquals = (one, two) => one.x === two.x && one.y === two.y
const cross = (one, two, three) => (two.x - one.x) * (three.y - one.y) - (two.y - one.y) * (three.x - one.x)
const pointOnSegment = (point, start, finish) => cross(start, finish, point) === 0
  && point.x >= Math.min(start.x, finish.x) && point.x <= Math.max(start.x, finish.x)
  && point.y >= Math.min(start.y, finish.y) && point.y <= Math.max(start.y, finish.y)

const segmentIntersections = (one, two) => {
  const candidates = [one.start, one.finish, two.start, two.finish]
    .filter((point) => pointOnSegment(point, one.start, one.finish) && pointOnSegment(point, two.start, two.finish))
  const unique = candidates.filter((point, index) => candidates.findIndex((candidate) => pointEquals(candidate, point)) === index)
  if (unique.length) return unique
  const denominator = (one.start.x - one.finish.x) * (two.start.y - two.finish.y) - (one.start.y - one.finish.y) * (two.start.x - two.finish.x)
  if (denominator === 0) return []
  const determinantOne = one.start.x * one.finish.y - one.start.y * one.finish.x
  const determinantTwo = two.start.x * two.finish.y - two.start.y * two.finish.x
  const point = {
    x: (determinantOne * (two.start.x - two.finish.x) - (one.start.x - one.finish.x) * determinantTwo) / denominator,
    y: (determinantOne * (two.start.y - two.finish.y) - (one.start.y - one.finish.y) * determinantTwo) / denominator,
  }
  return pointOnSegment(point, one.start, one.finish) && pointOnSegment(point, two.start, two.finish) ? [point] : []
}

const labelBox = (edge, route) => {
  const segment = segments(route.points)[route.labelSegment]
  const anchor = { x: (segment.start.x + segment.finish.x) / 2, y: (segment.start.y + segment.finish.y) / 2 }
  const width = edge.relation.length * LABEL.characterWidth + LABEL.horizontalPadding * 2
  return {
    anchor,
    rect: { left: anchor.x - width / 2, right: anchor.x + width / 2, top: anchor.y - LABEL.height / 2, bottom: anchor.y + LABEL.height / 2 },
  }
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
  assert(claimIds.has('open-rails'))
  assert(claimIds.has('tivi-product'))
  assert(THESIS_MAP_LAYOUT['open-rails'])
  assert(THESIS_MAP_LAYOUT['tivi-product'])
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

test('map geometry is canonical and supplies a route for every exact edge', () => {
  assert.deepEqual(mapGeometry.THESIS_MAP_GEOMETRY?.canvas, { width: 1600, height: 900 })
  assert.deepEqual(mapGeometry.THESIS_MAP_GEOMETRY?.node, { width: 240, height: 60, edgePadding: 8 })
  assert.deepEqual(mapGeometry.THESIS_MAP_GEOMETRY?.label, {
    characterWidth: 7,
    horizontalPadding: 16,
    height: 18,
    clearance: 18,
    arrowClearance: 20,
  })
  assert.deepEqual(Object.keys(mapGeometry.THESIS_MAP_ROUTES || {}), THESIS_EDGES.map(({ id }) => id))
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

test('every routed edge clears every padded non-endpoint node rectangle', () => {
  for (const edge of THESIS_EDGES) {
    for (const segment of segments(routeFor(edge).points)) {
      for (const [claimId, position] of Object.entries(THESIS_MAP_LAYOUT)) {
        if (claimId === edge.from || claimId === edge.to) continue
        assert.equal(
          segmentIntersectsRectangle(segment.start, segment.finish, nodeRect(position, NODE.edgePadding)),
          false,
          `${edge.from} -> ${edge.to} must clear ${claimId}`,
        )
      }
    }
  }
})

test('routed relationships never cross or overlap away from a shared endpoint', () => {
  for (let first = 0; first < THESIS_EDGES.length; first += 1) {
    for (let second = first + 1; second < THESIS_EDGES.length; second += 1) {
      const firstEdge = THESIS_EDGES[first]
      const secondEdge = THESIS_EDGES[second]
      const firstRoute = routeFor(firstEdge)
      const secondRoute = routeFor(secondEdge)
      const sharedClaim = [firstEdge.from, firstEdge.to].find((id) => id === secondEdge.from || id === secondEdge.to)
      for (const firstSegment of segments(firstRoute.points)) {
        for (const secondSegment of segments(secondRoute.points)) {
          for (const intersection of segmentIntersections(firstSegment, secondSegment)) {
            const atFirstEndpoint = pointEquals(intersection, firstRoute.points[0]) || pointEquals(intersection, firstRoute.points.at(-1))
            const atSecondEndpoint = pointEquals(intersection, secondRoute.points[0]) || pointEquals(intersection, secondRoute.points.at(-1))
            assert(sharedClaim && atFirstEndpoint && atSecondEndpoint, `${firstEdge.id} must not cross ${secondEdge.id} at ${intersection.x},${intersection.y}`)
          }
        }
      }
    }
  }
})

test('relation labels have unique anchors and clear every node and other label', () => {
  const labels = THESIS_EDGES.map((edge) => ({ edge, ...labelBox(edge, routeFor(edge)) }))
  assert.equal(new Set(labels.map(({ anchor }) => `${anchor.x},${anchor.y}`)).size, labels.length, 'relation label anchors must be unique')
  for (const label of labels) {
    for (const [claimId, position] of Object.entries(THESIS_MAP_LAYOUT)) {
      assert.equal(rectanglesOverlap(label.rect, nodeRect(position, NODE.edgePadding)), false, `${label.edge.id} label must clear ${claimId}`)
    }
  }
  for (let first = 0; first < labels.length; first += 1) {
    for (let second = first + 1; second < labels.length; second += 1) {
      assert.equal(rectanglesOverlap(labels[first].rect, labels[second].rect), false, `${labels[first].edge.id} label must clear ${labels[second].edge.id}`)
    }
  }
})

test('each relation has documented line space for its word, clearances, and arrowhead', () => {
  for (const edge of THESIS_EDGES) {
    const route = routeFor(edge)
    const routeSegments = segments(route.points)
    assert(pointOnRectangleBoundary(route.points[0], nodeRect(THESIS_MAP_LAYOUT[edge.from])), `${edge.id} must leave its source boundary`)
    assert(pointOnRectangleBoundary(route.points.at(-1), nodeRect(THESIS_MAP_LAYOUT[edge.to])), `${edge.id} arrow must meet its target boundary`)
    for (const point of route.points) assert(point.x >= 0 && point.x <= CANVAS.width && point.y >= 0 && point.y <= CANVAS.height, `${edge.id} route must stay inside the canvas`)
    assert(Number.isInteger(route.labelSegment) && route.labelSegment >= 0 && route.labelSegment < routeSegments.length, `${edge.id} needs a valid label segment`)
    for (const segment of routeSegments) {
      assert(Math.hypot(segment.finish.x - segment.start.x, segment.finish.y - segment.start.y) >= LABEL.arrowClearance, `${edge.id} has a segment too short for a clear arrow route`)
    }
    const labelSegment = routeSegments[route.labelSegment]
    const available = Math.hypot(labelSegment.finish.x - labelSegment.start.x, labelSegment.finish.y - labelSegment.start.y)
    const wordWidth = edge.relation.length * LABEL.characterWidth + LABEL.horizontalPadding * 2
    const required = wordWidth + LABEL.clearance * 2 + LABEL.arrowClearance
    assert(available >= required, `${edge.id} needs ${required}px for its ${edge.relation} label and arrow, found ${available}px`)
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
    ['distribution-first', 'tivi-product'],
    ['chainfren-mission', 'tivi-product'],
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
  const styles = source('app/(mainpage)/thesis/thesis.module.css')
  assert.match(desktop, /THESIS_MAP_GEOMETRY/)
  assert.match(desktop, /THESIS_MAP_ROUTES/)
  assert.match(desktop, /<polyline/)
  assert.match(desktop, /route\.points/)
  assert.match(desktop, /dominantBaseline="middle"/)
  assert.match(styles, /\.mapEdge\s*\{[^}]*fill:\s*none/s)
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
