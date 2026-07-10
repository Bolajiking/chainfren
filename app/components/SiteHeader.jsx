'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ChainfrenWordmark from './ChainfrenWordmark'
import { Fren } from './Frens'
import { PRODUCTS, SOLUTION_PERSONAS, FEATURED, CF } from '../config/stack'
import NotifyModal, { openNotify } from './NotifyModal'

const DARK = '#08153C'
const WHITE = '#FFFFFF'
const NIGHT = '#09011B'
const DEFAULT_ACCENT = '#40ACFF'

// Easing vocabulary (from the motion spec) — defined once, reused everywhere.
const EO = 'cubic-bezier(0.22, 1, 0.36, 1)'  // primary: menu open, reveals
const EQ = 'cubic-bezier(0.33, 1, 0.68, 1)'  // hover states, small moves
const EIO = 'cubic-bezier(0.65, 0, 0.35, 1)' // symmetric: height/accordion

// Kept for backwards-compat with existing imports across pages. The three
// engines are now built into the mega-menu, so these are only a fallback.
export const DEFAULT_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Media', href: '/media' },
]
export const DEFAULT_CTA = { label: 'Join Chainfren', href: '/contact' }

// ─────────────────────────────────────────────────────────────────────────
// Engine metadata — the single source of truth for both the desktop
// mega-menus and the mobile accordions. All links are real, crawlable
// destinations that exist in the app (no dead routes).
// ─────────────────────────────────────────────────────────────────────────
// Two menus: Solutions (the four offers) and Media (Sabi). Products and Solutions
// were collapsed into one concept — "Solutions" — at this stage. Triggers open
// the mega-menu on click/hover; they do not navigate (the /solutions and /media
// overview pages stay reachable by direct URL but are not nav destinations).
const ENGINES = {
  solutions: {
    key: 'solutions',
    trigger: 'Solutions',
    href: '/solutions',   // kept for reference only; the trigger no longer navigates
    eyebrow: 'Chainfren Solutions',
    identity: 'Chainfren Solutions',
    promise: 'Four ways to own what you build.',
    pose: 'lift',
    poseB: '#5ACDFF',
    offeringsEyebrow: 'The solutions — four ways to own what you build',
    // Living-nav: offerings render from the stack config (app/config/stack.js).
    offerings: PRODUCTS.map((p) => ({
      color: p.accent,
      title: p.nickname ? `${p.name} · ${p.nickname}` : p.name,
      desc: p.outcome, href: p.url,
    })),
    // Creator Network is the featured card; Star Factor sits under it as a notice.
    featured: { ...FEATURED.creatorNetwork, kind: 'dark' },
    notice: { ...FEATURED.starFactor },
    mobileRows: [
      ...PRODUCTS.map((p) => ({ label: p.nickname ? `${p.name} · ${p.nickname}` : p.name, href: p.url, muted: true })),
      { label: 'Creator Network', href: '/creator-network', accent: '#5ACDFF' },
      { label: 'Star Factor — coming soon', accent: '#C8EB6D', action: 'notify', notifySource: 'nav-star-factor-mobile' },
    ],
  },
  media: {
    key: 'media',
    trigger: 'Media',
    href: '/sabi',   // kept for reference only; the trigger no longer navigates
    eyebrow: 'Chainfren Media',
    identity: 'Chainfren Media',
    promise: "Stories and broadcasts from Africa's creator economy.",
    pose: 'reach',
    poseB: '#8DAAFF',
    offeringsEyebrow: 'Watch · read · broadcast',
    offerings: [
      { color: '#5ACDFF', title: 'Blog', desc: 'The work, documented in public.', href: '/blog' },
      { color: '#8DAAFF', title: 'Videos', desc: 'On-demand watching from Sabi.', href: '/sabi#videos' },
      { color: NIGHT, title: 'Broadcast', desc: "Africa's onchain broadcasting signal.", href: '/sabi#broadcasts' },
    ],
    // featured renders via the dedicated SabiPlayerCard (mini media-player).
    featured: {
      tag: 'Launching 2026', name: 'Sabi',
      line: "Africa's onchain broadcasting signal.",
      cta: 'Set a reminder', href: '/sabi',
    },
    mobileRows: [
      { label: 'Blog', href: '/blog', muted: true },
      { label: 'Videos', href: '/sabi#videos', muted: true },
      { label: 'Broadcast', href: '/sabi#broadcasts', muted: true },
    ],
  },
}
const ENGINE_ORDER = ['solutions', 'media']

// Map a badge / pathname onto an engine key.
function engineFromBadge(badgeLabel) {
  if (!badgeLabel) return null
  const b = badgeLabel.toLowerCase()
  // Products and Solutions are one concept now — everything offer-related maps
  // to the single Solutions menu.
  if (b === 'agency' || b === 'solutions' || b === 'solution' || b === 'products' || b === 'product') return 'solutions'
  if (b === 'media' || b === 'sabi') return 'media'
  return null
}
function engineFromPath(path) {
  if (!path) return null
  // Solutions = the four offers (/products/*), the /solutions overview, the
  // persona pages, and Creator Network. Media = Sabi + blog/videos/broadcasts.
  if (path.startsWith('/products') || path.startsWith('/solutions') || path.startsWith('/for-creators') || path.startsWith('/for-brands') || path.startsWith('/agency') || path.startsWith('/creator-network')) return 'solutions'
  if (path.startsWith('/media') || path.startsWith('/sabi') || path.startsWith('/blog') || path.startsWith('/videos') || path.startsWith('/broadcasts')) return 'media'
  return null
}

const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><path d="M13 6l6 6-6 6" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────
// Desktop mega-menu content for one engine
// ─────────────────────────────────────────────────────────────────────────
function MegaContent({ engine, reduced }) {
  const e = ENGINES[engine]
  const anim = (delay) => (reduced ? undefined : `cfItemIn 160ms ${EO} ${delay}ms both`)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '28% 1fr 30%', gap: 16, padding: '14px 16px 12px' }}>
      {/* Identity column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 16, borderRight: '1px solid rgba(8,21,60,0.1)', animation: anim(60) }}>
        <div style={{ width: 68, height: 68 }}>
          <Fren pose={e.pose} colorA={DARK} colorB={e.poseB} size="100%" sw={20} className={reduced ? undefined : 'cf-pose-settle'} />
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(8,21,60,0.5)' }}>{e.eyebrow}</div>
        <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.05 }}>{e.identity}</div>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.4, color: 'rgba(8,21,60,0.72)' }}>{e.promise}</p>
        {e.exploreHref && (
          <Link href={e.exploreHref} className="cf-explore" style={{ marginTop: 2, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: DARK, textDecoration: 'none' }}>
            {e.exploreLabel} <ArrowRight size={12} />
          </Link>
        )}
      </div>

      {/* Offerings column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(8,21,60,0.5)', padding: '0 10px 5px' }}>{e.offeringsEyebrow}</div>
        {e.offerings.map((o, i) => (
          <Link key={o.title} href={o.href} role="menuitem" className="cf-offering" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '7px 11px', borderRadius: 12, textDecoration: 'none', color: DARK, animation: anim(88 + i * 28) }}>
            <span style={{ flex: 'none', width: 7, height: 7, marginTop: 5, borderRadius: '50%', background: o.color }} aria-hidden="true" />
            <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{o.title}</span>
              {/* Description is collapsed by default; revealed on hover/focus (keeps the menu compact). */}
              <span className="cf-offering-desc"><span>{o.desc}</span></span>
            </span>
          </Link>
        ))}
      </div>

      {/* Featured card (+ optional compact notice, e.g. Star Factor coming soon) */}
      {engine === 'media' ? (
        <SabiPlayerCard feat={e.featured} anim={anim(200)} />
      ) : e.notice ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <FeaturedCard feat={e.featured} anim={anim(200)} />
          <MiniNotice feat={e.notice} anim={anim(248)} />
        </div>
      ) : (
        <FeaturedCard feat={e.featured} anim={anim(200)} />
      )}
    </div>
  )
}

// Compact coming-soon strip that sits beneath a featured card (Star Factor in
// the Solutions menu). Opens the shared NotifyModal on click.
function MiniNotice({ feat, anim }) {
  const isNotify = feat.action === 'notify'
  const Tag = isNotify ? 'button' : feat.external ? 'a' : Link
  const tagProps = isNotify
    ? { type: 'button', onClick: () => openNotify(feat.notifySource || feat.name) }
    : feat.external ? { href: feat.href, target: '_blank', rel: 'noopener noreferrer' } : { href: feat.href }
  return (
    <Tag {...tagProps} role="menuitem" className="cf-mini-notice" style={{
      ...(isNotify ? { width: '100%', textAlign: 'left', cursor: 'pointer', font: 'inherit' } : {}),
      position: 'relative', display: 'flex', alignItems: 'center', gap: 10,
      background: DARK, color: WHITE, border: 'none', borderRadius: 14, padding: '10px 14px',
      textDecoration: 'none', animation: anim,
    }}>
      <span className="cf-live-dot" style={{ flex: 'none', width: 7, height: 7, borderRadius: '50%', background: CF.lime, boxShadow: `0 0 0 3px ${CF.lime}33` }} />
      <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{feat.tag}</span>
        <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em' }}>{feat.name}</span>
      </span>
      <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 9.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap' }}>{feat.cta} <ArrowRight size={11} /></span>
    </Tag>
  )
}

const SERIF = 'Georgia, "Times New Roman", serif'

function FeaturedCard({ feat, anim }) {
  const dark = feat.kind === 'dark'
  const night = feat.kind === 'night'
  const star = feat.kind === 'starfactor'
  const onDark = dark || night || star
  const bg = star ? DARK : dark ? DARK : night ? NIGHT : feat.bg
  const isNotify = feat.action === 'notify'
  const Tag = isNotify ? 'button' : feat.external ? 'a' : Link
  const tagProps = isNotify
    ? { type: 'button', onClick: () => openNotify(feat.notifySource || feat.name) }
    : feat.external ? { href: feat.href, target: '_blank', rel: 'noopener noreferrer' } : { href: feat.href }
  return (
    <Tag {...tagProps} role="menuitem" className="cf-featured" style={{
      ...(isNotify ? { width: '100%', textAlign: 'left', cursor: 'pointer', font: 'inherit' } : {}),
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 6,
      background: bg, color: onDark ? WHITE : DARK,
      border: onDark ? 'none' : `2px solid ${DARK}`, borderRadius: 18, padding: 16,
      backgroundImage: star ? `radial-gradient(60% 55% at 92% -10%, ${CF.coral}55 0%, transparent 60%), radial-gradient(55% 45% at 5% -10%, ${CF.lime}44 0%, transparent 60%), radial-gradient(65% 60% at 100% 110%, ${CF.cyan}40 0%, transparent 60%)` : undefined,
      textDecoration: 'none', animation: anim,
    }}>
      {(dark || star) && feat.img && (
        <img src={feat.img} alt="" style={{ position: 'absolute', right: -40, bottom: -40, width: 170, height: 170, objectFit: 'contain', opacity: 0.5, pointerEvents: 'none' }} />
      )}
      {night && (
        <span style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: 9999, background: 'radial-gradient(circle, rgba(21,117,220,0.5), transparent 70%)', pointerEvents: 'none' }} />
      )}
      {star ? (
        <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 9999, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          <span className="cf-live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: CF.lime, boxShadow: `0 0 0 3px ${CF.lime}33` }} />
          {feat.tag}
        </span>
      ) : onDark ? (
        <span style={{ alignSelf: 'flex-start', padding: '4px 10px', border: `1.5px solid ${night ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.4)'}`, borderRadius: 9999, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', ...(dark ? { opacity: 0.85 } : {}) }}>{feat.tag}</span>
      ) : (
        <span style={{ alignSelf: 'flex-start', padding: '4px 10px', border: `1.5px solid ${DARK}`, borderRadius: 9999, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{feat.tag}</span>
      )}
      {star ? (
        <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 450, fontSize: 21, lineHeight: 1.05, letterSpacing: '-0.01em', background: `linear-gradient(110deg, ${CF.lime} 0%, ${CF.coral} 35%, ${CF.cyan} 70%, ${CF.periwinkle} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{feat.name}.</span>
      ) : (
        <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{feat.name}</span>
      )}
      <span style={{ fontSize: 12, lineHeight: 1.4, opacity: 0.85, maxWidth: 220 }}>{feat.line}</span>
      <span style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{feat.cta} <ArrowRight size={12} /></span>
    </Tag>
  )
}

// A dedicated "mini media player" treatment for Sabi — equalizer bars, a play
// button, and a looping scrub line, so the broadcast network's featured card
// reads as a broadcast, not a generic tile.
function SabiPlayerCard({ feat, anim }) {
  return (
    <Link href={feat.href} role="menuitem" className="cf-sabi-player" style={{
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10,
      background: NIGHT, color: WHITE, border: 'none', borderRadius: 18, padding: 16,
      backgroundImage: 'radial-gradient(70% 60% at 85% -10%, rgba(21,117,220,0.45), transparent 65%), radial-gradient(60% 50% at 0% 110%, rgba(90,205,255,0.25), transparent 60%)',
      textDecoration: 'none', animation: anim,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.68)' }}>
          <span className="cf-live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B6B', boxShadow: '0 0 0 3px rgba(255,107,107,0.3)' }} />
          {feat.tag}
        </span>
        <span className="cf-eq" aria-hidden="true"><span /><span /><span /><span /></span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className="cf-play-btn" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </span>
        <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 450, fontSize: 19, lineHeight: 1.05, background: 'linear-gradient(110deg, #5ACDFF 0%, #8DAAFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{feat.name}</span>
      </div>

      <p style={{ margin: 0, fontSize: 12, lineHeight: 1.4, color: 'rgba(255,255,255,0.7)' }}>{feat.line}</p>

      <div className="cf-scrub" aria-hidden="true"><span /></div>

      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: 2 }}>{feat.cta} <ArrowRight size={12} /></span>
    </Link>
  )
}

function ForYouStrip() {
  return (
    <div style={{ borderTop: '1px solid rgba(8,21,60,0.1)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 18 }}>
      <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(8,21,60,0.45)', whiteSpace: 'nowrap' }}>For you</span>
      <Link href="/for-creators" className="cf-foryou-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 500, color: 'rgba(8,21,60,0.8)', textDecoration: 'none', whiteSpace: 'nowrap' }}>For Creators <ArrowRight size={11} /></Link>
      <Link href="/for-brands" className="cf-foryou-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 500, color: 'rgba(8,21,60,0.8)', textDecoration: 'none', whiteSpace: 'nowrap' }}>For Brands <ArrowRight size={11} /></Link>
      <span style={{ marginLeft: 'auto', fontSize: 9.5, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(8,21,60,0.35)', whiteSpace: 'nowrap' }}>Lagos, Nigeria</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
export default function SiteHeader({
  accent = DEFAULT_ACCENT,
  badgeLabel,
  links = [],
  cta,
  showAudienceStrip = true,
}) {
  const pathname = usePathname()

  const [menu, setMenu] = useState(null)        // 'solutions' | 'products' | 'media' | null
  const [lastMenu, setLastMenu] = useState('solutions')
  const [slim, setSlim] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [acc, setAcc] = useState(null)          // mobile accordion open key
  const [frenOn, setFrenOn] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [notifyOpen, setNotifyOpen] = useState(false)
  const [notifySource, setNotifySource] = useState('unknown')

  const timers = useRef({})
  const lastFren = useRef(0)
  const overlayRef = useRef(null)
  const burgerRef = useRef(null)
  const menuRef = useRef(null)
  useEffect(() => { menuRef.current = menu }, [menu])

  // Active engine drives the trigger highlight only (the sub-nav bar was removed).
  const activeEngine = engineFromBadge(badgeLabel) || engineFromPath(pathname)

  const clearTimers = useCallback(() => {
    clearTimeout(timers.current.open)
    clearTimeout(timers.current.close)
  }, [])

  // prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      const apply = () => setReduced(mq.matches)
      apply()
      mq.addEventListener?.('change', apply)
      return () => mq.removeEventListener?.('change', apply)
    } catch (_) {}
  }, [])

  // Scroll: slim the capsule past 80px; close any open menu on scroll.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => {
      const s = window.scrollY > 80
      setSlim((prev) => (prev !== s ? s : prev))
      setMenu((m) => {
        if (m) { clearTimers(); return null }
        return m
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [clearTimers])

  // Esc closes everything.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { clearTimers(); setMenu(null); setMobileOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [clearTimers])

  // Close on route change.
  useEffect(() => {
    clearTimers(); setMenu(null); setMobileOpen(false); setAcc(null)
  }, [pathname, clearTimers])

  // Any component in the tree can summon the shared "get notified" modal by
  // dispatching cf:open-notify — avoids prop drilling through pages that
  // don't otherwise talk to SiteHeader (products, agency, etc).
  useEffect(() => {
    const onNotify = (e) => { setNotifySource(e.detail?.source || 'unknown'); setNotifyOpen(true) }
    window.addEventListener('cf:open-notify', onNotify)
    return () => window.removeEventListener('cf:open-notify', onNotify)
  }, [])

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    if (typeof document === 'undefined') return
    const prev = document.body.style.overflow
    if (mobileOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [mobileOpen])

  // Focus management for the mobile overlay (trap + restore).
  useEffect(() => {
    if (!mobileOpen) return
    const node = overlayRef.current
    if (!node) return
    const trigger = burgerRef.current
    const focusables = () => Array.from(node.querySelectorAll('a[href], button:not([disabled])')).filter((el) => el.offsetParent !== null)
    setTimeout(() => focusables()[0]?.focus(), 60)
    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const els = focusables()
      if (!els.length) return
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    node.addEventListener('keydown', onKey)
    return () => { node.removeEventListener('keydown', onKey); trigger?.focus() }
  }, [mobileOpen])

  useEffect(() => () => clearTimers(), [clearTimers])

  // The signature fren delight — fires on menu open, debounced ~1.5s.
  const fireFren = useCallback(() => {
    if (reduced) return
    const now = Date.now()
    if (now - lastFren.current < 1500) return
    lastFren.current = now
    setFrenOn(true)
    setTimeout(() => setFrenOn(false), 420)
  }, [reduced])

  const openMenu = useCallback((name, immediate) => {
    clearTimeout(timers.current.close)
    if (menuRef.current === name) return
    clearTimeout(timers.current.open)
    const doOpen = () => { setMenu(name); setLastMenu(name); fireFren() }
    if (immediate || menuRef.current) doOpen()          // switch = instant swap
    else timers.current.open = setTimeout(doOpen, 100)  // hover intent
  }, [fireFren])

  const scheduleClose = useCallback(() => {
    clearTimeout(timers.current.open)
    clearTimeout(timers.current.close)
    timers.current.close = setTimeout(() => setMenu(null), 220)
  }, [])

  const open = !!menu
  const content = menu || lastMenu

  const navPad = slim ? 10 : 18
  const capH = slim ? 48 : 56
  const panelTop = navPad + capH + 8

  const toggleAcc = (n) => () => setAcc((cur) => (cur === n ? null : n))

  // CTA (Join Chainfren) — supports href or onClick.
  const theCta = cta || DEFAULT_CTA
  const renderCta = (className, style) => (
    theCta.onClick
      ? <button type="button" className={className} onClick={theCta.onClick} style={style}>{theCta.label}</button>
      : <Link href={theCta.href || '#'} className={className} style={style}>{theCta.label}</Link>
  )

  const triggerBar = (isActive) => ({
    position: 'absolute', left: 14, right: 14, bottom: 5, height: 2,
    borderRadius: 2, background: DARK,
    opacity: isActive ? 1 : 0,
    transform: isActive ? 'scaleX(1)' : 'scaleX(0.4)',
    transition: reduced ? 'none' : `opacity 120ms ${EQ}, transform 120ms ${EQ}`,
  })

  // Normalize a sub-nav / section item into { label, href, onClick }.
  const sectionOnClick = (item) => (e) => {
    const raw = item.anchor || item.href || ''
    const hashIdx = raw.indexOf('#')
    if (hashIdx === -1) return
    const target = raw.slice(hashIdx)
    const basePath = raw.slice(0, hashIdx) || pathname
    if (basePath === pathname || item.anchor) {
      const el = document.querySelector(target)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      }
    }
  }

  // Is this sub-nav item the page currently being viewed? Covers exact
  // matches and nested routes (e.g. a vertical page under Media Launchpad).
  const isSectionActive = (item) => {
    if (!item.href || item.href.includes('#')) return false
    if (pathname === item.href) return true
    return item.href !== '/' && pathname.startsWith(item.href + '/')
  }

  return (
    <>
      {/* ───────── Desktop: fixed floating capsule + contextual sub-nav ───────── */}
      <header className="cf-nav-fixed" style={{ padding: `${navPad}px 12px 0` }}>
        <nav
          aria-label="Primary"
          className="cf-cap"
          style={{
            height: capH,
            boxShadow: slim ? '0 8px 30px rgba(8,21,60,0.14)' : '0 4px 16px rgba(8,21,60,0.05)',
            transition: reduced ? 'none' : `height 200ms ${EO}, box-shadow 200ms ${EO}`,
          }}
        >
          <Link href="/" aria-label="Chainfren — home" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <ChainfrenWordmark color={DARK} fontSize={22} markClassName={frenOn ? 'cf-fren-delight' : undefined} />
          </Link>

          <div className="cf-triggers">
            {ENGINE_ORDER.map((key) => {
              const e = ENGINES[key]
              const isActive = menu === key || activeEngine === key
              return (
                <button
                  key={key}
                  type="button"
                  className="cf-trig"
                  aria-haspopup="true"
                  aria-expanded={menu === key}
                  onMouseEnter={() => openMenu(key)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => openMenu(key, true)}
                  onClick={() => (menu === key ? (clearTimers(), setMenu(null)) : openMenu(key, true))}
                >
                  {e.trigger}
                  <svg width="9" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }} aria-hidden="true"><path d="M1 1l4 4 4-4" /></svg>
                  <span style={triggerBar(isActive)} />
                </button>
              )
            })}
          </div>

          {renderCta('cf-cta', undefined)}

          <button
            ref={burgerRef}
            className="cf-burger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></svg>
          </button>
        </nav>
      </header>

      {/* Spacer reserves the capsule's footprint so switching to fixed
          positioning introduces no layout shift (CLS-safe). Desktop only. */}
      <div className="cf-nav-spacer" aria-hidden="true" style={{ height: 84 }} />

      {/* ───────── Desktop mega-menu panel ───────── */}
      <div className="cf-panel-wrap" style={{ top: panelTop, transition: reduced ? 'none' : `top 200ms ${EO}` }}>
        <div
          role="menu"
          aria-label="Site menu"
          className="cf-panel"
          onMouseEnter={() => clearTimeout(timers.current.close)}
          onMouseLeave={scheduleClose}
          style={{
            pointerEvents: open ? 'auto' : 'none',
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0px)' : 'translateY(-8px)',
            transition: reduced
              ? 'opacity 100ms linear'
              : (open ? `opacity 200ms ${EO}, transform 200ms ${EO}` : `opacity 140ms ${EQ}, transform 140ms ${EQ}`),
          }}
        >
          <MegaContent key={content} engine={content} reduced={reduced} />
          {showAudienceStrip && content === 'solutions' && <ForYouStrip />}
        </div>
      </div>

      {/* ───────── Mobile: fixed bottom bar (trigger) ───────── */}
      <div className="cf-mbar">
        <div className="cf-mbar-inner">
          <Link href="/" aria-label="Chainfren" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <ChainfrenWordmark color={DARK} fontSize={22} markClassName={frenOn ? 'cf-fren-delight' : undefined} />
          </Link>
          <button
            ref={burgerRef}
            type="button"
            className="cf-mbar-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></svg>
          </button>
        </div>
      </div>

      {/* ───────── Mobile: full-screen navy overlay + accordions ───────── */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="cf-overlay"
        style={{
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0px)' : 'translateY(20px)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: reduced
            ? 'opacity 100ms linear'
            : (mobileOpen ? `opacity 240ms ${EO}, transform 240ms ${EO}` : `opacity 180ms ${EO}, transform 180ms ${EO}`),
        }}
      >
        <div className="cf-overlay-head">
          <ChainfrenWordmark color={DARK} fontSize={22} markClassName={frenOn ? 'cf-fren-delight' : undefined} />
          <button type="button" className="cf-overlay-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
          </button>
        </div>

        <div className="cf-overlay-scroll">
          {ENGINE_ORDER.map((key, i) => {
            const e = ENGINES[key]
            const isOpen = acc === key
            const rowAnim = (idx) => (reduced ? undefined : `cfItemIn 200ms ${EO} ${idx * 20}ms both`)
            return (
              <div key={key} className="cf-acc" style={{ animation: reduced || !mobileOpen ? undefined : `cfItemIn 200ms ${EO} ${60 + i * 40}ms both` }}>
                <button
                  type="button"
                  className="cf-acc-head"
                  aria-expanded={isOpen}
                  onClick={toggleAcc(key)}
                >
                  {e.trigger}
                  <span className="cf-acc-chev" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: reduced ? 'none' : `transform 260ms ${EIO}` }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </span>
                </button>
                <div className="cf-acc-body" style={{ maxHeight: isOpen ? 520 : 0, transition: reduced ? 'none' : `max-height 260ms ${EIO}` }}>
                  <div className="cf-acc-inner">
                    <div className="cf-acc-desc">{e.identity} — {e.promise}</div>
                    {e.mobileRows.map((r, idx) => (
                      r.action === 'notify' ? (
                        <button
                          key={r.label}
                          type="button"
                          className={'cf-acc-row' + (r.accent ? ' is-accent' : '')}
                          style={{ background: r.accent || undefined, color: r.accent ? DARK : undefined, animation: isOpen ? rowAnim(idx) : undefined, width: '100%', textAlign: 'left', font: 'inherit', cursor: 'pointer' }}
                          onClick={() => { setMobileOpen(false); openNotify(r.notifySource || r.label) }}
                        >
                          {r.label} <span aria-hidden="true" style={{ opacity: r.accent ? 0.6 : 0.5 }}>→</span>
                        </button>
                      ) : (
                        <Link
                          key={r.label}
                          href={r.href}
                          className={'cf-acc-row' + (r.accent ? ' is-accent' : '')}
                          style={{ background: r.accent || undefined, color: r.accent ? DARK : undefined, animation: isOpen ? rowAnim(idx) : undefined }}
                          onClick={sectionOnClick(r)}
                        >
                          {r.label} <span aria-hidden="true" style={{ opacity: r.accent ? 0.6 : 0.5 }}>→</span>
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </div>
            )
          })}

          {showAudienceStrip && (
            <div className="cf-overlay-foryou">
              <Link href="/for-creators" className="cf-overlay-foryou-link">For Creators →</Link>
              <Link href="/for-brands" className="cf-overlay-foryou-link">For Brands →</Link>
            </div>
          )}
        </div>

        {theCta.onClick ? (
          <button type="button" className="cf-overlay-cta" onClick={() => { setMobileOpen(false); theCta.onClick() }}>{theCta.label}</button>
        ) : (
          <Link href={theCta.href || '#'} className="cf-overlay-cta" onClick={() => setMobileOpen(false)}>{theCta.label}</Link>
        )}
      </div>

      <style jsx global>{`
        @keyframes cfItemIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cfFrenDelight {
          0% { transform: rotate(0deg); }
          30% { transform: rotate(-9deg) translateY(-1px); }
          65% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes cfPoseSettle { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .cf-fren-delight { animation: cfFrenDelight 320ms cubic-bezier(0.34, 1.3, 0.64, 1) both; transform-origin: 50% 62%; }
        .cf-pose-settle { animation: cfPoseSettle 250ms ${EO} both; }

        .cf-nav-fixed {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; flex-direction: column; align-items: center;
          pointer-events: none;
        }
        .cf-nav-fixed > * { pointer-events: auto; }
        .cf-cap {
          width: 760px; max-width: 100%;
          padding: 0 8px 0 18px;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid ${DARK}; border-radius: 9999px;
          font-family: var(--font-inter), 'Inter Display', 'Inter', sans-serif;
        }
        .cf-triggers { display: flex; align-items: center; gap: 2px; }
        .cf-trig {
          position: relative; display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 14px; border-radius: 9999px;
          font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;
          color: ${DARK}; text-decoration: none;
          background: none; border: none; cursor: pointer; font-family: inherit;
          transition: background 120ms ${EQ};
        }
        .cf-trig:hover { background: rgba(8,21,60,0.05); }
        .cf-cta {
          height: 40px; padding: 0 18px; border-radius: 9999px;
          border: 1.5px solid ${DARK}; background: ${DARK}; color: ${WHITE};
          font-size: 11.5px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;
          display: inline-flex; align-items: center; text-decoration: none; white-space: nowrap;
          cursor: pointer; font-family: inherit;
          transition: opacity 200ms ${EO};
        }
        .cf-cta:hover { opacity: 0.85; }
        .cf-burger { display: none; }

        .cf-subnav {
          margin-top: 6px; display: flex; align-items: center; gap: 2px;
          padding: 3px 5px; max-width: 100%; overflow-x: auto;
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid ${DARK}; border-radius: 9999px;
          box-shadow: 0 6px 20px rgba(8,21,60,0.06);
          font-family: var(--font-inter), 'Inter Display', 'Inter', sans-serif;
          scrollbar-width: none;
        }
        .cf-subnav::-webkit-scrollbar { display: none; }
        .cf-subnav-chip {
          padding: 5px 10px; background: ${DARK}; color: ${WHITE}; border-radius: 9999px;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase; white-space: nowrap;
        }
        .cf-subnav-link {
          padding: 5px 10px; border-radius: 9999px;
          font-size: 10px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;
          color: rgba(8,21,60,0.7); text-decoration: none; white-space: nowrap;
          transition: background 120ms ${EQ}, color 120ms ${EQ};
        }
        .cf-subnav-link:hover { background: rgba(8,21,60,0.06); color: ${DARK}; }
        .cf-subnav-link.is-current {
          background: rgba(8,21,60,0.08); color: ${DARK}; font-weight: 600;
        }
        .cf-subnav-link.is-current:hover { background: rgba(8,21,60,0.1); }

        .cf-nav-spacer { width: 100%; }

        .cf-panel-wrap {
          position: fixed; left: 0; right: 0; z-index: 190;
          display: flex; justify-content: center; padding: 0 16px;
          pointer-events: none;
        }
        .cf-panel {
          width: min(880px, 100%);
          background: #fff; border: 2px solid ${DARK}; border-radius: 24px;
          box-shadow: 0 24px 64px rgba(8,21,60,0.22);
          overflow: hidden;
          font-family: var(--font-inter), 'Inter Display', 'Inter', sans-serif;
        }
        .cf-explore { transition: opacity 120ms ${EQ}; }
        .cf-explore:hover { opacity: 0.65; }
        .cf-offering { transition: background 140ms ${EQ}, transform 140ms ${EQ}; }
        .cf-offering:hover { background: rgba(8,21,60,0.045); transform: translateY(-2px); }
        /* Descriptions collapse to zero height, revealing on hover/focus — keeps the menu compact. */
        .cf-offering-desc { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 200ms ${EO}; }
        .cf-offering:hover .cf-offering-desc, .cf-offering:focus-visible .cf-offering-desc { grid-template-rows: 1fr; }
        .cf-offering-desc > span { overflow: hidden; min-height: 0; padding-top: 2px; font-size: 11.5px; line-height: 1.4; color: rgba(8,21,60,0.65); }
        @media (prefers-reduced-motion: reduce) { .cf-offering-desc { transition: none; } }
        .cf-featured { transition: transform 140ms ${EQ}, box-shadow 140ms ${EQ}; }
        .cf-featured:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(8,21,60,0.28); }
        .cf-mini-notice { transition: transform 140ms ${EQ}, box-shadow 140ms ${EQ}; }
        .cf-mini-notice:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(8,21,60,0.28); }
        .cf-sabi-player { transition: transform 140ms ${EQ}, box-shadow 140ms ${EQ}; }
        .cf-sabi-player:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(8,21,60,0.32); }
        .cf-foryou-link { transition: opacity 120ms ${EQ}; }
        .cf-foryou-link:hover { opacity: 0.6; }

        /* ── Sabi mini media-player: equalizer, play button, scrub line ── */
        .cf-eq { display: flex; align-items: flex-end; gap: 2.5px; height: 14px; }
        .cf-eq span { display: block; width: 2.5px; border-radius: 2px; background: rgba(255,255,255,0.55); transform-origin: bottom; animation: cfEq 1.1s ease-in-out infinite; }
        .cf-eq span:nth-child(1) { height: 6px; animation-delay: 0ms; }
        .cf-eq span:nth-child(2) { height: 13px; animation-delay: 150ms; }
        .cf-eq span:nth-child(3) { height: 9px; animation-delay: 300ms; }
        .cf-eq span:nth-child(4) { height: 14px; animation-delay: 450ms; }
        @keyframes cfEq { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }

        .cf-play-btn {
          flex: none; width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.35);
          display: inline-flex; align-items: center; justify-content: center; color: #fff;
          transition: background 160ms ${EQ}, transform 160ms ${EQ};
        }
        .cf-sabi-player:hover .cf-play-btn { background: rgba(255,255,255,0.2); transform: scale(1.06); }

        .cf-scrub { position: relative; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.14); overflow: hidden; }
        .cf-scrub span { position: absolute; inset: 0; width: 38%; border-radius: 2px; background: linear-gradient(90deg, #5ACDFF, #8DAAFF); animation: cfScrub 6s linear infinite; }
        @keyframes cfScrub { 0% { transform: translateX(-100%); } 100% { transform: translateX(280%); } }

        .cf-live-dot { animation: cfLivePulse 2s ease-in-out infinite; }
        @keyframes cfLivePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

        /* ── Mobile bottom bar ── */
        .cf-mbar {
          display: none;
          position: fixed; left: 8px; right: 8px; bottom: 8px; z-index: 70;
          font-family: var(--font-inter), 'Inter Display', 'Inter', sans-serif;
        }
        .cf-mbar-inner {
          flex: 1; display: flex; align-items: center; justify-content: space-between; gap: 10px;
          height: 60px; padding: 0 10px 0 18px;
          background: rgba(255,255,255,0.42);
          backdrop-filter: blur(30px) saturate(140%); -webkit-backdrop-filter: blur(30px) saturate(140%);
          border: 1px solid rgba(8,21,60,0.10); border-radius: 9999px;
          box-shadow: 0 10px 30px rgba(8,21,60,0.12);
        }
        .cf-mbar-toggle {
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; background: transparent; border: 0; color: ${DARK};
          cursor: pointer; border-radius: 9999px;
          transition: background 180ms ${EO}, transform 180ms ${EO};
        }
        .cf-mbar-toggle:hover { background: rgba(8,21,60,0.06); }
        .cf-mbar-toggle:active { transform: scale(0.94); }

        /* ── Mobile overlay ── */
        .cf-overlay {
          position: fixed; inset: 0; z-index: 400;
          background: rgba(255, 255, 255, 0.42);
          backdrop-filter: blur(30px) saturate(140%);
          -webkit-backdrop-filter: blur(30px) saturate(140%);
          color: ${DARK};
          display: flex; flex-direction: column;
          padding: 16px 20px calc(26px + env(safe-area-inset-bottom, 0px));
          font-family: var(--font-inter), 'Inter Display', 'Inter', sans-serif;
        }
        .cf-overlay-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex: 0 0 auto; }
        .cf-overlay-close {
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer; color: ${DARK}; border-radius: 9999px;
          transition: background 180ms ${EO}, transform 180ms ${EO};
        }
        .cf-overlay-close:hover { background: rgba(8,21,60,0.06); }
        .cf-overlay-close:active { transform: scale(0.94); }
        .cf-overlay-scroll { flex: 1 1 auto; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .cf-acc-head {
          display: flex; justify-content: space-between; align-items: center; width: 100%;
          min-height: 60px; padding: 14px 4px;
          background: none; border: none; border-bottom: 1px solid rgba(8,21,60,0.12);
          color: ${DARK}; font-family: inherit; font-size: 26px; font-weight: 500; letter-spacing: -0.01em;
          cursor: pointer; text-align: left;
          transition: opacity 120ms ${EQ};
        }
        .cf-acc-head:active { opacity: 0.7; }
        .cf-acc-chev { display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center; flex: none; }
        .cf-acc-body { overflow: hidden; }
        .cf-acc-inner { padding: 12px 2px 18px; display: flex; flex-direction: column; gap: 6px; }
        .cf-acc-desc { font-size: 12px; line-height: 1.5; color: rgba(8,21,60,0.6); padding: 0 8px 6px; }
        .cf-acc-row {
          display: flex; justify-content: space-between; align-items: center;
          min-height: 48px; padding: 12px 14px; border-radius: 12px;
          background: rgba(8,21,60,0.05); color: ${DARK}; text-decoration: none;
          font-size: 15px; font-weight: 500;
          transition: background 160ms ${EQ}, transform 80ms ${EQ};
        }
        .cf-acc-row.is-accent { font-weight: 600; }
        .cf-acc-row:active { transform: scale(0.98); }
        .cf-overlay-foryou { display: flex; gap: 18px; padding: 18px 4px 6px; }
        .cf-overlay-foryou-link {
          min-height: 44px; display: inline-flex; align-items: center;
          color: rgba(8,21,60,0.75); text-decoration: none; font-size: 14px; font-weight: 500;
        }
        .cf-overlay-cta {
          flex: 0 0 auto; margin-top: 14px;
          display: flex; align-items: center; justify-content: center;
          min-height: 52px; background: ${DARK}; color: ${WHITE}; border: none;
          border-radius: 9999px; text-decoration: none; cursor: pointer;
          font-family: inherit; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          transition: transform 80ms ${EQ};
        }
        .cf-overlay-cta:active { transform: scale(0.98); }

        /* ── Breakpoint: swap desktop chrome for the mobile bar ── */
        @media (max-width: 880px) {
          .cf-nav-fixed { display: none !important; }
          .cf-nav-spacer { display: none !important; }
          .cf-panel-wrap { display: none !important; }
          .cf-mbar { display: flex !important; }
        }
        @media (min-width: 881px) {
          .cf-overlay { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cf-fren-delight, .cf-pose-settle { animation: none !important; }
          .cf-eq span, .cf-scrub span, .cf-live-dot { animation: none !important; }
        }
      `}</style>

      <NotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} source={notifySource} accent={accent} />
    </>
  )
}
