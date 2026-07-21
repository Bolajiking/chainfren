export const STAGES = new Set(['live', 'live-core', 'early-access', 'building', 'directional', 'later'])
export const CLAIM_TYPES = new Set(['context', 'diagnosis', 'mechanism', 'mission', 'distribution', 'proof', 'execution', 'outcome'])
export const RELATIONS = new Set(['causes', 'constrains', 'enables', 'demonstrates', 'compounds'])

export const assertUnique = (records, key, label) => {
  const seen = new Set()
  for (const record of records) {
    if (!record?.[key]) throw new Error(`${label} requires ${key}`)
    if (seen.has(record[key])) throw new Error(`Duplicate ${label} ${key}: ${record[key]}`)
    seen.add(record[key])
  }
}

const assert = (condition, message) => { if (!condition) throw new Error(message) }
const isDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
const isRoute = (value) => typeof value === 'string' && (value.startsWith('/') || /^https:\/\//.test(value))

export function validateManifest(manifest) {
  assert(Array.isArray(manifest) && manifest.length === 9, 'Manifest requires exactly 9 chapters')
  assertUnique(manifest, 'id', 'chapter')
  assertUnique(manifest, 'slug', 'chapter')
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
  claims.forEach((claim) => {
    for (const key of ['title', 'summary', 'type', 'chapterSlug']) assert(typeof claim[key] === 'string' && claim[key], `Claim ${claim.id} requires ${key}`)
    assert(CLAIM_TYPES.has(claim.type), `Claim ${claim.id} has invalid type ${claim.type}`)
    assert(chapterSlugs.has(claim.chapterSlug), `Claim ${claim.id} references unknown chapter ${claim.chapterSlug}`)
    assert(Array.isArray(claim.publicCitationIds), `Claim ${claim.id} requires publicCitationIds`)
    claim.publicCitationIds.forEach((id) => assert(citationIds.has(id), `Claim ${claim.id} references unknown citation ${id}`))
  })
}

const canonicalRows = [
  ['african-value-gap', 'owned-value-outcome', 'constrains'], ['attract-then-extract', 'rented-audience-relationship', 'causes'], ['rented-audience-relationship', 'attention-to-ownership', 'constrains'], ['open-economic-rails', 'attention-to-ownership', 'enables'], ['african-cultural-attention', 'attention-to-ownership', 'enables'], ['attention-to-ownership', 'chainfren-mission', 'enables'], ['chainfren-mission', 'sabi-attention', 'enables'], ['chainfren-mission', 'creator-network-distribution', 'enables'], ['chainfren-mission', 'products-owned-infrastructure', 'enables'], ['sabi-attention', 'creator-network-distribution', 'enables'], ['creator-network-distribution', 'star-factor-proof', 'enables'], ['star-factor-proof', 'attention-to-ownership', 'demonstrates'], ['products-owned-infrastructure', 'owned-value-outcome', 'enables'], ['creator-network-distribution', 'owned-value-outcome', 'enables'], ['attention-to-ownership', 'owned-value-outcome', 'enables'],
]
const edgeKey = ({ from, to, relation }) => `${from}:${relation}:${to}`

export function validateEdges(edges, claimIds) {
  assert(Array.isArray(edges) && edges.length === canonicalRows.length, 'Edges require the exact canonical set')
  assertUnique(edges, 'id', 'edge')
  const expected = new Set(canonicalRows.map(([from, to, relation]) => `${from}:${relation}:${to}`))
  edges.forEach((edge) => {
    assert(claimIds.has(edge.from) && claimIds.has(edge.to), `Edge ${edge.id} references an unknown claim`)
    assert(RELATIONS.has(edge.relation), `Edge ${edge.id} has invalid relation ${edge.relation}`)
    assert(edge.id === edgeKey(edge), `Edge has unstable ID ${edge.id}`)
    assert(expected.delete(edgeKey(edge)), `Unexpected edge ${edgeKey(edge)}`)
  })
  assert(expected.size === 0, 'Edges are missing canonical rows')
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
  const validateDestination = (href, label) => {
    assert(isRoute(href), `${label} requires a route`)
    if (href.startsWith('/thesis/')) assert(chapterSlugs.has(href.slice('/thesis/'.length)), `${label} references an unknown chapter`)
  }
  const requireSequence = (records, ids, label) => {
    assert(Array.isArray(records) && JSON.stringify(records.map((item) => item.id)) === JSON.stringify(ids), `${label} has an invalid sequence`)
    records.forEach((item) => { assert(typeof item.title === 'string' && typeof item.summary === 'string', `${label} ${item.id} requires text`); if (item.href) validateDestination(item.href, `${label} ${item.id}`); if (item.maturity) assert(STAGES.has(item.maturity), `${label} ${item.id} has invalid maturity`) })
  }
  requireSequence(system.DISTRIBUTION_LOOP, ['sabi', 'creator-network', 'star-factor', 'products-and-solutions'], 'Distribution loop')
  requireSequence(system.VALUE_PATH, ['attention', 'participation', 'ownership', 'value'], 'Value path')
  assert(Array.isArray(system.ROADMAP_HORIZONS) && system.ROADMAP_HORIZONS.length === 4, 'Roadmap requires exactly four horizons')
  system.ROADMAP_HORIZONS.forEach((item) => { assert(typeof item.id === 'string' && typeof item.title === 'string' && typeof item.summary === 'string', 'Roadmap horizon requires id and text'); validateDestination(item.href, `Roadmap horizon ${item.id}`) })
}

export function validateStages(records) {
  records.forEach((record) => { assert(typeof record.id === 'string' && typeof record.label === 'string' && STAGES.has(record.maturity) && isRoute(record.href), `Invalid public maturity record ${record.id}`) })
}

export function validateReferences(manifest, claims, citations) {
  const claimIds = new Set(claims.map((claim) => claim.id))
  const citationIds = new Set(citations.map((citation) => citation.id))
  manifest.forEach((chapter) => { chapter.mapClaimIds.forEach((id) => assert(claimIds.has(id), `Chapter ${chapter.slug} references unknown claim ${id}`)); chapter.publicCitationIds.forEach((id) => assert(citationIds.has(id), `Chapter ${chapter.slug} references unknown citation ${id}`)) })
}
