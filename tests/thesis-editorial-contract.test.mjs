import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { PUBLIC_CITATIONS } from '../content/chainfren-thesis/citations.mjs'
import { THESIS_CLAIMS } from '../content/chainfren-thesis/claims.mjs'
import {
  PUBLIC_INITIATIVE_MATURITY,
  PUBLIC_PRODUCT_GROUPS,
  PUBLIC_PRODUCT_MATURITY,
} from '../content/chainfren-thesis/public-config.mjs'

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
const shortRead = readFileSync(resolve(thesisRoot, 'short-read.mdx'), 'utf8')

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

const proseBlocks = (source) => source
  .split(/\n\s*\n/)
  .map((block) => block.trim())
  .filter((block) => block && !/^import\s/.test(block) && !/^\{PUBLIC_PRODUCT_GROUPS\.map/.test(block))
  .map((block) => block.replace(/<[^>]+>/g, ' ').trim())
  .filter(Boolean)

const assertNoAchievedOwnership = (source) => {
  const achievedOwnershipPatterns = [
    /\b(?:Africans|creators?|brands?|audiences?|communities?|people|customers?|builders?|partners?|investors?|potential hires|we)\s+(?:own|owns|control|controls)\s+(?:the\s+)?(?:full value|value\b|(?:their|the)\s+(?:audience relationships?|identity|data))/i,
    /\b(?:creators?|brands?|audiences?|communities?|people|customers?|builders?|partners?|investors?|potential hires|we)\s+(?:already|now|currently)\s+(?:own|owns|control|controls)\b/i,
    /\b(?:Africans?|creators?|brands?|audiences?|communities?|people|customers?|builders?|partners?|investors?|potential hires|we)\s+(?:already\s+|now\s+|currently\s+)?have ownership\b/i,
    /\b(?:Africans?|creators?|brands?|audiences?|communities?|people|customers?|builders?|partners?|investors?|potential hires)\s+have secured ownership\b/i,
    /\bownership\s+(?:is|has been)\s+(?:achieved|complete|completed|secured)\b/i,
  ]
  for (const pattern of achievedOwnershipPatterns) assert.doesNotMatch(source, pattern)
}

const assertPublicCompanyScope = (source) => {
  const privateScopePatterns = [
    /\b(?:financial|revenue|profit|margin|runway|cash flow|valuation)\s+(?:projections?|forecasts?|targets?|goals?|sequencing)\b/i,
    /\brevenue from\b[^.]*\b(?:finance|finances|fund|funds|before|after)\b/i,
    /\b(?:internal|private|confidential)\s+(?:organisation|organization|org chart|operating (?:model|mechanics?|workflow)|mechanics?|workflow|roadmap|sequencing|plan)\b/i,
    /\b(?:tokenomics|token economics|token design|token allocation|token supply|vesting)\b/i,
  ]
  for (const pattern of privateScopePatterns) assert.doesNotMatch(source, pattern)
}

const assertGroupedProductRenderer = (source) => {
  assert.match(source, /import\s*{(?=[^}]*\bPUBLIC_PRODUCT_GROUPS\b)(?=[^}]*\bPUBLIC_PRODUCT_MATURITY\b)(?=[^}]*\bPUBLIC_INITIATIVE_MATURITY\b)[^}]*}\s*from\s*['"]@\/content\/chainfren-thesis\/public-config\.mjs['"]/s)
  assert.match(source, /const\s+records\s*=\s*\[\.\.\.PUBLIC_PRODUCT_MATURITY,\s*\.\.\.PUBLIC_INITIATIVE_MATURITY]/)
  assert.match(source, /PUBLIC_PRODUCT_GROUPS\.map\(\(group\)\s*=>/)
  assert.match(source, /group\.itemIds\.map\(\(itemId\)\s*=>\s*records\.find\(\(record\)\s*=>\s*record\.id\s*===\s*itemId\)\)/)
  assert.match(source, /<section\b[\s\S]*?<ul>[\s\S]*?products\.map\(\(product\)\s*=>[\s\S]*?<li\b[\s\S]*?<a\s+href={product\.href}>{product\.label}<\/a>[\s\S]*?<p>{product\.description}<\/p>[\s\S]*?<MaturityBadge\s+stage={product\.id}\s*\/>[\s\S]*?<\/li>[\s\S]*?<\/ul>[\s\S]*?<\/section>/)
  assert.match(source, /<section\s+key={group\.id}\s+aria-labelledby={`product-group-\${group\.id}`}>/)
  assert.match(source, /const\s+headingLevel\s*=\s*\[['"]chapter['"],\s*['"]product group['"]]\.length/)
  assert.match(source, /<div\s+id={`product-group-\${group\.id}`}\s+role="heading"\s+aria-level={headingLevel}>{group\.label}<\/div>/)
  assert.doesNotMatch(source, /PUBLIC_PRODUCT_MATURITY\.map/)
}

const assertNoHardCodedMaturity = (source) => {
  assert.doesNotMatch(proseBlocks(source).join('\n'), /\b(?:live-core|early-access|building|directional)\b/i)
}

const assertStarFactorBuildingStatus = (source) => {
  const starFactorBlock = proseBlocks(source).find((block) => /Star Factor/i.test(block))
  assert.ok(starFactorBlock, 'Star Factor must have a prose block')
  assert.match(starFactorBlock, /Star Factor[\s\S]*currently being built|currently being built[\s\S]*Star Factor/i)
  const affirmativeStatusClaims = starFactorBlock.replace(/\b(?:is\s+)?not\s+(?:currently\s+)?available\b/gi, '')
  assert.doesNotMatch(affirmativeStatusClaims, /\b(?:launched|live|available|later)\b/i)
}

const assertSabiBuildingStatus = (source) => {
  const blocks = proseBlocks(source)
  const firstSabiBlock = blocks.findIndex((block) => /\bSabi\b/i.test(block))
  assert.notEqual(firstSabiBlock, -1, 'Sabi must have a prose block')
  const sabiText = blocks.slice(firstSabiBlock).join('\n')
  assert.match(sabiText, /\bSabi\s+is\s+being\s+built\b/i)
  assert.doesNotMatch(
    sabiText,
    /\b(?:Sabi|It)\s+(?:gives|offers|provides|operates|publishes|hosts|runs|serves)\b|\b(?:Sabi|It)\s+is\s+(?:live|available|operational|in operation|launched)\b|\b(?:Sabi|It)\s+has\s+launched\b/i,
  )
}

const assertSharedInvitation = (source) => {
  const audiences = ['creators', 'brands', 'audiences', 'builders', 'partners', 'investors', 'potential hires']
  const sharedBlocks = proseBlocks(source).filter((block) => audiences.every((audience) => new RegExp(`\\b${audience}\\b`, 'i').test(block)))
  assert.equal(sharedBlocks.length, 1, 'all audiences must appear together in one invitation block')
  assert.match(sharedBlocks[0], /shared invitation/i)
  assert.doesNotMatch(source, /PUBLIC_CTAS|\.map\(/)
  assert.doesNotMatch(source, /^#{1,6}\s+(?:For\s+)?(?:creators|brands|audiences|builders|partners|investors|potential hires)\b/im)
  const imperativePitchBlocks = proseBlocks(source).filter((block) => /^(?:Join|Build|Invest|Partner|Create|Explore|Start|Bring|Help|Work|Apply)\b/i.test(block))
  assert.ok(imperativePitchBlocks.length <= 1, 'the invitation must not split into repeated pitch blocks')
  const audiencePitchBlocks = proseBlocks(source).filter((block) => /^(?:Creators|Brands|Audiences|Builders|Partners|Investors|Potential hires)\s+(?:get|gets|receive|receives|gain|gains|can|will|have|has)\b/i.test(block))
  assert.ok(audiencePitchBlocks.length <= 1, 'the invitation must not split into per-audience pitch paragraphs')
  assert.equal(source.match(/href=["']\/contact["']/g)?.length ?? 0, 1, 'the shared invitation must have one contact destination')
  assert.match(proseBlocks(source).at(-1), /African-built ownership economy/i)
}

const assertCompanyDistributionThesis = (source) => {
  assert.match(source, /distribution-first/i)
  assertNames(source, ['attention', 'trust', 'cultural context'])
  assert.match(source, /route into people's lives/i)
  assertPublicCompanyScope(source)
  const publicLoopOrder = ['Sabi', 'Creator Network', 'TiVi'].map((name) => source.indexOf(name))
  assert.ok(publicLoopOrder.every((position) => position >= 0))
  assert.deepEqual([...publicLoopOrder].sort((a, b) => a - b), publicLoopOrder)
}

const assertOwnershipTest = (source) => {
  const africanContext = source.search(/African context/i)
  const ownershipPrinciples = source.search(/ownership test/i)
  assert.ok(africanContext >= 0 && africanContext < ownershipPrinciples)
  assertNames(source, ['portability', 'right to leave', 'human dignity', 'customer control'])
  assert.match(source, /voluntary[\s\S]{0,80}participation|participation[\s\S]{0,80}voluntary/i)
  assert.match(source, /blockchain[\s\S]{0,180}(?:useful|supports?|practical)/i)
  assert.match(source, /Chainfren[^.]*same ownership test/i)
}

const assertPublicHorizon = (source) => {
  assert.match(source, /## Present building[\s\S]*## Roadmap direction[\s\S]*## Company ambition/i)
  assert.match(source, /Star Factor[^.]*being built/i)
  assert.match(source, /Indy[^.]*roadmap/i)
  assert.match(source, /Africans[^.]*distribute[^.]*own[^.]*earn/i)
  assert.match(source, /open rails built by Africans/i)
  assert.match(source, /foundational infrastructure/i)
  assert.match(source, /wider open ecosystem|open ecosystem/i)
}

const removeIdea = (source, idea) => source.replace(
  new RegExp(`\\b${idea.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'),
  '',
)

test('the gap names every contributor to African attention', () => {
  assertNames(chapters.gap, ['creators', 'brands', 'audiences'])
  assert.match(chapters.gap, /Africa is already online/i)
  assert.match(chapters.gap, /value[^.]*travel back|value[^.]*return/i)
  assert.match(chapters.gap, /African attention/i)
  assert.match(chapters.gap, /African control/i)
})

test('the trap describes extraction as a system, wherever it is based', () => {
  assertNames(chapters.trap, ['platforms', 'middlemen', 'systems'])
  assert.match(chapters.trap, /attract[\s\S]{0,240}extract/i)
  assert.match(chapters.trap, /extract\w*/i)
  assert.match(chapters.trap, /foreign[^.]*African|African[^.]*foreign/i)
  assertNames(chapters.trap, ['discovery', 'identity', 'data', 'relationships', 'distribution', 'payment'])
  assert.match(chapters.trap, /(?:does not|doesn't|need not|requires? no)\s+(?:require\s+)?bad (?:individual )?intent/i)
})

test('the unlock leads with open rails enabled by blockchain', () => {
  assert.match(chapters.unlock.split(/\n\s*\n/, 1)[0], /open rails/i)
  assert.match(chapters.unlock, /enabled by blockchain|blockchain[^.]*enable/i)
  assertNames(chapters.unlock, ['payments', 'identity', 'participation', 'settlement', 'portability'])
  assert.match(chapters.unlock, /transparent settlement/i)
  assert.match(chapters.unlock, /speculation is not (?:the )?(?:purpose|mission)/i)
  assertNames(chapters.unlock, ['devices', 'payment', 'languages', 'communities'])
  assert.match(chapters.unlock, /compatible\s+services[^.]*same\s+standards|same\s+standards[^.]*compatible\s+services/i)
  assert.match(chapters.unlock, /(?:shared\s+record|record)[^.]*support[^.]*portab|support[^.]*portab[^.]*record/i)
})

test('the thesis states the mission and defines custodianship', () => {
  assert.match(chapters.thesis, /Chainfren exists to enable Africans to own the full value their attention generates on the internet\./i)
  assertNames(chapters.thesis, ['identity', 'relationships', 'data', 'distribution', 'participation', 'economic value'])
  assert.match(chapters.thesis, /right to leave/i)
})

test('the mission is presented as work to do, not an achieved ownership outcome', () => {
  assert.equal(manuscriptPaths.length, 10)
  for (const path of manuscriptPaths) assertNoAchievedOwnership(readFileSync(path, 'utf8'))
})

test('the complete public manuscript stays within public company scope', () => {
  for (const path of manuscriptPaths) assertPublicCompanyScope(readFileSync(path, 'utf8'))
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

test('the short read stands alone as the complete five-minute thesis', () => {
  const headings = [...shortRead.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].toLowerCase())
  assert.deepEqual(headings, ['the gap', 'the trap', 'the unlock', 'the thesis', 'the company and its loop', 'what we build', 'how we work', 'the road ahead', 'an invitation'])
  assert.match(shortRead, /Chainfren exists to enable Africans to own the full value their attention generates on the internet\./i)
  assert.match(shortRead, /blockchain/i)
  assert.match(shortRead, /speculation is not (?:the )?(?:purpose|mission)/i)
  assert.match(shortRead, /distribution-first/i)
  assert.match(shortRead, /right to leave/i)
  assert.match(shortRead, /African-built open ecosystem/i)
  assertNames(shortRead, ['Africans', 'TiVi', 'Star Factor', 'Sabi', 'Creator Network', 'Creator Growth OS', 'Community Engine', 'AI Agent Studio', 'Indy'])
})

test('the short read states public product roles and maturity accurately', () => {
  assert.match(shortRead, /TiVi[^.]*live/i)
  assert.doesNotMatch(shortRead, /Media Launchpad|flagship|live core/i)
  assertStarFactorBuildingStatus(shortRead)
  assert.match(shortRead, /Sabi[^.]*Creator Network[^.]*supporting distribution products/i)
  assert.match(shortRead, /Sabi[^.]*(?:building|being built)/i)
  assert.match(shortRead, /Creator Network[^.]*live/i)
  assert.match(shortRead, /Creator Growth OS[^.]*live/i)
  assert.match(shortRead, /Community Engine[^.]*early access/i)
  assert.match(shortRead, /AI Agent Studio[^.]*early access/i)
  assert.match(shortRead, /Indy is a roadmap product/i)
  assertPublicCompanyScope(shortRead)
  assertNoAchievedOwnership(shortRead)
})

test('the company thesis explains its distribution-first public loop in order', () => {
  assertCompanyDistributionThesis(chapters.company)
  assertSabiBuildingStatus(chapters.company)
})

test('the product thesis renders the public product groups instead of one flat maturity list', () => {
  assertGroupedProductRenderer(chapters.products)
})

test('the canonical product groups define the exact rendered product order', () => {
  assert.deepEqual(PUBLIC_PRODUCT_GROUPS.map(({ id, itemIds }) => ({ id, itemIds })), [
    { id: 'live', itemIds: ['media-launchpad', 'creator-growth-os', 'creator-network'] },
    { id: 'early-access', itemIds: ['community-engine', 'ai-agent-studio'] },
    { id: 'building', itemIds: ['star-factor', 'sabi'] },
    { id: 'roadmap', itemIds: ['indy'] },
  ])
  const productLookup = new Map(
    [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY].map((product) => [product.id, product]),
  )
  const renderedLabels = PUBLIC_PRODUCT_GROUPS.flatMap((group) => (
    group.itemIds.map((itemId) => productLookup.get(itemId)?.label)
  ))
  assert.deepEqual(renderedLabels, [
    'TiVi',
    'Creator Growth OS',
    'Creator Network',
    'Community Engine',
    'AI Agent Studio',
    'Star Factor',
    'Sabi',
    'Indy',
  ])
})

test('the product thesis states each product role and maturity without overstating availability', () => {
  assert.match(chapters.products, /We build for the part after attention/i)
  assert.match(chapters.products, /Our products and solutions are the practical layer/i)
  assert.doesNotMatch(proseBlocks(chapters.products).slice(0, 2).join(' '), /TiVi|Star Factor|Sabi|Creator Network|Creator Growth OS|Community Engine|AI Agent Studio|Indy/i)
  assert.doesNotMatch(chapters.products, /flagship|live core/i)
  assertStarFactorBuildingStatus(chapters.products)
  assert.match(chapters.products, /Sabi[^.]*Creator Network[^.]*supporting distribution products/i)
  assert.match(chapters.products, /Creator Growth OS[^.]*Community Engine[^.]*AI Agent Studio[^.]*additional capabilities/i)
  assert.match(chapters.products, /Indy[^.]*roadmap product[^.]*not currently available/i)
  assertNoHardCodedMaturity(chapters.products)
  assertSabiBuildingStatus(chapters.products)
})

test('the ownership test begins with African context and keeps control practical', () => {
  assertOwnershipTest(chapters.ownership)
})

test('the public horizon separates present building, roadmap direction, and company ambition', () => {
  assertPublicHorizon(chapters.horizon)
  assert.match(chapters.horizon, /open rails built by Africans for Africans/i)
})

test('the closing chapter gives all participants one shared invitation', () => {
  assertSharedInvitation(chapters.invitation)
})

test('the grouped product renderer rejects a flat or incomplete source fixture', () => {
  const badRenderers = [
    `
      import { PUBLIC_PRODUCT_GROUPS, PUBLIC_PRODUCT_MATURITY } from '@/content/chainfren-thesis/public-config.mjs'
      <ul>{PUBLIC_PRODUCT_MATURITY.map((product) => <li>{product.label}</li>)}</ul>
    `,
    chapters.products.replace('<section', '<div'),
    chapters.products.replace('group.itemIds.map', 'records.map'),
    chapters.products.replace('<MaturityBadge stage={product.id} />', ''),
    chapters.products.replace('[...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]', '[...PUBLIC_PRODUCT_MATURITY]'),
    chapters.products.replace('aria-labelledby={`product-group-${group.id}`}', 'aria-label={group.label}'),
    chapters.products.replace('id={`product-group-${group.id}`} ', ''),
    chapters.products.replace('aria-level={headingLevel}', ''),
  ]
  for (const source of badRenderers) {
    assert.throws(() => assertGroupedProductRenderer(source), { name: 'AssertionError' })
  }
})

test('the product prose rejects hard-coded internal maturity tokens', () => {
  assert.throws(() => assertNoHardCodedMaturity('<MaturityBadge stage="media-launchpad" /> TiVi is early-access for selected audiences.'), { name: 'AssertionError' })
})

test('completed ownership detection rejects plausible achieved-outcome wording', () => {
  for (const text of [
    'Africans own the full value their attention creates.',
    'Creators own the full value their attention creates.',
    'Brands control their audience relationships.',
    'Customers own their identity and data.',
    'Creators now control their audience relationships.',
    'Ownership has been secured for every community.',
    'Our customers have ownership of their data.',
  ]) assert.throws(() => assertNoAchievedOwnership(text), { name: 'AssertionError' })
})

test('completed ownership detection preserves mission, modal, and future language', () => {
  for (const text of [
    'Creators can own the full value their attention creates.',
    'Brands should control their audience relationships.',
    'Chainfren exists to enable customers to own their identity and data.',
    'Our ambition is that Africans will own more of the value they create.',
  ]) assert.doesNotThrow(() => assertNoAchievedOwnership(text))
})

test('public scope detection rejects private and financial material', () => {
  for (const text of [
    'Revenue from Sabi will finance TiVi before the next product begins.',
    'Our internal organisation has a private operating workflow.',
    'The financial projection sets a revenue target and margin.',
    'Token economics define token allocation, supply, and vesting.',
    'The confidential sequencing plan determines which product follows.',
  ]) assert.throws(() => assertPublicCompanyScope(text), { name: 'AssertionError' })
})

test('Star Factor status detection follows pronouns through its prose block', () => {
  for (const statusClaim of [
    'It has launched for invited audiences.',
    'It is live for invited audiences.',
    'It is available for invited audiences.',
    'It will come later.',
  ]) {
    assert.throws(() => assertStarFactorBuildingStatus(`Star Factor is currently being built. ${statusClaim}`), { name: 'AssertionError' })
  }
})

test('Star Factor status detection allows an explicit not-available statement', () => {
  assert.doesNotThrow(() => assertStarFactorBuildingStatus('Star Factor is currently being built and is not available.'))
})

test('Sabi status detection rejects present availability and operation claims', () => {
  for (const statusClaim of [
    'Sabi gives stories a public home.',
    'Sabi offers public broadcasts.',
    'Sabi provides a media surface.',
    'Sabi operates a public channel.',
    'Sabi publishes African ideas.',
    'Sabi hosts public broadcasts.',
    'Sabi is live.',
    'Sabi is available.',
  ]) assert.throws(() => assertSabiBuildingStatus(statusClaim), { name: 'AssertionError' })
})

test('Sabi status detection accepts explicit in-development language', () => {
  assert.doesNotThrow(() => assertSabiBuildingStatus('Sabi is being built to give African stories a public home.'))
})

test('Sabi status detection rejects contradictions after valid building language', () => {
  for (const source of [
    'Sabi is being built to give African stories a public home. It is live today.',
    'Sabi is being built to give African stories a public home. It operates a public channel.',
    'Sabi is being built to give African stories a public home. Sabi is available now.',
    'Sabi is being built to give African stories a public home.\n\nA later product note follows.\n\nIt is live today.',
    'Sabi is being built to give African stories a public home.\n\nA later product note follows.\n\nIt operates a public channel.',
    'Sabi is being built to give African stories a public home.\n\nSabi is available now.',
  ]) assert.throws(() => assertSabiBuildingStatus(source), { name: 'AssertionError' })
})

test('the shared invitation rejects separate audience pitches', () => {
  const sharedBlock = 'This shared invitation is for creators, brands, audiences, builders, partners, investors, and potential hires. <a href="/contact">Contact us</a>.'
  const ownershipClose = 'Participate in an African-built ownership economy.'
  const badInvitations = [
    [sharedBlock.replace(' <a href="/contact">Contact us</a>.', ''), ownershipClose].join('\n\n'),
    [sharedBlock, '<a href="/contact">Contact us again</a>.', ownershipClose].join('\n\n'),
    [sharedBlock, '## Creators', ownershipClose].join('\n\n'),
    [sharedBlock, '{Object.values(PUBLIC_CTAS).map((cta) => cta.label)}', ownershipClose].join('\n\n'),
    [sharedBlock, 'Join us with your audience.', 'Build the product with us.', ownershipClose].join('\n\n'),
    [
      sharedBlock,
      'Creators get direct relationships.',
      'Brands get trusted distribution.',
      'Audiences get meaningful participation.',
      'Builders get useful problems.',
      'Partners get shared opportunities.',
      'Investors get company access.',
      'Potential hires get meaningful work.',
      ownershipClose,
    ].join('\n\n'),
  ]
  for (const source of badInvitations) {
    assert.throws(() => assertSharedInvitation(source), { name: 'AssertionError' })
  }
})

test('the company thesis helper rejects missing foundations and private mechanics', () => {
  const requiredIdeas = ['attention', 'trust', 'cultural context', "route into people's lives"]
  for (const idea of requiredIdeas) {
    assert.throws(() => assertCompanyDistributionThesis(removeIdea(chapters.company, idea)), { name: 'AssertionError' })
  }
  assert.throws(() => assertCompanyDistributionThesis(`${chapters.company}\n\nOur internal organisation follows a private operating workflow.`), { name: 'AssertionError' })
})

test('the ownership helper rejects each missing ownership principle', () => {
  const requiredIdeas = [
    'African context',
    'voluntary',
    'Blockchain',
    'human dignity',
    'customer control',
    'portability',
    'right to leave',
    'same ownership test',
  ]
  for (const idea of requiredIdeas) {
    assert.throws(() => assertOwnershipTest(removeIdea(chapters.ownership, idea)), { name: 'AssertionError' })
  }
})

test('the horizon helper rejects missing ambitions and collapsed horizons', () => {
  const requiredIdeas = [
    'distribute',
    'own',
    'earn',
    'open rails built by Africans',
    'foundational infrastructure',
    'wider open ecosystem',
  ]
  for (const idea of requiredIdeas) {
    assert.throws(() => assertPublicHorizon(removeIdea(chapters.horizon, idea)), { name: 'AssertionError' })
  }
  assert.throws(() => assertPublicHorizon(chapters.horizon.replace(/## Roadmap direction/i, '## Present building')), { name: 'AssertionError' })
})
