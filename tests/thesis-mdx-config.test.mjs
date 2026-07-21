import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const nextConfig = readFileSync(new URL('../next.config.js', import.meta.url), 'utf8')
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

test('the thesis build supports MDX without adding runtime CMS dependencies', () => {
  assert.match(nextConfig, /@next\/mdx/)
  assert.match(nextConfig, /pageExtensions/)
  assert.equal(pkg.scripts['test:thesis'], 'node --test tests/thesis-*.test.mjs')
  assert.equal(pkg.scripts['validate:thesis'], 'node scripts/validate-thesis-content.mjs')
})
