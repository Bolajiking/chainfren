export const STAGES = new Set(['live', 'live-core', 'early-access', 'building', 'directional', 'later'])
export const CLAIM_TYPES = new Set(['context', 'diagnosis', 'mechanism', 'mission', 'execution', 'outcome'])
export const RELATIONS = new Set(['causes', 'constrains', 'enables'])
export const PUBLIC_DESTINATIONS = {
  distribution: { sabi: '/sabi', 'creator-network': '/creator-network', tivi: '/products/media-launchpad', 'additional-capabilities': '/products', 'star-factor': '/thesis/read/the-road-ahead' },
  value: { attention: '/thesis/read/the-gap', participation: '/thesis/read/the-unlock', ownership: '/thesis/read/the-thesis', value: '/thesis/read/the-road-ahead' },
  horizon: { foundation: '/products', distribution: '/contact', participation: '/thesis/read/the-road-ahead', 'compounding-value': '/thesis/read/the-thesis' },
  maturity: { 'media-launchpad': '/products/media-launchpad', 'creator-growth-os': '/products/creator-growth-os', 'community-engine': '/products/community-engine', 'ai-agent-studio': '/products/ai-agent-studio', 'creator-network': '/creator-network', sabi: '/sabi', 'star-factor': '/thesis/read/the-road-ahead', indy: '/thesis/read/the-road-ahead' },
}

export const assertUnique = (records, key, label) => {
  const seen = new Set()
  for (const record of records) {
    if (!record?.[key]) throw new Error(`${label} requires ${key}`)
    if (seen.has(record[key])) throw new Error(`Duplicate ${label} ${key}: ${record[key]}`)
    seen.add(record[key])
  }
}

const assert = (condition, message) => { if (!condition) throw new Error(message) }
const isDate = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return false
  const [year, month, day] = match.slice(1).map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}
const isRoute = (value) => typeof value === 'string' && (value.startsWith('/') || /^https:\/\//.test(value))

export function validateManifest(manifest) {
  assert(Array.isArray(manifest) && manifest.length === 9, 'Manifest requires exactly 9 chapters')
  assertUnique(manifest, 'id', 'chapter')
  assertUnique(manifest, 'slug', 'chapter')
  const canonicalSlugs = ['the-gap', 'the-trap', 'the-unlock', 'the-thesis', 'the-company', 'what-we-build', 'how-we-work', 'the-road-ahead', 'build-with-us']
  assert(JSON.stringify(manifest.map((chapter) => chapter.slug)) === JSON.stringify(canonicalSlugs), 'Manifest requires the canonical slug order')
  manifest.forEach((chapter, index) => {
    assert(chapter.id === String(index + 1).padStart(2, '0'), `Chapter order must use ID ${String(index + 1).padStart(2, '0')}`)
    for (const key of ['slug', 'title', 'summary', 'lens', 'updatedAt']) assert(typeof chapter[key] === 'string' && chapter[key], `Chapter ${chapter.id} requires ${key}`)
    assert(Number.isInteger(chapter.readingMinutes) && chapter.readingMinutes > 0, `Chapter ${chapter.id} requires readingMinutes`)
    assert(Array.isArray(chapter.mapClaimIds) && Array.isArray(chapter.publicCitationIds), `Chapter ${chapter.id} requires reference arrays`)
    assert(isDate(chapter.updatedAt), `Chapter ${chapter.id} has invalid updatedAt`)
  })
}

export function validateCitations(citations, claimIds) {
  assert(Array.isArray(citations), 'Citations must be an array')
  assertUnique(citations, 'id', 'citation')
  citations.forEach((citation) => {
    for (const key of ['title', 'publisher', 'url', 'publishedAt', 'accessedAt']) assert(typeof citation[key] === 'string' && citation[key], `Citation ${citation.id} requires ${key}`)
    assert(/^https:\/\//.test(citation.url), `Citation ${citation.id} requires an HTTPS URL`)
    assert(isDate(citation.publishedAt) && isDate(citation.accessedAt), `Citation ${citation.id} requires ISO dates`)
    assert(Array.isArray(citation.claimIds), `Citation ${citation.id} requires claimIds`)
    citation.claimIds.forEach((id) => assert(claimIds.has(id), `Citation ${citation.id} references unknown claim ${id}`))
  })
}

export function validateClaims(claims, chapterSlugs, citationIds) {
  assert(Array.isArray(claims) && claims.length === 12, 'Claims require exactly 12 records')
  assertUnique(claims, 'id', 'claim')
  assertUnique(claims, 'order', 'claim')
  const canonicalClaimRows = [
    ['african-attention-value', 'the-gap', 'context'], ['african-value-gap', 'the-gap', 'diagnosis'],
    ['extractive-systems', 'the-trap', 'diagnosis'], ['rented-relationships', 'the-trap', 'diagnosis'],
    ['blockchain-open-rails', 'the-unlock', 'mechanism'], ['distribution-first', 'the-company', 'execution'],
    ['attention-to-participation', 'the-thesis', 'mechanism'], ['participation-to-ownership', 'the-thesis', 'mission'],
    ['ownership-to-value', 'the-thesis', 'outcome'], ['chainfren-mission', 'the-company', 'mission'],
    ['tivi-flagship', 'what-we-build', 'execution'], ['african-built-ecosystem', 'the-road-ahead', 'outcome'],
  ]
  assert(JSON.stringify(claims.map(({ id, chapterSlug, type }) => [id, chapterSlug, type])) === JSON.stringify(canonicalClaimRows), 'Claims require the canonical claim rows and order')
  assert(claims.every((claim, index) => claim.order === index + 1), 'Claims require the canonical claim order numbers')
  claims.forEach((claim) => {
    for (const key of ['title', 'summary', 'type', 'chapterSlug']) assert(typeof claim[key] === 'string' && claim[key], `Claim ${claim.id} requires ${key}`)
    assert(CLAIM_TYPES.has(claim.type), `Claim ${claim.id} has invalid type ${claim.type}`)
    assert(chapterSlugs.has(claim.chapterSlug), `Claim ${claim.id} references unknown chapter ${claim.chapterSlug}`)
    assert(Array.isArray(claim.publicCitationIds), `Claim ${claim.id} requires publicCitationIds`)
    assert(!/proof/i.test(`${claim.id} ${claim.title}`), `Claim ${claim.id} must not use proof framing`)
    claim.publicCitationIds.forEach((id) => assert(citationIds.has(id), `Claim ${claim.id} references unknown citation ${id}`))
  })
}

const canonicalRows = [
  ['extractive-systems', 'african-value-gap', 'causes'], ['extractive-systems', 'rented-relationships', 'causes'],
  ['rented-relationships', 'african-attention-value', 'constrains'], ['african-attention-value', 'attention-to-participation', 'enables'],
  ['blockchain-open-rails', 'participation-to-ownership', 'enables'], ['distribution-first', 'attention-to-participation', 'enables'],
  ['attention-to-participation', 'participation-to-ownership', 'enables'], ['participation-to-ownership', 'ownership-to-value', 'enables'],
  ['ownership-to-value', 'african-built-ecosystem', 'enables'], ['chainfren-mission', 'distribution-first', 'enables'],
  ['chainfren-mission', 'tivi-flagship', 'enables'], ['tivi-flagship', 'participation-to-ownership', 'enables'],
  ['blockchain-open-rails', 'tivi-flagship', 'enables'], ['distribution-first', 'tivi-flagship', 'enables'],
  ['tivi-flagship', 'ownership-to-value', 'enables'],
]
const edgeKey = ({ from, to, relation }) => `${from}:${relation}:${to}`

export function validateEdges(edges, claimIds) {
  assert(Array.isArray(edges) && edges.length === canonicalRows.length, 'Edges require the exact canonical set')
  assertUnique(edges, 'id', 'edge')
  edges.forEach((edge) => {
    assert(claimIds.has(edge.from) && claimIds.has(edge.to), `Edge ${edge.id} references an unknown claim`)
  })
  assert(JSON.stringify(edges.map(({ from, to, relation }) => [from, to, relation])) === JSON.stringify(canonicalRows), 'Edges require the canonical edge order')
  edges.forEach((edge) => {
    assert(RELATIONS.has(edge.relation), `Edge ${edge.id} has invalid relation ${edge.relation}`)
    assert(edge.id === edgeKey(edge), `Edge has unstable ID ${edge.id}`)
  })
}

export function validateLayout(layout, claimIds) {
  const ids = Object.keys(layout)
  assert(ids.length === claimIds.size && ids.every((id) => claimIds.has(id)), 'Layout must cover every and only claim')
  ids.forEach((id) => { assert(Number.isFinite(layout[id].x) && Number.isFinite(layout[id].y), `Layout ${id} requires numeric x and y`) })
}

export function validateCtas(ctas) {
  const expected = ['creators', 'brands', 'partners', 'talent', 'executives', 'supporters']
  const routes = { creators: '/for-creators', brands: '/for-brands', partners: '/contact', talent: '/contact', executives: '/contact', supporters: '/sabi' }
  assert(JSON.stringify(Object.keys(ctas)) === JSON.stringify(expected), 'CTA keys must match the public contract')
  Object.entries(ctas).forEach(([key, cta]) => { assert(typeof cta.label === 'string' && cta.label && isRoute(cta.href), `CTA ${key} requires label and route`); assert(cta.href === routes[key], `CTA ${key} has an invalid route`) })
}

export function validatePublicSystem(system, chapterSlugs = new Set()) {
  const validateDestination = (href, label, expectedHref) => {
    assert(isRoute(href), `${label} requires a route`)
    assert(href === expectedHref, `${label} requires an approved destination`)
    if (href.startsWith('/thesis/read/')) assert(chapterSlugs.has(href.slice('/thesis/read/'.length)), `${label} references an unknown chapter`)
  }
  const requireSequence = (records, ids, label, destinations) => {
    assert(Array.isArray(records) && JSON.stringify(records.map((item) => item.id)) === JSON.stringify(ids), `${label} has an invalid sequence`)
    records.forEach((item) => { assert(typeof item.title === 'string' && typeof item.summary === 'string', `${label} ${item.id} requires text`); validateDestination(item.href, `${label} ${item.id}`, destinations[item.id]); if (item.maturity) assert(STAGES.has(item.maturity), `${label} ${item.id} has invalid maturity`) })
  }
  requireSequence(system.DISTRIBUTION_LOOP, ['sabi', 'creator-network', 'tivi', 'additional-capabilities', 'star-factor'], 'Distribution loop', PUBLIC_DESTINATIONS.distribution)
  const tivi = system.DISTRIBUTION_LOOP.find((item) => item.id === 'tivi')
  assert(tivi.maturityId === 'media-launchpad', 'Distribution loop TiVi requires maturityId media-launchpad')
  const starFactor = system.DISTRIBUTION_LOOP.find((item) => item.id === 'star-factor')
  assert(/development/i.test(starFactor.summary), 'Distribution loop Star Factor must remain in development')
  requireSequence(system.VALUE_PATH, ['attention', 'participation', 'ownership', 'value'], 'Value path', PUBLIC_DESTINATIONS.value)
  assert(Array.isArray(system.ROADMAP_HORIZONS) && system.ROADMAP_HORIZONS.length === 4, 'Roadmap requires exactly four horizons')
  const privateHorizonPattern = /\b(?:\d{4}|Q[1-4]|quarter|budget|targets?|metrics?|runway|signed\s+revenue|decision-rights|control\s+matrix|risk\s+register)\b/i
  system.ROADMAP_HORIZONS.forEach((item) => { assert(typeof item.id === 'string' && typeof item.title === 'string' && typeof item.summary === 'string', 'Roadmap horizon requires id and text'); assert(!privateHorizonPattern.test(`${item.title} ${item.summary}`), `Roadmap horizon ${item.id} contains private operational content`); validateDestination(item.href, `Roadmap horizon ${item.id}`, PUBLIC_DESTINATIONS.horizon[item.id]) })
  const directionalHorizon = system.ROADMAP_HORIZONS.find((item) => item.id === 'compounding-value')
  assert(/Indy[\s\S]*directional/i.test(directionalHorizon.summary), 'Roadmap horizon must keep Indy directional')
}

export function validateStages(records) {
  const expected = {
    'media-launchpad': 'early-access', 'creator-growth-os': 'live-core', 'community-engine': 'early-access', 'ai-agent-studio': 'early-access',
    'creator-network': 'live', sabi: 'building', 'star-factor': 'building', indy: 'directional',
  }
  assert(records.length === Object.keys(expected).length, 'Public maturity records require the exact required mapping')
  assertUnique(records, 'id', 'public maturity')
  records.forEach((record) => { assert(typeof record.id === 'string' && typeof record.label === 'string' && STAGES.has(record.maturity) && isRoute(record.href), `Invalid public maturity record ${record.id}`); assert(expected[record.id] === record.maturity, `Public maturity record ${record.id} violates the required mapping`); assert(record.href === PUBLIC_DESTINATIONS.maturity[record.id], `Public maturity record ${record.id} requires an approved destination`) })
}

export function validateProductGroups(groups, maturityRecords) {
  const expected = [
    { id: 'flagship', label: 'Flagship product', itemIds: ['media-launchpad'] },
    { id: 'in-development', label: 'In development', itemIds: ['star-factor'] },
    { id: 'distribution', label: 'Supporting distribution products', itemIds: ['sabi', 'creator-network'] },
    { id: 'capabilities', label: 'Additional capabilities', itemIds: ['creator-growth-os', 'community-engine', 'ai-agent-studio'] },
    { id: 'roadmap', label: 'Roadmap', itemIds: ['indy'] },
  ]
  assert(Array.isArray(groups), 'Public product groups must be an array')
  assert(Array.isArray(maturityRecords) && maturityRecords.length === 8, 'Public product groups require all eight maturity records')
  assert(JSON.stringify(groups.map((group) => group?.id)) === JSON.stringify(expected.map((group) => group.id)), 'Public product groups require the exact group order')
  maturityRecords.forEach((record, index) => {
    assert(record && typeof record === 'object' && typeof record.id === 'string' && record.id.trim(), `Public maturity record at index ${index} requires a non-empty string id`)
  })
  const maturityIds = new Set(maturityRecords.map((record) => record.id))
  assert(maturityIds.size === 8, 'Public product groups require eight unique maturity records')
  const memberships = []
  groups.forEach((group, index) => {
    assert(group.label === expected[index].label, `Public product group ${group.id} requires the exact label`)
    assert(Array.isArray(group.itemIds), `Public product group ${group.id} requires itemIds`)
    group.itemIds.forEach((itemId) => {
      assert(maturityIds.has(itemId), `Public product group ${group.id} contains unknown item ${itemId}`)
      memberships.push(itemId)
    })
  })
  assert(new Set(memberships).size === memberships.length, 'Public product groups require unique membership')
  assert(memberships.length === maturityIds.size && memberships.every((itemId) => maturityIds.has(itemId)), 'Public product groups require complete coverage of all eight maturity records')
  groups.forEach((group, index) => {
    assert(JSON.stringify(group.itemIds) === JSON.stringify(expected[index].itemIds), `Public product group ${group.id} requires the exact item order`)
  })
}

export function validateReferences(manifest, claims, citations) {
  const claimIds = new Set(claims.map((claim) => claim.id))
  const claimsById = new Map(claims.map((claim) => [claim.id, claim]))
  const citationIds = new Set(citations.map((citation) => citation.id))
  const referencedClaimIds = []
  manifest.forEach((chapter) => {
    chapter.mapClaimIds.forEach((id) => {
      assert(claimIds.has(id), `Chapter ${chapter.slug} references unknown claim ${id}`)
      assert(claimsById.get(id).chapterSlug === chapter.slug, `Claim ${id} belongs to chapter ${claimsById.get(id).chapterSlug}`)
      referencedClaimIds.push(id)
    })
    chapter.publicCitationIds.forEach((id) => assert(citationIds.has(id), `Chapter ${chapter.slug} references unknown citation ${id}`))
  })
  assert(referencedClaimIds.length === claims.length && new Set(referencedClaimIds).size === claims.length, 'Manifest must reference every claim exactly once')
}
