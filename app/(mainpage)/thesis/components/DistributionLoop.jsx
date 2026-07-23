import Link from 'next/link'
import { DISTRIBUTION_LOOP } from '@/content/chainfren-thesis/public-system.mjs'
import MaturityBadge from './MaturityBadge'
import styles from '../thesis.module.css'

export default function DistributionLoop() {
  return (
    <section className={styles.publicSystem} aria-labelledby="distribution-loop-title">
      <h2 id="distribution-loop-title">The distribution loop</h2>
      <ol>
        {DISTRIBUTION_LOOP.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>{item.title}</Link>
            {item.maturity ? <MaturityBadge stage={item.id} /> : null}
            <p>{item.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
