import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { THESIS_BRAND_ASSETS, THESIS_BRAND_COMPONENTS, THESIS_MOTION } from '../lib/thesis/brand-contract.mjs'

const root = resolve(new URL('..', import.meta.url).pathname)
const hubPath = resolve(root, 'app/(mainpage)/thesis/components/ThesisHub.jsx')
const navPath = resolve(root, 'app/(mainpage)/thesis/components/ThesisNav.jsx')
const stylesPath = resolve(root, 'app/(mainpage)/thesis/thesis.module.css')

test('thesis uses canonical Chainfren components and Lucide interface icons', () => {
  const source = `${readFileSync(hubPath, 'utf8')}\n${readFileSync(navPath, 'utf8')}`

  assert.deepEqual(THESIS_BRAND_COMPONENTS, {
    wordmark: 'app/components/ChainfrenWordmark.jsx',
    mark: 'app/components/ChainfrenIcon.jsx',
    frens: 'app/components/Frens.jsx',
  })
  assert.match(source, /ChainfrenWordmark/)
  assert.match(source, /ChainfrenIcon/)
  assert.match(source, /\bFren\b/)
  assert.match(source, /from ['"]lucide-react['"]/) 
  assert.doesNotMatch(source, /<svg|<path|<circle|<line/)
})

test('thesis assets are canonical and styles preserve the scoped brand contract', () => {
  const hub = readFileSync(hubPath, 'utf8')
  const styles = readFileSync(stylesPath, 'utf8')

  assert.deepEqual(THESIS_MOTION, {
    enter: 'cubic-bezier(0.22, 1, 0.36, 1)',
    hover: 'cubic-bezier(0.33, 1, 0.68, 1)',
    symmetric: 'cubic-bezier(0.65, 0, 0.35, 1)',
  })
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
