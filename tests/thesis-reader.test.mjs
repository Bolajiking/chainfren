import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { THESIS_MANIFEST } from '../content/chainfren-thesis/manifest.mjs'
import { CHAPTER_REGISTRY_SLUGS, createChapterRegistry } from '../lib/thesis/chapter-registry.mjs'

const root = new URL('..', import.meta.url)
const source = (path) => readFileSync(new URL(path, root), 'utf8')
const pagePath = 'app/(mainpage)/thesis/read/[chapter]/page.jsx'

test('reader route generates only chapters with registered MDX components', () => {
  const page = source(pagePath)
  const registry = createChapterRegistry(Object.fromEntries(CHAPTER_REGISTRY_SLUGS.map((slug) => [slug, () => null])))

  assert.match(page, /import\s+Link\s+from\s+['"]next\/link['"]/)
  assert.match(page, /generateStaticParams/)
  assert.match(page, /getPublishedChapters/)
  assert.match(page, /notFound\(\)/)
  assert.deepEqual(registry.getPublished(THESIS_MANIFEST).map(({ slug }) => slug), THESIS_MANIFEST.map(({ slug }) => slug))
  assert(THESIS_MANIFEST.every(({ slug }) => registry.get(slug)))
})

test('reader has the required semantic reading controls and navigation', () => {
  const page = source(pagePath)
  const article = source('app/(mainpage)/thesis/components/ChapterArticle.jsx')
  const rail = source('app/(mainpage)/thesis/components/ChapterRail.jsx')
  const chrome = source('app/(mainpage)/thesis/components/ReaderChrome.jsx')
  const panel = source('app/(mainpage)/thesis/components/MobileContentsPanel.jsx')
  const styles = source('app/(mainpage)/thesis/thesis.module.css')

  assert.match(page, /Skip to chapter content/)
  assert.match(page, /<main[^>]*id=['"]chapter-content['"]/)
  assert.match(article, /<article/)
  assert.match(article, /<h1/)
  assert.match(rail, /aria-current=\{[^}]*['"]page['"]/) 
  assert.match(rail, /href=\{`\/thesis\/read\/\$\{chapter\.slug\}`\}/)
  assert.match(chrome, /Previous/)
  assert.match(chrome, /Contents/)
  assert.match(chrome, /Continue/)
  assert.match(panel, /['"]use client['"]|['"]use client['"];/)
  assert.match(panel, /Escape/)
  assert.match(panel, /document\.body\.style\.overflow/)
  assert.match(panel, /focus\(\)/)
  assert.match(styles, /\.mobileControl\s*\{[^}]*min-height:\s*44px/s)
  assert.equal(existsSync(new URL('app/(mainpage)/thesis/components/ChapterRail.jsx', root)), true)
})

test('reader styles support desktop rail and mobile fixed controls accessibly', () => {
  const styles = source('app/(mainpage)/thesis/thesis.module.css')

  assert.match(styles, /@media \(min-width: 960px\)/)
  assert.match(styles, /position: fixed/)
  assert.match(styles, /padding-bottom:/)
  assert.match(styles, /\.desktopPager a\s*\{[^}]*display:\s*inline-flex[^}]*align-items:\s*center[^}]*min-height:\s*44px/s)
  assert.match(styles, /prefers-reduced-motion/)
  assert.doesNotMatch(styles, /body\s*\{[^}]*Georgia/s)
})

test('long-form prose keeps paragraph rhythm in the reader and the short read', () => {
  const styles = source('app/(mainpage)/thesis/thesis.module.css')

  assert.match(styles, /\.readerMain article :global\(p\)\s*\{[^}]*margin:\s*0 0 2[0-9]px/s)
  assert.match(styles, /\.shortRead article :global\(p\)\s*\{[^}]*margin:\s*0 0 2[0-9]px/s)
})
