'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '../thesis.module.css'

export default function ShareControl({ title }) {
  const [showUrl, setShowUrl] = useState(false)
  const urlField = useRef(null)
  const shareUrl = typeof window === 'undefined' ? '' : window.location.href

  useEffect(() => {
    if (!showUrl) return
    urlField.current?.focus()
    urlField.current?.select()
  }, [showUrl])

  const share = async () => {
    const data = { title, url: window.location.href }
    try {
      if (navigator.share) {
        await navigator.share(data)
        return
      }
    } catch {
      // A declined native share should still offer the next safe fallback.
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(data.url)
        return
      }
    } catch {
      // Clipboard permissions are optional; expose a selectable URL instead.
    }

    setShowUrl(true)
  }

  return (
    <div className={styles.shareControl}>
      <button className={styles.mobileControl} type="button" onClick={share}>Share</button>
      {showUrl ? <input ref={urlField} aria-label="Share this chapter URL" className={styles.shareUrl} readOnly value={shareUrl} onFocus={(event) => event.currentTarget.select()} /> : null}
    </div>
  )
}
