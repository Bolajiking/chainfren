import Link from 'next/link'
import { VALUE_PATH } from '@/content/chainfren-thesis/public-system.mjs'
import styles from '../thesis.module.css'

export default function ValuePath() {
  return (
    <section className={styles.publicSystem} aria-labelledby="value-path-title">
      <h2 id="value-path-title">The value path</h2>
      <ol>
        {VALUE_PATH.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>{item.title}</Link>
            <p>{item.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
