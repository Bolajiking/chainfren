'use client'
// For Creators ⇄ For Brands — the homepage audience card, redesigned per the
// audience-cards-redesign-spec: two halves of one network, self-advancing,
// fren-illustrated, with strengthened copy. Same bento footprint as before
// (h-[529px], rounded-[26px], 2px border) — this is a content/interaction/
// illustration redesign inside the existing tile.
//
// Auto-advances every 5.5s; pauses on hover / focus / touch; arrows + swipe for
// manual control; a two-bar progress indicator makes the dual-state obvious.
// On each flip the fren remounts and replays its arrival (creator owns → brand
// pair meets and exchanges), while the accent color crossfades underneath.
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import AudienceFren from './AudienceFren'

const EO = 'cubic-bezier(0.22,1,0.36,1)'
const INTERVAL = 5500

const em = (t) => <em style={{ fontStyle: 'italic', fontWeight: 500 }}>{t}</em>

const SIDES = [
  {
    key: 'creators', label: 'For Creators', bg: '#08153C', fg: '#ffffff',
    headline: <>{em('Own')} your audience. Keep your money.</>,
    promise: 'Build the business the platforms wouldn’t let you build.',
    offer: <>Growth OS, owned media, AI, and paid brand deals. A solution stack to own the full value that your attention generates.</>,
    cta: 'Explore for creators', href: '/for-creators',
    ctaBg: '#ffffff', ctaFg: '#08153C', img: '/3d.png', imgOpacity: 0.16,
  },
  {
    key: 'brands', label: 'For Brands', bg: '#1DA6E2', fg: '#08153C',
    headline: <>Build culture people {em('own')}.</>,
    promise: 'Distribute on infrastructure you control and reach the audiences that actually convert.',
    offer: <>Community, AI, owned media, and access to Africa’s biggest creators. Everything you need to build culture and convert it.</>,
    cta: 'Explore for brands', href: '/for-brands',
    ctaBg: '#08153C', ctaFg: '#ffffff', img: '/3d4.png', imgOpacity: 0.3,
  },
]

function Chevron({ dir }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === 'prev' ? <><line x1="3" y1="12" x2="15" y2="12" /><path d="M9 6l-6 6 6 6" /></> : <><line x1="9" y1="12" x2="21" y2="12" /><path d="M15 6l6 6-6 6" /></>}
    </svg>
  )
}

export default function AudienceCard() {
  const [side, setSide] = useState(0)
  const [tick, setTick] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduce, setReduce] = useState(false)
  const touchX = useRef(null)

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setReduce(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  const flip = useCallback(() => { setSide((s) => 1 - s); setTick((t) => t + 1) }, [])

  // Auto-advance — re-armed on every flip (tick) and gated by pause/reduce.
  useEffect(() => {
    if (reduce || paused) return
    const t = setTimeout(flip, INTERVAL)
    return () => clearTimeout(t)
  }, [tick, paused, reduce, flip])

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; setPaused(true) }
  const onTouchEnd = (e) => {
    const start = touchX.current
    touchX.current = null
    setPaused(false)
    if (start == null) return
    const dx = e.changedTouches[0].clientX - start
    if (Math.abs(dx) > 44) flip()
  }

  const s = SIDES[side]

  return (
    <div
      className="border-[2px] border-dark-blue rounded-[26px] px-4 py-5 md:px-7 md:py-7 relative overflow-hidden h-[529px] flex flex-col"
      style={{ backgroundColor: s.bg, color: s.fg, transition: reduce ? 'none' : `background-color 560ms ${EO}, color 560ms ${EO}`, fontFamily: 'inherit' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="For Creators and For Brands"
    >
      {/* Iridescent object — demoted to a subtle background texture behind the frens */}
      <img src={s.img} alt="" aria-hidden="true" draggable="false"
        className="absolute pointer-events-none select-none"
        style={{ width: 402, height: 402, right: -66, bottom: -78, opacity: s.imgOpacity, transform: 'rotate(-6.58deg)', zIndex: 0, transition: reduce ? 'none' : 'opacity 560ms ease', objectFit: 'contain' }} />

      {/* Header — label + manual arrows */}
      <div className="relative z-10 flex items-center justify-between" style={{ minHeight: 22 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.label}</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={flip} aria-label="Previous" className="p-2 -m-1 hover:opacity-70 active:scale-90 transition" style={{ color: 'inherit', minWidth: 32, minHeight: 32 }}><Chevron dir="prev" /></button>
          <button type="button" onClick={flip} aria-label="Next" className="p-2 -m-1 hover:opacity-70 active:scale-90 transition" style={{ color: 'inherit', minWidth: 32, minHeight: 32 }}><Chevron dir="next" /></button>
        </div>
      </div>

      {/* Copy — headline (italic emphasis) → promise → offer line */}
      <div className="relative z-10" style={{ marginTop: 14 }}>
        <h2 style={{ fontSize: 26, lineHeight: 1.06, letterSpacing: '-0.028em', fontWeight: 500, margin: 0 }}>{s.headline}</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.32, margin: '11px 0 0', opacity: 0.92, letterSpacing: '-0.006em' }}>{s.promise}</p>
        <p style={{ fontSize: 12.5, lineHeight: 1.45, margin: '9px 0 0', opacity: 0.7 }}>{s.offer}</p>
      </div>

      {/* Fren stage — remounts on flip to replay the arrival choreography */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
        <AudienceFren key={s.key + '-' + tick} variant={s.key} reduce={reduce} style={{ width: 'min(232px, 66%)', aspectRatio: '1', maxHeight: '100%' }} />
      </div>

      {/* Footer — CTA + two-bar progress */}
      <div className="relative z-10 flex flex-col gap-3.5">
        <Link href={s.href}
          className="inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-transform active:scale-[0.98]"
          style={{ height: 52, background: s.ctaBg, color: s.ctaFg, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          <span>{s.cta}</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>
        </Link>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[0, 1].map((i) => (
            <div key={i} style={{ position: 'relative', width: 22, height: 4, borderRadius: 2, overflow: 'hidden' }}>
              <span style={{ position: 'absolute', inset: 0, background: 'currentColor', opacity: 0.25 }} />
              {i === side && (
                <span key={tick} style={{ position: 'absolute', inset: 0, background: 'currentColor', opacity: 0.95, borderRadius: 2, transformOrigin: 'left center', transform: (reduce || paused) ? 'scaleX(1)' : 'scaleX(0)', animation: (reduce || paused) ? 'none' : `cfAudProg ${INTERVAL}ms linear both` }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
