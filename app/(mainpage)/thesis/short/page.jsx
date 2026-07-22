import Link from 'next/link'
import ShortRead from '@/content/chainfren-thesis/short-read.mdx'
import styles from '../thesis.module.css'

export default function ShortThesisPage() {
  return (
    <main className={styles.shortRead}>
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
