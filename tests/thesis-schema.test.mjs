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
  ['open-rails', 'the-unlock', 'mechanism'],
  ['distribution-first', 'the-company', 'execution'],
  ['attention-to-participation', 'the-thesis', 'mechanism'],
  ['participation-to-ownership', 'the-thesis', 'mission'],
  ['ownership-to-value', 'the-thesis', 'outcome'],
  ['chainfren-mission', 'the-company', 'mission'],
  ['tivi-product', 'what-we-build', 'execution'],
  ['african-built-ecosystem', 'the-road-ahead', 'outcome'],
]

const canonicalEdgeRows = [
  ['extractive-systems', 'african-value-gap', 'causes'],
  ['extractive-systems', 'rented-relationships', 'causes'],
  ['rented-relationships', 'african-attention-value', 'constrains'],
  ['african-attention-value', 'attention-to-participation', 'enables'],
  ['open-rails', 'participation-to-ownership', 'enables'],
  ['distribution-first', 'attention-to-participation', 'enables'],
  ['attention-to-participation', 'participation-to-ownership', 'enables'],
  ['participation-to-ownership', 'ownership-to-value', 'enables'],
  ['ownership-to-value', 'african-built-ecosystem', 'enables'],
  ['chainfren-mission', 'distribution-first', 'enables'],
  ['chainfren-mission', 'tivi-product', 'enables'],
  ['tivi-product', 'participation-to-ownership', 'enables'],
  ['open-rails', 'tivi-product', 'enables'],
  ['distribution-first', 'tivi-product', 'enables'],
  ['tivi-product', 'ownership-to-value', 'enables'],
]

const findClaim = (claims, id) => {
  const claim = claims.find((candidate) => candidate.id === id)
  assert.ok(claim, `Missing canonical claim ${id}`)
  return claim
}

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
  assert.equal(THESIS_CLAIMS.find(({ id }) => id === 'open-rails')?.title, 'Open rails enabled by blockchain')
  assert.equal(THESIS_CLAIMS.find(({ id }) => id === 'tivi-product')?.title, 'TiVi gives participation a product home')
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
  findClaim(wrongChapter, 'tivi-product').chapterSlug = 'the-road-ahead'
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
  findClaim(separateTiVi, 'tivi-product').summary = 'TiVi is a flagship product.'
  assert.throws(() => validate(separateTiVi), /media channel/)

  for (const overstatement of ['TiVi has launched.', 'TiVi adoption is complete.']) {
    const overstatedTiVi = THESIS_CLAIMS.map((claim) => ({ ...claim }))
    findClaim(overstatedTiVi, 'tivi-product').summary = `TiVi gives participation a product home. ${overstatement}`
    assert.throws(() => validate(overstatedTiVi), /adoption or launch/)
  }

  const vagueBlockchain = THESIS_CLAIMS.map((claim) => ({ ...claim }))
  findClaim(vagueBlockchain, 'open-rails').summary = 'Blockchain may help with payments.'
  assert.throws(() => validate(vagueBlockchain), /open rails/)

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
  assert(THESIS_MANIFEST.every(({ updatedAt }) => updatedAt === '2026-08-26'))
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
  wrongOwner.find(({ slug }) => slug === 'the-gap').mapClaimIds[0] = 'tivi-product'
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
    id: 'tivi', title: 'TiVi', summary: 'A media channel where participation and audience relationships can continue.', maturity: 'live', maturityId: 'media-launchpad', href: '/products/media-launchpad',
  })
  assert.deepEqual(VALUE_PATH.map((item) => item.id), ['attention', 'participation', 'ownership', 'value'])
  assert.equal(ROADMAP_HORIZONS.length, 4)
  assert(DISTRIBUTION_LOOP.every((item) => item.href))
  assert(VALUE_PATH.every((item) => item.href))
  assert(ROADMAP_HORIZONS.every((item) => item.href))
  assert.match(DISTRIBUTION_LOOP.find(({ id }) => id === 'star-factor').summary, /development/i)
  assert.match(ROADMAP_HORIZONS.map(({ summary }) => summary).join(' '), /Indy[^.]*longer direction/i)
})

test('public system validation keeps Star Factor in development and Indy as a longer direction', () => {
  const withoutDevelopment = { DISTRIBUTION_LOOP: DISTRIBUTION_LOOP.map((item) => ({ ...item })), VALUE_PATH, ROADMAP_HORIZONS }
  withoutDevelopment.DISTRIBUTION_LOOP.find(({ id }) => id === 'star-factor').summary = 'An audience participation product.'
  assert.throws(() => validatePublicSystem(withoutDevelopment, new Set(THESIS_MANIFEST.map(({ slug }) => slug))), /Star Factor.*development/)

  const withoutDirection = { DISTRIBUTION_LOOP, VALUE_PATH, ROADMAP_HORIZONS: ROADMAP_HORIZONS.map((item) => ({ ...item })) }
  withoutDirection.ROADMAP_HORIZONS.find(({ id }) => id === 'compounding-value').summary = 'Build toward durable value on open rails.'
  assert.throws(() => validatePublicSystem(withoutDirection, new Set(THESIS_MANIFEST.map(({ slug }) => slug))), /Indy.*longer direction/)
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
  assert.deepEqual(Object.fromEntries([...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY].map(({ id, maturity }) => [id, maturity])), {
    'media-launchpad': 'live',
    'creator-growth-os': 'live',
    'creator-network': 'live',
    'community-engine': 'early-access',
    'ai-agent-studio': 'early-access',
    'star-factor': 'building',
    sabi: 'building',
    indy: 'directional',
  })
  assert.doesNotThrow(() => validateStages([...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]))
  const altered = [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY].map((item) => ({ ...item }))
  altered[0].maturity = 'early-access'
  assert.throws(() => validateStages(altered), /required mapping/)
})

test('defines the exact public product hierarchy', () => {
  assert.deepEqual(PUBLIC_PRODUCT_GROUPS, [
    { id: 'live', label: 'Live', itemIds: ['media-launchpad', 'creator-growth-os', 'creator-network'] },
    { id: 'early-access', label: 'Early access', itemIds: ['community-engine', 'ai-agent-studio'] },
    { id: 'building', label: 'Building', itemIds: ['star-factor', 'sabi'] },
    { id: 'roadmap', label: 'Roadmap', itemIds: ['indy'] },
  ])
  for (const label of [
    ...PUBLIC_PRODUCT_GROUPS.map(({ label }) => label),
    ...[...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY].map(({ label }) => label),
  ]) assert.doesNotMatch(label, /Media Launchpad|flagship|live core/i)
  assert.doesNotThrow(() => validateProductGroups(PUBLIC_PRODUCT_GROUPS, [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]))
})

test('rejects invalid public product group membership and ordering', () => {
  const records = [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]
  const clone = () => PUBLIC_PRODUCT_GROUPS.map((group) => ({ ...group, itemIds: [...group.itemIds] }))

  const duplicate = clone()
  duplicate[1].itemIds[0] = 'media-launchpad'
  assert.throws(() => validateProductGroups(duplicate, records), /unique membership/)

  const missing = clone()
  missing[3].itemIds = []
  assert.throws(() => validateProductGroups(missing, records), /complete coverage/)

  const changedGroupOrder = clone()
  ;[changedGroupOrder[0], changedGroupOrder[1]] = [changedGroupOrder[1], changedGroupOrder[0]]
  assert.throws(() => validateProductGroups(changedGroupOrder, records), /group order/)

  const changedItemOrder = clone()
  changedItemOrder[2].itemIds.reverse()
  assert.throws(() => validateProductGroups(changedItemOrder, records), /item order/)

  const unknown = clone()
  unknown[3].itemIds[0] = 'unknown-product'
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
