import { THESIS_CONTENT_VERSION } from '@/content/chainfren-thesis/public-config.mjs'
import { THESIS_CONTENT_HASH } from '@/content/chainfren-thesis/generated-content-hash.mjs'
import { getChapterCitations, getPublicCitations } from '@/lib/thesis/public-content'
import TheGap from '@/content/chainfren-thesis/chapters/01-the-gap.mdx'
import TheTrap from '@/content/chainfren-thesis/chapters/02-the-trap.mdx'
import TheUnlock from '@/content/chainfren-thesis/chapters/03-the-unlock.mdx'
import TheThesis from '@/content/chainfren-thesis/chapters/04-the-thesis.mdx'
import TheCompany from '@/content/chainfren-thesis/chapters/05-the-company.mdx'
import WhatWeBuild from '@/content/chainfren-thesis/chapters/06-what-we-build.mdx'
import HowWeWork from '@/content/chainfren-thesis/chapters/07-how-we-work.mdx'
import TheRoadAhead from '@/content/chainfren-thesis/chapters/08-the-road-ahead.mdx'
import BuildWithUs from '@/content/chainfren-thesis/chapters/09-build-with-us.mdx'
import { THESIS_MANIFEST } from '@/content/chainfren-thesis/manifest.mjs'
import styles from './print.module.css'

const title = 'Chainfren Thesis Print Edition'
const description = `Print layout of the public Chainfren thesis, version ${THESIS_CONTENT_VERSION}.`

export const metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: '/thesis/print' },
  openGraph: { title, description, url: '/thesis/print', type: 'article', images: ['/thesis/opengraph-image'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/thesis/opengraph-image'] },
}

const components = [TheGap, TheTrap, TheUnlock, TheThesis, TheCompany, WhatWeBuild, HowWeWork, TheRoadAhead, BuildWithUs]

export default function ThesisPrintPage() {
  const chapters = THESIS_MANIFEST
  const citations = getPublicCitations()
  return <main className={styles.print} data-thesis-print>
    <style>{'@media print { body:has(main[data-thesis-print]) header:has(nav[aria-label="Thesis navigation"]) { display: none !important; } }'}</style>
    <header className={styles.cover}><p>Chainfren</p><h1>The Chainfren Thesis</h1><p>Public edition · Version {THESIS_CONTENT_VERSION}</p><code>Source SHA-256: {THESIS_CONTENT_HASH}</code></header>
    <nav className={styles.contents} aria-label="Contents"><h2>Contents</h2><ol>{chapters.map((chapter) => <li key={chapter.slug}>{chapter.id}. {chapter.title}</li>)}</ol></nav>
    {chapters.map((chapter, index) => { const Content = components[index]; return <article className={styles.chapter} key={chapter.slug}><header><p>Chapter {chapter.id}</p><h2>{chapter.title}</h2><p>{chapter.summary}</p></header><Content />{getChapterCitations(chapter.slug).length ? <section><h3>Sources</h3><ul>{getChapterCitations(chapter.slug).map((citation) => <li key={citation.href}><a href={citation.href}>{citation.label}</a></li>)}</ul></section> : null}</article> })}
    <section className={styles.sources}><h2>Public citations</h2>{citations.length ? <ol>{citations.map((citation) => <li key={citation.href}><a href={citation.href}>{citation.label}</a></li>)}</ol> : <p>No external citations are required for this public edition.</p>}</section>
    <footer>Chainfren Thesis · {THESIS_CONTENT_VERSION} · {THESIS_CONTENT_HASH}</footer>
  </main>
}
