import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const grid = readFileSync(new URL('../app/components/MainGrid.jsx', import.meta.url), 'utf8')
const audience = readFileSync(new URL('../app/components/AudienceCard.jsx', import.meta.url), 'utf8')
const mobileLayout = grid.slice(
  grid.indexOf('{/* --- MOBILE LAYOUT'),
  grid.indexOf('{/* --- DESKTOP LAYOUT'),
)

test('mobile places the audience card before What We Build', () => {
  assert.ok(
    mobileLayout.indexOf('<ForCreatorsSection />') < mobileLayout.indexOf('<WhatWeBuild />'),
    'expected ForCreatorsSection before WhatWeBuild in the mobile-only layout',
  )
})

test('audience cards use the shortened solution-stack copy', () => {
  assert.doesNotMatch(audience, /Growth OS, owned media, AI, and paid brand deals/)
  assert.doesNotMatch(audience, /Community, AI, owned media, and access to Africa’s biggest creators/)
  assert.match(audience, /A solution stack to own the full value that your attention generates\./)
  assert.match(audience, /Everything you need to build culture and convert it\./)
})
