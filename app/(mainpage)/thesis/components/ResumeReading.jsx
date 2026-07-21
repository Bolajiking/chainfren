'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { readThesisProgress } from '@/lib/thesis/progress.mjs'
import styles from '../thesis.module.css'

export default function ResumeReading({ chapters }) {
  const [chapter, setChapter] = useState(null)

  useEffect(() => {
    const progress = readThesisProgress(window.localStorage, chapters)
    setChapter(chapters.find((item) => item.slug === progress?.chapterSlug) ?? null)
  }, [chapters])

  if (!chapter) return null

  return <Link className={styles.resumeReading} href={`/thesis/read/${chapter.slug}`}>Resume: {chapter.title}</Link>
}
