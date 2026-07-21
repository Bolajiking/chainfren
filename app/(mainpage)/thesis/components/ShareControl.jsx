'use client'

import { useEffect, useRef, useState } from 'react'
import { selectShareUrl, shareThesisChapter } from '@/lib/thesis/sharing.mjs'
import styles from '../thesis.module.css'

export default function ShareControl({ title }) {
  const [showUrl, setShowUrl] = useState(false)
  const urlField = useRef(null)
  const shareUrl = typeof window === 'undefined' ? '' : window.location.href

  useEffect(() => {
    if (!showUrl) return
    selectShareUrl(urlField.current)
  }, [showUrl])

  const share = async () => {
    const data = { title, url: window.location.href }
    if (await shareThesisChapter(data, navigator) === 'manual') setShowUrl(true)
  }

  return (
    <div className={styles.shareControl}>
      <button className={styles.mobileControl} type="button" onClick={share}>Share</button>
      {showUrl ? <input ref={urlField} aria-label="Share this chapter URL" className={styles.shareUrl} readOnly value={shareUrl} onFocus={(event) => event.currentTarget.select()} /> : null}
    </div>
  )
}
