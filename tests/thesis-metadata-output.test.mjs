import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const chapterOutputPath = new URL('../.next/server/app/thesis/read/the-gap.html', import.meta.url)
const appPathsManifestPath = new URL('../.next/server/app-paths-manifest.json', import.meta.url)

test('built chapter metadata has one thesis path and points to the generated OG route', () => {
  assert.ok(existsSync(chapterOutputPath), 'Run npm run build before checking rendered thesis metadata.')
  const html = readFileSync(chapterOutputPath, 'utf8')

  assert.match(html, /<link rel="canonical" href="https:\/\/www\.chainfren\.com\/thesis\/read\/the-gap"/)
  assert.match(html, /<meta property="og:url" content="https:\/\/www\.chainfren\.com\/thesis\/read\/the-gap"/)
  assert.match(html, /<meta property="og:image" content="https:\/\/www\.chainfren\.com\/thesis\/opengraph-image"/)
  assert.doesNotMatch(html, /https:\/\/www\.chainfren\.com\/thesis\/thesis\//)
  const manifest = JSON.parse(readFileSync(appPathsManifestPath, 'utf8'))
  const ogRoute = Object.entries(manifest).find(([route]) => route === '/(mainpage)/thesis/opengraph-image/route')
  assert.ok(ogRoute, 'The stable /thesis/opengraph-image metadata route must be emitted.')
  assert.ok(existsSync(new URL(`../.next/server/${ogRoute[1]}`, import.meta.url)))
})
