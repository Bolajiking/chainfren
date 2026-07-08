'use client'
import React, { useEffect, useState } from 'react'

const DEFAULT_ACCENT = '#40ACFF'
const DARK = '#08153C'
const EO = 'cubic-bezier(0.22, 1, 0.36, 1)' // same easing as the nav mega-menu's open

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  )
}

// Shared "get notified" email capture — used wherever a feature isn't live yet
// (Star Factor links, Sabi's homepage subscribe) so every waitlist on the site
// feeds the same /api/contact newsletter list instead of one-off forms.
export default function NotifyModal({ open, onClose, source = 'unknown', accent = DEFAULT_ACCENT, title = "Be first to know.", line = "Drop your email and we'll let you know the moment it's ready." }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) return
    setEmail('')
    setError('')
    setSent(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("That email doesn't look right.")
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'newsletter', email, source }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Submission failed.')
      }
      setSent(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(8,21,60,0.28)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 32px)',
        animation: 'cf-notify-fade 180ms linear',
        fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif',
      }}
    >
      {/* Same glass treatment + easing as the nav's mega-menu panel (.cf-panel):
          translucent white, blurred, and a gentle translateY-in — so the
          "get notified" ask feels like part of the same nav system, not a
          separate heavy dialog. */}
      <style jsx global>{`
        @keyframes cf-notify-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cf-notify-rise { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div style={{
        position: 'relative', width: '100%', maxWidth: 420,
        background: 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(20px) saturate(140%)', WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        color: DARK,
        border: `1.5px solid ${DARK}`,
        borderRadius: 'clamp(18px, 3vw, 28px)',
        boxShadow: '0 20px 60px rgba(8,21,60,0.18)',
        padding: 'clamp(24px, 5vw, 40px)',
        animation: `cf-notify-rise 200ms ${EO}`,
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: 'absolute', top: 14, right: 14, width: 36, height: 36, borderRadius: 9999,
          background: 'rgba(8,21,60,0.05)', border: `1px solid rgba(8,21,60,0.14)`,
          color: DARK, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>

        {sent ? (
          <div style={{ padding: '8px 0' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: `${accent}26`, border: `1.5px solid ${accent}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: DARK, marginBottom: 20,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 450, letterSpacing: '-0.02em', marginBottom: 10 }}>You&apos;re on the list.</h2>
            <p style={{ fontSize: 14.5, color: 'rgba(8,21,60,0.65)', lineHeight: 1.55 }}>We&apos;ll email you the moment there&apos;s news.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 450, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 10 }}>{title}</h2>
            <p style={{ fontSize: 14.5, color: 'rgba(8,21,60,0.65)', lineHeight: 1.5, marginBottom: 22 }}>{line}</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoFocus
              style={{
                width: '100%', padding: '14px 18px', borderRadius: 14,
                background: 'rgba(255,255,255,0.6)', border: `1px solid rgba(8,21,60,0.18)`,
                color: DARK, fontFamily: 'inherit', fontSize: 15, outline: 'none',
              }}
            />
            {error && <p style={{ fontSize: 12.5, color: '#D6395C', marginTop: 10 }}>{error}</p>}
            <button type="submit" disabled={submitting} style={{
              width: '100%', marginTop: 16, padding: '16px 24px', borderRadius: 9999,
              background: DARK, color: '#fff', border: 'none',
              fontFamily: 'inherit', fontSize: 13.5, fontWeight: 450,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: submitting ? 'wait' : 'pointer', opacity: submitting ? 0.7 : 1,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {submitting ? 'Sending…' : <>Notify me <Arrow size={14} /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// Fire-and-forget open — any component anywhere in the tree can call this to
// summon the modal that SiteHeader mounts once per page, without prop drilling.
export function openNotify(source = 'unknown') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cf:open-notify', { detail: { source } }))
  }
}
