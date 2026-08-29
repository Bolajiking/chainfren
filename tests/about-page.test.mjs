import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  PUBLIC_CTAS,
  PUBLIC_INITIATIVE_MATURITY,
  PUBLIC_PRODUCT_MATURITY,
} from '../content/chainfren-thesis/public-config.mjs'

const contentSource = readFileSync(new URL('../app/config/aboutContent.js', import.meta.url), 'utf8')
const componentSource = readFileSync(new URL('../app/components/AboutPage.jsx', import.meta.url), 'utf8')
const routeSource = readFileSync(new URL('../app/(mainpage)/about/page.jsx', import.meta.url), 'utf8')

const APPROVED_OFFERING_IDS = [
  'media-launchpad',
  'creator-growth-os',
  'community-engine',
  'ai-agent-studio',
  'creator-network',
  'sabi',
]

const withoutComments = (source) => source
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '')

test('About offerings are the approved canonical public records in order', () => {
  const declaration = contentSource.match(
    /export\s+const\s+PUBLIC_ABOUT_OFFERING_IDS\s*=\s*(?:Object\.freeze\s*\(\s*)?\[([\s\S]*?)\]/,
  )

  assert.ok(declaration, 'aboutContent must export PUBLIC_ABOUT_OFFERING_IDS')

  const offeringIds = [...withoutComments(declaration[1]).matchAll(/['"]([^'"]+)['"]/g)]
    .map((match) => match[1])
  assert.deepEqual(offeringIds, APPROVED_OFFERING_IDS)

  const canonicalRecords = new Map(
    [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY].map((record) => [record.id, record]),
  )
  for (const id of offeringIds) {
    assert.ok(canonicalRecords.has(id), `${id} must resolve to a canonical public record`)
  }

  const executableContent = withoutComments(contentSource)
  for (const legacyName of ['Indy', 'Star Factor', 'Media Launchpad']) {
    assert.doesNotMatch(
      executableContent,
      new RegExp(`['"]${legacyName}['"]`),
      `${legacyName} must not be hardcoded as a visible About offering`,
    )
  }
})

test('product rendering is a simple name and description list without maturity metadata', () => {
  assert.match(componentSource, /ABOUT\.build\.items/)
  assert.match(componentSource, /\bit\.name\b/)
  assert.match(componentSource, /\bit\.line\b/)

  for (const removedToken of [
    /\bStageChip\b/,
    /\bSTAGE_TONE\b/,
    /\.stage\b/,
    /\brunsOn\b/,
    /Runs on/i,
  ]) {
    assert.doesNotMatch(componentSource, removedToken)
  }
})

test('the About page renders only the approved four content sections', () => {
  for (const section of ['hero', 'argument', 'build', 'join']) {
    assert.match(componentSource, new RegExp(`ABOUT\\.${section}\\b`))
  }

  for (const removedKey of ['numbers', 'company', 'principles', 'road', 'founder', 'faq']) {
    assert.doesNotMatch(componentSource, new RegExp(`ABOUT\\.${removedKey}\\b`))
    assert.doesNotMatch(contentSource, new RegExp(`^\\s*${removedKey}\\s*:`, 'm'))
  }
})

test('visitor paths use the four approved public CTAs and render their canonical labels', () => {
  for (const audience of ['creators', 'brands', 'partners', 'talent']) {
    assert.ok(PUBLIC_CTAS[audience], `PUBLIC_CTAS.${audience} must exist`)
    assert.match(contentSource, new RegExp(`PUBLIC_CTAS\\.${audience}\\b`))
  }

  assert.doesNotMatch(contentSource, /PUBLIC_CTAS\.supporters\b/)
  assert.match(componentSource, /\bj\.label\b/)
  assert.doesNotMatch(componentSource, /\bj\.cta\b/)
})

test('About structured data keeps the page entity and breadcrumb but removes FAQ and founder entities', () => {
  assert.match(routeSource, /['"]@type['"]\s*:\s*['"]AboutPage['"]/)
  assert.match(routeSource, /mainEntity\s*:\s*\{\s*['"]@id['"]\s*:\s*ID\.org\s*\}/)
  assert.match(routeSource, /\bbreadcrumbSchema\s*\(/)

  for (const removedToken of [
    /['"]@type['"]\s*:\s*['"]FAQPage['"]/,
    /about#faq/,
    /about#founder/,
    /['"]@type['"]\s*:\s*['"]Person['"]/,
    /ABOUT\.faq\b/,
    /ABOUT\.founder\b/,
  ]) {
    assert.doesNotMatch(routeSource, removedToken)
  }
})
