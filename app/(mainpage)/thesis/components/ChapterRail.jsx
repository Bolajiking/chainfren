import Link from 'next/link'
import styles from '../thesis.module.css'

export default function ChapterRail({ chapters, currentSlug }) {
  return (
    <aside className={styles.chapterRail} aria-label="Chapter navigation">
      <p className={styles.railLabel}>Contents</p>
      <nav aria-label="Thesis chapters">
        <ol className={styles.chapterList}>
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link href={`/thesis/read/${chapter.slug}`} aria-current={chapter.slug === currentSlug ? 'page' : undefined}>
                <span>{chapter.id}</span>{chapter.title}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
