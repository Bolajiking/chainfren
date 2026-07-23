import Link from 'next/link'
import { ROADMAP_HORIZONS } from '@/content/chainfren-thesis/public-system.mjs'
import styles from '../thesis.module.css'

export default function RoadmapHorizons() {
  return (
    <section className={styles.publicSystem} aria-labelledby="roadmap-horizons-title">
      <h2 id="roadmap-horizons-title">Public horizons</h2>
      <ol>
        {ROADMAP_HORIZONS.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>{item.title}</Link>
            <p>{item.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
