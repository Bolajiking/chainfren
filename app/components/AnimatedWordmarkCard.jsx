'use client'
import React from 'react'
import { usePaletteCycle, EASE, FIG_MS, BG_MS } from './logoColorCycle'

// Wordmark variant where the H glyph cycles through the palette pair while
// the surrounding "c…ainfren" text follows the surface mode (navy on light,
// white on dark). Card bg + border animate in lockstep with the surface.
export default function AnimatedWordmarkCard({ className, style, fontSize = 64, socialHref, children, bare = false }) {
  const p = usePaletteCycle()
  const figTransition = `${FIG_MS}ms ${EASE}`
  const bgTransition = `${BG_MS}ms ${EASE}`

  const sw = 8
  const HM = {
    headR: 6, headY: 18,
    bodyTop: 26, barY: 52, hip: 86, footY: 132,
    lcx: 12, rcx: 56,
    vbW: 68, vbH: 140,
  }
  const hMarkAspect = HM.vbW / HM.vbH

  const figureStyle = (color) => ({
    stroke: color,
    fill: color,
    strokeWidth: sw,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    transition: `stroke ${figTransition}, fill ${figTransition}`,
  })

  return (
    <div
      className={className}
      style={bare ? {
        background: 'transparent',
        border: 'none',
        ...style,
      } : {
        background: p.bg,
        border: `2px solid ${p.border}`,
        transition: `background-color ${bgTransition}, border-color ${bgTransition}`,
        ...style,
      }}
    >
      <span
        role="img"
        aria-label="Chainfren"
        style={{
          fontFamily: 'var(--font-inter), "Inter Display", Inter, system-ui, sans-serif',
          fontWeight: 500,
          fontSize,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: p.text,
          transition: `color ${bgTransition}`,
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        <span aria-hidden="true">c</span>
        <span
          aria-hidden="true"
          style={{
            position: 'relative',
            display: 'inline-block',
            width: `${hMarkAspect * 1.4}em`,
            height: 0,
            marginInline: '0.02em',
            verticalAlign: 'baseline',
          }}
        >
          <svg
            viewBox={`0 0 ${HM.vbW} ${HM.vbH}`}
            style={{
              position: 'absolute',
              left: 0,
              bottom: '-0.286em',
              height: '1.4em',
              width: `${hMarkAspect * 1.4}em`,
              overflow: 'visible',
            }}
          >
            <g style={figureStyle(p.a)} fill="none">
              <line x1={HM.lcx} y1={HM.bodyTop} x2={HM.lcx} y2={HM.hip} />
              <line x1={HM.lcx} y1={HM.barY}   x2={(HM.lcx + HM.rcx) / 2} y2={HM.barY} />
              <line x1={HM.lcx} y1={HM.hip}    x2={HM.lcx - 8} y2={HM.footY} />
              <line x1={HM.lcx} y1={HM.hip}    x2={HM.lcx + 8} y2={HM.footY} />
              <circle cx={HM.lcx} cy={HM.headY} r={HM.headR} stroke="none" />
            </g>
            <g style={figureStyle(p.b)} fill="none">
              <line x1={HM.rcx} y1={HM.bodyTop} x2={HM.rcx} y2={HM.hip} />
              <line x1={(HM.lcx + HM.rcx) / 2} y1={HM.barY} x2={HM.rcx} y2={HM.barY} />
              <line x1={HM.rcx} y1={HM.hip}    x2={HM.rcx - 8} y2={HM.footY} />
              <line x1={HM.rcx} y1={HM.hip}    x2={HM.rcx + 8} y2={HM.footY} />
              <circle cx={HM.rcx} cy={HM.headY} r={HM.headR} stroke="none" />
            </g>
          </svg>
        </span>
        <span aria-hidden="true">ainfren</span>
      </span>
      {socialHref && (
        <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 16 }}>
          <a
            href={socialHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            style={{ color: p.text, transition: `color ${bgTransition}` }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      )}
      {children}
    </div>
  )
}
