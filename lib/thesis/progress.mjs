export const THESIS_PROGRESS_STORAGE_KEY = 'chainfren-thesis-progress-v1'
export const THESIS_CONTENT_VERSION = '2026.1'

const isIsoTimestamp = (value) => typeof value === 'string' && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString() === value

export const createThesisProgress = (chapterSlug, now = new Date()) => ({
  chapterSlug,
  updatedAt: now.toISOString(),
  contentVersion: THESIS_CONTENT_VERSION,
})

export const isCurrentThesisProgress = (progress, chapters) => (
  Boolean(progress)
  && typeof progress.chapterSlug === 'string'
  && isIsoTimestamp(progress.updatedAt)
  && progress.contentVersion === THESIS_CONTENT_VERSION
  && Array.isArray(chapters)
  && chapters.some((chapter) => chapter?.slug === progress.chapterSlug)
)

export function readThesisProgress(storage, chapters) {
  try {
    if (!storage?.getItem) return null
    const progress = JSON.parse(storage.getItem(THESIS_PROGRESS_STORAGE_KEY))
    return isCurrentThesisProgress(progress, chapters) ? progress : null
  } catch {
    return null
  }
}

export function writeThesisProgress(storage, chapterSlug, now = new Date()) {
  try {
    if (!storage?.setItem || typeof chapterSlug !== 'string' || !chapterSlug) return false
    storage.setItem(THESIS_PROGRESS_STORAGE_KEY, JSON.stringify(createThesisProgress(chapterSlug, now)))
    return true
  } catch {
    return false
  }
}
