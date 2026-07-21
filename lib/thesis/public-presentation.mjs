import { PUBLIC_CITATIONS } from '../../content/chainfren-thesis/citations.mjs'
import { PUBLIC_PRODUCT_MATURITY, PUBLIC_INITIATIVE_MATURITY } from '../../content/chainfren-thesis/public-config.mjs'

const APPROVED_STAGES = [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]

const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export const normalizeMaturityStage = (stage, records = APPROVED_STAGES) => {
  const approvedStage = typeof stage === 'string'
    ? records.find((record) => record.id === stage)
    : records.includes(stage) ? stage : null
  if (!approvedStage || typeof approvedStage.label !== 'string' || typeof approvedStage.maturity !== 'string') return null
  return { label: approvedStage.label, maturity: approvedStage.maturity }
}

export const normalizePublicCitations = (citations, records = PUBLIC_CITATIONS) => {
  if (!Array.isArray(citations)) return []
  const approvedRecords = new Set(records)
  return citations.flatMap((citation) => {
    if (!approvedRecords.has(citation)) return []
    if (typeof citation.title !== 'string' || typeof citation.publisher !== 'string' || !isHttpsUrl(citation.url)) return []
    return [{ title: citation.title, publisher: citation.publisher, url: citation.url }]
  })
}
