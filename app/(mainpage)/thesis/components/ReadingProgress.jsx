'use client'

import { useEffect } from 'react'
import { writeThesisProgress } from '@/lib/thesis/progress.mjs'

export default function ReadingProgress({ chapterSlug }) {
  useEffect(() => {
    const write = () => writeThesisProgress(window.localStorage, chapterSlug)
    const timeout = window.setTimeout(write, 0)
    return () => window.clearTimeout(timeout)
  }, [chapterSlug])

  return null
}
