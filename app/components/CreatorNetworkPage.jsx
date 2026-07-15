'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SiteHeader from './SiteHeader'
import CreatorNetworkBrandModal from './CreatorNetworkBrandModal'
import { Fren } from './Frens'

const CF = {
  navy: '#08153C',
  primary: '#09011B',
  blue: '#0091FF',
  electric: '#40ACFF',
  cyan: '#5ACDFF',
  periwinkle: '#8DAAFF',
  indigo: '#4D7AFF',
  mint: '#CBF0B8',
  lime: '#C8EB6D',
  limeBright: '#CCFF00',
  lavender: '#A6E1FA',
  coral: '#FF6B6B',
  white: '#FFFFFF',
  muted: '#4A5568',
  subtle: '#6B6776',
}

const EASE = [0.22, 1, 0.36, 1]

const NETWORK_DATA = [
  { title: 'African creators', body: 'Household-name creators across music, comedy, sport, lifestyle and tech. The mainstream reach that brings the next million users.', bg: CF.cyan, pose: 'stride' },
  { title: 'International crypto KOLs', body: 'Crypto-native voices with credibility inside the markets and communities where volume already lives.', bg: CF.mint, pose: 'arrow' },
  { title: 'Partner agencies', body: 'A vetted network of creator and crypto marketing agencies, extending reach and execution into any market you target.', bg: CF.periwinkle, pose: 'bridge' },
]

const STEPS_DATA = [
  { n: '01', title: 'Curate & vet', body: 'Every creator verified for real reach, engagement, and brand safety.' },
  { n: '02', title: 'Match', body: 'Brands get a matched roster; creators get relevant, paid opportunities.' },
  { n: '03', title: 'Activate', body: 'Campaigns that make crypto make sense to real audiences.' },
  { n: '04', title: 'Settle', body: 'Creators paid in stablecoins on delivery. Fully onchain, fully transparent.' },
]

const WHY_DATA = [
  { title: 'Curated, not listed', body: 'Every creator is vetted. A matched roster, never a directory dump.', bg: CF.periwinkle, dark: false },
  { title: 'The bridge', body: "We break the jargon of crypto and onboard mainstream creators who'd never otherwise touch Web3.", bg: CF.navy, dark: true },
  { title: 'Onchain settlement', body: 'Creators paid instantly in stablecoins. No cross-border friction, no waiting.', bg: CF.mint, dark: false },
  { title: 'Onchain-only focus', body: 'We work exclusively with onchain brands. Crypto is all we do — so we speak your product fluently.', bg: CF.navy, dark: true },
]

const FAQS = [
  { q: 'What is the Chainfren Creator Network?', a: 'The Chainfren Creator Network is a curated network of African creators, international crypto KOLs, and partner marketing agencies, built exclusively for onchain brands. It is the creator-sourcing division of the Chainfren agency.' },
  { q: 'Who is the network for?', a: 'Two sides — onchain brands that need credible creator distribution, and creators who want real, well-paid campaigns with leading crypto brands.' },
  { q: 'What kind of creators are in the network?', a: 'Mainstream African creators across music, comedy, sport, lifestyle and tech; international crypto-native KOLs; and partner agencies. Every creator is vetted for authentic reach, engagement, and brand safety.' },
  { q: 'How do brands work with the network?', a: 'Brands send a brief; Chainfren returns a matched, vetted roster, supports activation, and handles creator payment in stablecoins. Engagements range from single campaigns to ongoing growth partnerships.' },
  { q: 'How do creators join?', a: 'Creators apply through the network and are vetted for reach, engagement, and brand safety. Accepted creators access campaigns from leading onchain brands and are paid in stablecoins on delivery.' },
  { q: 'How are creators paid?', a: 'In stablecoins, settled onchain, on delivery — removing the delays and banking friction of traditional creator payments.' },
  { q: 'What makes Chainfren different?', a: 'Chainfren works exclusively with onchain brands and specialises in bridging mainstream creators into crypto credibly — a curated, vetted network, campaigns built for onchain acquisition, and instant stablecoin settlement.' },
  { q: 'Which markets does the network cover?', a: 'Africa-first, with deep strength in Nigeria, plus international crypto KOLs for global reach and partner agencies for additional markets.' },
]

const BRAND_POINTS = ['Curated & vetted rosters', 'Built for user acquisition', 'Onchain settlement & transparent attribution']
const CREATOR_POINTS = ['Real deals, real budgets', 'We handle contracts & payment', 'Paid fast in stablecoins']
const PROOF_NAMES = ['AP Collective', 'gmi.gg', 'Pump.fun', 'Wire Network']

/* ───────────────────────── responsive + motion hooks ───────────────────────── */

// Matches the design file's exact breakpoints: mobile <=700px, tablet <=1080px.
function useBucket() {
  const [bucket, setBucket] = useState('desktop')
  useEffect(() => {
    const mqTablet = window.matchMedia('(max-width: 1080px)')
    const mqMobile = window.matchMedia('(max-width: 700px)')
    const update = () => setBucket(mqMobile.matches ? 'mobile' : mqTablet.matches ? 'tablet' : 'desktop')
    update()
    mqTablet.addEventListener('change', update)
    mqMobile.addEventListener('change', update)
    return () => {
      mqTablet.removeEventListener('change', update)
      mqMobile.removeEventListener('change', update)
    }
  }, [])
  return bucket
}

// Gaussian-ish band centered on step i of n, used to crossfade the
// how-it-works frens as the section scrolls through the viewport.
function bandOpacity(p, i, n) {
  const center = (i + 0.5) / n
  const width = 1 / n
  const d = Math.abs(p - center)
  const t = 1 - Math.min(1, d / (width * 0.85))
  return Math.max(0.06, Math.round(t * 100) / 100)
}

function Reveal({ children, delay = 0, y = 32, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  if (reduced) return <div ref={ref} style={style}>{children}</div>
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function Eyebrow({ children, color = CF.navy, style = {} }) {
  return <span style={{ fontSize: 11.5, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color, ...style }}>{children}</span>
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
    </svg>
  )
}

function PillBtn({ children, dark, light, onClick, href, style = {} }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 52, padding: '0 30px', borderRadius: 9999,
    fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
    cursor: 'pointer', whiteSpace: 'nowrap', textDecoration: 'none',
    transition: dark ? 'opacity 200ms' : 'all 200ms',
    border: `2px solid ${light ? 'rgba(255,255,255,0.45)' : CF.navy}`,
    background: dark ? CF.white : light ? 'transparent' : CF.white,
    color: dark ? CF.navy : light ? CF.white : CF.navy,
  }
  const onEnter = (e) => {
    if (light) { e.currentTarget.style.background = CF.white; e.currentTarget.style.color = CF.navy; e.currentTarget.style.borderColor = CF.white }
    else e.currentTarget.style.opacity = 0.85
  }
  const onLeave = (e) => {
    if (light) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = CF.white; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)' }
    else e.currentTarget.style.opacity = 1
  }
  if (href) return <Link href={href} onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ ...base, ...style }}>{children}</Link>
  return <button type="button" onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ ...base, ...style }}>{children}</button>
}

/* ───────────────────────── Section 1 — Hero ───────────────────────── */

function Hero({ onHire, heroRef, bucket, reducedMotion }) {
  const isMobile = bucket === 'mobile'
  return (
    <section ref={heroRef} style={{ position: 'relative', background: CF.navy, overflow: 'hidden', padding: 'clamp(56px,8vw,96px) 24px clamp(72px,9vw,120px)' }}>
      <img
        src="/randz1.png"
        alt=""
        className="cf-cn-drift-el"
        style={{
          position: 'absolute', top: '-8%', right: '-10%', width: 'min(56vw,640px)',
          opacity: 0.32, pointerEvents: 'none',
          animation: reducedMotion ? 'none' : 'cf-cn-drift 14s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: 32, alignItems: 'center' }}>
        <div>
          <Reveal>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 16px', borderRadius: 9999, border: '1.5px solid rgba(255,255,255,0.35)', color: CF.white, fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Chainfren Creator Network
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 style={{ fontSize: 'clamp(2.6rem,6vw,5.5rem)', fontWeight: 500, lineHeight: 0.98, letterSpacing: '-0.03em', color: CF.white, margin: '26px 0 0' }}>
              Where crypto meets culture.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 'clamp(1.05rem,1.6vw,1.25rem)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, maxWidth: 640, margin: '24px 0 0' }}>
              The curated network connecting onchain brands to Africa&rsquo;s most trusted creators and the world&rsquo;s crypto-native voices &mdash; with campaigns that convert, and creators paid onchain.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 34 }}>
              <PillBtn dark onClick={onHire}>Hire the network</PillBtn>
              <PillBtn light href="/creator-network/apply">Apply to join</PillBtn>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ marginTop: 28, fontSize: 12.5, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.5)' }}>
              Trusted by AP Collective &middot; gmi.gg &middot; Pump.fun &middot; Wire Network
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2} y={0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
          <Fren pose="handshake" colorA={CF.cyan} colorB={CF.mint} sw={20} size={isMobile ? 220 : 320} />
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────── Section 2 — Positioning statement ─────────────────── */

function Positioning() {
  return (
    <section style={{ background: CF.white, padding: 'clamp(72px,10vw,140px) 24px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'left' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(1.9rem,4.4vw,3.6rem)', fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.025em', color: CF.navy, margin: 0 }}>
            Most agencies sell you a list.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <h2 style={{ fontSize: 'clamp(1.9rem,4.4vw,3.6rem)', fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.025em', color: CF.navy, margin: '2px 0 0' }}>
            We <em style={{ fontStyle: 'italic', color: CF.blue }}>are</em> the network.
          </h2>
        </Reveal>
        <Reveal delay={0.24}>
          <p style={{ fontSize: 'clamp(1.05rem,1.5vw,1.2rem)', color: CF.muted, lineHeight: 1.6, maxWidth: 760, margin: '28px 0 0' }}>
            The Chainfren Creator Network is a curated network of African creators, international crypto KOLs, and partner agencies &mdash; built exclusively for onchain brands. Vetted, not listed. Connected, not brokered. The layer crypto&rsquo;s most ambitious brands run on.
          </p>
        </Reveal>
        <Reveal delay={0.32}>
          <p style={{ fontSize: 'clamp(0.98rem,1.35vw,1.1rem)', color: CF.muted, lineHeight: 1.6, maxWidth: 760, margin: '18px 0 0' }}>
            Same products, packaged for your world &mdash; self-serve if you want the keys, done-with-you if you want the crew, and a creator network when you need the people.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 3 — The Network ───────────────────────── */

function NetworkLayers({ bucket }) {
  const cols = bucket === 'mobile' ? '1fr' : bucket === 'tablet' ? '1fr 1fr' : 'repeat(3, 1fr)'
  return (
    <section style={{ background: '#F5F4EE', padding: 'clamp(64px,8vw,112px) 24px' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <Reveal>
          <Eyebrow color={CF.muted}>The Network</Eyebrow>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: CF.navy, margin: '14px 0 36px' }}>Three layers of reach.</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 14 }}>
          {NETWORK_DATA.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.09}>
              <div style={{ background: card.bg, border: `2px solid ${CF.navy}`, borderRadius: 26, padding: '32px 28px', height: '100%' }}>
                <div style={{ width: 64, height: 64, marginBottom: 18 }}>
                  <Fren pose={card.pose} colorA={CF.navy} colorB={CF.navy} sw={18} size={64} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 500, color: CF.navy, margin: '0 0 10px', letterSpacing: '-0.01em' }}>{card.title}</h3>
                <p style={{ fontSize: 14.5, color: 'rgba(8,21,60,0.78)', lineHeight: 1.6, margin: 0 }}>{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 4 — The Fork (hover style) ───────────────────────── */

function ForkPoints({ points, dot }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26, maxWidth: 400 }}>
      {points.map((pt) => (
        <div key={pt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, color: 'rgba(8,21,60,0.85)', lineHeight: 1.5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot, marginTop: 7, flexShrink: 0 }} />
          {pt}
        </div>
      ))}
    </div>
  )
}

function Fork({ onHire, bucket }) {
  const [hover, setHover] = useState(null)
  const [tab, setTab] = useState('brands')
  const isMobile = bucket === 'mobile'

  if (isMobile) {
    return (
      <section style={{ background: CF.navy, padding: 'clamp(64px,8vw,0px) 0 0' }}>
        <div style={{ padding: '56px 24px 64px', maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 9999, padding: 5, marginBottom: 28 }}>
            <button type="button" onClick={() => setTab('brands')} style={{ flex: 1, height: 44, borderRadius: 9999, border: 'none', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', background: tab === 'brands' ? CF.cyan : 'transparent', color: tab === 'brands' ? CF.navy : 'rgba(255,255,255,0.7)', transition: 'background 200ms, color 200ms' }}>For Brands</button>
            <button type="button" onClick={() => setTab('creators')} style={{ flex: 1, height: 44, borderRadius: 9999, border: 'none', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', background: tab === 'creators' ? CF.mint : 'transparent', color: tab === 'creators' ? CF.navy : 'rgba(255,255,255,0.7)', transition: 'background 200ms, color 200ms' }}>For Creators</button>
          </div>
          {tab === 'brands' ? (
            <div>
              <Eyebrow color={CF.cyan}>For Brands</Eyebrow>
              <h3 style={{ fontSize: 'clamp(1.6rem,4vw,2.1rem)', fontWeight: 500, color: CF.white, lineHeight: 1.12, letterSpacing: '-0.015em', margin: '14px 0 14px' }}>Reach the audiences that actually convert.</h3>
              <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: '0 0 20px' }}>The mainstream creators who command attention rarely understand crypto. The crypto-native voices rarely reach beyond the converted. We close that gap.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
                {BRAND_POINTS.map((pt) => (
                  <div key={pt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: CF.cyan, marginTop: 7, flexShrink: 0 }} />{pt}
                  </div>
                ))}
              </div>
              <button type="button" onClick={onHire} style={{ width: '100%', height: 52, borderRadius: 9999, background: CF.cyan, color: CF.navy, border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>Hire the network</button>
            </div>
          ) : (
            <div>
              <Eyebrow color={CF.mint}>For Creators</Eyebrow>
              <h3 style={{ fontSize: 'clamp(1.6rem,4vw,2.1rem)', fontWeight: 500, color: CF.white, lineHeight: 1.12, letterSpacing: '-0.015em', margin: '14px 0 14px' }}>Get paid to work with crypto&rsquo;s biggest brands.</h3>
              <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: '0 0 20px' }}>Real campaigns with real budgets from the biggest names in crypto. Vetted deals, no scams, and payment in stablecoins the moment you deliver.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
                {CREATOR_POINTS.map((pt) => (
                  <div key={pt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: CF.mint, marginTop: 7, flexShrink: 0 }} />{pt}
                  </div>
                ))}
              </div>
              <Link href="/creator-network/apply" style={{ width: '100%', height: 52, borderRadius: 9999, background: CF.mint, color: CF.navy, border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Apply to join</Link>
            </div>
          )}
        </div>
        <ForkFooterLinks />
      </section>
    )
  }

  const brandsFlex = hover === 'brands' ? 1.3 : hover === 'creators' ? 0.75 : 1
  const creatorsFlex = hover === 'creators' ? 1.3 : hover === 'brands' ? 0.75 : 1
  const brandsOpacity = hover === 'creators' ? 0.82 : 1
  const creatorsOpacity = hover === 'brands' ? 0.82 : 1

  return (
    <section style={{ background: CF.navy, padding: 'clamp(64px,8vw,0px) 0 0', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 40px', textAlign: 'center' }}>
        <Reveal>
          <Eyebrow color={CF.cyan}>Two sides, one network</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.025em', color: CF.white, margin: '12px 0 0' }}>Choose your door.</h2>
        </Reveal>
      </div>

      <div style={{ display: 'flex', minHeight: 640, position: 'relative' }}>
        <div
          onMouseEnter={() => setHover('brands')}
          onMouseLeave={() => setHover(null)}
          style={{ flex: brandsFlex, background: CF.cyan, padding: 'clamp(40px,5vw,72px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'flex 500ms cubic-bezier(0.22,1,0.36,1), opacity 400ms', opacity: brandsOpacity, position: 'relative', overflow: 'hidden' }}
        >
          <Eyebrow color="rgba(8,21,60,0.6)">For Brands</Eyebrow>
          <h3 style={{ fontSize: 'clamp(1.7rem,2.6vw,2.5rem)', fontWeight: 500, color: CF.navy, lineHeight: 1.1, letterSpacing: '-0.015em', margin: '16px 0 16px', maxWidth: 420 }}>Reach the audiences that actually convert.</h3>
          <p style={{ fontSize: 15.5, color: 'rgba(8,21,60,0.78)', lineHeight: 1.6, margin: '0 0 22px', maxWidth: 420 }}>The mainstream creators who command attention rarely understand crypto. The crypto-native voices rarely reach beyond the converted. We close that gap.</p>
          <ForkPoints points={BRAND_POINTS} dot={CF.navy} />
          <PillBtn dark onClick={onHire} style={{ alignSelf: 'flex-start', background: CF.navy, color: CF.white, border: `2px solid ${CF.navy}` }}>Hire the network</PillBtn>
        </div>
        <div
          onMouseEnter={() => setHover('creators')}
          onMouseLeave={() => setHover(null)}
          style={{ flex: creatorsFlex, background: CF.mint, padding: 'clamp(40px,5vw,72px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'flex 500ms cubic-bezier(0.22,1,0.36,1), opacity 400ms', opacity: creatorsOpacity, position: 'relative', overflow: 'hidden' }}
        >
          <Eyebrow color="rgba(8,21,60,0.6)">For Creators</Eyebrow>
          <h3 style={{ fontSize: 'clamp(1.7rem,2.6vw,2.5rem)', fontWeight: 500, color: CF.navy, lineHeight: 1.1, letterSpacing: '-0.015em', margin: '16px 0 16px', maxWidth: 420 }}>Get paid to work with crypto&rsquo;s biggest brands.</h3>
          <p style={{ fontSize: 15.5, color: 'rgba(8,21,60,0.78)', lineHeight: 1.6, margin: '0 0 22px', maxWidth: 420 }}>Real campaigns with real budgets from the biggest names in crypto. Vetted deals, no scams, and payment in stablecoins the moment you deliver.</p>
          <ForkPoints points={CREATOR_POINTS} dot={CF.navy} />
          <PillBtn dark href="/creator-network/apply" style={{ alignSelf: 'flex-start', background: CF.navy, color: CF.white, border: `2px solid ${CF.navy}` }}>Apply to join</PillBtn>
        </div>

        <div style={{ position: 'absolute', left: '50%', top: 36, transform: 'translate(-50%,0)', width: 104, height: 104, pointerEvents: 'none', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))', zIndex: 3 }}>
          <Fren pose="handshake" colorA={CF.cyan} colorB={CF.lime} sw={22} size={104} />
        </div>
      </div>

      <ForkFooterLinks />
    </section>
  )
}

function ForkFooterLinks() {
  return (
    <div style={{ maxWidth: 1220, margin: '0 auto', padding: '20px 24px 56px', display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
      <Link href="/for-brands" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', textDecoration: 'underline' }}>See everything Chainfren offers brands</Link>
      <Link href="/for-creators" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', textDecoration: 'underline' }}>See everything Chainfren offers creators</Link>
    </div>
  )
}

/* ───────────────────────── Section 5 — How It Works ───────────────────────── */

function HowItWorks({ howItWorksRef, bucket, progress, reducedMotion }) {
  const isMobile = bucket === 'mobile'
  const poses = ['mark', 'squad', 'run', 'lift']
  const opacities = reducedMotion ? [1, 0.15, 0.15, 0.15] : poses.map((_, i) => bandOpacity(progress, i, 4))

  return (
    <section ref={howItWorksRef} style={{ background: CF.white, padding: 'clamp(64px,8vw,112px) 24px' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <div style={{ maxWidth: 760, margin: '0 auto 20px', textAlign: 'center' }}>
          <Reveal>
            <Eyebrow color={CF.muted}>How It Works</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: CF.navy, margin: '14px 0 0' }}>From brief to funded users &mdash; end to end.</h2>
          </Reveal>
        </div>
        <div style={{ position: 'relative', width: 200, height: 200, margin: '8px auto 24px' }}>
          {poses.map((pose, i) => (
            <div key={pose} style={{ position: 'absolute', inset: 0, opacity: opacities[i], transition: reducedMotion ? 'none' : 'opacity 120ms linear' }}>
              <Fren pose={pose} colorA={CF.navy} colorB={CF.electric} sw={18} size={200} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 14 }}>
          {STEPS_DATA.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08} style={{ flex: 1 }}>
              <div style={{ background: '#F5F4EE', borderRadius: 22, padding: '26px 24px', height: '100%' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: CF.blue, letterSpacing: '0.06em', marginBottom: 14 }}>{step.n}</div>
                <h3 style={{ fontSize: 19, fontWeight: 500, color: CF.navy, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: CF.muted, lineHeight: 1.55, margin: 0 }}>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 6 — Why Chainfren ───────────────────────── */

function WhyChainfren({ bucket }) {
  const cols = bucket === 'mobile' ? '1fr' : 'repeat(2, 1fr)'
  return (
    <section style={{ background: '#F5F4EE', padding: 'clamp(64px,8vw,112px) 24px' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <Reveal>
          <Eyebrow color={CF.muted}>Why Chainfren</Eyebrow>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: CF.navy, margin: '14px 0 36px' }}>Why brands and creators choose us.</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 14 }}>
          {WHY_DATA.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div style={{ background: card.bg, borderRadius: 26, padding: '30px 28px', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <h3 style={{ fontSize: 19, fontWeight: 500, color: card.dark ? CF.white : CF.navy, margin: '0 0 10px', letterSpacing: '-0.01em' }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: card.dark ? 'rgba(255,255,255,0.75)' : 'rgba(8,21,60,0.78)', lineHeight: 1.55, margin: 0 }}>{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 7 — Proof & partners (marquee) ───────────────────────── */

function Proof({ reducedMotion }) {
  const [paused, setPaused] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const doubled = [...PROOF_NAMES, ...PROOF_NAMES]

  return (
    <section style={{ background: CF.white, padding: 'clamp(64px,8vw,100px) 24px', borderTop: '1px solid rgba(8,21,60,0.08)', borderBottom: '1px solid rgba(8,21,60,0.08)' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <Eyebrow color={CF.muted}>Trusted By &amp; Partnered With</Eyebrow>
        </Reveal>
        <div
          ref={wrapRef}
          className="cf-cn-marquee-el"
          style={{
            marginTop: 36, overflow: 'hidden',
            WebkitMaskImage: 'linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%)',
            maskImage: 'linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%)',
          }}
        >
          <div
            style={{
              display: 'flex', width: 'max-content', gap: 96,
              animation: reducedMotion ? 'none' : 'cf-cn-marquee 22s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
              willChange: 'transform',
            }}
          >
            {doubled.map((nm, i) => (
              <span key={i} style={{ fontSize: 'clamp(1.4rem,2.6vw,2rem)', fontWeight: 500, color: CF.navy, letterSpacing: '-0.01em', whiteSpace: 'nowrap', opacity: 0.85 }}>{nm}</span>
            ))}
          </div>
        </div>
        <Reveal delay={0.1}>
          <p style={{ marginTop: 32, fontSize: 15, color: CF.muted }}>The partners building the onchain economy build with us.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 8 — FAQ ───────────────────────── */

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section style={{ background: CF.white, padding: 'clamp(64px,8vw,112px) 24px' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <Eyebrow color={CF.muted}>FAQ</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem,3.6vw,2.75rem)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: CF.navy, margin: '14px 0 0' }}>Common questions.</h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ border: `2px solid ${CF.navy}`, borderRadius: 26, padding: '0 clamp(18px,4vw,32px)' }}>
            {FAQS.map((it, i) => {
              const isOpen = open === i
              return (
                <div key={it.q} style={{ borderBottom: i < FAQS.length - 1 ? '1.5px solid rgba(8,21,60,0.12)' : 'none' }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 'clamp(18px,3vw,22px) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, fontFamily: 'inherit' }}>
                    <span style={{ fontSize: 'clamp(0.95rem,1.4vw,1.15rem)', fontWeight: 500, color: CF.navy, lineHeight: 1.3, letterSpacing: '-0.005em', flex: 1 }}>{it.q}</span>
                    <span style={{ width: 30, height: 30, borderRadius: '50%', border: `2px solid ${CF.navy}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), background 200ms, color 200ms', background: isOpen ? CF.navy : CF.white, color: isOpen ? CF.white : CF.navy }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 400ms cubic-bezier(0.22,1,0.36,1)' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.65, paddingBottom: 'clamp(18px,3vw,22px)', paddingRight: 'clamp(0px,4vw,40px)', margin: 0 }}>{it.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 9 — Final CTA ───────────────────────── */

function FinalCTA({ finalRef, onHire, bucket }) {
  const isMobile = bucket === 'mobile'
  return (
    <section ref={finalRef} style={{ background: CF.navy, padding: 'clamp(72px,9vw,140px) 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 32, alignItems: 'center' }}>
        <div>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(2.25rem,5.5vw,4.5rem)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em', color: CF.white, margin: '0 0 28px' }}>Ready to move?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <PillBtn dark onClick={onHire}>Hire the network</PillBtn>
              <PillBtn light href="/creator-network/apply">Apply to join</PillBtn>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <p style={{ marginTop: 24, fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
              Or talk to us directly &mdash; <a href="mailto:hello@chainfren.com" style={{ color: CF.electric, textDecoration: 'underline' }}>hello@chainfren.com</a>
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
          <Fren pose="reach" colorA={CF.electric} colorB={CF.lime} sw={20} size={isMobile ? 200 : 300} />
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Sticky CTA bar ───────────────────────── */

function StickyBar({ visible, onHire }) {
  return (
    <div
      style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 60,
        display: 'flex', justifyContent: 'center', padding: 14,
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 24}px)`,
        transition: 'opacity 260ms cubic-bezier(0.22,1,0.36,1), transform 260ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div style={{ background: 'rgba(8,21,60,0.94)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: 9999, padding: 8, display: 'flex', gap: 8, alignItems: 'center', boxShadow: '0 12px 32px rgba(8,21,60,0.25)' }}>
        <button type="button" onClick={onHire} style={{ height: 42, padding: '0 20px', borderRadius: 9999, background: CF.white, color: CF.navy, border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>Hire the network</button>
        <Link href="/creator-network/apply" style={{ height: 42, padding: '0 20px', borderRadius: 9999, background: 'transparent', color: CF.white, border: '1.5px solid rgba(255,255,255,0.4)', fontFamily: 'inherit', fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>Apply to join</Link>
      </div>
    </div>
  )
}

/* ───────────────────────── Footer ───────────────────────── */

function PageFooter() {
  return (
    <footer style={{ maxWidth: 1220, margin: '0 auto', padding: '40px 24px 100px', borderTop: '1px solid rgba(8,21,60,0.12)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 32 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: CF.subtle, marginBottom: 12 }}>Explore</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['Products', '/products'], ['Solutions', '/solutions'], ['Creator Network', '/creator-network'], ['Media', '/sabi']].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontSize: 13.5, color: CF.navy, textDecoration: 'none' }}>{l}</Link>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: CF.subtle, marginBottom: 12 }}>For you</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['For Creators', '/for-creators'], ['For Brands', '/for-brands']].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontSize: 13.5, color: CF.navy, textDecoration: 'none' }}>{l}</Link>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: CF.subtle, marginBottom: 12 }}>Company</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['Playbook', '/blog'], ['Contact', '/contact'], ['Join Chainfren', '/contact']].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontSize: 13.5, color: CF.navy, textDecoration: 'none' }}>{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ───────────────────────── Page ───────────────────────── */

export default function CreatorNetworkPage() {
  const [hireOpen, setHireOpen] = useState(false)
  const [howItWorksProgress, setHowItWorksProgress] = useState(0)
  const [stickyVisible, setStickyVisible] = useState(false)
  const bucket = useBucket()
  const reducedMotion = useReducedMotion()

  const heroRef = useRef(null)
  const howItWorksRef = useRef(null)
  const finalRef = useRef(null)

  const onHire = () => setHireOpen(true)

  // Single rAF-throttled scroll handler drives both the how-it-works fren
  // crossfade and the sticky CTA bar — mirrors the design file's approach so
  // scroll stays smooth (one listener, one measurement pass per frame).
  useEffect(() => {
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const hw = howItWorksRef.current
        if (hw) {
          const rect = hw.getBoundingClientRect()
          const vh = window.innerHeight
          const total = rect.height + vh
          const traveled = vh - rect.top
          let p = total > 0 ? traveled / total : 0
          p = Math.max(0, Math.min(1, p))
          setHowItWorksProgress((prev) => (Math.abs(prev - p) > 0.01 ? p : prev))
        }
        let sticky = false
        const heroEl = heroRef.current
        const finalEl = finalRef.current
        if (heroEl && heroEl.getBoundingClientRect().bottom < 0) sticky = true
        if (finalEl && finalEl.getBoundingClientRect().top < window.innerHeight * 0.55) sticky = false
        if (hireOpen) sticky = false
        setStickyVisible((prev) => (prev !== sticky ? sticky : prev))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [hireOpen])

  return (
    <div style={{ background: CF.white, fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <style jsx global>{`
        @keyframes cf-cn-drift { 0%,100% { transform: translate(0,0) rotate(-8deg); } 50% { transform: translate(-14px,14px) rotate(-4deg); } }
        @keyframes cf-cn-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .cf-cn-drift-el { animation: none !important; }
          .cf-cn-marquee-el > div { animation: none !important; }
        }
      `}</style>

      <SiteHeader
        badgeLabel="Solutions"
        accent={CF.cyan}
        links={[{ label: 'Solutions', href: '/solutions' }, { label: 'Apply to join', href: '/creator-network/apply' }]}
        cta={{ label: 'Join Chainfren', href: '/contact' }}
      />

      <nav aria-label="Breadcrumb" style={{ maxWidth: 1220, margin: '0 auto', padding: '2px 24px 18px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <Link href="/solutions" style={{ fontSize: 11.5, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(8,21,60,0.48)', textDecoration: 'none' }}>Solutions</Link>
        <span style={{ color: 'rgba(8,21,60,0.3)', fontSize: 12 }}>&rsaquo;</span>
        <span style={{ fontSize: 11.5, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: CF.navy }}>Creator Network</span>
      </nav>

      <main>
        <Hero onHire={onHire} heroRef={heroRef} bucket={bucket} reducedMotion={reducedMotion} />
        <Positioning />
        <NetworkLayers bucket={bucket} />
        <Fork onHire={onHire} bucket={bucket} />
        <HowItWorks howItWorksRef={howItWorksRef} bucket={bucket} progress={howItWorksProgress} reducedMotion={reducedMotion} />
        <WhyChainfren bucket={bucket} />
        <Proof reducedMotion={reducedMotion} />
        <FAQ />
        <FinalCTA finalRef={finalRef} onHire={onHire} bucket={bucket} />
      </main>
      <PageFooter />

      <StickyBar visible={stickyVisible} onHire={onHire} />
      <CreatorNetworkBrandModal open={hireOpen} onClose={() => setHireOpen(false)} accent={CF.cyan} />
    </div>
  )
}
