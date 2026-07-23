import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { THESIS_BRAND_ASSETS, THESIS_BRAND_COMPONENTS, THESIS_MOTION } from '../lib/thesis/brand-contract.mjs'

const root = resolve(new URL('..', import.meta.url).pathname)
const hubPath = resolve(root, 'app/(mainpage)/thesis/components/ThesisHub.jsx')
const navPath = resolve(root, 'app/(mainpage)/thesis/components/ThesisNav.jsx')
const layoutPath = resolve(root, 'app/(mainpage)/thesis/layout.jsx')
const tokensPath = resolve(root, 'app/(mainpage)/thesis/brand-tokens.module.css')
const stylesPath = resolve(root, 'app/(mainpage)/thesis/thesis.module.css')

test('thesis uses canonical Chainfren components and Lucide interface icons', () => {
  const source = `${readFileSync(hubPath, 'utf8')}\n${readFileSync(navPath, 'utf8')}`

  assert.match(source, new RegExp(`import\\s+ChainfrenWordmark\\s+from ['"]@/${THESIS_BRAND_COMPONENTS.wordmark.replace(/\.jsx$/, '')}['"]`))
  assert.match(source, new RegExp(`import\\s+ChainfrenIcon\\s+from ['"]@/${THESIS_BRAND_COMPONENTS.mark.replace(/\.jsx$/, '')}['"]`))
  assert.match(source, new RegExp(`import\\s+\\{\\s*Fren\\s*\\}\\s+from ['"]@/${THESIS_BRAND_COMPONENTS.frens.replace(/\.jsx$/, '')}['"]`))
  assert.match(source, /from ['"]lucide-react['"]/)
  assert.doesNotMatch(source, /<svg|<path|<circle|<line/)
})

test('thesis assets are canonical and styles preserve the scoped brand contract', () => {
  const hub = readFileSync(hubPath, 'utf8')
  const layout = readFileSync(layoutPath, 'utf8')
  const tokens = readFileSync(tokensPath, 'utf8')
  const styles = readFileSync(stylesPath, 'utf8')

  assert.match(layout, /import tokenStyles from ['"]\.\/brand-tokens\.module\.css['"]/)
  assert.match(layout, /className=\{tokenStyles\.shell\}/)
  for (const [name, value] of Object.entries(THESIS_MOTION)) {
    assert.match(tokens, new RegExp(`--thesis-${name}:\\s*${value.replace(/[()]/g, '\\$&')}`))
  }
  assert.match(styles, /var\(--thesis-hover\)/)
  assert.ok(THESIS_BRAND_ASSETS.length > 0)
  for (const asset of THESIS_BRAND_ASSETS) {
    const diskPath = resolve(root, 'public', asset.path.slice(1))
    assert.ok(existsSync(diskPath), `${asset.path} must exist`)
    assert.equal(createHash('sha256').update(readFileSync(diskPath)).digest('hex'), asset.sha256)
  }
  assert.match(styles, /var\(--thesis-navy\)/)
  assert.match(styles, /\.brandLink\s*\{[^}]*min-height:\s*44px[^}]*min-width:\s*44px/s)
  assert.match(styles, /\.navLinks a\s*\{[^}]*min-height:\s*44px[^}]*min-width:\s*44px/s)
  assert.doesNotMatch(hub, /#[0-9A-Fa-f]{3,8}/)
  assert.match(styles, /prefers-reduced-motion/)
  assert.doesNotMatch(styles, /filter\s*:|scale\(/)
  assert.doesNotMatch(styles, /https?:\/\//)
})
