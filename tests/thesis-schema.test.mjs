import test from 'node:test'
import assert from 'node:assert/strict'

import { THESIS_CONTENT_VERSION, PUBLIC_CTAS, PUBLIC_PRODUCT_GROUPS } from '../content/chainfren-thesis/public-config.mjs'
import { THESIS_MANIFEST } from '../content/chainfren-thesis/manifest.mjs'
import { PUBLIC_CITATIONS } from '../content/chainfren-thesis/citations.mjs'
import { THESIS_CLAIMS, THESIS_EDGES } from '../content/chainfren-thesis/claims.mjs'
import { DISTRIBUTION_LOOP, VALUE_PATH, ROADMAP_HORIZONS } from '../content/chainfren-thesis/public-system.mjs'
import { PUBLIC_PRODUCT_MATURITY, PUBLIC_INITIATIVE_MATURITY } from '../content/chainfren-thesis/public-config.mjs'
import { validateCitations, validateClaims, validateEdges, validateManifest, validateProductGroups, validatePublicSystem, validateReferences, validateStages } from '../lib/thesis/schema.mjs'

const canonicalClaimRows = [
  ['african-attention-value', 'the-gap', 'context'],
  ['african-value-gap', 'the-gap', 'diagnosis'],
  ['extractive-systems', 'the-trap', 'diagnosis'],
  ['rented-relationships', 'the-trap', 'diagnosis'],
  ['blockchain-open-rails', 'the-unlock', 'mechanism'],
  ['distribution-first', 'the-company', 'execution'],
  ['attention-to-participation', 'the-thesis', 'mechanism'],
  ['participation-to-ownership', 'the-thesis', 'mission'],
  ['ownership-to-value', 'the-thesis', 'outcome'],
  ['chainfren-mission', 'the-company', 'mission'],
  ['tivi-flagship', 'what-we-build', 'execution'],
  ['african-built-ecosystem', 'the-road-ahead', 'outcome'],
]

const canonicalEdgeRows = [
  ['extractive-systems', 'african-value-gap', 'causes'],
  ['extractive-systems', 'rented-relationships', 'causes'],
  ['rented-relationships', 'african-attention-value', 'constrains'],
  ['african-attention-value', 'attention-to-participation', 'enables'],
  ['blockchain-open-rails', 'participation-to-ownership', 'enables'],
  ['distribution-first', 'attention-to-participation', 'enables'],
  ['attention-to-participation', 'participation-to-ownership', 'enables'],
  ['participation-to-ownership', 'ownership-to-value', 'enables'],
  ['ownership-to-value', 'african-built-ecosystem', 'enables'],
  ['chainfren-mission', 'distribution-first', 'enables'],
  ['chainfren-mission', 'tivi-flagship', 'enables'],
  ['tivi-flagship', 'participation-to-ownership', 'enables'],
  ['blockchain-open-rails', 'tivi-flagship', 'enables'],
  ['distribution-first', 'tivi-flagship', 'enables'],
  ['tivi-flagship', 'ownership-to-value', 'enables'],
]

test('defines the public thesis version and nine unique ordered chapters', () => {
  assert.equal(THESIS_CONTENT_VERSION, '2026.2')
  assert.deepEqual(THESIS_MANIFEST.map(({ id, slug }) => [id, slug]), [
    ['01', 'the-gap'], ['02', 'the-trap'], ['03', 'the-unlock'],
    ['04', 'the-thesis'], ['05', 'the-company'], ['06', 'what-we-build'],
    ['07', 'how-we-work'], ['08', 'the-road-ahead'], ['09', 'build-with-us'],
  ])
  assert.equal(new Set(THESIS_MANIFEST.map((chapter) => chapter.id)).size, 9)
  assert.equal(new Set(THESIS_MANIFEST.map((chapter) => chapter.slug)).size, 9)
})

test('defines the exact ordered public claim and edge contracts', () => {
  assert.deepEqual(THESIS_CLAIMS.map(({ id, chapterSlug, type }) => [id, chapterSlug, type]), canonicalClaimRows)
  assert.deepEqual(THESIS_CLAIMS.map(({ order }) => order), canonicalClaimRows.map((_, index) => index + 1))
  assert.deepEqual(THESIS_EDGES.map(({ from, to, relation }) => [from, to, relation]), canonicalEdgeRows)
  assert.equal(new Set(THESIS_CLAIMS.map((claim) => claim.id)).size, canonicalClaimRows.length)
  assert.equal(new Set(THESIS_EDGES.map((edge) => edge.id)).size, canonicalEdgeRows.length)
  assert.doesNotThrow(() => validateClaims(THESIS_CLAIMS, new Set(THESIS_MANIFEST.map(({ slug }) => slug)), new Set(PUBLIC_CITATIONS.map(({ id }) => id))))
  assert.doesNotThrow(() => validateEdges(THESIS_EDGES, new Set(THESIS_CLAIMS.map(({ id }) => id))))
})

test('claim validation rejects reordered rows, invalid ownership, and obsolete proof framing', () => {
  const reordered = THESIS_CLAIMS.map((claim) => ({ ...claim }))
  ;[reordered[0], reordered[1]] = [reordered[1], reordered[0]]
  assert.throws(() => validateClaims(reordered, new Set(THESIS_MANIFEST.map(({ slug }) => slug)), new Set()), /canonical claim rows/)

  const wrongChapter = THESIS_CLAIMS.map((claim) => ({ ...claim }))
  wrongChapter.find(({ id }) => id === 'tivi-flagship').chapterSlug = 'the-road-ahead'
  assert.throws(() => validateClaims(wrongChapter, new Set(THESIS_MANIFEST.map(({ slug }) => slug)), new Set()), /canonical claim rows/)

  const proofTitle = THESIS_CLAIMS.map((claim) => ({ ...claim }))
  proofTitle[0].title = 'Proof that Star Factor works'
  assert.throws(() => validateClaims(proofTitle, new Set(THESIS_MANIFEST.map(({ slug }) => slug)), new Set()), /proof/i)

  const reorderedNumbers = THESIS_CLAIMS.map((claim) => ({ ...claim }))
  ;[reorderedNumbers[0].order, reorderedNumbers[1].order] = [reorderedNumbers[1].order, reorderedNumbers[0].order]
  assert.throws(() => validateClaims(reorderedNumbers, new Set(THESIS_MANIFEST.map(({ slug }) => slug)), new Set()), /canonical claim order/)
})

test('claim validation enforces the public TiVi, blockchain, and ecosystem meanings', () => {
  const validate = (claims) => validateClaims(claims, new Set(THESIS_MANIFEST.map(({ slug }) => slug)), new Set())

  const separateTiVi = THESIS_CLAIMS.map((claim) => ({ ...claim }))
  separateTiVi.find(({ id }) => id === 'tivi-flagship').summary = 'TiVi and Media Launchpad are flagship products.'
  assert.throws(() => validate(separateTiVi), /Media Launchpad is TiVi/)

  for (const overstatement of ['TiVi has launched.', 'TiVi adoption is complete.']) {
    const overstatedTiVi = THESIS_CLAIMS.map((claim) => ({ ...claim }))
    overstatedTiVi.find(({ id }) => id === 'tivi-flagship').summary = `Media Launchpad is TiVi and TiVi is the flagship expression. ${overstatement}`
    assert.throws(() => validate(overstatedTiVi), /adoption or launch/)
  }

  const vagueBlockchain = THESIS_CLAIMS.map((claim) => ({ ...claim }))
  vagueBlockchain.find(({ id }) => id === 'blockchain-open-rails').summary = 'Blockchain may help with payments.'
  assert.throws(() => validate(vagueBlockchain), /practical infrastructure/)

  const achievedEcosystem = THESIS_CLAIMS.map((claim) => ({ ...claim }))
  achievedEcosystem.find(({ id }) => id === 'african-built-ecosystem').summary = 'The African-built ecosystem is finished.'
  assert.throws(() => validate(achievedEcosystem), /ambition.*outcome/i)
})

test('edge validation rejects reordered rows and unknown endpoints', () => {
  const reordered = THESIS_EDGES.map((edge) => ({ ...edge }))
  ;[reordered[0], reordered[1]] = [reordered[1], reordered[0]]
  assert.throws(() => validateEdges(reordered, new Set(THESIS_CLAIMS.map(({ id }) => id))), /canonical edge order/)

  const unknown = THESIS_EDGES.map((edge) => ({ ...edge }))
  unknown[0].from = 'missing-claim'
  assert.throws(() => validateEdges(unknown, new Set(THESIS_CLAIMS.map(({ id }) => id))), /unknown claim/)
})

test('uses the synchronized revision date and revised chapter subjects', () => {
  assert(THESIS_MANIFEST.every(({ updatedAt }) => updatedAt === '2026-08-25'))
  assert.doesNotMatch(THESIS_MANIFEST.map(({ summary }) => summary).join('\n'), /Star Factor is a later|Products and Solutions/i)
  assert.match(THESIS_MANIFEST.find(({ slug }) => slug === 'the-gap').summary, /Africans|African attention/i)
  assert.match(THESIS_MANIFEST.find(({ slug }) => slug === 'the-company').summary, /distribution-first/i)
  assert.match(THESIS_MANIFEST.find(({ slug }) => slug === 'what-we-build').summary, /TiVi/i)
})

test('manifest validation enforces every revised chapter subject', () => {
  assert.doesNotThrow(() => validateManifest(THESIS_MANIFEST))
  for (const chapter of THESIS_MANIFEST) {
    const generic = THESIS_MANIFEST.map((item) => ({ ...item }))
    generic.find(({ slug }) => slug === chapter.slug).summary = 'This chapter explains the public thesis.'
    assert.throws(() => validateManifest(generic), new RegExp(`${chapter.slug}.*revised chapter subject`))
  }
})

test('manifest validation rejects creator-only framing but allows creators inside all-Africans framing', () => {
  const creatorOnly = THESIS_MANIFEST.map((chapter) => ({ ...chapter }))
  creatorOnly.find(({ slug }) => slug === 'the-gap').summary = 'African creators create global attention while value collects elsewhere.'
  assert.throws(() => validateManifest(creatorOnly), /creator-only framing/)

  const allAfricans = THESIS_MANIFEST.map((chapter) => ({ ...chapter }))
  allAfricans.find(({ slug }) => slug === 'the-gap').summary = 'Africans, including African creators, create attention while control and value collect elsewhere.'
  assert.doesNotThrow(() => validateManifest(allAfricans))
})

test('manifest claim references must agree with claim chapter ownership', () => {
  assert.doesNotThrow(() => validateReferences(THESIS_MANIFEST, THESIS_CLAIMS, PUBLIC_CITATIONS))
  const wrongOwner = THESIS_MANIFEST.map((chapter) => ({ ...chapter, mapClaimIds: [...chapter.mapClaimIds] }))
  wrongOwner.find(({ slug }) => slug === 'the-gap').mapClaimIds[0] = 'tivi-flagship'
  assert.throws(() => validateReferences(wrongOwner, THESIS_CLAIMS, PUBLIC_CITATIONS), /belongs to chapter what-we-build/)
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
  assert.deepEqual(DISTRIBUTION_LOOP.map((item) => item.id), ['sabi', 'creator-network', 'tivi', 'additional-capabilities', 'star-factor'])
  assert.deepEqual(DISTRIBUTION_LOOP.find((item) => item.id === 'tivi'), {
    id: 'tivi', title: 'TiVi / Media Launchpad', summary: 'A launchpad for media experiences and owned audience relationships.', maturity: 'early-access', maturityId: 'media-launchpad', href: '/products/media-launchpad',
  })
  assert.deepEqual(VALUE_PATH.map((item) => item.id), ['attention', 'participation', 'ownership', 'value'])
  assert.equal(ROADMAP_HORIZONS.length, 4)
  assert(DISTRIBUTION_LOOP.every((item) => item.href))
  assert(VALUE_PATH.every((item) => item.href))
  assert(ROADMAP_HORIZONS.every((item) => item.href))
  assert.match(DISTRIBUTION_LOOP.find(({ id }) => id === 'star-factor').summary, /development/i)
  assert.match(ROADMAP_HORIZONS.map(({ summary }) => summary).join(' '), /Indy[^.]*directional/i)
})

test('public system validation keeps Star Factor in development and Indy directional', () => {
  const withoutDevelopment = { DISTRIBUTION_LOOP: DISTRIBUTION_LOOP.map((item) => ({ ...item })), VALUE_PATH, ROADMAP_HORIZONS }
  withoutDevelopment.DISTRIBUTION_LOOP.find(({ id }) => id === 'star-factor').summary = 'An audience participation product.'
  assert.throws(() => validatePublicSystem(withoutDevelopment, new Set(THESIS_MANIFEST.map(({ slug }) => slug))), /Star Factor.*development/)

  const withoutDirection = { DISTRIBUTION_LOOP, VALUE_PATH, ROADMAP_HORIZONS: ROADMAP_HORIZONS.map((item) => ({ ...item })) }
  withoutDirection.ROADMAP_HORIZONS.find(({ id }) => id === 'compounding-value').summary = 'Build toward durable value on open rails.'
  assert.throws(() => validatePublicSystem(withoutDirection, new Set(THESIS_MANIFEST.map(({ slug }) => slug))), /Indy.*directional/)
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

test('defines the exact public product hierarchy', () => {
  assert.deepEqual(PUBLIC_PRODUCT_GROUPS, [
    { id: 'flagship', label: 'Flagship product', itemIds: ['media-launchpad'] },
    { id: 'in-development', label: 'In development', itemIds: ['star-factor'] },
    { id: 'distribution', label: 'Supporting distribution products', itemIds: ['sabi', 'creator-network'] },
    { id: 'capabilities', label: 'Additional capabilities', itemIds: ['creator-growth-os', 'community-engine', 'ai-agent-studio'] },
    { id: 'roadmap', label: 'Roadmap', itemIds: ['indy'] },
  ])
  assert.doesNotThrow(() => validateProductGroups(PUBLIC_PRODUCT_GROUPS, [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]))
})

test('rejects invalid public product group membership and ordering', () => {
  const records = [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]
  const clone = () => PUBLIC_PRODUCT_GROUPS.map((group) => ({ ...group, itemIds: [...group.itemIds] }))

  const duplicate = clone()
  duplicate[1].itemIds[0] = 'media-launchpad'
  assert.throws(() => validateProductGroups(duplicate, records), /unique membership/)

  const missing = clone()
  missing[4].itemIds = []
  assert.throws(() => validateProductGroups(missing, records), /complete coverage/)

  const changedGroupOrder = clone()
  ;[changedGroupOrder[0], changedGroupOrder[1]] = [changedGroupOrder[1], changedGroupOrder[0]]
  assert.throws(() => validateProductGroups(changedGroupOrder, records), /group order/)

  const changedItemOrder = clone()
  changedItemOrder[2].itemIds.reverse()
  assert.throws(() => validateProductGroups(changedItemOrder, records), /item order/)

  const unknown = clone()
  unknown[4].itemIds[0] = 'unknown-product'
  assert.throws(() => validateProductGroups(unknown, records), /unknown item/)
})

test('rejects malformed maturity records with an intentional validation error', () => {
  const records = [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]
  for (const malformed of [null, {}, { id: '' }]) {
    const altered = [...records]
    altered[0] = malformed
    assert.throws(
      () => validateProductGroups(PUBLIC_PRODUCT_GROUPS, altered),
      /Public maturity record at index 0 requires a non-empty string id/,
    )
  }
})

test('requires the TiVi distribution loop maturity alias', () => {
  const altered = DISTRIBUTION_LOOP.map((item) => ({ ...item }))
  delete altered.find((item) => item.id === 'tivi').maturityId
  assert.throws(
    () => validatePublicSystem({ DISTRIBUTION_LOOP: altered, VALUE_PATH, ROADMAP_HORIZONS }, new Set(THESIS_MANIFEST.map((chapter) => chapter.slug))),
    /maturityId/,
  )
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
