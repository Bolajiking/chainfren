import Link from 'next/link'
import { ArrowRight, BookOpen, Download, Map } from 'lucide-react'
import ChainfrenIcon from '@/app/components/ChainfrenIcon'
import ChainfrenWordmark from '@/app/components/ChainfrenWordmark'
import { Fren } from '@/app/components/Frens'
import ResumeReading from './ResumeReading'
import styles from '../thesis.module.css'

const modes = [
  { href: '/thesis/short', title: 'The short read', copy: 'A five-minute path through the argument.', icon: BookOpen, tone: 'cyan' },
  { href: '/thesis/read/the-gap', title: 'The full publication', copy: 'Nine chapters on attention, ownership, and value.', icon: ArrowRight, tone: 'paper' },
  { href: '/thesis/map', title: 'The ownership map', copy: 'Follow the public system from attention to participation.', icon: Map, tone: 'mint' },
  { href: '/thesis/download', title: 'Download PDF', copy: 'Keep the first public edition close.', icon: Download, tone: 'lime' },
]

export default function ThesisHub() {
  return (
    <main className={styles.hub}>
      <section className={styles.cover} aria-labelledby="thesis-title">
        <div className={styles.coverEyebrow}>
          <ChainfrenIcon size={30} ariaLabel="Chainfren mark" />
          <span>Publication 2026.1</span>
        </div>
        <div className={styles.coverCopy}>
          <p className={styles.kicker}>A public argument for a better internet from Lagos.</p>
          <h1 id="thesis-title">The Chainfren <em>thesis.</em></h1>
          <p className={styles.lede}>African creators have already won the attention. The next fight is ownership.</p>
          <div className={styles.entrances} aria-label="Choose your entrance">
            <Link href="/thesis/read/the-gap" className={styles.entrance}>
              <span>The mission</span>
              <strong>Why Chainfren exists</strong>
              <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link href="/thesis/read/the-company" className={styles.entrance}>
              <span>The company</span>
              <strong>What we build and how it connects</strong>
              <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
          <ResumeReading />
        </div>
        <div className={styles.coverArt} aria-hidden="true">
          <Fren pose="bridge" size={260} colorA="#08153C" colorB="#5ACDFF" />
          <ChainfrenWordmark fontSize={21} />
        </div>
      </section>

      <section className={styles.modeSection} aria-labelledby="publication-modes">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Choose your depth</p>
          <h2 id="publication-modes">One thesis, four ways in.</h2>
        </div>
        <div className={styles.modeGrid}>
          {modes.map(({ href, title, copy, icon: Icon, tone }) => (
            <Link key={href} href={href} className={`${styles.modeCard} ${styles[`mode${tone}`]}`}>
              <Icon size={24} strokeWidth={2} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
              <span className={styles.cardArrow} aria-hidden="true"><ArrowRight size={20} strokeWidth={2} /></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
