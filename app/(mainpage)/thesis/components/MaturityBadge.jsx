import { normalizeMaturityStage } from '@/lib/thesis/public-presentation.mjs'
import styles from '../thesis.module.css'

export default function MaturityBadge({ stage }) {
  const approvedStage = normalizeMaturityStage(stage)
  if (!approvedStage) return null

  return (
    <span className={styles.maturityBadge} aria-label={`${approvedStage.label}: ${approvedStage.displayMaturity}`}>
      {approvedStage.displayMaturity}
    </span>
  )
}
