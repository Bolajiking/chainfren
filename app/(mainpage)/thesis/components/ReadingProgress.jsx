'use client'

import { useEffect } from 'react'
import { getThesisStorage, writeThesisProgress } from '@/lib/thesis/progress.mjs'

export default function ReadingProgress({ chapterSlug }) {
  useEffect(() => {
    const storage = getThesisStorage(window)
    const write = () => writeThesisProgress(storage, chapterSlug)
    const timeout = window.setTimeout(write, 0)
    return () => window.clearTimeout(timeout)
  }, [chapterSlug])

  return null
}
