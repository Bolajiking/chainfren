'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ChainfrenWordmark from './ChainfrenWordmark'

const DARK = '#08153C'
const WHITE = '#FFFFFF'
const DEFAULT_ACCENT = '#40ACFF'

export const DEFAULT_LINKS = [
  { label: 'Agency', href: '/agency' },
  { label: 'Product', href: '/products' },
  { label: 'Media', href: '/media' },
]
export const DEFAULT_CTA = { label: 'Join Chainfren', href: '/contact' }

const SECTION_NAV = [
  { label: 'Agency',   sub: 'Done-for-you growth systems',  href: '/agency',   color: '#40ACFF' },
  { label: 'Products', sub: 'TiVi · TVinBio · Comeownity',  href: '/products', color: '#8DAAFF' },
  { label: 'Media',    sub: 'Watch and read from Chainfren', href: '/media',    color: '#CBF0B8' },
]

function Chevron({ open, color = DARK }) {
  return (
    <svg
      width="9" height="9" viewBox="0 0 12 12" fill="none"
      style={{
        marginLeft: 4,
        transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path d="M3 4.5L6 7.5L9 4.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MiniPill({ item, isCurrent, onNavigate }) {
  const [hover, setHover] = useState(false)
  const bg = isCurrent || hover ? item.color : `color-mix(in srgb, ${item.color} 50%, #FFFFFF)`
  const height = isCurrent ? 26 : 21
  const pad = isCurrent ? '0 14px' : '0 10px'
  const fontSize = isCurrent ? 11 : 9.5
  const borderWidth = isCurrent ? 1.5 : 1
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-current={isCurrent ? 'page' : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        height, padding: pad,
        fontSize, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: DARK, background: bg,
        border: `${borderWidth}px solid ${DARK}`, borderRadius: 9999,
        textDecoration: 'none', fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        transition: 'background 180ms, transform 180ms',
        transform: hover && !isCurrent ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {item.label}
    </Link>
  )
}

function BadgeDropdown({ label, accent }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 2,
          fontSize: 11, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: DARK, padding: '4px 12px', border: `1.5px solid ${DARK}`, borderRadius: 9999,
          background: accent, cursor: 'pointer', fontFamily: 'inherit',
          lineHeight: 1, height: 26,
          transition: 'transform 180ms, box-shadow 180ms',
          boxShadow: open ? `0 0 0 4px ${accent}55` : 'none',
        }}
      >
        {label}
        <Chevron open={open} />
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
            zIndex: 60,
            animation: 'cf-dd-rise 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {SECTION_NAV.filter((it) => it.label.toLowerCase() !== label.toLowerCase()).map((it) => (
            <MiniPill key={it.label} item={it} isCurrent={false} onNavigate={() => setOpen(false)} />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes cf-dd-rise {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default function SiteHeader({
  accent = DEFAULT_ACCENT,
  badgeLabel,
  links = [],
  cta,
}) {
  const [open, setOpen] = useState(false)

  const handleLinkClick = (link) => (e) => {
    if (link.anchor) {
      e.preventDefault()
      document.querySelector(link.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
  }

  const linkStyle = {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: 12, fontWeight: 420, letterSpacing: '0.06em', textTransform: 'uppercase',
    color: DARK, fontFamily: 'inherit', textDecoration: 'none',
    padding: 0,
  }

  const ctaStyle = {
    height: 40, padding: '0 18px', borderRadius: 9999,
    border: `1.5px solid ${DARK}`, background: DARK, color: WHITE,
    fontFamily: 'inherit', fontSize: 11.5, fontWeight: 450,
    letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', textDecoration: 'none',
    whiteSpace: 'nowrap',
  }

  const renderLink = (link, style) => {
    if (link.anchor) {
      return (
        <button key={link.label} onClick={handleLinkClick(link)} style={style}>
          {link.label}
        </button>
      )
    }
    return (
      <Link key={link.label} href={link.href || '#'} onClick={handleLinkClick(link)} style={style}>
        {link.label}
      </Link>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 8px 8px', background: 'transparent', position: 'relative', zIndex: 50 }}>
        <nav className="site-header-pill" style={{
          width: 720, maxWidth: '100%', height: 56, padding: '0 8px 0 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1.5px solid ${DARK}`, borderRadius: 9999,
          boxShadow: '0 8px 30px rgba(8,21,60,0.08)',
          fontFamily: '"Inter Display", "Inter", sans-serif',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <ChainfrenWordmark color={DARK} fontSize={22} />
            </Link>
            {badgeLabel && <BadgeDropdown label={badgeLabel} accent={accent} />}
          </div>

          {links.length > 0 && (
            <div className="site-header-links" style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
              {links.map((l) => renderLink(l, linkStyle))}
            </div>
          )}

          {cta && (
            cta.onClick ? (
              <button type="button" className="site-header-cta" onClick={cta.onClick} style={{ ...ctaStyle, cursor: 'pointer' }}>
                {cta.label}
              </button>
            ) : (
              <Link href={cta.href || '#'} className="site-header-cta" style={ctaStyle}>
                {cta.label}
              </Link>
            )
          )}

          <button
            className="site-header-burger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              display: 'none', background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, color: DARK,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                    : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </nav>
      </div>

      {open && (
        <div
          className="site-header-drawer"
          style={{
            position: 'fixed', top: 88, left: 16, right: 16, zIndex: 49,
            background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(12px)',
            border: `1.5px solid ${DARK}`, borderRadius: 24,
            padding: '16px', display: 'flex', flexDirection: 'column', gap: 10,
            boxShadow: '0 12px 40px rgba(8,21,60,0.12)',
            fontFamily: '"Inter Display", "Inter", sans-serif',
          }}
        >
          {links.map((l) => renderLink(l, { ...linkStyle, fontSize: 14, padding: '10px 4px' }))}
          {cta && (
            cta.onClick ? (
              <button type="button" style={{ ...ctaStyle, height: 44, justifyContent: 'center', cursor: 'pointer', marginTop: 4 }}
                onClick={() => { setOpen(false); cta.onClick() }}>
                {cta.label}
              </button>
            ) : (
              <Link href={cta.href || '#'} style={{ ...ctaStyle, height: 44, justifyContent: 'center', marginTop: 4 }} onClick={() => setOpen(false)}>
                {cta.label}
              </Link>
            )
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          :global(.site-header-links),
          :global(.site-header-cta) { display: none !important; }
          :global(.site-header-burger) { display: inline-flex !important; }
          :global(.site-header-pill) { padding-right: 4px !important; }
        }
      `}</style>
    </>
  )
}
