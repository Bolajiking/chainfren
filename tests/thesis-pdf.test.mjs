import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { EventEmitter } from 'node:events'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { waitForOwnedServerReadiness } from '../lib/thesis/owned-server-readiness.mjs'

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
  const ownership = source('lib/thesis/owned-server-readiness.mjs')
  assert.match(hash, /generated-content-hash\.mjs/)
  assert.match(hash, /replace\(\/\\r\\n\?\/g/)
  assert.match(hash, /split\(.*join\('\/'\)/s)
  assert.match(generator, /--hostname', '127\.0\.0\.1'/)
  assert.match(generator, /--port', '3099'/)
  assert.match(generator, /30_000/)
  assert.match(generator, /SIGTERM/)
  assert.match(generator, /SIGKILL/)
  assert.match(generator, /5_000/)
  assert.match(ownership, /child\.once\('error'/)
  assert.match(ownership, /child\.once\('exit'/)
  assert.match(generator, /waitForOwnedServerReadiness/)
  assert.match(generator, /x-chainfren-thesis-export-token/)
  assert.match(generator, /THESIS_EXPORT_TOKEN/)
  assert.match(source('middleware.js'), /x-chainfren-thesis-export-token/)
  assert.match(generator, /newPage\(\{ viewport: \{ width: 1440, height: 900 \} \}\)/)
})

test('PDF export rejects an owned server that exits before print readiness', () => {
  const generator = source('scripts/generate-thesis-pdf.mjs')
  assert.match(generator, /await waitForOwnedServerReadiness\(server, waitForHealth\(exportToken\)\)/)
})

test('owned readiness rejects when the spawned server exits despite a ready endpoint', async () => {
  const child = new EventEmitter()
  child.exitCode = null
  let markEndpointReady
  const endpointReady = new Promise((resolve) => { markEndpointReady = resolve })
  queueMicrotask(() => {
    child.exitCode = 1
    child.emit('exit', 1, null)
  })
  queueMicrotask(() => markEndpointReady())
  await assert.rejects(
    waitForOwnedServerReadiness(child, endpointReady),
    /Owned thesis server exited before readiness with code 1/,
  )
})

test('owned readiness rejects delayed EADDRINUSE when an unrelated endpoint is otherwise ready', async () => {
  const child = new EventEmitter()
  child.exitCode = null
  const unrelatedEndpointIsReady = Promise.resolve(false)
  setImmediate(() => setImmediate(() => {
    const error = Object.assign(new Error('listen EADDRINUSE: address already in use 127.0.0.1:3099'), { code: 'EADDRINUSE' })
    child.emit('error', error)
    child.exitCode = 1
    child.emit('exit', 1, null)
  }))
  await assert.rejects(
    waitForOwnedServerReadiness(child, unrelatedEndpointIsReady),
    /Owned thesis server failed before readiness: listen EADDRINUSE/,
  )
})

test('owned readiness does not treat an HTTP-ready endpoint as owned without the child token', async () => {
  const child = new EventEmitter()
  child.exitCode = null
  const pending = waitForOwnedServerReadiness(child, Promise.resolve(false))
  setTimeout(() => {
    child.exitCode = 1
    child.emit('exit', 1, null)
  }, 10)
  await assert.rejects(pending, /Owned thesis server exited before readiness with code 1/)
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
  const generated = source('content/chainfren-thesis/generated-content-hash.mjs')
  assert.match(generated, new RegExp(`THESIS_CONTENT_HASH = ['\"]${sourceMatch[1]}['\"]`))
  assert.equal(createHash('sha256').update(readFileSync(new URL('public/downloads/chainfren-thesis-2026.1.pdf', root))).digest('hex'), pdfMatch[1])
})

test('site metadata uses the generated thesis content hash', () => {
  const layout = source('app/layout.jsx')
  assert.match(layout, /import \{ THESIS_CONTENT_HASH \} from ['"]@\/content\/chainfren-thesis\/generated-content-hash\.mjs['"]/)
  assert.match(layout, /thesis-content-sha256.*THESIS_CONTENT_HASH/s)
})
