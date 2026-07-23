import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { collectSafetyViolations, validatePublicDestinations, validateReleaseOutputs, validateThesisContent } from '../scripts/validate-thesis-content.mjs'
import { DISTRIBUTION_LOOP, ROADMAP_HORIZONS, VALUE_PATH } from '../content/chainfren-thesis/public-system.mjs'
import { THESIS_MANIFEST } from '../content/chainfren-thesis/manifest.mjs'
import { THESIS_CLAIMS } from '../content/chainfren-thesis/claims.mjs'
import { PUBLIC_CITATIONS } from '../content/chainfren-thesis/citations.mjs'
import { PUBLIC_CTAS, PUBLIC_INITIATIVE_MATURITY, PUBLIC_PRODUCT_MATURITY, THESIS_CONTENT_VERSION } from '../content/chainfren-thesis/public-config.mjs'
import { THESIS_CONTENT_HASH } from '../content/chainfren-thesis/generated-content-hash.mjs'
import { CHAPTER_REGISTRY_SLUGS, createChapterRegistry } from '../lib/thesis/chapter-registry.mjs'

const componentSource = (name) => readFileSync(new URL(`../app/(mainpage)/thesis/components/${name}.jsx`, import.meta.url), 'utf8')

test('partial validation passes before chapter MDX publication begins', () => {
  assert.deepEqual(validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url) }), [])
})

test('strict validation passes with all nine published chapter MDX files', () => {
  const errors = validateThesisContent({ allowMissingContent: false, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url) })
  assert.deepEqual(errors, [])
})

test('release source has every manifest chapter, registry entry, short read, and valid claim chapter', () => {
  const thesisRoot = new URL('../content/chainfren-thesis/', import.meta.url)
  assert.equal(THESIS_CONTENT_VERSION, '2026.1')
  assert.equal(THESIS_MANIFEST.length, 9)
  for (const chapter of THESIS_MANIFEST) {
    assert(existsSync(new URL(`chapters/${chapter.id}-${chapter.slug}.mdx`, thesisRoot)))
  }
  const registry = createChapterRegistry(Object.fromEntries(CHAPTER_REGISTRY_SLUGS.map((slug) => [slug, () => slug])))
  assert.deepEqual(THESIS_MANIFEST.map(({ slug }) => slug), CHAPTER_REGISTRY_SLUGS)
  assert(THESIS_MANIFEST.every((chapter) => registry.has(chapter.slug)))
  assert.deepEqual(registry.getPublished(THESIS_MANIFEST).map(({ slug }) => slug), CHAPTER_REGISTRY_SLUGS)
  assert(existsSync(new URL('short-read.mdx', thesisRoot)))
  const slugs = new Set(THESIS_MANIFEST.map(({ slug }) => slug))
  assert(THESIS_CLAIMS.every(({ chapterSlug }) => slugs.has(chapterSlug)))
})

test('chapter registry rejects missing, non-function, and unknown component entries', () => {
  const validEntries = Object.fromEntries(CHAPTER_REGISTRY_SLUGS.map((slug) => [slug, () => null]))
  const missing = { ...validEntries }
  delete missing['the-gap']
  assert.throws(() => createChapterRegistry(missing), /requires a component for the-gap/)
  assert.throws(() => createChapterRegistry({ ...validEntries, 'not-a-chapter': () => null }), /unknown chapter/)
  assert.throws(() => createChapterRegistry({ ...validEntries, 'the-gap': 'not-a-function' }), /requires a component for the-gap/)
})

test('public citations are direct HTTPS URLs or approved first-party references', () => {
  for (const citation of PUBLIC_CITATIONS) {
    const url = new URL(citation.url)
    assert(url.protocol === 'https:' || ['chainfren.com', 'www.chainfren.com'].includes(url.hostname), `citation ${citation.id} is not public: ${citation.url}`)
  }
})

test('all public CTA destinations resolve to a local route or approved HTTPS URL', () => {
  const hrefs = [
    ...Object.values(PUBLIC_CTAS).map(({ href }) => href),
    ...PUBLIC_PRODUCT_MATURITY.map(({ href }) => href),
    ...PUBLIC_INITIATIVE_MATURITY.map(({ href }) => href),
    ...DISTRIBUTION_LOOP.map(({ href }) => href),
    ...VALUE_PATH.map(({ href }) => href),
    ...ROADMAP_HORIZONS.map(({ href }) => href),
  ]
  assert.deepEqual(validateThesisContent({ allowMissingContent: false, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url) }), [])
  assert(hrefs.length > 0)
})

test('destination validation rejects a public CTA that lacks a matching route file', () => {
  assert.deepEqual(validatePublicDestinations(['/not-a-public-route']), ['Public CTA destination has no matching route file: /not-a-public-route'])
})

test('company chapter systems keep the approved public sequences and component data boundary', () => {
  assert.deepEqual(DISTRIBUTION_LOOP.map(({ id }) => id), ['sabi', 'creator-network', 'star-factor', 'products-and-solutions'])
  assert.deepEqual(VALUE_PATH.map(({ id }) => id), ['attention', 'participation', 'ownership', 'value'])
  assert.equal(ROADMAP_HORIZONS.length, 4)
  assert(ROADMAP_HORIZONS.every(({ title, summary }) => !/\b(?:\d{4}|Q[1-4]|quarter|budget|targets?|metrics?|runway|signed\s+revenue|decision-rights|control\s+matrix|risk\s+register)\b/i.test(`${title} ${summary}`)))

  for (const [component, data] of [['DistributionLoop', 'DISTRIBUTION_LOOP'], ['ValuePath', 'VALUE_PATH'], ['RoadmapHorizons', 'ROADMAP_HORIZONS']]) {
    const source = componentSource(component)
    assert.match(source, new RegExp(`import\\s+\\{\\s*${data}\\s*\\}\\s+from`))
    assert.match(source, new RegExp(`${data}\\.map`))
    assert.match(source, /<ol/)
    assert.doesNotMatch(source, /['\"]use client['\"]/)
  }
})

test('company chapter files use the numbered publication paths', () => {
  for (const path of ['06-what-we-build.mdx', '07-how-we-work.mdx', '08-the-road-ahead.mdx', '09-build-with-us.mdx']) {
    assert.match(readFileSync(new URL(`../content/chainfren-thesis/chapters/${path}`, import.meta.url), 'utf8'), /\S/)
  }
})

test('explicit generated thesis directories are recursively safety scanned', () => {
  const generatedDirectory = mkdtempSync(join(tmpdir(), 'chainfren-thesis-generated-'))
  try {
    const excluded = ['come', 'ownity'].join('')
    writeFileSync(join(generatedDirectory, 'publication.txt'), `Public draft ${excluded}`)
    const errors = validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory })
    assert(errors.some((error) => error.includes('excluded venture')))
  } finally {
    rmSync(generatedDirectory, { recursive: true, force: true })
  }
})

test('explicit generated directories reject missing, nonexistent, and non-directory paths', () => {
  const generatedDirectory = mkdtempSync(join(tmpdir(), 'chainfren-thesis-generated-'))
  try {
    const missingArgument = validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory: '' })
    const nonexistent = validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory: join(generatedDirectory, 'missing') })
    const file = join(generatedDirectory, 'not-a-directory.txt')
    writeFileSync(file, 'text')
    const nonDirectory = validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory: file })
    assert(missingArgument.some((error) => error.includes('requires a directory')))
    assert(nonexistent.some((error) => error.includes('does not exist')))
    assert(nonDirectory.some((error) => error.includes('is not a directory')))
  } finally { rmSync(generatedDirectory, { recursive: true, force: true }) }
})

test('generated scanning does not follow outside symlinks', () => {
  const root = mkdtempSync(join(tmpdir(), 'chainfren-thesis-generated-'))
  const outside = mkdtempSync(join(tmpdir(), 'chainfren-thesis-outside-'))
  try {
    const excluded = ['come', 'ownity'].join('')
    mkdirSync(join(root, 'nested'))
    writeFileSync(join(outside, 'private.txt'), excluded)
    symlinkSync(outside, join(root, 'nested', 'outside-link'))
    const errors = validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory: root })
    assert(!errors.some((error) => error.includes('excluded venture')))
    assert(errors.some((error) => error.includes('skipped symlink')))
  } finally { rmSync(root, { recursive: true, force: true }); rmSync(outside, { recursive: true, force: true }) }
})

test('content scanning catches blocked text in unregistered nested MDX files', () => {
  const root = mkdtempSync(join(tmpdir(), 'chainfren-thesis-content-'))
  try {
    const excluded = ['come', 'ownity'].join('')
    mkdirSync(join(root, 'chapters', 'drafts'), { recursive: true })
    writeFileSync(join(root, 'chapters', 'drafts', 'unregistered.mdx'), excluded)
    const errors = validateThesisContent({ allowMissingContent: true, contentDirectory: pathToFileURL(`${root}/`) })
    assert(errors.some((error) => error.includes('unregistered.mdx') && error.includes('excluded venture')))
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('safety helpers block local paths, sensitive operational terms, and dash punctuation', () => {
  const venture = ['come', 'ownity'].join('')
  const text = ['/Users/example/private', 'second-brain', 'CF-C-17', 'signed revenue', 'runway', 'decision-rights', 'control matrix', 'risk register', 'alpha—beta', venture].join('\n')
  const violations = collectSafetyViolations(text, 'fixture')
  assert.equal(violations.length, 10)
  assert.equal(collectSafetyViolations('generic revenue is not blocked', 'fixture').length, 0)
})

test('safety helpers block excluded-venture separator, whitespace, and newline variants', () => {
  const parts = ['come', 'ownity']
  for (const separator of [' ', '-', '_', '\n']) {
    const violations = collectSafetyViolations(parts.join(separator), 'fixture')
    assert(violations.some((violation) => violation.includes('excluded venture')))
  }
})

test('release verification scans checksum text artifacts from custom and default source paths', () => {
  const root = mkdtempSync(join(tmpdir(), 'chainfren-thesis-checksum-scan-'))
  try {
    const blocked = ['come', 'ownity'].join(' ')
    const buildDirectory = join(root, '.next/server/app/thesis')
    const pdfPath = join(root, 'release.pdf')
    mkdirSync(buildDirectory, { recursive: true })
    writeFileSync(join(buildDirectory, 'page.html'), `${THESIS_CONTENT_VERSION} ${THESIS_CONTENT_HASH}`)
    writeFileSync(pdfPath, 'clean PDF placeholder')

    const customChecksum = join(root, 'custom.sha256')
    writeFileSync(customChecksum, `Source SHA-256: ${blocked}`)
    const customErrors = validateReleaseOutputs({
      projectRoot: root,
      sourcePaths: [customChecksum],
      pdfPath,
      buildDirectory,
      extractPdfText: () => 'clean PDF text',
    })
    assert(customErrors.some((error) => error.includes('custom.sha256') && error.includes('excluded venture')))

    const defaultChecksum = join(root, 'public/downloads/chainfren-thesis-2026.1.sha256')
    mkdirSync(join(root, 'public/downloads'), { recursive: true })
    writeFileSync(defaultChecksum, `PDF SHA-256: ${blocked}`)
    const defaultErrors = validateReleaseOutputs({
      projectRoot: root,
      pdfPath,
      buildDirectory,
      extractPdfText: () => 'clean PDF text',
    })
    assert(defaultErrors.some((error) => error.includes('chainfren-thesis-2026.1.sha256') && error.includes('excluded venture')))
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('release verification scans deterministic source, PDF text, and fails explicitly without build outputs', () => {
  const root = mkdtempSync(join(tmpdir(), 'chainfren-thesis-release-'))
  try {
    const sourceDirectory = join(root, 'public-source')
    mkdirSync(sourceDirectory)
    const excluded = ['come', 'ownity'].join('')
    writeFileSync(join(sourceDirectory, 'social-image.jsx'), `const title = '${excluded}'`)
    const missingBuild = validateReleaseOutputs({
      projectRoot: root,
      sourcePaths: [sourceDirectory],
      pdfPath: join(root, 'release.pdf'),
      buildDirectory: join(root, '.next/server/app/thesis'),
      extractPdfText: () => 'clean PDF text',
    })
    assert(missingBuild.some((error) => error.includes('social-image.jsx') && error.includes('excluded venture')))
    assert(missingBuild.some((error) => error.includes('Production thesis build outputs are unavailable') && error.includes('npm run build')))

    const buildDirectory = join(root, '.next/server/app/thesis')
    mkdirSync(buildDirectory, { recursive: true })
    writeFileSync(join(buildDirectory, 'page.html'), 'clean HTML')
    writeFileSync(join(root, 'release.pdf'), 'placeholder')
    const extractedPdf = validateReleaseOutputs({
      projectRoot: root,
      sourcePaths: [],
      pdfPath: join(root, 'release.pdf'),
      buildDirectory,
      extractPdfText: () => 'alpha—beta',
    })
    assert(extractedPdf.some((error) => error.includes('release.pdf extracted text') && error.includes('dash punctuation')))
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('release verification rejects a clean stale build without the current thesis version and content hash', () => {
  const root = mkdtempSync(join(tmpdir(), 'chainfren-thesis-stale-build-'))
  try {
    const buildDirectory = join(root, '.next/server/app/thesis')
    mkdirSync(buildDirectory, { recursive: true })
    writeFileSync(join(buildDirectory, 'page.html'), 'clean but old thesis output')
    const pdfPath = join(root, 'release.pdf')
    writeFileSync(pdfPath, 'placeholder')

    const errors = validateReleaseOutputs({
      projectRoot: root,
      sourcePaths: [],
      pdfPath,
      buildDirectory,
      extractPdfText: () => 'clean PDF text',
    })

    assert(errors.some((error) => error.includes('stale') && error.includes(THESIS_CONTENT_VERSION)))
    assert(errors.some((error) => error.includes('stale') && error.includes(THESIS_CONTENT_HASH)))
  } finally { rmSync(root, { recursive: true, force: true }) }
})
