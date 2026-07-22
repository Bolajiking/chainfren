import OwnershipMapLoader from '../components/OwnershipMapLoader'
import OwnershipTree from '../components/OwnershipTree'
import { THESIS_CLAIMS } from '@/content/chainfren-thesis/claims.mjs'
import styles from '../thesis.module.css'

const title = 'Ownership map | The Chainfren thesis'
const description = 'Follow the public Chainfren argument, claim by claim, from attention to ownership.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/thesis/map' },
  openGraph: { title, description, url: '/thesis/map', type: 'website', images: ['/thesis/opengraph-image'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/thesis/opengraph-image'] },
}

export default function OwnershipMapPage() {
  return (
    <main className={styles.mapPage}>
      <header className={styles.mapIntro}>
        <p className={styles.kicker}>The ownership map</p>
        <h1>From attention to <em>ownership.</em></h1>
        <p>Follow the public argument, claim by claim. The outline below works without JavaScript; the map adds a desktop view when space permits.</p>
      </header>
      <OwnershipMapLoader />
      <OwnershipTree claims={THESIS_CLAIMS} />
    </main>
  )
}
