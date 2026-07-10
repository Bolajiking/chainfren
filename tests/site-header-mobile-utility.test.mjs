import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../app/components/SiteHeader.jsx', import.meta.url), 'utf8')
const solutionsEngine = source.slice(
  source.indexOf('const ENGINES = {'),
  source.indexOf("  media: {"),
)

test('mobile utility notices are separate from the Solutions accordion rows', () => {
  assert.doesNotMatch(solutionsEngine, /mobileRows:[\s\S]*Creator Network/)
  assert.doesNotMatch(solutionsEngine, /mobileRows:[\s\S]*Star Factor/)
  assert.match(source, /const MOBILE_UTILITY_ITEMS = \[/)
  assert.match(source, /className="cf-overlay-utility"/)
  assert.match(source, /label: 'Creator Network'/)
  assert.match(source, /label: 'Star Factor'/)
})
