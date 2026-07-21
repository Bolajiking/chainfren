import { PUBLIC_PRODUCT_MATURITY, PUBLIC_INITIATIVE_MATURITY } from '@/content/chainfren-thesis/public-config.mjs'

const APPROVED_STAGES = [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]

const getApprovedStage = (stage) => {
  if (typeof stage === 'string') return APPROVED_STAGES.find((record) => record.id === stage) ?? null
  return APPROVED_STAGES.includes(stage) ? stage : null
}

export default function MaturityBadge({ stage }) {
  const approvedStage = getApprovedStage(stage)
  if (!approvedStage) return null

  return <span aria-label={`${approvedStage.label}: ${approvedStage.maturity}`}>{approvedStage.maturity}</span>
}
