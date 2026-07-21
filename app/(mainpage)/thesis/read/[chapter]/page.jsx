import { notFound } from 'next/navigation'
import ChapterArticle from '../../components/ChapterArticle'
import ChapterRail from '../../components/ChapterRail'
import ReaderChrome from '../../components/ReaderChrome'
import styles from '../../thesis.module.css'
import { getChapterCitations, getChapterComponent, getChapterBySlug, getPublishedChapterNavigation, getPublishedChapters } from '@/lib/thesis/public-content'

export const generateStaticParams = () => getPublishedChapters().map((chapter) => ({ chapter: chapter.slug }))

export default function ThesisReaderPage({ params }) {
  const chapter = getChapterBySlug(params.chapter)
  const Content = getChapterComponent(params.chapter)
  if (!chapter || !Content) notFound()

  const chapters = getPublishedChapters()
  const navigation = getPublishedChapterNavigation(chapter.slug)
  return (
    <div className={styles.readerPage}>
      <a className={styles.skipLink} href="#chapter-content">Skip to chapter content</a>
      <div className={styles.readerGrid}>
        <ChapterRail chapters={chapters} currentSlug={chapter.slug} />
        <main id="chapter-content" className={styles.readerMain} tabIndex="-1">
          <ChapterArticle chapter={chapter} Content={Content} citations={getChapterCitations(chapter.slug)} />
          <nav className={styles.desktopPager} aria-label="Chapter navigation">
            {navigation.previous ? <Link href={`/thesis/read/${navigation.previous.slug}`}>Previous: {navigation.previous.title}</Link> : <span />}
            {navigation.next ? <Link href={`/thesis/read/${navigation.next.slug}`}>Continue: {navigation.next.title}</Link> : <Link href="/thesis">Back to thesis</Link>}
          </nav>
        </main>
        <aside className={styles.readerContext} aria-label="Chapter details"><span>{chapter.id}</span><strong>{chapter.readingMinutes} min read</strong><p>{chapter.lens}</p></aside>
      </div>
      <ReaderChrome chapters={chapters} currentSlug={chapter.slug} navigation={navigation} />
    </div>
  )
}
