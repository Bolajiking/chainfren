import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('..', import.meta.url)
const source = (path) => readFileSync(new URL(path, root), 'utf8')

test('canonical PDF exports use versioned download paths and labeled checksums', () => {
  const download = source('app/(mainpage)/thesis/download/page.jsx')
  const generator = source('scripts/generate-thesis-pdf.mjs')
  assert.match(download, /\/downloads\/chainfren-thesis-2026\.1\.pdf/)
  assert.doesNotMatch(download, /\.sha256/)
  assert.match(generator, /public\/downloads\/chainfren-thesis-2026\.1\.pdf/)
  assert.match(generator, /public\/downloads\/chainfren-thesis-2026\.1\.sha256/)
  assert.match(generator, /Source SHA-256:/)
  assert.match(generator, /PDF SHA-256:/)
  assert.equal((download.match(/<a\b/g) || []).length, 1)
  assert.doesNotMatch(download, /<a[^>]+(?:\/thesis\/print|print)/i)
})

test('print route is noindex, chrome-free, and print-safe', () => {
  const page = source('app/(mainpage)/thesis/print/page.jsx')
  const css = source('app/(mainpage)/thesis/print/print.module.css')
  assert.match(page, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/s)
  for (const chapter of ['TheGap', 'TheTrap', 'TheUnlock', 'TheThesis', 'TheCompany', 'WhatWeBuild', 'HowWeWork', 'TheRoadAhead', 'BuildWithUs']) {
    assert.match(page, new RegExp(`import ${chapter} from`))
  }
  assert.match(page, /THESIS_CONTENT_VERSION/)
  assert.match(page, /THESIS_CONTENT_HASH/)
  assert.match(css, /counter\(page\)/)
  assert.match(css, /widows:\s*3/)
  assert.match(css, /orphans:\s*3/)
  assert.match(css, /overflow-wrap:\s*anywhere/)
})

test('hash source is generated from normalized canonical inputs and PDF server is owned', () => {
  const hash = source('scripts/hash-thesis-content.mjs')
  const generator = source('scripts/generate-thesis-pdf.mjs')
  assert.match(hash, /generated-content-hash\.mjs/)
  assert.match(hash, /replace\(\/\\r\\n\?\/g/)
  assert.match(hash, /split\(.*join\('\/'\)/s)
  assert.match(generator, /--hostname', '127\.0\.0\.1'/)
  assert.match(generator, /--port', '3099'/)
  assert.match(generator, /30_000/)
  assert.match(generator, /SIGTERM/)
  assert.match(generator, /SIGKILL/)
  assert.match(generator, /5_000/)
  assert.match(generator, /server\.once\('error'/)
  assert.match(generator, /newPage\(\{ viewport: \{ width: 1440, height: 900 \} \}\)/)
})

test('released checksums match the canonical source inputs and PDF artifact', () => {
  const checksum = source('public/downloads/chainfren-thesis-2026.1.sha256')
  const sourceMatch = checksum.match(/^Source SHA-256:\s*([a-f0-9]{64})$/m)
  const pdfMatch = checksum.match(/^PDF SHA-256:\s*([a-f0-9]{64})$/m)
  assert.ok(sourceMatch, 'checksum includes a labeled source hash')
  assert.ok(pdfMatch, 'checksum includes a labeled PDF hash')
  assert.notEqual(sourceMatch[1], pdfMatch[1])

  const repo = new URL('..', import.meta.url).pathname
  const thesis = join(repo, 'content/chainfren-thesis')
  const roots = [join(thesis, 'chapters'), join(thesis, 'manifest.mjs'), join(thesis, 'claims.mjs'), join(thesis, 'citations.mjs'), join(thesis, 'public-config.mjs'), join(thesis, 'public-system.mjs'), join(thesis, 'map-layout.mjs'), join(thesis, 'short-read.mdx')]
  const collect = (path) => statSync(path).isDirectory() ? readdirSync(path, { withFileTypes: true }).flatMap((entry) => collect(join(path, entry.name))) : [path]
  const inputs = roots.flatMap(collect).sort((a, b) => relative(repo, a).replaceAll('\\', '/').localeCompare(relative(repo, b).replaceAll('\\', '/')))
  const hash = createHash('sha256')
  for (const path of inputs) hash.update(`${relative(repo, path).replaceAll('\\', '/')}\0${readFileSync(path, 'utf8').replace(/\r\n?/g, '\n')}\0`)
  assert.equal(hash.digest('hex'), sourceMatch[1])
  assert.equal(createHash('sha256').update(readFileSync(new URL('public/downloads/chainfren-thesis-2026.1.pdf', root))).digest('hex'), pdfMatch[1])
})

test('site metadata uses the generated thesis content hash', () => {
  const layout = source('app/layout.jsx')
  assert.match(layout, /import \{ THESIS_CONTENT_HASH \} from ['"]@\/content\/chainfren-thesis\/generated-content-hash\.mjs['"]/)
  assert.match(layout, /thesis-content-sha256.*THESIS_CONTENT_HASH/s)
})
