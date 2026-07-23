import test from 'node:test'
import assert from 'node:assert/strict'

import { THESIS_CONTENT_VERSION, PUBLIC_CTAS } from '../content/chainfren-thesis/public-config.mjs'
import { THESIS_MANIFEST } from '../content/chainfren-thesis/manifest.mjs'
import { PUBLIC_CITATIONS } from '../content/chainfren-thesis/citations.mjs'
import { THESIS_CLAIMS, THESIS_EDGES } from '../content/chainfren-thesis/claims.mjs'
import { DISTRIBUTION_LOOP, VALUE_PATH, ROADMAP_HORIZONS } from '../content/chainfren-thesis/public-system.mjs'
import { PUBLIC_PRODUCT_MATURITY, PUBLIC_INITIATIVE_MATURITY } from '../content/chainfren-thesis/public-config.mjs'
import { validateCitations, validateManifest, validatePublicSystem, validateStages } from '../lib/thesis/schema.mjs'

test('defines the public thesis version and nine unique ordered chapters', () => {
  assert.equal(THESIS_CONTENT_VERSION, '2026.1')
  assert.deepEqual(THESIS_MANIFEST.map(({ id, slug }) => [id, slug]), [
    ['01', 'the-gap'], ['02', 'the-trap'], ['03', 'the-unlock'],
    ['04', 'the-thesis'], ['05', 'the-company'], ['06', 'what-we-build'],
    ['07', 'how-we-work'], ['08', 'the-road-ahead'], ['09', 'build-with-us'],
  ])
  assert.equal(new Set(THESIS_MANIFEST.map((chapter) => chapter.id)).size, 9)
  assert.equal(new Set(THESIS_MANIFEST.map((chapter) => chapter.slug)).size, 9)
})

test('defines twelve unique public claims and the canonical edge count', () => {
  assert.equal(THESIS_CLAIMS.length, 12)
  assert.equal(new Set(THESIS_CLAIMS.map((claim) => claim.id)).size, 12)
  assert.equal(THESIS_EDGES.length, 15)
})

test('uses only the exact public CTA routes', () => {
  assert.deepEqual(Object.fromEntries(Object.entries(PUBLIC_CTAS).map(([key, value]) => [key, value.href])), {
    creators: '/for-creators', brands: '/for-brands', partners: '/contact',
    talent: '/contact', executives: '/contact', supporters: '/sabi',
  })
})

test('supports well-shaped uniquely identified public citations', () => {
  assert.doesNotThrow(() => validateCitations(PUBLIC_CITATIONS, new Set(THESIS_CLAIMS.map((claim) => claim.id))))
})

test('defines the exact public distribution and value sequences', () => {
  assert.deepEqual(DISTRIBUTION_LOOP.map((item) => item.id), ['sabi', 'creator-network', 'star-factor', 'products-and-solutions'])
  assert.deepEqual(VALUE_PATH.map((item) => item.id), ['attention', 'participation', 'ownership', 'value'])
  assert.equal(ROADMAP_HORIZONS.length, 4)
  assert(DISTRIBUTION_LOOP.every((item) => item.href))
  assert(VALUE_PATH.every((item) => item.href))
  assert(ROADMAP_HORIZONS.every((item) => item.href))
})

test('rejects noncanonical manifest slugs and private horizon content', () => {
  const changedManifest = THESIS_MANIFEST.map((chapter) => ({ ...chapter }))
  changedManifest[8].slug = 'another-ending'
  assert.throws(() => validateManifest(changedManifest), /canonical slug/)

  for (const unsafeSummary of ['Target Q3 2027 revenue growth.', 'A budget and internal metric.', 'Extend runway through a control matrix.']) {
    const unsafeSystem = { DISTRIBUTION_LOOP, VALUE_PATH, ROADMAP_HORIZONS: ROADMAP_HORIZONS.map((item) => ({ ...item })) }
    unsafeSystem.ROADMAP_HORIZONS[0].summary = unsafeSummary
    assert.throws(() => validatePublicSystem(unsafeSystem, new Set(THESIS_MANIFEST.map((chapter) => chapter.slug))), /private operational content/)
  }
})

test('permits generic revenue while rejecting the sensitive revenue phrase in horizons', () => {
  const publicSystem = { DISTRIBUTION_LOOP, VALUE_PATH, ROADMAP_HORIZONS: ROADMAP_HORIZONS.map((item) => ({ ...item })) }
  publicSystem.ROADMAP_HORIZONS[0].summary = 'Creators can build durable revenue through participation.'
  assert.doesNotThrow(() => validatePublicSystem(publicSystem, new Set(THESIS_MANIFEST.map((chapter) => chapter.slug))))

  publicSystem.ROADMAP_HORIZONS[0].summary = 'This includes signed revenue.'
  assert.throws(() => validatePublicSystem(publicSystem, new Set(THESIS_MANIFEST.map((chapter) => chapter.slug))), /private operational content/)
})

test('rejects quarter language and singular or plural targets and metrics in horizons', () => {
  for (const unsafeSummary of ['Q1 public launch.', 'Q4 planning.', 'next quarter priorities.', 'Quarter three plans.', 'A target for public work.', 'Public targets are set.', 'An internal metric.', 'Internal metrics are tracked.']) {
    const unsafeSystem = { DISTRIBUTION_LOOP, VALUE_PATH, ROADMAP_HORIZONS: ROADMAP_HORIZONS.map((item) => ({ ...item })) }
    unsafeSystem.ROADMAP_HORIZONS[0].summary = unsafeSummary
    assert.throws(() => validatePublicSystem(unsafeSystem, new Set(THESIS_MANIFEST.map((chapter) => chapter.slug))), /private operational content/)
  }
})

test('requires the frozen public maturity mapping', () => {
  assert.doesNotThrow(() => validateStages([...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]))
  const altered = [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY].map((item) => ({ ...item }))
  altered[0].maturity = 'live'
  assert.throws(() => validateStages(altered), /required mapping/)
})

test('requires canonical destinations for every public system and maturity record', () => {
  const alteredSystem = { DISTRIBUTION_LOOP: DISTRIBUTION_LOOP.map((item) => ({ ...item })), VALUE_PATH, ROADMAP_HORIZONS }
  alteredSystem.DISTRIBUTION_LOOP[0].href = '/not-a-real-route'
  assert.throws(() => validatePublicSystem(alteredSystem, new Set(THESIS_MANIFEST.map((chapter) => chapter.slug))), /approved destination/)

  const alteredMaturity = [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY].map((item) => ({ ...item }))
  alteredMaturity[0].href = '/not-a-real-route'
  assert.throws(() => validateStages(alteredMaturity), /approved destination/)
})

test('rejects impossible ISO calendar dates and accepts leap days', () => {
  const impossible = THESIS_MANIFEST.map((chapter) => ({ ...chapter }))
  impossible[0].updatedAt = '2026-02-31'
  assert.throws(() => validateManifest(impossible), /invalid updatedAt/)
  const leapDay = THESIS_MANIFEST.map((chapter) => ({ ...chapter }))
  leapDay[0].updatedAt = '2028-02-29'
  assert.doesNotThrow(() => validateManifest(leapDay))
})
