import Link from 'next/link'
import ShortRead from '@/content/chainfren-thesis/short-read.mdx'
import ArticleJsonLd from '../components/ArticleJsonLd'
import styles from '../thesis.module.css'

const title = 'The Chainfren thesis, short read'
const description = 'A five-minute path through Chainfren’s public argument for how creators and communities can keep more of the relationships they build.'
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
      <ArticleJsonLd canonicalUrl={canonicalUrl} headline={title} description={description} dateModified="2026-07-21" />
      <article>
        <header>
          <p>Chainfren thesis, short read</p>
          <h1>Attention is the start. Ownership is the work after.</h1>
          <p>A five-minute path through the public argument for how creators and communities can keep more of the relationships they build.</p>
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
