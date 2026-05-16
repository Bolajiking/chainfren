'use client'
import { useEffect, useRef, useState } from 'react'

// Two surface modes with three figure pairs each, per the design spec.
export const PALETTES = [
  // ── on-white ────────────────────────────────────────────────────────────
  { id: 'navy-navy',   mode: 'light', bg: '#FFFFFF', border: '#08153C', a: '#08153C', b: '#08153C', text: '#08153C' },
  { id: 'navy-blue',   mode: 'light', bg: '#FFFFFF', border: '#08153C', a: '#08153C', b: '#0091FF', text: '#08153C' },
  { id: 'navy-lime',   mode: 'light', bg: '#FFFFFF', border: '#08153C', a: '#08153C', b: '#C8EB6D', text: '#08153C' },
  // ── on-dark ─────────────────────────────────────────────────────────────
  { id: 'white-white', mode: 'dark',  bg: '#08153C', border: '#08153C', a: '#FFFFFF', b: '#FFFFFF', text: '#FFFFFF' },
  { id: 'white-blue',  mode: 'dark',  bg: '#08153C', border: '#08153C', a: '#FFFFFF', b: '#40ACFF', text: '#FFFFFF' },
  { id: 'lime-blue',   mode: 'dark',  bg: '#08153C', border: '#08153C', a: '#C8EB6D', b: '#40ACFF', text: '#FFFFFF' },
]

// Deep symmetric ease-in-out — no perceptible kick at either end.
export const EASE = 'cubic-bezier(0.4, 0, 0.6, 1)'
export const FIG_MS = 2200  // figure stroke/fill blend
export const BG_MS = 2800   // card bg/border + wordmark text blend (slower)

function pickNext(currentIdx) {
  if (PALETTES.length < 2) return 0
  let next = currentIdx
  while (next === currentIdx) {
    next = Math.floor(Math.random() * PALETTES.length)
  }
  return next
}

function pickDwell() {
  return 4500 + Math.floor(Math.random() * 3500) // 4.5s – 8.0s
}

// Independent random walk through the palette set. Each consumer gets its own
// rhythm — two cards on the same page won't tick in lockstep.
export function usePaletteCycle() {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef(null)
  useEffect(() => {
    const tick = () => {
      setIdx((curr) => pickNext(curr))
      timerRef.current = setTimeout(tick, pickDwell())
    }
    timerRef.current = setTimeout(tick, pickDwell())
    return () => clearTimeout(timerRef.current)
  }, [])
  return PALETTES[idx]
}
