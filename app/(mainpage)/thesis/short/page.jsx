import Link from 'next/link'
import ShortRead from '@/content/chainfren-thesis/short-read.mdx'
import ArticleJsonLd from '../components/ArticleJsonLd'
import { THESIS_CONTENT_VERSION } from '@/content/chainfren-thesis/public-config.mjs'
import styles from '../thesis.module.css'

const title = 'The Chainfren thesis, short read'
const description = 'A five-minute path through Chainfren’s argument for how Africans can turn attention into participation, ownership, and value.'
const canonicalUrl = 'https://www.chainfren.com/thesis/short'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/thesis/short' },
  openGraph: { title, description, url: '/thesis/short', type: 'article', images: ['/thesis/opengraph-image'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/thesis/opengraph-image'] },
}

export default function ShortThesisPage() {
  return (
    <main className={styles.shortRead}>
      <ArticleJsonLd canonicalUrl={canonicalUrl} headline={title} description={description} dateModified="2026-08-26" />
      <article>
        <header>
          <p>Chainfren thesis {THESIS_CONTENT_VERSION}, short read</p>
          <h1>Attention is the start. Ownership is the work after.</h1>
          <p>A five-minute path through the argument for how Africans can turn attention into participation, ownership, and value.</p>
        </header>
        <ShortRead />
      </article>
      <nav className={styles.shortReadLinks} aria-label="Continue exploring the thesis">
        <Link href="/thesis/read/the-gap">Read the full thesis</Link>
        <Link href="/thesis/map">View the ownership map</Link>
        <Link href="/thesis/download">Download the PDF</Link>
      </nav>
    </main>
  )
}
