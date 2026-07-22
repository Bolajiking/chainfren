import OwnershipMapLoader from '../components/OwnershipMapLoader'
import OwnershipTree from '../components/OwnershipTree'
import { THESIS_CLAIMS, THESIS_EDGES } from '@/content/chainfren-thesis/claims.mjs'
import { THESIS_MAP_LAYOUT } from '@/content/chainfren-thesis/map-layout.mjs'
import styles from '../thesis.module.css'

export const metadata = { title: 'Ownership map | Chainfren thesis' }

export default function OwnershipMapPage() {
  return (
    <main className={styles.mapPage}>
      <header className={styles.mapIntro}>
        <p className={styles.kicker}>The ownership map</p>
        <h1>From attention to <em>ownership.</em></h1>
        <p>Follow the public argument, claim by claim. The outline below works without JavaScript; the map adds a desktop view when space permits.</p>
      </header>
      <OwnershipMapLoader claims={THESIS_CLAIMS} edges={THESIS_EDGES} layout={THESIS_MAP_LAYOUT} />
      <OwnershipTree claims={THESIS_CLAIMS} />
    </main>
  )
}
