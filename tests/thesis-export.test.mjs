import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const root = new URL('..', import.meta.url)
const source = (path) => readFileSync(new URL(path, root), 'utf8')

test('thesis content hash is generated from canonical public sources', () => {
  const hash = source('lib/thesis/content-hash.mjs')
  const script = source('scripts/hash-thesis-content.mjs')
  assert.match(hash, /THESIS_CONTENT_HASH/)
  assert.match(hash, /^[\s\S]*[a-f0-9]{64}/m)
  assert.match(script, /createHash\(['"]sha256['"]\)/)
  assert.match(script, /content\/chainfren-thesis/)
  assert.match(script, /map-layout\.mjs/)
  assert.doesNotMatch(script, /content-hash\.mjs[^\n]*canonical/i)
})

test('print and download routes expose a print-ready full thesis PDF surface', () => {
  const print = source('app/(mainpage)/thesis/print/page.jsx')
  const download = source('app/(mainpage)/thesis/download/page.jsx')
  const css = source('app/(mainpage)/thesis/print/print.module.css')
  assert.match(print, /getPublishedChapters/)
  assert.match(print, /getPublicCitations/)
  assert.match(print, /THESIS_CONTENT_VERSION/)
  assert.match(print, /THESIS_CONTENT_HASH/)
  assert.match(css, /@page/)
  assert.match(css, /size:\s*A4/)
  assert.match(download, /Chainfren-Thesis\.pdf/)
  assert.match(download, /\/thesis\/print/)
})

test('PDF generator creates an artifact and reports source and PDF SHA-256 values', () => {
  const script = source('scripts/generate-thesis-pdf.mjs')
  assert.match(script, /--start-server/)
  assert.match(script, /3099/)
  assert.match(script, /Source SHA-256:/)
  assert.match(script, /PDF SHA-256:/)
  assert.match(script, /browser\.close/)
  assert.match(script, /finally/)
  assert.equal(existsSync(new URL('scripts/generate-thesis-artifacts.mjs', root)), true)
})
