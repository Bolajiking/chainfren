import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  PUBLIC_CTAS,
  PUBLIC_INITIATIVE_MATURITY,
  PUBLIC_PRODUCT_MATURITY,
} from '../content/chainfren-thesis/public-config.mjs'

const contentUrl = new URL('../app/config/aboutContent.js', import.meta.url)
const contentSource = readFileSync(contentUrl, 'utf8')
const componentSource = readFileSync(new URL('../app/components/AboutPage.jsx', import.meta.url), 'utf8')
const routeSource = readFileSync(new URL('../app/(mainpage)/about/page.jsx', import.meta.url), 'utf8')

const APPROVED_OFFERING_IDS = [
  'media-launchpad',
  'creator-growth-os',
  'community-engine',
  'ai-agent-studio',
  'creator-network',
  'sabi',
  'star-factor',
]

const ABOUT_DISPLAY_NAME_OVERRIDES = {
  'media-launchpad': 'Media Launchpad (TiVi)',
}

const ABOUT_DESCRIPTION_OVERRIDES = {
  sabi: "Chainfren's home for broadcasts and publications on blockchains, AI, and the technologies unlocking the African economy.",
}

const withoutComments = (source) => source
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '')

const executableContent = withoutComments(contentSource)
const executableComponent = withoutComments(componentSource)
const executableRoute = withoutComments(routeSource)

const importableContentSource = contentSource.replace(
  /(from\s+['"])(\.\.?\/[^'"]+)(['"])/g,
  (_match, before, specifier, after) => `${before}${new URL(specifier, contentUrl).href}${after}`,
)
const { ABOUT } = await import(
  `data:text/javascript;base64,${Buffer.from(importableContentSource).toString('base64')}`
)

const canonicalRecords = new Map(
  [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY].map((record) => [record.id, record]),
)

test('About offerings are the approved canonical public records in order', () => {
  const declaration = executableContent.match(
    /\bconst\s+PUBLIC_ABOUT_OFFERING_IDS\s*=\s*(?:Object\.freeze\s*\(\s*)?\[([\s\S]*?)\]/,
  )

  assert.ok(declaration, 'aboutContent must define PUBLIC_ABOUT_OFFERING_IDS')
  assert.doesNotMatch(
    executableContent,
    /\bexport\s+const\s+PUBLIC_ABOUT_OFFERING_IDS\b/,
    'PUBLIC_ABOUT_OFFERING_IDS is a private implementation detail',
  )

  const offeringIds = [...declaration[1].matchAll(/['"]([^'"]+)['"]/g)]
    .map((match) => match[1])
  assert.deepEqual(offeringIds, APPROVED_OFFERING_IDS)

  for (const id of offeringIds) {
    assert.ok(canonicalRecords.has(id), `${id} must resolve to a canonical public record`)
  }

  assert.doesNotMatch(
    executableContent,
    /['"]Indy['"]/,
    'Indy must not be hardcoded as a visible About offering',
  )
})

test('About build items are the exact public-record projection', () => {
  const expectedItems = APPROVED_OFFERING_IDS.map((id) => {
    const record = canonicalRecords.get(id)
    assert.ok(record, `${id} must resolve to a canonical public record`)
    return {
      name: ABOUT_DISPLAY_NAME_OVERRIDES[id] ?? record.label,
      line: ABOUT_DESCRIPTION_OVERRIDES[id] ?? record.description,
      href: record.href,
    }
  })

  assert.deepEqual(ABOUT.build.items, expectedItems)
  for (const item of ABOUT.build.items) {
    assert.deepEqual(Object.keys(item), ['name', 'line', 'href'])
  }

  const sabi = ABOUT.build.items.find((item) => item.name === 'Sabi')
  assert.equal(
    sabi?.line,
    "Chainfren's home for broadcasts and publications on blockchains, AI, and the technologies unlocking the African economy.",
  )
})

test('About argument keeps the approved four-step path to the thesis', () => {
  assert.deepEqual(
    ABOUT.argument.steps.map((step) => step.t),
    ['The gap', 'The trap', 'The unlock', 'The thesis'],
  )
  assert.equal(ABOUT.argument.steps.length, 4)
  assert.equal(ABOUT.argument.more.href, '/thesis')
})

test('About content exposes exactly the approved top-level sections in order', () => {
  assert.deepEqual(Object.keys(ABOUT), ['meta', 'hero', 'argument', 'build', 'join'])
})

test('product rendering is a simple name and description list without maturity metadata', () => {
  assert.match(executableComponent, /ABOUT\.build\.items/)
  assert.match(executableComponent, /\bit\.name\b/)
  assert.match(executableComponent, /\bit\.line\b/)

  for (const removedToken of [
    /\bStageChip\b/,
    /\bMaturityBadge\b/,
    /\bSTAGE_TONE\b/,
    /\bmaturity\b/i,
    /\b(?:Stage|Maturity|Status|Phase|State)(?:Chip|Badge|Pill|Tag|Label)\b/i,
    /\b(?:Chip|Badge|Pill|Tag|Label)(?:Stage|Maturity|Status|Phase|State)\b/i,
    /<[A-Z][A-Za-z0-9]*(?:Badge|Chip|Pill|Tag|Status|Maturity|Stage)\b/,
    /\.stage\b/,
    /\brunsOn\b/,
    /Runs on/i,
  ]) {
    assert.doesNotMatch(executableComponent, removedToken)
  }
})

test('the About page renders exactly four marked content sections in order', () => {
  const sectionTags = [...executableComponent.matchAll(/<section\b[^>]*>/g)].map((match) => match[0])
  assert.equal(sectionTags.length, 4, 'AboutPage must render exactly four section elements')

  const renderedSections = sectionTags.map((tag) => {
    const markers = [...tag.matchAll(/data-about-section\s*=\s*['"]([^'"]+)['"]/g)]
    assert.equal(markers.length, 1, 'each section must carry exactly one data-about-section marker')
    return markers[0][1]
  })

  assert.deepEqual(renderedSections, ['hero', 'argument', 'build', 'join'])
  for (const section of renderedSections) {
    assert.match(executableComponent, new RegExp(`ABOUT\\.${section}\\b`))
  }

  for (const removedKey of ['numbers', 'company', 'principles', 'road', 'founder', 'faq']) {
    assert.doesNotMatch(executableComponent, new RegExp(`ABOUT\\.${removedKey}\\b`))
    assert.doesNotMatch(executableContent, new RegExp(`^\\s*${removedKey}\\s*:`, 'm'))
  }
})

test('visitor paths are exactly the four approved public CTAs in order', () => {
  const expectedAudiences = ['creators', 'brands', 'partners', 'talent']
  const ctaReferences = [...executableContent.matchAll(/PUBLIC_CTAS\.([A-Za-z][A-Za-z0-9_]*)\b/g)]
    .map((match) => match[1])
  assert.deepEqual(ctaReferences, expectedAudiences)

  assert.equal(ABOUT.join.items.length, 4)
  assert.deepEqual(
    ABOUT.join.items.map((item) => item.who),
    ['Creators', 'Brands', 'Partners', 'Potential hires'],
  )
  for (const [index, audience] of expectedAudiences.entries()) {
    assert.equal(ABOUT.join.items[index].label, PUBLIC_CTAS[audience].label)
    assert.equal(ABOUT.join.items[index].href, PUBLIC_CTAS[audience].href)
  }

  assert.match(executableComponent, /\bj\.label\b/)
  assert.doesNotMatch(executableComponent, /\bj\.cta\b/)
})

test('About structured data keeps the page entity and breadcrumb but removes FAQ and founder entities', () => {
  assert.match(executableRoute, /['"]@type['"]\s*:\s*['"]AboutPage['"]/)
  assert.match(executableRoute, /mainEntity\s*:\s*\{\s*['"]@id['"]\s*:\s*ID\.org\s*\}/)
  assert.match(executableRoute, /\}\s*,\s*breadcrumbSchema\s*\(\s*\[/)

  const significantLinks = executableRoute.match(/significantLink\s*:\s*\[([\s\S]*?)\]/)
  assert.ok(significantLinks, 'AboutPage schema must define significantLink')
  const significantLinkEntries = significantLinks[1]
    .split(',')
    .map((entry) => entry.replace(/\s+/g, ''))
    .filter(Boolean)
  assert.deepEqual(
    significantLinkEntries,
    ['/products', '/for-creators', '/for-brands', '/creator-network', '/sabi', '/contact']
      .map((path) => '`${SITE.url}' + path + '`'),
  )

  for (const removedToken of [
    /['"]@type['"]\s*:\s*['"]FAQPage['"]/,
    /about#faq/,
    /about#founder/,
    /['"]@type['"]\s*:\s*['"]Person['"]/,
    /ABOUT\.faq\b/,
    /ABOUT\.founder\b/,
  ]) {
    assert.doesNotMatch(executableRoute, removedToken)
  }
})
