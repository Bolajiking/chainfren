'use client'
import React from 'react'
import Link from 'next/link'
import ChainfrenWordmark from './ChainfrenWordmark'

const NAVY = '#08153C'
const MUTED = '#3A4868'
const FONT = "var(--font-inter), 'Inter Display', 'Inter', system-ui, -apple-system, sans-serif"

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
  return (
    <section
      id="cf-mobile-masthead"
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100%',
        marginInline: 'auto',
        padding: '32px 30px 40px',
        fontFamily: FONT,
        color: NAVY,
      }}
    >
      {/* Wordmark — fluid via clamp(), no JS measurement */}
      <div className="cf-mh-wordmark" aria-label="Chainfren">
        <ChainfrenWordmark color={NAVY} />
      </div>

      {/* Meta row: socials + solid CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
          width: '100%',
          marginTop: 14,
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 2 }}>
          <a
            href="https://x.com/chainfren"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chainfren on X"
            style={{ display: 'inline-flex', color: NAVY, opacity: 0.92 }}
          >
            <XIcon size={13} color={NAVY} />
          </a>
          <a
            href="https://linkedin.com/company/chainfren"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chainfren on LinkedIn"
            style={{ display: 'inline-flex', color: NAVY, opacity: 0.92 }}
          >
            <InIcon size={13} color={NAVY} />
          </a>
        </div>

        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '9px 15px',
            marginRight: 2,
            borderRadius: 9999,
            background: NAVY,
            border: `1.4px solid ${NAVY}`,
            color: '#FFFFFF',
            fontFamily: FONT,
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}
        >
          <span>GET STARTED</span>
          <ArrowGlyph color="#FFFFFF" size={9} />
        </Link>
      </div>

      {/* Headline — each line individually sized so it lands flush
          against the same column edges as the wordmark. Italic tail on
          the last line per the hero-section design spec. */}
      <h1 className="cf-mh-headline">
        <span className="cf-mh-headline__line cf-mh-headline__line--a">The growth engine</span>
        <span className="cf-mh-headline__line cf-mh-headline__line--b">powering Africa&apos;s</span>
        <span className="cf-mh-headline__line cf-mh-headline__line--c">creative force</span>
      </h1>

      {/* Subhead — per-line fit-to-column, matching the design spec
          line breaks for a clean rectangular text block. */}
      <div className="cf-mh-subhead">
        <span className="cf-mh-subhead__line cf-mh-subhead__line--a">The platforms took your audience, your</span>
        <span className="cf-mh-subhead__line cf-mh-subhead__line--b">data, and most of your money. Chainfren</span>
        <span className="cf-mh-subhead__line cf-mh-subhead__line--c">is the infrastructure for creators and</span>
        <span className="cf-mh-subhead__line cf-mh-subhead__line--d">brands ambitious enough to take it back.</span>
      </div>
    </section>
  )
}
