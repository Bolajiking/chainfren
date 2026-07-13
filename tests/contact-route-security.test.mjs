import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const routePath = new URL('../app/api/contact/route.js', import.meta.url)

test('contact API does not expose stored submissions through an unauthenticated GET route', () => {
  const source = readFileSync(routePath, 'utf8')

  assert.doesNotMatch(source, /export\s+async\s+function\s+GET/)
})
