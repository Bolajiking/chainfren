'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ChainfrenWordmark from './ChainfrenWordmark'

const NAVY = '#08153C'
const MUTED = '#3A4868'
const FONT = "'Inter Display', 'Inter', system-ui, -apple-system, sans-serif"

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useFit(deps) {
  const wrapRef = useRef(null)
  const inkRef = useRef(null)
  const [state, setState] = useState({ scale: 1, height: 0 })

  useIsoLayoutEffect(() => {
    if (!wrapRef.current || !inkRef.current) return
    const measure = () => {
      const target = wrapRef.current?.clientWidth || 0
      const natW = inkRef.current?.offsetWidth || 0
      const natH = inkRef.current?.offsetHeight || 0
      if (!target || !natW) return
      const next = target / natW
      setState((prev) => {
        const nextH = natH * next
        if (Math.abs(prev.scale - next) < 0.001 && Math.abs(prev.height - nextH) < 0.5) return prev
        return { scale: next, height: nextH }
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(wrapRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { wrapRef, inkRef, scale: state.scale, height: state.height }
}

function FitText({
  children,
  baseFontSize = 48,
  fontWeight = 600,
  letterSpacing = '-0.035em',
  lineHeight = 1,
  color = NAVY,
  italic = false,
}) {
  const { wrapRef, inkRef, scale, height } = useFit([baseFontSize, fontWeight, letterSpacing, lineHeight, italic, children])
  return (
    <div ref={wrapRef} style={{ width: '100%', height: height || baseFontSize * lineHeight, position: 'relative', overflow: 'visible' }}>
      <div
        ref={inkRef}
        style={{
          position: 'absolute', left: 0, top: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          whiteSpace: 'nowrap',
          fontFamily: FONT,
          fontSize: baseFontSize,
          fontWeight,
          fontStyle: italic ? 'italic' : 'normal',
          letterSpacing,
          lineHeight,
          color,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function FitWordmark({ baseFontSize = 92, color = NAVY }) {
  const { wrapRef, inkRef, scale, height } = useFit([baseFontSize, color])
  return (
    <div ref={wrapRef} style={{ width: '100%', height: height || baseFontSize * 1.05, position: 'relative', overflow: 'visible' }}>
      <div
        ref={inkRef}
        style={{
          position: 'absolute', left: 0, top: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        <ChainfrenWordmark color={color} fontSize={baseFontSize} />
      </div>
    </div>
  )
}

function XIcon({ size = 16, color = NAVY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-label="X">
      <path d="M9.52 6.87 15.04 0.5h-1.31L8.94 6.04 5.1 0.5H0.68l5.78 8.42L0.68 15.5h1.31l5.05-5.85 4.04 5.85h4.42L9.52 6.87Zm-1.79 2.07-0.59-0.84-4.66-6.66h2.01l3.76 5.38 0.59 0.84 4.88 6.99h-2.01L7.73 8.94Z" fill={color}/>
    </svg>
  )
}

function InIcon({ size = 16, color = NAVY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-label="LinkedIn">
      <path d="M3.6 2.4a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8ZM2.3 6.2h2.6V14H2.3V6.2Zm4.3 0h2.5v1.07h.04c.35-.6 1.2-1.27 2.47-1.27 2.64 0 3.13 1.6 3.13 3.7V14h-2.6V10.2c0-.9-.02-2.07-1.34-2.07-1.34 0-1.55.97-1.55 2v3.87H6.6V6.2Z" fill={color}/>
    </svg>
  )
}

function ArrowGlyph({ size = 11, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M2 9 L9 2 M9 2 H3.5 M9 2 V7.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function MobileHero() {
  const headlineLines = ['The growth engine', "powering Africa's", 'creative force']
  const subheadLines = [
    'The platforms took your audience, your',
    'data, and most of your money. Chainfren',
    'is the infrastructure for creators and',
    'brands ambitious enough to take it back.',
  ]
  const lastIdx = headlineLines.length - 1

  return (
    <section
      id="cf-mobile-masthead"
      style={{
        position: 'relative',
        padding: '32px 30px 40px',
        fontFamily: FONT,
        color: NAVY,
      }}
    >
      {/* Wordmark — auto-fits column width */}
      <div style={{ marginBottom: 14 }}>
        <FitWordmark baseFontSize={92} color={NAVY} />
      </div>

      {/* Meta row: socials + solid CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
          width: '100%',
          marginBottom: 26,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <a
            href="https://x.com/chainfren"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chainfren on X"
            style={{ display: 'inline-flex', color: NAVY, opacity: 0.92, transition: 'opacity 200ms' }}
          >
            <XIcon size={15} color={NAVY} />
          </a>
          <a
            href="https://linkedin.com/company/chainfren"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chainfren on LinkedIn"
            style={{ display: 'inline-flex', color: NAVY, opacity: 0.92, transition: 'opacity 200ms' }}
          >
            <InIcon size={15} color={NAVY} />
          </a>
        </div>

        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '11px 18px',
            borderRadius: 9999,
            background: NAVY,
            border: `1.4px solid ${NAVY}`,
            color: '#FFFFFF',
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            transition: 'transform 220ms cubic-bezier(.22,1,.36,1), background 220ms, opacity 220ms',
          }}
        >
          <span>GET STARTED</span>
          <ArrowGlyph color="#FFFFFF" size={10} />
        </Link>
      </div>

      {/* Headline — three lines, last is italic (italic-tail accent) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
        {headlineLines.map((line, i) => (
          <FitText
            key={i}
            baseFontSize={37}
            fontWeight={600}
            letterSpacing="-0.035em"
            lineHeight={1}
            color={NAVY}
            italic={i === lastIdx}
          >
            {line}
          </FitText>
        ))}
      </div>

      {/* Subhead — fit per line for a tight rectangular block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {subheadLines.map((line, i) => (
          <FitText
            key={i}
            baseFontSize={14}
            fontWeight={400}
            letterSpacing="0"
            lineHeight={1.18}
            color={MUTED}
          >
            {line}
          </FitText>
        ))}
      </div>
    </section>
  )
}
