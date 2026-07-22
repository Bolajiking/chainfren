import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const registryPath = new URL('../lib/thesis/content-registry.js', import.meta.url)
const publicContentPath = new URL('../lib/thesis/public-content.js', import.meta.url)
const chapterArticlePath = new URL('../app/(mainpage)/thesis/components/ChapterArticle.jsx', import.meta.url)
const citationListPath = new URL('../app/(mainpage)/thesis/components/PublicCitationList.jsx', import.meta.url)
const maturityBadgePath = new URL('../app/(mainpage)/thesis/components/MaturityBadge.jsx', import.meta.url)
const thesisHubPath = new URL('../app/(mainpage)/thesis/components/ThesisHub.jsx', import.meta.url)
const thesisPagePath = new URL('../app/(mainpage)/thesis/page.jsx', import.meta.url)
const readerPagePath = new URL('../app/(mainpage)/thesis/read/[chapter]/page.jsx', import.meta.url)

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
  const content = readFileSync(publicContentPath, 'utf8')

  assert.match(reader, /generateStaticParams\s*=\s*\(\)\s*=>\s*getPublishedChapters\(\)\.map\(\(chapter\)\s*=>\s*\(\{\s*chapter:\s*chapter\.slug\s*\}\)\)/)
  assert.match(content, /THESIS_MANIFEST\.filter\(\(chapter\)\s*=>\s*CHAPTER_COMPONENTS\[chapter\.slug\]\)/)
  assert.equal(publishedChapters.length, 9)
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
