'use client'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import SiteHeader from './SiteHeader'
import CreatorNetworkBrandModal from './CreatorNetworkBrandModal'
import { HandshakeFrens, SquadFrens, CheerFrens, FrenSolo, StepFren } from './Frens'

const CF = {
  dark: '#08153C',
  primary: '#09011B',
  white: '#FFFFFF',
  accent: '#40ACFF',
  periwinkle: '#8DAAFF',
  cyan: '#5ACDFF',
  mint: '#CBF0B8',
  lime: '#C8EB6D',
  limeBright: '#CCFF00',
  lavender: '#A6E1FA',
  indigo: '#4D7AFF',
  coral: '#FF6B6B',
  muted: '#4A5568',
  dim: 'rgba(255,255,255,0.6)',
  subtle: '#6B6776',
}

const EASE = [0.22, 1, 0.36, 1]

const CARD_BASE = {
  borderRadius: 26,
  border: `2px solid ${CF.dark}`,
  position: 'relative',
  overflow: 'hidden',
}

function Eyebrow({ children, color = CF.dark, style = {} }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, letterSpacing: '0.16em',
      textTransform: 'uppercase', color, ...style,
    }}>{children}</span>
  )
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
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: '15px 30px', borderRadius: 9999,
    fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500,
    letterSpacing: '0.04em', cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'opacity 200ms, transform 200ms', textDecoration: 'none',
    border: `2px solid ${light ? CF.white : CF.dark}`,
    background: dark ? CF.dark : light ? 'transparent' : CF.white,
    color: dark ? CF.white : light ? CF.white : CF.dark,
  }
  const onEnter = (e) => { e.currentTarget.style.opacity = 0.85; e.currentTarget.style.transform = 'translateY(-1px)' }
  const onLeave = (e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = 'translateY(0)' }
  if (href) {
    return <Link href={href} onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ ...base, ...style }}>{children}</Link>
  }
  return <button type="button" onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ ...base, ...style }}>{children}</button>
}

function Reveal({ children, delay = 0, y = 32, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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

/* ───────────────────────── Section 1 — Hero ───────────────────────── */

function Hero({ onHire }) {
  return (
    <section style={{
      position: 'relative', background: CF.dark, color: CF.white,
      overflow: 'hidden', padding: 'clamp(64px,10vw,120px) 20px clamp(48px,8vw,80px)',
    }}>
      <div style={{
        position: 'absolute', top: '-10%', right: '-8%', width: 520, height: 520,
        opacity: 0.16, pointerEvents: 'none',
      }}>
        <img src="/randz1.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
          <ol style={{ display: 'flex', gap: 6, listStyle: 'none', padding: 0, margin: 0, fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
            <li><Link href="/agency" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Agency</Link></li>
            <li aria-hidden="true">›</li>
            <li style={{ color: CF.white }}>Creator Network</li>
          </ol>
        </nav>

        <Reveal>
          <Eyebrow color={CF.cyan}>Chainfren Creator Network</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 style={{
            fontSize: 'clamp(2.75rem, 7vw, 6rem)', fontWeight: 500, lineHeight: 0.98,
            letterSpacing: '-0.03em', margin: '22px 0 0', maxWidth: 900,
          }}>
            Where crypto meets culture.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, maxWidth: 680, margin: '26px 0 0' }}>
            The curated network connecting onchain brands to Africa&apos;s most trusted creators and the world&apos;s crypto-native voices — with campaigns that convert, and creators paid onchain.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 40 }}>
            <PillBtn dark onClick={onHire} style={{ background: CF.white, color: CF.dark, border: `2px solid ${CF.white}` }}>
              Hire the network <Arrow />
            </PillBtn>
            <PillBtn light href="/agency/creator-network/apply">
              Apply to join <Arrow />
            </PillBtn>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p style={{ marginTop: 30, fontSize: 12.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
            Trusted by AP Collective · gmi.gg · Pump.fun · Wire Network
          </p>
        </Reveal>

        <Reveal delay={0.3} y={48}>
          <div style={{ marginTop: 'clamp(24px,5vw,56px)', display: 'flex', justifyContent: 'center' }}>
            <HandshakeFrens style={{ width: 'min(560px, 100%)', height: 'auto' }} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────── Section 2 — Positioning statement ─────────────────── */

function Positioning() {
  return (
    <section style={{ background: CF.white, padding: 'clamp(64px,10vw,120px) 20px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'left' }}>
        <Reveal>
          <h2 style={{
            fontSize: 'clamp(1.875rem, 4.5vw, 3.5rem)', fontWeight: 450, lineHeight: 1.12,
            letterSpacing: '-0.025em', color: CF.dark, margin: 0,
          }}>
            Most agencies sell you a list. We <em style={{ fontStyle: 'italic' }}>are</em> the network.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: CF.muted, lineHeight: 1.65, marginTop: 28, maxWidth: 720 }}>
            The Chainfren Creator Network is a curated network of African creators, international crypto KOLs, and partner agencies — built exclusively for onchain brands. Vetted, not listed. Connected, not brokered. The layer crypto&apos;s most ambitious brands run on.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 3 — The Network ───────────────────────── */

function NetworkLayers() {
  const layers = [
    {
      label: 'African creators', bg: CF.cyan,
      body: 'Household-name creators across music, comedy, sport, lifestyle and tech. The mainstream reach that brings the next million users.',
    },
    {
      label: 'International crypto KOLs', bg: CF.mint,
      body: 'Crypto-native voices with credibility inside the markets and communities where volume already lives.',
    },
    {
      label: 'Partner agencies', bg: CF.periwinkle,
      body: 'A vetted network of creator and crypto marketing agencies, extending reach and execution into any market you target.',
    },
  ]
  return (
    <section style={{ background: '#F5F4EE', padding: 'clamp(56px,9vw,100px) 20px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Reveal>
          <Eyebrow>The network</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 450, letterSpacing: '-0.025em',
            color: CF.dark, margin: '12px 0 40px',
          }}>Three layers of reach.</h2>
        </Reveal>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {layers.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.1}>
              <div style={{
                ...CARD_BASE, background: l.bg, padding: '32px 28px', minHeight: 260,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 40, fontWeight: 450, color: CF.dark, opacity: 0.35 }}>0{i + 1}</span>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 500, color: CF.dark, marginBottom: 10, letterSpacing: '-0.01em' }}>{l.label}</h3>
                  <p style={{ fontSize: 14.5, color: 'rgba(8,21,60,0.8)', lineHeight: 1.55 }}>{l.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 4 — The Fork ───────────────────────── */

function Fork({ onHire }) {
  const [hover, setHover] = useState(null)
  const brandsScale = hover === 'brands' ? 1.015 : hover === 'creators' ? 0.985 : 1
  const creatorsScale = hover === 'creators' ? 1.015 : hover === 'brands' ? 0.985 : 1

  return (
    <section style={{ background: CF.dark, color: CF.white, padding: 'clamp(56px,9vw,100px) 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 40px', textAlign: 'center' }}>
        <Reveal>
          <Eyebrow color={CF.cyan}>Two sides, one network</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 450, letterSpacing: '-0.025em', margin: '12px 0 0' }}>
            Choose your door.
          </h2>
        </Reveal>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1280, margin: '0 auto' }} className="cn-fork-grid">
        {/* Brands */}
        <Reveal delay={0.05} y={40} style={{ minWidth: 0 }}>
          <div
            onMouseEnter={() => setHover('brands')}
            onMouseLeave={() => setHover(null)}
            style={{
              position: 'relative', height: '100%', padding: 'clamp(32px,5vw,56px) clamp(24px,5vw,56px)',
              borderRight: '1px solid rgba(255,255,255,0.12)',
              transform: `scale(${brandsScale})`, transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
              transformOrigin: 'right center',
            }}
            className="cn-fork-side"
          >
            <FrenSolo facing="right" color={CF.cyan} className="cn-fork-fren" style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', width: 180, opacity: 0.22, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Eyebrow color={CF.cyan}>For brands</Eyebrow>
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', fontWeight: 500, letterSpacing: '-0.015em', margin: '14px 0 16px' }}>
                Reach the audiences that actually convert.
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, marginBottom: 22, maxWidth: 420 }}>
                The mainstream creators who command attention rarely understand crypto. The crypto-native voices rarely reach beyond the converted. We close that gap.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Curated & vetted rosters', 'Built for user acquisition', 'Onchain settlement & transparent attribution'].map((pt) => (
                  <li key={pt} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
                    <span style={{ color: CF.cyan }}>—</span>{pt}
                  </li>
                ))}
              </ul>
              <PillBtn onClick={onHire} style={{ background: CF.cyan, color: CF.dark, border: `2px solid ${CF.cyan}` }}>
                Hire the network <Arrow />
              </PillBtn>
            </div>
          </div>
        </Reveal>

        {/* Creators */}
        <Reveal delay={0.12} y={40} style={{ minWidth: 0 }}>
          <div
            onMouseEnter={() => setHover('creators')}
            onMouseLeave={() => setHover(null)}
            style={{
              position: 'relative', height: '100%', padding: 'clamp(32px,5vw,56px) clamp(24px,5vw,56px)',
              transform: `scale(${creatorsScale})`, transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
              transformOrigin: 'left center',
            }}
            className="cn-fork-side"
          >
            <FrenSolo facing="left" color={CF.mint} className="cn-fork-fren" style={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', width: 180, opacity: 0.22, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Eyebrow color={CF.mint}>For creators</Eyebrow>
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', fontWeight: 500, letterSpacing: '-0.015em', margin: '14px 0 16px' }}>
                Get paid to work with crypto&apos;s biggest brands.
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, marginBottom: 22, maxWidth: 420 }}>
                Real campaigns with real budgets from the biggest names in crypto. Vetted deals, no scams, and payment in stablecoins the moment you deliver.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Real deals, real budgets', 'We handle contracts & payment', 'Paid fast in stablecoins'].map((pt) => (
                  <li key={pt} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
                    <span style={{ color: CF.mint }}>—</span>{pt}
                  </li>
                ))}
              </ul>
              <PillBtn href="/agency/creator-network/apply" style={{ background: CF.mint, color: CF.dark, border: `2px solid ${CF.mint}` }}>
                Apply to join <Arrow />
              </PillBtn>
            </div>
          </div>
        </Reveal>
      </div>

      <div style={{ maxWidth: 1100, margin: '32px auto 0', padding: '0 20px', display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/for-brands" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          See everything Chainfren offers brands →
        </Link>
        <Link href="/for-creators" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          See everything Chainfren offers creators →
        </Link>
      </div>

      <style jsx>{`
        @media (max-width: 780px) {
          .cn-fork-grid { grid-template-columns: 1fr !important; }
          .cn-fork-side { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.12); transform: none !important; }
          .cn-fork-fren { display: none; }
        }
      `}</style>
    </section>
  )
}

/* ───────────────────────── Section 5 — How it works ───────────────────────── */

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Curate & vet', d: 'Every creator verified for real reach, engagement, and brand safety.' },
    { n: '02', t: 'Match', d: 'Brands get a matched roster; creators get relevant, paid opportunities.' },
    { n: '03', t: 'Activate', d: 'Campaigns that make crypto make sense to real audiences.' },
    { n: '04', t: 'Settle', d: 'Creators paid in stablecoins on delivery. Fully onchain, fully transparent.' },
  ]
  return (
    <section style={{ background: CF.white, padding: 'clamp(56px,9vw,100px) 20px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 450, letterSpacing: '-0.025em',
            color: CF.dark, margin: '12px 0 44px', maxWidth: 680,
          }}>From brief to funded users — end to end.</h2>
        </Reveal>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div style={{ ...CARD_BASE, background: '#F5F4EE', padding: '28px 24px', minHeight: 280, display: 'flex', flexDirection: 'column' }}>
                <StepFren step={i} color={CF.dark} style={{ width: 88, height: 'auto', marginBottom: 8, alignSelf: 'flex-end', opacity: 0.85 }} />
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: CF.accent, letterSpacing: '0.04em', marginBottom: 8 }}>{s.n}</div>
                  <h3 style={{ fontSize: 19, fontWeight: 500, color: CF.dark, marginBottom: 8, letterSpacing: '-0.01em' }}>{s.t}</h3>
                  <p style={{ fontSize: 14, color: CF.muted, lineHeight: 1.55 }}>{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 6 — Why Chainfren ───────────────────────── */

function WhyChainfren() {
  const points = [
    { t: 'Curated, not listed', d: 'Every creator is vetted. A matched roster, never a directory dump.', bg: CF.white },
    { t: 'The bridge', d: "We break the jargon of crypto and onboard mainstream creators who'd never otherwise touch Web3.", bg: CF.lavender },
    { t: 'Onchain settlement', d: 'Creators paid instantly in stablecoins. No cross-border friction, no waiting.', bg: CF.dark, dark: true },
    { t: 'Onchain-only focus', d: 'We work exclusively with onchain brands. Crypto is all we do — so we speak your product fluently.', bg: CF.lime },
  ]
  return (
    <section style={{ background: '#F5F4EE', padding: 'clamp(56px,9vw,100px) 20px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Reveal>
          <Eyebrow>Why Chainfren</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 450, letterSpacing: '-0.025em',
            color: CF.dark, margin: '12px 0 44px',
          }}>Why brands and creators choose us.</h2>
        </Reveal>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {points.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <div style={{
                ...CARD_BASE, background: p.bg, padding: '30px 26px', minHeight: 210,
                color: p.dark ? CF.white : CF.dark,
                border: `2px solid ${CF.dark}`,
              }}>
                <h3 style={{ fontSize: 19, fontWeight: 500, marginBottom: 10, letterSpacing: '-0.01em' }}>{p.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: p.dark ? 'rgba(255,255,255,0.78)' : 'rgba(8,21,60,0.78)' }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 7 — Proof & partners ───────────────────────── */

function Proof() {
  const partners = ['AP Collective', 'gmi.gg', 'Pump.fun', 'Wire Network']
  return (
    <section style={{ background: CF.white, padding: 'clamp(56px,9vw,90px) 20px', borderTop: '1px solid rgba(8,21,60,0.08)', borderBottom: '1px solid rgba(8,21,60,0.08)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <Eyebrow>Trusted by &amp; partnered with</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', gap: 'clamp(24px,6vw,64px)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
            {partners.map((p) => (
              <span key={p} style={{ fontSize: 'clamp(18px, 2.6vw, 26px)', fontWeight: 450, color: CF.dark, letterSpacing: '-0.01em', opacity: 0.85 }}>{p}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <p style={{ marginTop: 28, fontSize: 14.5, color: CF.muted }}>The partners building the onchain economy build with us.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Section 8 — FAQ ───────────────────────── */

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

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" style={{ background: '#F5F4EE', padding: 'clamp(56px,9vw,100px) 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 450, letterSpacing: '-0.025em',
            color: CF.dark, margin: '12px 0 32px',
          }}>Questions, answered.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ ...CARD_BASE, background: CF.white, padding: '0 clamp(18px, 4vw, 32px)' }}>
            {FAQS.map((it, i) => {
              const isOpen = open === i
              return (
                <div key={it.q} style={{ borderBottom: i < FAQS.length - 1 ? '1.5px solid rgba(8,21,60,0.12)' : 'none' }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                    width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                    padding: 'clamp(18px, 3vw, 24px) 0', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: 14, fontFamily: 'inherit',
                  }}>
                    <span style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', fontWeight: 500, color: CF.dark, lineHeight: 1.3, flex: 1 }}>{it.q}</span>
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%', border: `2px solid ${CF.dark}`,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), background 200ms, color 200ms',
                      background: isOpen ? CF.dark : CF.white, color: isOpen ? CF.white : CF.dark,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 400ms cubic-bezier(0.22,1,0.36,1)' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.65, paddingBottom: 'clamp(18px, 3vw, 24px)', paddingRight: 'clamp(0px, 4vw, 40px)' }}>{it.a}</p>
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

function FinalCTA({ onHire }) {
  return (
    <section style={{ background: CF.dark, color: CF.white, padding: 'clamp(64px,10vw,120px) 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', fontWeight: 450, letterSpacing: '-0.03em', lineHeight: 1.02, margin: 0 }}>
            Ready to move?
          </h2>
        </Reveal>
        <Reveal delay={0.15} y={48}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
            <CheerFrens style={{ width: 'min(420px, 100%)', height: 'auto' }} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
            <PillBtn onClick={onHire} style={{ background: CF.white, color: CF.dark, border: `2px solid ${CF.white}` }}>
              Hire the network <Arrow />
            </PillBtn>
            <PillBtn light href="/agency/creator-network/apply">
              Apply to join <Arrow />
            </PillBtn>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ marginTop: 28, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
            Or talk to us directly — <a href="mailto:bolaji@chainfren.com" style={{ color: CF.cyan, textDecoration: 'underline' }}>bolaji@chainfren.com</a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Footer ───────────────────────── */

function PageFooter() {
  return (
    <footer style={{
      maxWidth: 1180, margin: '0 auto', padding: '40px 20px 60px',
      borderTop: '1px solid rgba(8,21,60,0.12)', display: 'flex', flexWrap: 'wrap',
      justifyContent: 'space-between', gap: 32,
    }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: CF.subtle, marginBottom: 12 }}>Explore</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['Agency', '/agency'], ['Creator Network', '/agency/creator-network'], ['Products', '/products'], ['Media', '/media']].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontSize: 13.5, color: CF.dark, textDecoration: 'none' }}>{l}</Link>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: CF.subtle, marginBottom: 12 }}>For you</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['For Creators', '/for-creators'], ['For Brands', '/for-brands']].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontSize: 13.5, color: CF.dark, textDecoration: 'none' }}>{l}</Link>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: CF.subtle, marginBottom: 12 }}>Company</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['Playbook', '/blog'], ['Contact', '/contact'], ['Join Chainfren', '/contact']].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontSize: 13.5, color: CF.dark, textDecoration: 'none' }}>{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ───────────────────────── Page ───────────────────────── */

export default function CreatorNetworkPage() {
  const [hireOpen, setHireOpen] = useState(false)
  const onHire = () => setHireOpen(true)

  return (
    <div style={{ background: CF.white, fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <SiteHeader
        badgeLabel="Agency"
        accent={CF.cyan}
        links={[{ label: 'Agency', href: '/agency' }, { label: 'Apply to join', href: '/agency/creator-network/apply' }]}
        cta={{ label: 'Join Chainfren', href: '/contact' }}
      />
      <main>
        <Hero onHire={onHire} />
        <Positioning />
        <NetworkLayers />
        <Fork onHire={onHire} />
        <HowItWorks />
        <WhyChainfren />
        <Proof />
        <FAQ />
        <FinalCTA onHire={onHire} />
      </main>
      <PageFooter />
      <CreatorNetworkBrandModal open={hireOpen} onClose={() => setHireOpen(false)} accent={CF.cyan} />
    </div>
  )
}
