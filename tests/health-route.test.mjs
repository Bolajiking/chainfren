import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const routePath = new URL('../app/api/health/route.js', import.meta.url)

test('health endpoint exposes a minimal GET route without environment details', () => {
  assert.equal(existsSync(routePath), true, 'app/api/health/route.js should exist')

  const source = readFileSync(routePath, 'utf8')
  assert.match(source, /export\s+async\s+function\s+GET/)
  assert.match(source, /status:\s*'ok'/)
  assert.doesNotMatch(source, /process\.env/)
})
