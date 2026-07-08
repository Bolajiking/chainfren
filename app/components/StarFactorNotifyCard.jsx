'use client'
import React from 'react'
import { openNotify } from './NotifyModal'

const SERIF = 'Georgia, "Times New Roman", serif'

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  )
}

function Eyebrow({ children, color }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{children}</span>
  )
}

// Star Factor's bento treatment — same premium dark/gradient language used for
// its live-in-public tile elsewhere on the site. Renders as a button (not a
// link out to starfactor.xyz) because the site isn't live yet; clicking opens
// the shared NotifyModal instead.
export default function StarFactorNotifyCard({ cardBase, cf }) {
  return (
    <button
      type="button"
      onClick={() => openNotify('products-star-factor')}
      className="cf-starfactor-card"
      style={{
        ...cardBase,
        background: cf.dark,
        color: cf.white,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        textAlign: 'left',
        width: '100%',
        font: 'inherit',
        cursor: 'pointer',
        border: `2px solid ${cf.dark}`,
        borderRadius: 28,
        backgroundImage: `radial-gradient(60% 50% at 88% 0%, ${cf.coral}77 0%, transparent 60%), radial-gradient(55% 45% at 10% 0%, ${cf.lime}66 0%, transparent 60%), radial-gradient(70% 60% at 95% 100%, ${cf.cyan}55 0%, transparent 60%), radial-gradient(80% 60% at 0% 100%, ${cf.periwinkle}66 0%, transparent 60%)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10.5, fontWeight: 480, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: cf.lime, boxShadow: `0 0 0 4px ${cf.lime}33`, animation: 'cf-pulse 2s infinite' }} />
          Coming Soon
        </span>
        <span style={{ fontSize: 10, fontWeight: 450, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Lagos</span>
      </div>

      <div style={{ flex: 1, padding: '18px 18px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14, minHeight: 108 }}>
        <Eyebrow color={cf.lime}>Onchain Entertainment</Eyebrow>
        <div>
          <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 450, fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', lineHeight: 0.95, letterSpacing: '-0.02em', background: `linear-gradient(110deg, ${cf.lime} 0%, ${cf.coral} 35%, ${cf.cyan} 70%, ${cf.periwinkle} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Star Factor.</div>
          <p style={{ fontSize: 12.5, lineHeight: 1.45, color: 'rgba(255,255,255,0.75)', marginTop: 8, maxWidth: 320 }}>
            Africa&apos;s first onchain reality entertainment platform. Launching soon — be first to know.
          </p>
        </div>
      </div>

      <div style={{ padding: '12px 18px 14px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.18)', position: 'relative', overflow: 'hidden' }}>
            <span className="cf-starfactor-scrub" style={{ position: 'absolute', inset: 0, width: '38%', borderRadius: 2, background: `linear-gradient(90deg, ${cf.lime}, ${cf.coral}, ${cf.cyan})` }} />
          </span>
          <span style={{ fontSize: 10, fontWeight: 450, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>SOON</span>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 450, letterSpacing: '0.08em', textTransform: 'uppercase', color: cf.white }}>
          Get notified <Arrow size={11} />
        </span>
      </div>
    </button>
  )
}
