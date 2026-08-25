import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { PUBLIC_CITATIONS } from '../content/chainfren-thesis/citations.mjs'
import { THESIS_CLAIMS } from '../content/chainfren-thesis/claims.mjs'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const thesisRoot = resolve(root, 'content/chainfren-thesis')
const chapter = (name) => readFileSync(resolve(thesisRoot, 'chapters', name), 'utf8')

const chapters = {
  gap: chapter('01-the-gap.mdx'),
  trap: chapter('02-the-trap.mdx'),
  unlock: chapter('03-the-unlock.mdx'),
  thesis: chapter('04-the-thesis.mdx'),
  company: chapter('05-the-company.mdx'),
  products: chapter('06-what-we-build.mdx'),
  ownership: chapter('07-how-we-work.mdx'),
  horizon: chapter('08-the-road-ahead.mdx'),
  invitation: chapter('09-build-with-us.mdx'),
}

const assertNames = (source, terms) => {
  for (const term of terms) assert.match(source, new RegExp(`\\b${term}\\b`, 'i'))
}

const manuscriptPaths = [
  resolve(thesisRoot, 'short-read.mdx'),
  ...[
    '01-the-gap.mdx',
    '02-the-trap.mdx',
    '03-the-unlock.mdx',
    '04-the-thesis.mdx',
    '05-the-company.mdx',
    '06-what-we-build.mdx',
    '07-how-we-work.mdx',
    '08-the-road-ahead.mdx',
    '09-build-with-us.mdx',
  ].map((name) => resolve(thesisRoot, 'chapters', name)),
]

// Future entries must map an exact claim ID to its file and complete claim text.
// The claim must also resolve to a dated record in PUBLIC_CITATIONS before a numeral is allowed.
const NUMERAL_CLAIM_EXCEPTIONS = new Map()

const hasDatedPublicCitation = (claimId, claims, citations) => {
  const claim = claims.find(({ id }) => id === claimId)
  if (!claim) return false
  return claim.publicCitationIds.some((citationId) => citations.some((citation) => (
    citation.id === citationId
    && citation.claimIds.includes(claimId)
    && /^\d{4}-\d{2}-\d{2}$/.test(citation.publishedAt)
    && /^https:\/\//.test(citation.url)
  )))
}

const scanManuscriptNumerals = ({
  manuscriptRecords = manuscriptPaths.map((path) => ({ path, text: readFileSync(path, 'utf8') })),
  claimCitationExceptions = NUMERAL_CLAIM_EXCEPTIONS,
  claims = THESIS_CLAIMS,
  citations = PUBLIC_CITATIONS,
} = {}) => manuscriptRecords.flatMap(({ path, text }) => {
  let textWithoutCitedClaims = text
  for (const [claimId, exception] of claimCitationExceptions) {
    const claim = claims.find(({ id }) => id === claimId)
    const isExactCitedClaim = exception.path === path
      && exception.exactClaimText === claim?.summary
      && hasDatedPublicCitation(claimId, claims, citations)
    if (isExactCitedClaim) {
      textWithoutCitedClaims = textWithoutCitedClaims.replace(exception.exactClaimText, '')
    }
  }
  return /\d/.test(textWithoutCitedClaims)
    ? [`${path} contains a numeral without an exact claim-level dated public citation`]
    : []
})

test('the gap names every contributor to African attention', () => {
  assertNames(chapters.gap, ['creators', 'brands', 'audiences'])
  assert.match(chapters.gap, /African attention/i)
  assert.match(chapters.gap, /African control/i)
})

test('the trap describes extraction as a system, wherever it is based', () => {
  assertNames(chapters.trap, ['platforms', 'middlemen', 'systems'])
  assert.match(chapters.trap, /extract\w*/i)
  assert.match(chapters.trap, /foreign or African/i)
  assertNames(chapters.trap, ['discovery', 'identity', 'data', 'relationships', 'distribution', 'payment'])
  assert.match(chapters.trap, /(?:does not|doesn't|need not|requires? no)\s+(?:require\s+)?bad (?:individual )?intent/i)
})

test('the unlock gives blockchain a practical and non-speculative purpose', () => {
  assert.match(chapters.unlock.split(/\n\s*\n/, 1)[0], /blockchain/i)
  assertNames(chapters.unlock, ['payments', 'identity', 'participation', 'settlement', 'portability'])
  assert.match(chapters.unlock, /transparent settlement/i)
  assert.match(chapters.unlock, /speculation is not (?:the )?(?:purpose|mission)/i)
  assertNames(chapters.unlock, ['devices', 'payment', 'languages', 'communities'])
})

test('the thesis states the mission and defines custodianship', () => {
  assert.match(chapters.thesis, /Chainfren exists to enable Africans to own the full value their attention generates on the internet\./i)
  assertNames(chapters.thesis, ['identity', 'relationships', 'data', 'distribution', 'participation', 'economic value'])
  assert.match(chapters.thesis, /right to leave/i)
})

test('the mission is presented as work to do, not an achieved ownership outcome', () => {
  const target = Object.values(chapters).join('\n')
  assert.doesNotMatch(target, /(?:Africans?|creators?|brands?|audiences?|communities?|people|we)\s+(?:already|now|currently)\s+(?:own|owns|control|controls|have ownership)/i)
  assert.doesNotMatch(target, /ownership\s+(?:is|has been)\s+(?:achieved|complete|completed|secured)/i)
})

test('the numeral scanner rejects a synthetic numeral without a cited exception', () => {
  assert.deepEqual(scanManuscriptNumerals({
    manuscriptRecords: [{ path: 'synthetic.mdx', text: 'The claim reaches seven markets and grew by 2 percent.' }],
  }), ['synthetic.mdx contains a numeral without an exact claim-level dated public citation'])
})

test('a numeral exception without a dated public citation still fails', () => {
  const exactClaimText = 'The claim reaches seven markets and grew by 2 percent.'
  assert.deepEqual(scanManuscriptNumerals({
    manuscriptRecords: [{ path: 'synthetic.mdx', text: exactClaimText }],
    claimCitationExceptions: new Map([['missing-claim', { path: 'synthetic.mdx', exactClaimText }]]),
  }), ['synthetic.mdx contains a numeral without an exact claim-level dated public citation'])
})

test('a cited numeral claim cannot hide an uncited numeral claim on the same line', () => {
  const citedClaimText = 'The cited claim reaches 2 markets.'
  const manuscriptLine = `${citedClaimText} The uncited claim reaches 3 markets.`
  assert.deepEqual(scanManuscriptNumerals({
    manuscriptRecords: [{ path: 'synthetic.mdx', text: manuscriptLine }],
    claimCitationExceptions: new Map([['cited-claim', { path: 'synthetic.mdx', exactClaimText: citedClaimText }]]),
    claims: [{ id: 'cited-claim', summary: citedClaimText, publicCitationIds: ['cited-source'] }],
    citations: [{
      id: 'cited-source',
      claimIds: ['cited-claim'],
      publishedAt: '2026-08-26',
      url: 'https://example.com/cited-source',
    }],
  }), ['synthetic.mdx contains a numeral without an exact claim-level dated public citation'])
})

test('an exact cited numeral claim is allowed when no uncited numeral remains', () => {
  const citedClaimText = 'The cited claim reaches 2 markets.'
  assert.deepEqual(scanManuscriptNumerals({
    manuscriptRecords: [{ path: 'synthetic.mdx', text: citedClaimText }],
    claimCitationExceptions: new Map([['cited-claim', { path: 'synthetic.mdx', exactClaimText: citedClaimText }]]),
    claims: [{ id: 'cited-claim', summary: citedClaimText, publicCitationIds: ['cited-source'] }],
    citations: [{
      id: 'cited-source',
      claimIds: ['cited-claim'],
      publishedAt: '2026-08-26',
      url: 'https://example.com/cited-source',
    }],
  }), [])
})

test('the public manuscript contains no uncited numeral claims', () => {
  assert.deepEqual(scanManuscriptNumerals(), [])
})

test('the company thesis explains its distribution-first public loop in order', () => {
  assert.match(chapters.company, /distribution-first/i)
  const sabi = chapters.company.indexOf('Sabi')
  const creatorNetwork = chapters.company.indexOf('Creator Network')
  const tivi = chapters.company.indexOf('TiVi')
  assert.ok(sabi >= 0 && sabi < creatorNetwork && creatorNetwork < tivi)
})

test('the product thesis renders the public product groups instead of one flat maturity list', () => {
  assert.match(chapters.products, /import\s*{[^}]*PUBLIC_PRODUCT_GROUPS[^}]*PUBLIC_PRODUCT_MATURITY[^}]*PUBLIC_INITIATIVE_MATURITY[^}]*}/s)
  assert.match(chapters.products, /PUBLIC_PRODUCT_GROUPS\.map/)
  assert.doesNotMatch(chapters.products, /PUBLIC_PRODUCT_MATURITY\.map/)
})

test('the visible product thesis follows the public product group order', () => {
  const visibleProducts = chapters.products.replace(/^import .*$/gm, '')
  const labels = ['TiVi', 'Star Factor', 'Sabi', 'Creator Network', 'Creator Growth OS', 'Community Engine', 'AI Agent Studio', 'Indy']
  const positions = labels.map((label) => visibleProducts.indexOf(label))
  assert.ok(positions.every((position) => position >= 0))
  assert.deepEqual([...positions].sort((a, b) => a - b), positions)
})

test('the product thesis states each product role and maturity without overstating availability', () => {
  assert.match(chapters.products, /TiVi[^.]*flagship|flagship[^.]*TiVi/i)
  assert.match(chapters.products, /Media Launchpad[^.]*TiVi|TiVi[^.]*Media Launchpad/i)
  assert.match(chapters.products, /Star Factor[^.]*currently being built|currently being built[^.]*Star Factor/i)
  assert.doesNotMatch(chapters.products, /Star Factor[^.]*\b(?:launched|live|available|later)\b/i)
  assert.match(chapters.products, /Sabi[^.]*Creator Network[^.]*supporting distribution products/i)
  assert.match(chapters.products, /Creator Growth OS[^.]*Community Engine[^.]*AI Agent Studio[^.]*additional capabilities/i)
  assert.match(chapters.products, /Indy[^.]*roadmap product[^.]*not currently available/i)
})

test('the ownership test includes portability and the right to leave', () => {
  assert.match(chapters.ownership, /portability/i)
  assert.match(chapters.ownership, /right to leave/i)
  assert.match(chapters.ownership, /Chainfren[^.]*same ownership test/i)
})

test('the public horizon separates present building, roadmap direction, and company ambition', () => {
  assert.match(chapters.horizon, /## Present building[\s\S]*## Roadmap direction[\s\S]*## Company ambition/i)
  assert.match(chapters.horizon, /Star Factor[^.]*being built/i)
  assert.match(chapters.horizon, /Indy[^.]*roadmap/i)
})

test('the closing chapter gives all participants one shared invitation', () => {
  assertNames(chapters.invitation, ['creators', 'brands', 'audiences', 'builders', 'partners', 'investors', 'potential hires'])
  assert.match(chapters.invitation, /shared invitation/i)
  assert.doesNotMatch(chapters.invitation, /PUBLIC_CTAS|\.map\(/)
})
