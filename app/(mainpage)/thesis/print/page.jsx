import { THESIS_CONTENT_VERSION } from '@/content/chainfren-thesis/public-config.mjs'
import { THESIS_CONTENT_HASH } from '@/lib/thesis/content-hash.mjs'
import { getChapterComponent, getChapterCitations, getPublishedChapters, getPublicCitations } from '@/lib/thesis/public-content'
import styles from './print.module.css'

export const metadata = { title: 'Chainfren Thesis — Print Edition' }

export default function ThesisPrintPage() {
  const chapters = getPublishedChapters()
  const citations = getPublicCitations()
  return <main className={styles.print} data-thesis-print>
    <style>{'@media print { body:has(main[data-thesis-print]) header:has(nav[aria-label="Thesis navigation"]) { display: none !important; } }'}</style>
    <header className={styles.cover}><p>Chainfren</p><h1>The Chainfren Thesis</h1><p>Public edition · Version {THESIS_CONTENT_VERSION}</p><code>Source SHA-256: {THESIS_CONTENT_HASH}</code></header>
    <nav className={styles.contents} aria-label="Contents"><h2>Contents</h2><ol>{chapters.map((chapter) => <li key={chapter.slug}>{chapter.id}. {chapter.title}</li>)}</ol></nav>
    {chapters.map((chapter) => { const Content = getChapterComponent(chapter.slug); return <article className={styles.chapter} key={chapter.slug}><header><p>Chapter {chapter.id}</p><h2>{chapter.title}</h2><p>{chapter.summary}</p></header><Content />{getChapterCitations(chapter.slug).length ? <section><h3>Sources</h3><ul>{getChapterCitations(chapter.slug).map((citation) => <li key={citation.href}><a href={citation.href}>{citation.label}</a></li>)}</ul></section> : null}</article> })}
    <section className={styles.sources}><h2>Public citations</h2>{citations.length ? <ol>{citations.map((citation) => <li key={citation.href}><a href={citation.href}>{citation.label}</a></li>)}</ol> : <p>No external citations are required for this public edition.</p>}</section>
    <footer>Chainfren Thesis · {THESIS_CONTENT_VERSION} · {THESIS_CONTENT_HASH}</footer>
  </main>
}
