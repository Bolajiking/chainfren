import Link from 'next/link'
import MobileContentsPanel from './MobileContentsPanel'
import styles from '../thesis.module.css'

export default function ReaderChrome({ chapters, currentSlug, navigation }) {
  const previous = navigation.previous
  const next = navigation.next
  return (
    <>
      <div className={styles.mobileProgress} aria-label={`Reading chapter ${chapters.findIndex((chapter) => chapter.slug === currentSlug) + 1} of ${chapters.length}`}><span /></div>
      <nav className={styles.readerChrome} aria-label="Chapter controls">
        {previous ? <Link className={styles.mobileControl} href={`/thesis/read/${previous.slug}`}>Previous</Link> : <span className={styles.mobileControl} aria-hidden="true">Previous</span>}
        <MobileContentsPanel chapters={chapters} currentSlug={currentSlug} />
        {next ? <Link className={styles.mobileControl} href={`/thesis/read/${next.slug}`}>Continue</Link> : <Link className={styles.mobileControl} href="/thesis">Finish</Link>}
      </nav>
    </>
  )
}
