import 'server-only'

import { THESIS_MANIFEST } from '@/content/chainfren-thesis/manifest.mjs'
import { THESIS_CLAIMS } from '@/content/chainfren-thesis/claims.mjs'
import { PUBLIC_CITATIONS } from '@/content/chainfren-thesis/citations.mjs'
import { PUBLIC_CTAS, PUBLIC_PRODUCT_MATURITY, PUBLIC_INITIATIVE_MATURITY } from '@/content/chainfren-thesis/public-config.mjs'
import { CHAPTER_COMPONENTS } from './content-registry'

const chaptersBySlug = new Map(THESIS_MANIFEST.map((chapter) => [chapter.slug, chapter]))
const claimsById = new Map(THESIS_CLAIMS.map((claim) => [claim.id, claim]))
const citationsById = new Map(PUBLIC_CITATIONS.map((citation) => [citation.id, citation]))
const stageRecords = [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]
const stagesById = new Map(stageRecords.map((stage) => [stage.id, stage]))

export const getPublicChapters = () => THESIS_MANIFEST
export const getChapterBySlug = (slug) => chaptersBySlug.get(slug) ?? null
export const getChapterComponent = (slug) => CHAPTER_COMPONENTS[slug] ?? null
export const getChapterClaims = (slug) => {
  const chapter = getChapterBySlug(slug)
  return chapter ? chapter.mapClaimIds.map((id) => claimsById.get(id)).filter(Boolean) : []
}
export const getPublicCitations = (citationIds = []) => citationIds.map((id) => citationsById.get(id)).filter(Boolean)
export const getChapterCitations = (slug) => getPublicCitations(getChapterBySlug(slug)?.publicCitationIds ?? [])
export const getPublicStages = () => stageRecords
export const getPublicStage = (stage) => stagesById.get(stage) ?? null
export const getPublicCta = (key) => PUBLIC_CTAS[key] ?? null
export const getPublicCtas = () => PUBLIC_CTAS
export const getChapterNavigation = (slug) => {
  const index = THESIS_MANIFEST.findIndex((chapter) => chapter.slug === slug)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: THESIS_MANIFEST[index - 1] ?? null,
    next: THESIS_MANIFEST[index + 1] ?? null,
  }
}
