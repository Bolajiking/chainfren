import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const registryPath = new URL('../lib/thesis/content-registry.js', import.meta.url)
const publicContentPath = new URL('../lib/thesis/public-content.js', import.meta.url)
const chapterArticlePath = new URL('../app/(mainpage)/thesis/components/ChapterArticle.jsx', import.meta.url)
const citationListPath = new URL('../app/(mainpage)/thesis/components/PublicCitationList.jsx', import.meta.url)
const maturityBadgePath = new URL('../app/(mainpage)/thesis/components/MaturityBadge.jsx', import.meta.url)

test('chapter registry uses static imports for the published MDX chapters', () => {
  const registry = readFileSync(registryPath, 'utf8')

  assert.match(registry, /import\s+TheGap\s+from\s+['"][^'"]*01-the-gap\.mdx['"]/)
  assert.match(registry, /import\s+TheCompany\s+from\s+['"][^'"]*05-the-company\.mdx['"]/)
  assert.match(registry, /['"]the-gap['"]\s*:\s*TheGap/)
  assert.match(registry, /['"]the-company['"]\s*:\s*TheCompany/)
  assert.doesNotMatch(registry, /import\s*\(/)
  assert.doesNotMatch(registry, /\$\{[^}]+\}/)
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
  assert.match(citations, /PUBLIC_CITATIONS/)
  assert.match(citations, /protocol === ['"]https:['"]/)
  assert.match(citations, /target=['"]_blank['"]/)
  assert.match(citations, /rel=['"]noreferrer['"]/)
  assert.doesNotMatch(citations, /citation\.id/)
  assert.match(badge, /PUBLIC_PRODUCT_MATURITY|PUBLIC_INITIATIVE_MATURITY/)
  assert.match(badge, /<span/)
  assert.doesNotMatch(badge, /['"]use client['"]|dangerouslySetInnerHTML/)
})
