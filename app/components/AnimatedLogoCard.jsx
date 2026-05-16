'use client'
import React from 'react'
import { usePaletteCycle, EASE, FIG_MS, BG_MS } from './logoColorCycle'

export default function AnimatedLogoCard({ className, style, social }) {
  const p = usePaletteCycle()
  const figTransition = `${FIG_MS}ms ${EASE}`
  const bgTransition = `${BG_MS}ms ${EASE}`

  return (
    <div
      className={className}
      style={{
        background: p.bg,
        border: `2px solid ${p.border}`,
        transition: `background-color ${bgTransition}, border-color ${bgTransition}`,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        role="img"
        aria-label="Chainfren mark"
        style={{ width: 'auto', height: '60%', maxHeight: 360 }}
      >
        <g
          style={{
            stroke: p.a,
            fill: p.a,
            transition: `stroke ${figTransition}, fill ${figTransition}`,
          }}
          strokeWidth={18}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="138" y1="78"  x2="138" y2="268" />
          <line x1="138" y1="140" x2="200" y2="140" />
          <line x1="138" y1="268" x2="118" y2="380" />
          <line x1="138" y1="268" x2="158" y2="380" />
          <circle cx="138" cy="50" r="24" stroke="none" />
        </g>
        <g
          style={{
            stroke: p.b,
            fill: p.b,
            transition: `stroke ${figTransition}, fill ${figTransition}`,
          }}
          strokeWidth={18}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="262" y1="78"  x2="262" y2="268" />
          <line x1="262" y1="140" x2="200" y2="140" />
          <line x1="262" y1="268" x2="242" y2="380" />
          <line x1="262" y1="268" x2="282" y2="380" />
          <circle cx="262" cy="50" r="24" stroke="none" />
        </g>
      </svg>
      {social}
    </div>
  )
}
