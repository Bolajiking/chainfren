import Link from 'next/link'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import ChainfrenIcon from '@/app/components/ChainfrenIcon'
import ChainfrenWordmark from '@/app/components/ChainfrenWordmark'
import styles from '../thesis.module.css'

export default function ThesisNav() {
  return (
    <header className={styles.navWrap}>
      <nav className={styles.nav} aria-label="Thesis navigation">
        <Link href="/" className={styles.brandLink} aria-label="Chainfren home">
          <ChainfrenIcon size={26} ariaLabel="Chainfren mark" />
          <ChainfrenWordmark fontSize={20} />
        </Link>
        <div className={styles.navLinks}>
          <Link href="/thesis/read/the-gap">Read</Link>
          <Link href="/thesis/map">Map</Link>
          <Link href="/thesis/download" className={styles.navAction}>
            <BookOpen size={16} strokeWidth={2} aria-hidden="true" />
            PDF
            <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
