import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const layoutPath = new URL('../app/layout.jsx', import.meta.url)

test('production metadata resolves from the public www hostname, never localhost', () => {
  const source = readFileSync(layoutPath, 'utf8')

  assert.match(source, /metadataBase:\s*new URL\('https:\/\/www\.chainfren\.com'\)/)
  assert.doesNotMatch(source, /metadataBase:\s*new URL\('http:\/\/localhost/)
})
