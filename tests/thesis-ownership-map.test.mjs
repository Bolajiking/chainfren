import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { THESIS_CLAIMS, THESIS_EDGES } from '../content/chainfren-thesis/claims.mjs'
import { THESIS_MAP_LAYOUT } from '../content/chainfren-thesis/map-layout.mjs'
import { canLoadDesktopMap, resolveMapClaim } from '../lib/thesis/ownership-map.mjs'

const root = new URL('..', import.meta.url)
const source = (path) => readFileSync(new URL(path, root), 'utf8')

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
})

test('map deep links choose a valid claim and default invalid or absent claim IDs', () => {
  assert.equal(resolveMapClaim(THESIS_CLAIMS, 'chainfren-mission'), 'chainfren-mission')
  assert.equal(resolveMapClaim(THESIS_CLAIMS, 'not-a-claim'), 'attention-to-ownership')
  assert.equal(resolveMapClaim(THESIS_CLAIMS, null), 'attention-to-ownership')
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
