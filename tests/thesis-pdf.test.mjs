import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

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
})

test('print route is noindex, chrome-free, and print-safe', () => {
  const page = source('app/(mainpage)/thesis/print/page.jsx')
  const css = source('app/(mainpage)/thesis/print/print.module.css')
  assert.match(page, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/s)
  assert.match(page, /import TheGap from/)
  assert.match(page, /import BuildWithUs from/)
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
  assert.match(hash, /replace\(\/\\r\\n\/g/)
  assert.match(hash, /split\(.*join\('\/'\)/s)
  assert.match(generator, /--hostname', '127\.0\.0\.1'/)
  assert.match(generator, /--port', '3099'/)
  assert.match(generator, /30_000/)
  assert.match(generator, /SIGTERM/)
  assert.match(generator, /SIGKILL/)
  assert.match(generator, /5_000/)
})
