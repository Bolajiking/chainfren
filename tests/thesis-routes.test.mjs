import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { escapeJsonForHtmlScript } from '../lib/thesis/json-ld.js'
import { THESIS_MANIFEST } from '../content/chainfren-thesis/manifest.mjs'
import { CHAPTER_REGISTRY_SLUGS, createChapterRegistry } from '../lib/thesis/chapter-registry.mjs'

const registryPath = new URL('../lib/thesis/content-registry.js', import.meta.url)
const publicContentPath = new URL('../lib/thesis/public-content.js', import.meta.url)
const chapterArticlePath = new URL('../app/(mainpage)/thesis/components/ChapterArticle.jsx', import.meta.url)
const citationListPath = new URL('../app/(mainpage)/thesis/components/PublicCitationList.jsx', import.meta.url)
const maturityBadgePath = new URL('../app/(mainpage)/thesis/components/MaturityBadge.jsx', import.meta.url)
const thesisHubPath = new URL('../app/(mainpage)/thesis/components/ThesisHub.jsx', import.meta.url)
const thesisPagePath = new URL('../app/(mainpage)/thesis/page.jsx', import.meta.url)
const readerPagePath = new URL('../app/(mainpage)/thesis/read/[chapter]/page.jsx', import.meta.url)
const shortReadPagePath = new URL('../app/(mainpage)/thesis/short/page.jsx', import.meta.url)
const thesisLayoutPath = new URL('../app/(mainpage)/thesis/layout.jsx', import.meta.url)
const mapPagePath = new URL('../app/(mainpage)/thesis/map/page.jsx', import.meta.url)
const downloadPagePath = new URL('../app/(mainpage)/thesis/download/page.jsx', import.meta.url)
const ogImagePath = new URL('../app/(mainpage)/thesis/opengraph-image/route.jsx', import.meta.url)
const articleJsonLdPath = new URL('../app/(mainpage)/thesis/components/ArticleJsonLd.jsx', import.meta.url)
const stackPath = new URL('../app/config/stack.js', import.meta.url)

const publishedChapters = [
  ['01', 'the-gap', 'TheGap'],
  ['02', 'the-trap', 'TheTrap'],
  ['03', 'the-unlock', 'TheUnlock'],
  ['04', 'the-thesis', 'TheThesis'],
  ['05', 'the-company', 'TheCompany'],
  ['06', 'what-we-build', 'WhatWeBuild'],
  ['07', 'how-we-work', 'HowWeWork'],
  ['08', 'the-road-ahead', 'TheRoadAhead'],
  ['09', 'build-with-us', 'BuildWithUs'],
]

test('chapter registry statically registers every published MDX chapter', () => {
  const registry = readFileSync(registryPath, 'utf8')

  for (const [id, slug, component] of publishedChapters) {
    assert.match(registry, new RegExp(`import\\s+${component}\\s+from\\s+['\"][^'\"]*${id}-${slug}\\.mdx['\"]`))
    assert.match(registry, new RegExp(`['\"]${slug}['\"]\\s*:\\s*${component}`))
  }
  assert.doesNotMatch(registry, /import\s*\(/)
  assert.doesNotMatch(registry, /\$\{[^}]+\}/)
})

test('the static reader route covers every registered chapter through its canonical selector', () => {
  const reader = readFileSync(readerPagePath, 'utf8')
  const registry = createChapterRegistry(Object.fromEntries(CHAPTER_REGISTRY_SLUGS.map((slug) => [slug, () => null])))

  assert.match(reader, /generateStaticParams\s*=\s*\(\)\s*=>\s*getPublishedChapters\(\)\.map\(\(chapter\)\s*=>\s*\(\{\s*chapter:\s*chapter\.slug\s*\}\)\)/)
  assert.deepEqual(registry.getPublished(THESIS_MANIFEST).map(({ slug }) => slug), THESIS_MANIFEST.map(({ slug }) => slug))
  assert.equal(THESIS_MANIFEST.length, 9)
})

test('thesis server content and article components keep a public semantic contract', () => {
  const publicContent = readFileSync(publicContentPath, 'utf8')
  const article = readFileSync(chapterArticlePath, 'utf8')
  const citations = readFileSync(citationListPath, 'utf8')
  const badge = readFileSync(maturityBadgePath, 'utf8')

  assert.match(publicContent, /getChapterBySlug/)
  assert.match(publicContent, /getChapterNavigation/)
  assert.match(publicContent, /getPublicCitations/)
  assert.doesNotMatch(publicContent, /['"]use client['"]/)
  assert.match(article, /<article/)
  assert.match(article, /<h1/)
  assert.match(article, /PublicCitationList/)
  assert.doesNotMatch(article, /['"]use client['"]|useState|useEffect/)
  assert.match(citations, /normalizePublicCitations/)
  assert.doesNotMatch(citations, /PUBLIC_CITATIONS|protocol === ['"]https:['"]/)
  assert.match(citations, /target=['"]_blank['"]/)
  assert.match(citations, /rel=['"]noreferrer['"]/)
  assert.doesNotMatch(citations, /citation\.id/)
  assert.match(badge, /normalizeMaturityStage/)
  assert.doesNotMatch(badge, /PUBLIC_PRODUCT_MATURITY|PUBLIC_INITIATIVE_MATURITY/)
  assert.match(badge, /<span/)
  assert.doesNotMatch(badge, /['"]use client['"]|dangerouslySetInnerHTML/)
})

test('thesis hub keeps the two reading entrances distinct from publication modes', () => {
  const hub = readFileSync(thesisHubPath, 'utf8')
  const page = readFileSync(thesisPagePath, 'utf8')

  assert.match(page, /ThesisHub/)
  assert.match(hub, /ChainfrenWordmark/)
  assert.match(hub, /href=['"]\/thesis\/read\/the-gap['"]/)
  assert.match(hub, /href=['"]\/thesis\/read\/the-company['"]/)
  for (const href of ['/thesis/short', '/thesis/read/the-gap', '/thesis/map', '/thesis/download']) {
    assert.match(hub, new RegExp(`['\\"]${href.replaceAll('/', '\\/')}['\\"]`))
  }
  assert.doesNotMatch(hub, /https?:\/\/[^'"\s]*(?:fonts|googleapis|typekit)/i)
})

test('the five-minute reader imports its dedicated MDX source without reader controls', () => {
  const page = readFileSync(shortReadPagePath, 'utf8')

  assert.match(page, /import\s+ShortRead\s+from\s+['"][^'"]*short-read\.mdx['"]/)
  assert.match(page, /<ShortRead\s*\/>/)
  for (const href of ['/thesis/read/the-gap', '/thesis/map', '/thesis/download']) {
    assert.match(page, new RegExp(`['\"]${href.replaceAll('/', '\\/')}['\"]`))
  }
  assert.doesNotMatch(page, /\.slice\s*\(|substring\s*\(|substr\s*\(/)
  assert.doesNotMatch(page, /ChapterRail|ReaderChrome|MobileContentsPanel|ChapterArticle/)
})

test('thesis discovery metadata uses canonical public URLs and unique chapter metadata', () => {
  const layout = readFileSync(thesisLayoutPath, 'utf8')
  const hub = readFileSync(thesisPagePath, 'utf8')
  const shortRead = readFileSync(shortReadPagePath, 'utf8')
  const reader = readFileSync(readerPagePath, 'utf8')
  const map = readFileSync(mapPagePath, 'utf8')
  const download = readFileSync(downloadPagePath, 'utf8')

  assert.match(layout, /metadataBase:\s*new URL\('https:\/\/www\.chainfren\.com'\)/)
  for (const source of [hub, shortRead, reader, map, download]) {
    assert.match(source, /alternates:\s*\{\s*canonical:/)
    assert.match(source, /openGraph:/)
    assert.match(source, /twitter:/)
  }
  assert.match(reader, /generateMetadata/)
  assert.match(reader, /chapter\.title/)
  assert.match(reader, /\/thesis\/read\/\$\{chapter\.slug\}/)
})

test('thesis social image is local, branded, and contains the approved thesis line', () => {
  const ogImage = readFileSync(ogImagePath, 'utf8')

  assert.match(ogImage, /new ImageResponse/)
  assert.match(ogImage, /contentType\s*=\s*['"]image\/png['"]/)
  assert.match(ogImage, /size\s*=\s*\{\s*width:\s*1200,\s*height:\s*630\s*\}/)
  assert.match(ogImage, /The Chainfren thesis/)
  assert.match(ogImage, /African creators have already won the attention\. The next fight is ownership\./)
  assert.match(ogImage, /#08153C|#09011B/)
  assert.match(ogImage, /#5ACDFF|#CBF0B8/)
  assert.match(ogImage, /logodark\.svg/)
  assert.doesNotMatch(ogImage, /borderRadius:\s*999/)
  assert.doesNotMatch(ogImage, /fetch\(|\.ttf|\.woff/i)
})

test('short and chapter pages render public article JSON-LD with release identifiers', () => {
  const shortRead = readFileSync(shortReadPagePath, 'utf8')
  const reader = readFileSync(readerPagePath, 'utf8')
  const articleJsonLd = readFileSync(articleJsonLdPath, 'utf8')

  assert.match(shortRead, /ArticleJsonLd/)
  assert.match(reader, /ArticleJsonLd/)
  for (const field of ['mainEntityOfPage', 'url', 'headline', 'description', 'dateModified', 'version', 'identifier', 'publisher']) {
    assert.match(articleJsonLd, new RegExp(field))
  }
  assert.match(articleJsonLd, /THESIS_CONTENT_VERSION/)
  assert.match(articleJsonLd, /THESIS_CONTENT_HASH/)
  assert.match(articleJsonLd, /url:\s*canonicalUrl/)
  assert.match(articleJsonLd, /application\/ld\+json/)
  assert.match(articleJsonLd, /escapeJsonForHtmlScript/)
  assert.match(articleJsonLd, /https:\/\/www\.chainfren\.com/)
})

test('article JSON-LD safely serializes a script-closing payload', () => {
  const unsafe = { headline: '</script><script>alert(1)</script>&\u2028\u2029' }
  const serialized = escapeJsonForHtmlScript(unsafe)

  assert.doesNotMatch(serialized, /<\/script>/i)
  assert.doesNotMatch(serialized, /[<>&\u2028\u2029]/)
  assert.match(serialized, /\\u003C\/script\\u003E/)
  assert.deepEqual(JSON.parse(serialized), unsafe)
})

test('the company footer exposes only the thesis discovery link added for this publication', () => {
  const stack = readFileSync(stackPath, 'utf8')
  const companyColumn = stack.match(/heading: 'Company',[\s\S]*?\n  \},\n\]/)?.[0] || ''

  assert.match(companyColumn, /\['The Chainfren thesis', '\/thesis'\]/)
})
