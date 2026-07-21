import { normalizeMaturityStage } from '@/lib/thesis/public-presentation.mjs'

export default function MaturityBadge({ stage }) {
  const approvedStage = normalizeMaturityStage(stage)
  if (!approvedStage) return null

  return <span aria-label={`${approvedStage.label}: ${approvedStage.maturity}`}>{approvedStage.maturity}</span>
}
