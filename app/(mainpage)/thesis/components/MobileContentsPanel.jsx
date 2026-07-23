'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import styles from '../thesis.module.css'

export default function MobileContentsPanel({ chapters, currentSlug }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab') return
      const focusable = [...document.querySelectorAll('[data-thesis-contents] a, [data-thesis-contents] button')]
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      buttonRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <button ref={buttonRef} className={styles.mobileControl} type="button" aria-expanded={open} aria-controls="thesis-contents-panel" onClick={() => setOpen(true)}>Contents</button>
      {open && (
        <div className={styles.contentsDialog} id="thesis-contents-panel" role="dialog" aria-modal="true" aria-label="Thesis contents" data-thesis-contents>
          <div className={styles.contentsSheet}>
            <div className={styles.contentsHeader}><strong>Contents</strong><button ref={closeRef} className={styles.closeContents} type="button" onClick={() => setOpen(false)} aria-label="Close contents"><X aria-hidden="true" size={20} /></button></div>
            <ol className={styles.contentsList}>
              {chapters.map((chapter) => <li key={chapter.slug}><Link href={`/thesis/read/${chapter.slug}`} aria-current={chapter.slug === currentSlug ? 'page' : undefined} onClick={() => setOpen(false)}><span>{chapter.id}</span>{chapter.title}</Link></li>)}
            </ol>
          </div>
        </div>
      )}
    </>
  )
}
