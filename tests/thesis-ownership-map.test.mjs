import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

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
  assert.match(desktop, /<svg/)
  assert.match(desktop, /aria-label=['"]Ownership claim map['"]/) 
  assert.match(desktop, /aria-live=['"]polite['"]/) 
  assert.match(desktop, /Zoom in/)
  assert.match(desktop, /Fit map/)
  assert.match(desktop, /replaceState/)
  assert.match(desktop, /\?claim=/)
  assert.doesNotMatch(desktop, /react-flow|d3|cytoscape/i)
})
