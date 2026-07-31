'use client'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Link2, UserPlus, Lock, Wallet, Download, Fingerprint,
  Mic, GraduationCap, ShoppingBag, Music, Check, X, ArrowRight, Zap,
} from 'lucide-react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import SolutionLeadModal from './SolutionLeadModal'
import SolutionFrenAnimated from './SolutionFrenAnimated'
import { CF, solutionByKey } from '../config/stack'
import { SOLUTION_CONTENT } from '../config/solutionsContent'

// Product 02. Structured on the same framework as Media Launchpad and AI Agent
// Studio so the four Products read as one stack: hero → definitional → stats →
// problem → features → compare → two ways to buy → who it's for → candor →
// FAQ → get started. Product copy only; the reasoning behind these decisions
// lives in the vault, not on the page.
const SOL = solutionByKey('creator-growth-os')
const ACCENT = SOL.accent // periwinkle
const CONTENT = SOLUTION_CONTENT['creator-growth-os']
const EASE = [0.22, 1, 0.36, 1]
const cardBase = { borderRadius: 26, border: `2px solid ${CF.dark}`, position: 'relative', overflow: 'hidden' }

function Reveal({ children, delay = 0, y = 32, style, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className} style={style} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  )
}
function Eyebrow({ children, color = CF.dark }) {
  return <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color }}>{children}</span>
}

const STATS = [
  ['100%', 'Revenue to you'],
  ['0%', 'Platform cut'],
  ['3', 'Ways to get paid'],
  ['1', 'Link that owns your audience'],
]

const PROBLEMS = [
  { stat: '~99%', label: 'Kept by ad-funded social platforms', detail: 'Around $20B of the ~$150B a year those platforms earn reaches the people who made the content — and most of that is YouTube alone.', bg: '#FFDFDF' },
  { stat: '45%', label: 'YouTube’s cut — and it’s the generous one', detail: 'The one major platform that actually shares revenue still keeps nearly half. Everywhere else, you are paid in reach.', bg: '#FFE8CF' },
  { stat: '0', label: 'Followers you can contact directly', detail: 'You cannot export a single email from Instagram or TikTok. Lose the account and you lose the audience you spent years building.', bg: '#E6D9FF' },
]

const FEATURES = [
  { icon: Link2, title: 'One hub, everything on it', desc: 'Your link-in-bio becomes a page you own — live video, catalogue, storefront, memberships, and every link that used to send your audience somewhere you don’t control.', bg: CF.periwinkle },
  { icon: UserPlus, title: 'Capture your audience', desc: 'Turn followers into contacts you actually hold — email, WhatsApp, wallet. Your platforms stay the top of the funnel; the relationship comes home.', bg: CF.cyan },
  { icon: Lock, title: 'Sell anything, gated or open', desc: 'Subscriptions, pay-per-view, digital downloads, tickets, bundles. Set your prices, change them whenever, keep what you charge.', bg: CF.mint },
  { icon: Wallet, title: 'Get paid on three rails', desc: 'Cards, mobile money, and stablecoins — settled directly to you. No payout cycle, no minimum threshold, no ad rate deciding what your work is worth.', bg: CF.lime },
  { icon: Download, title: 'Export everything, anytime', desc: 'Your member list, your data, your content — downloadable in full whenever you want. Leaving is a button, not a negotiation.', bg: CF.lavender },
  { icon: Fingerprint, title: 'A name that’s yours', desc: 'An ENS name registered to you, not a row in a database — so your identity travels with you across platforms. Rolling out now.', bg: '#A6E1FA' },
]

const COMPARE = [
  { f: 'Live & on-demand video built in', v: [true, false, false, false] },
  { f: 'Memberships & paid content', v: [true, false, true, true] },
  { f: 'Export your audience list', v: [true, false, true, true] },
  { f: 'Mobile money payments', v: [true, false, false, false] },
  { f: 'Stablecoin settlement', v: [true, false, false, false] },
  { f: 'Self-custody wallet', v: [true, false, false, false] },
  { f: 'Portable onchain name', v: [true, false, false, false] },
  { f: 'Built for African payment rails', v: [true, false, false, false] },
]

const SEGMENTS = [
  { icon: Mic, title: 'Creators & public figures', line: 'You already won the attention. Turn it into a business with your name on the deed.', bg: CF.periwinkle },
  { icon: GraduationCap, title: 'Coaches & educators', line: 'Cohorts, courses and community — sold direct, priced in your currency, paid without a middleman.', bg: CF.cyan },
  { icon: ShoppingBag, title: 'Creator-led brands', line: 'Your audience is your channel. Sell to it without renting the relationship back every quarter.', bg: CF.mint },
  { icon: Music, title: 'Musicians & artists', line: 'Releases, tickets, merch, and the people who buy them — in one place you control.', bg: CF.lime },
]

function Hero({ onSales, onAccess }) {
  return (
    <section style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 0' }}>
      <div className="cg-hero" style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(32px, 5vw, 64px)', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 32, alignItems: 'center', backgroundImage: `radial-gradient(ellipse at 85% 12%, ${ACCENT}44, transparent 55%), radial-gradient(ellipse at 8% 100%, ${CF.cyan}2E, transparent 55%)` }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
            <Eyebrow color={ACCENT}>Creator Growth OS · TVinBio</Eyebrow>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 9999, border: `1.5px solid ${ACCENT}`, color: ACCENT, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Zap size={12} /> Powered by TVinBio — live
            </span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', fontWeight: 500, lineHeight: 0.98, letterSpacing: '-0.03em', margin: 0, maxWidth: 900 }}>
            Turn influence into a business you <span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, #fff 30%, ${ACCENT} 55%, #fff 80%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>keep.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{ fontSize: 'clamp(16px, 1.9vw, 20px)', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', maxWidth: 720, marginTop: 24 }}>
            Creator Growth OS is the operating system behind your audience — capture it, sell to it, and get paid directly, with <strong style={{ color: '#fff' }}>the list, the money and the name in your hands</strong>. Runs on TVinBio.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button onClick={onAccess} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 9999, background: ACCENT, color: CF.dark, border: `2px solid ${ACCENT}`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Request access <ArrowRight size={16} /></button>
            <button onClick={onSales} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 28px', borderRadius: 9999, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Tell us what you&apos;re building</button>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 28, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
            Try it yourself at <a href="https://tvin.bio/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: 3 }}>tvin.bio</a> — your link-in-bio, but you actually own it.
          </motion.p>
        </div>
        <motion.div className="cg-hero-art" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <span style={{ position: 'absolute', width: '78%', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}55, transparent 70%)`, filter: 'blur(12px)' }} />
          <SolutionFrenAnimated id="creator-growth-os" color={ACCENT} sub={CF.cyan} label="Creator Growth OS" style={{ width: 'min(360px, 60vw)', aspectRatio: '1', position: 'relative' }} />
        </motion.div>
      </div>
    </section>
  )
}

export default function CreatorGrowthOS() {
  const [modal, setModal] = useState({ open: false, variant: 'sales' })
  const [faqOpen, setFaqOpen] = useState(0)
  // Two CTA motions only (copy doctrine, Adoption 3).
  const openSales = () => setModal({ open: true, variant: 'sales' })
  const openAccess = () => setModal({ open: true, variant: 'access' })

  return (
    <div style={{ background: '#F5F4EE', color: CF.dark, minHeight: '100vh', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cg-card-hover { transition: transform 300ms cubic-bezier(0.22,1,0.36,1); }
        .cg-card-hover:hover { transform: translateY(-4px); }
        @media (max-width: 860px){ .cg-hero { grid-template-columns: 1fr !important; } .cg-hero-art { order: -1; } }
        @media (max-width: 760px){ .cg-faq { grid-template-columns: 1fr !important; } .cg-get { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px){ .cg-stats { grid-template-columns: repeat(2, 1fr) !important; } .cg-stats > div:nth-child(3) { border-left: none !important; } }
        .cg-compare-scroll::-webkit-scrollbar { height: 6px; }
      ` }} />
      <SiteHeader accent={ACCENT} badgeLabel="Products" cta={{ label: 'Tell us what you\'re building', onClick: openSales }} />

      <main style={{ paddingBottom: 8 }}>
        <Hero onSales={openSales} onAccess={openAccess} />

        {/* Definitional (GEO) */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '8px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.white, padding: 'clamp(24px, 3vw, 36px)', marginTop: 8 }}>
              <p style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.75rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15, color: CF.dark }}>
                For creators, public figures, coaches, artists, and creator-led brands.
              </p>
              <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 500, letterSpacing: '0.02em', color: CF.muted, marginTop: 14 }}>
                Grow and own your audience, sell directly, and get paid on <span style={{ fontStyle: 'italic', color: ACCENT }}>cards, mobile money and stablecoins</span> — on infrastructure you keep.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Stats bar */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '8px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.dark, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', overflow: 'hidden' }} className="cg-stats">
              {STATS.map(([v, l], i) => (
                <div key={l} style={{ padding: 'clamp(22px, 3vw, 34px) 16px', textAlign: 'center', borderLeft: i ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                  <div style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600, color: '#fff' }}>{v}</div>
                  <div style={{ fontSize: 11.5, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, color: ACCENT, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* The problem */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal><div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.coral}>The problem</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Attention on rented land pays the landlord first.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>You did the hard part. But the platform holds the audience, sets the rates, and changes the rules without asking — and the money moves accordingly.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.08}>
                <div className="cg-card-hover" style={{ ...cardBase, background: p.bg, padding: '30px 28px', height: '100%' }}>
                  <div style={{ fontSize: 40, fontWeight: 600, color: CF.dark, marginBottom: 8 }}>{p.stat}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: CF.dark, marginBottom: 8 }}>{p.label}</h3>
                  <p style={{ fontSize: 14, color: CF.muted, lineHeight: 1.6 }}>{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.16}>
            <p style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: CF.muted, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
              Platform take-rate figures from Chris Dixon, <em>Read Write Own</em> (Random House, 2024), ch. 8.
            </p>
          </Reveal>
          <Reveal delay={0.2}><p style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, color: CF.dark, marginTop: 32 }}>Two hundred people paying you $5 a month is $1,000 a month. <span style={{ color: ACCENT }}>And it doesn’t care what your CPM is.</span></p></Reveal>
        </section>

        {/* Features */}
        <section id="features" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal><div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>The solution</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Everything you need to own your audience.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>Capture, monetization, payments, and identity — consolidated into one operating system.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <Reveal key={f.title} delay={i * 0.06}>
                  <div className="cg-card-hover" style={{ ...cardBase, background: f.bg, padding: '28px 26px', height: '100%' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', border: `2px solid ${CF.dark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}><Icon size={22} color={CF.dark} /></div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: CF.dark, marginBottom: 8 }}>{f.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(8,21,60,0.75)', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* Compare */}
        <section id="compare" style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal><div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Eyebrow color={CF.indigo}>Compare</Eyebrow>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', color: CF.dark, marginTop: 12 }}>See what a link-in-bio doesn’t give you.</h2>
          </div></Reveal>
          <Reveal delay={0.1}>
            <div className="cg-compare-scroll" style={{ ...cardBase, background: CF.white, overflowX: 'auto' }}>
              <div style={{ minWidth: 640 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, minmax(86px, 112px))', background: ACCENT, borderBottom: `2px solid ${CF.dark}` }}>
                  <div style={{ padding: '14px 18px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: CF.dark }}>Feature</div>
                  {['Chainfren', 'Linktree', 'Patreon', 'Stan Store'].map((p) => (
                    <div key={p} style={{ padding: '14px 8px', textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: CF.dark, borderLeft: `1px solid ${CF.dark}22` }}>{p}</div>
                  ))}
                </div>
                {COMPARE.map((row, i) => (
                  <div key={row.f} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, minmax(86px, 112px))', background: i % 2 ? '#FAFAFA' : '#fff', borderBottom: i < COMPARE.length - 1 ? `1px solid ${CF.dark}15` : 'none' }}>
                    <div style={{ padding: '13px 18px', fontSize: 14, fontWeight: 500, color: CF.dark }}>{row.f}</div>
                    {row.v.map((val, j) => (
                      <div key={j} style={{ padding: '13px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: `1px solid ${CF.dark}10` }}>
                        {typeof val === 'boolean' ? (
                          val ? <span style={{ width: 24, height: 24, borderRadius: '50%', background: CF.mint, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} color={CF.dark} /></span> : <X size={16} color={CF.dim} />
                        ) : <span style={{ fontSize: 13, fontWeight: 700, color: j === 0 ? CF.dark : CF.muted }}>{val}</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: CF.muted, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
              Compared against each platform&apos;s standard published features, July 2026. Feature sets change — check current terms. Where a competitor matches, we mark it: this is a comparison, not a sales pitch.
            </p>
          </Reveal>
          <Reveal delay={0.15}><div style={{ textAlign: 'center', marginTop: 28 }}>
            <button onClick={openAccess} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 9999, background: CF.dark, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Request access <ArrowRight size={15} /></button>
          </div></Reveal>
        </section>

        {/* Self-serve vs done-with-you */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal><div style={{ maxWidth: 820, marginBottom: 32 }}>
            <Eyebrow color={CF.muted}>Two ways to run it</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Run it yourself — or run it <span style={{ fontStyle: 'italic', color: ACCENT }}>with</span> us.</h2>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <Reveal>
              <div style={{ ...cardBase, background: CF.white, padding: 'clamp(28px, 4vw, 40px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Eyebrow color={CF.indigo}>Self-serve · TVinBio</Eyebrow>
                <h3 style={{ fontSize: 24, fontWeight: 500, color: CF.dark, margin: '14px 0 12px', letterSpacing: '-0.01em' }}>Your link-in-bio, but you actually own it.</h3>
                <p style={{ fontSize: 15, color: CF.muted, lineHeight: 1.6, marginBottom: 24 }}>Live at tvin.bio. Set up your hub, switch on payments, start capturing. The platform, run by you.</p>
                <a href="https://tvin.bio/" target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 9999, background: 'transparent', color: CF.dark, border: `2px solid ${CF.dark}`, textDecoration: 'none', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Try TVinBio <ArrowRight size={14} /></a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(28px, 4vw, 40px)', height: '100%', display: 'flex', flexDirection: 'column', backgroundImage: `radial-gradient(70% 60% at 90% 10%, ${ACCENT}33, transparent 60%)` }}>
                <Eyebrow color={ACCENT}>Done-with-you · Creator Growth OS</Eyebrow>
                <h3 style={{ fontSize: 24, fontWeight: 500, color: '#fff', margin: '14px 0 12px', letterSpacing: '-0.01em' }}>We build the audience business around you.</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 20 }}>Positioning, capture, pricing, payment rails, and the monetization calendar behind it — set up and operated with you until your team can run it. You own everything at the end.</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                  {['Diagnose', 'Design', 'Build', 'Launch', 'Grow'].map((s) => (
                    <span key={s} style={{ padding: '5px 12px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.85)' }}>{s}</span>
                  ))}
                </div>
                <button onClick={openSales} style={{ marginTop: 'auto', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 9999, background: ACCENT, color: CF.dark, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Tell us what you&apos;re building <ArrowRight size={14} /></button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Who it's for */}
        <section id="who" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal><div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>Who it’s for</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Built for people who already have an audience.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>If the attention exists and the business doesn’t, this is the gap it closes.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {SEGMENTS.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="cg-card-hover" style={{ ...cardBase, background: s.bg, padding: '26px 26px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: '#fff', border: `2px solid ${CF.dark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Icon size={20} color={CF.dark} /></div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: CF.dark, marginBottom: 6 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(8,21,60,0.78)', lineHeight: 1.5 }}>{s.line}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* Candor — the house pre-revenue proof block (copy doctrine, Adoption 1).
            Real outcomes replace this the day they exist. */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: ACCENT, padding: 'clamp(32px, 5vw, 56px)', textAlign: 'center' }}>
              <Eyebrow color={CF.dark}>Building in the open</Eyebrow>
              <p style={{ fontSize: 'clamp(1.2rem, 2.6vw, 1.75rem)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3, color: CF.dark, marginTop: 14, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
                Early access — the first cohort is onboarding now. When we have real numbers, we&apos;ll publish them. No invented ones.
              </p>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <div className="cg-faq" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 32 }}>
            <Reveal><div style={{ padding: '8px 8px 0' }}>
              <Eyebrow color={CF.indigo}>FAQ</Eyebrow>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Frequently asked questions.</h2>
            </div></Reveal>
            <Reveal delay={0.1}>
              <div style={{ ...cardBase, background: CF.white, padding: '0 clamp(18px, 4vw, 32px)' }}>
                {CONTENT.faq.map((it, i) => {
                  const isOpen = faqOpen === i
                  return (
                    <div key={i} style={{ borderBottom: i < CONTENT.faq.length - 1 ? '1.5px solid rgba(8,21,60,0.12)' : 'none' }}>
                      <button onClick={() => setFaqOpen(isOpen ? -1 : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 'clamp(18px,3vw,22px) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, fontFamily: 'inherit' }}>
                        <span style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', fontWeight: 600, color: CF.dark, lineHeight: 1.3, flex: 1 }}>{it.q}</span>
                        <span style={{ width: 30, height: 30, borderRadius: '50%', border: `2px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), background 200ms', background: isOpen ? CF.dark : CF.white, color: isOpen ? '#fff' : CF.dark }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </span>
                      </button>
                      <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 400ms cubic-bezier(0.22,1,0.36,1)' }}>
                        <div style={{ overflow: 'hidden' }}>
                          <p style={{ fontSize: 15, color: CF.muted, lineHeight: 1.65, paddingBottom: 'clamp(18px, 3vw, 24px)', paddingRight: 'clamp(0px, 4vw, 48px)' }}>{it.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Get started */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(40px, 7vw, 96px) clamp(28px, 6vw, 80px)', backgroundImage: `radial-gradient(ellipse at 80% 20%, ${ACCENT}55, transparent 60%), radial-gradient(ellipse at 20% 100%, #3D1F73aa, transparent 60%)` }}>
              <Eyebrow color={ACCENT}>Get started</Eyebrow>
              <h2 style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)', fontWeight: 500, lineHeight: 0.98, letterSpacing: '-0.03em', margin: '20px 0 28px', maxWidth: 1000 }}>
                Ready to <span style={{ fontStyle: 'italic', color: ACCENT }}>own it?</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', maxWidth: 680, marginBottom: 36 }}>
                Tell us what you&apos;re building. The form takes 60 seconds. If we&apos;re not the right team, we&apos;ll point you to who is.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={openSales} style={{ padding: '16px 32px', borderRadius: 9999, background: ACCENT, border: 'none', color: CF.dark, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Tell us what you&apos;re building <ArrowRight size={16} /></button>
                <Link href="/products/media-launchpad" style={{ padding: '16px 32px', borderRadius: 9999, background: 'transparent', border: '2px solid #fff', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Explore Media Launchpad</Link>
              </div>
            </div>
          </Reveal>
        </section>

        <SiteFooter />
      </main>

      <SolutionLeadModal open={modal.open} variant={modal.variant} solution={SOL.key} solutionName={SOL.name} accent={ACCENT} onClose={() => setModal((m) => ({ ...m, open: false }))} />
    </div>
  )
}
