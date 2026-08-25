import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { PUBLIC_CITATIONS } from '../content/chainfren-thesis/citations.mjs'
import { THESIS_CLAIMS } from '../content/chainfren-thesis/claims.mjs'

const root = resolve(new URL('..', import.meta.url).pathname)
const thesisRoot = resolve(root, 'content/chainfren-thesis')
const chapter = (name) => readFileSync(resolve(thesisRoot, 'chapters', name), 'utf8')

const chapters = {
  gap: chapter('01-the-gap.mdx'),
  trap: chapter('02-the-trap.mdx'),
  unlock: chapter('03-the-unlock.mdx'),
  thesis: chapter('04-the-thesis.mdx'),
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
  const hasUncitedNumeral = text.split('\n').some((line) => (
    /\d/.test(line)
    && ![...claimCitationExceptions].some(([claimId, exception]) => (
      exception.path === path
      && exception.exactClaimText === line.trim()
      && hasDatedPublicCitation(claimId, claims, citations)
    ))
  ))
  return hasUncitedNumeral
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

test('the public manuscript contains no uncited numeral claims', () => {
  assert.deepEqual(scanManuscriptNumerals(), [])
})
