import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const nextConfig = readFileSync(new URL('../next.config.js', import.meta.url), 'utf8')
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

test('the thesis build supports MDX without adding runtime CMS dependencies', () => {
  assert.match(nextConfig, /@next\/mdx/)
  assert.match(nextConfig, /pageExtensions/)
  assert.equal(pkg.dependencies['@next/mdx'], '13.4.7')
  assert.equal(pkg.dependencies['@mdx-js/loader'], '2.3.0')
  assert.equal(pkg.dependencies['@mdx-js/react'], '2.3.0')
  assert.equal(pkg.scripts['test:thesis'], 'node --test tests/thesis-*.test.mjs')
  assert.equal(pkg.scripts['validate:thesis'], 'node scripts/validate-thesis-content.mjs')
})

test('the thesis validation command succeeds before Task 2 content exists', () => {
  const result = spawnSync('npm', ['run', 'validate:thesis'], {
    cwd: new URL('../', import.meta.url),
    encoding: 'utf8',
  })

  assert.equal(result.status, 0, result.stderr)
})
