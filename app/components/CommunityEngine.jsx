'use client'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Home, Award, Gift, Send, Download, ShieldCheck,
  Users, MessageSquare, TrendingDown,
  Heart, ShoppingCart, Users2, Building2, Check, X, ArrowRight, Zap,
} from 'lucide-react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import SolutionLeadModal from './SolutionLeadModal'
import SolutionFrenAnimated from './SolutionFrenAnimated'
import { CF, solutionByKey } from '../config/stack'
import { SOLUTION_CONTENT } from '../config/solutionsContent'

// Product 03. Same framework as Media Launchpad, AI Agent Studio and Creator
// Growth OS so the four Products read as one stack. Ownership and the legal /
// anti-abuse discipline appear here as product features, not as an argument —
// the reasoning behind them lives in the vault.
const SOL = solutionByKey('community-loyalty')
const ACCENT = SOL.accent // mint
const CONTENT = SOLUTION_CONTENT['community-loyalty']
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
  ['0', 'Tokens, by design'],
  ['4', 'Rungs on the reward ladder'],
  ['100%', 'Member data, exportable'],
  ['24/7', 'Agent-run community ops'],
]

const TENSION = [
  { icon: Users, title: 'Followers aren’t members', detail: 'An audience watches. It doesn’t show up, defend you, or bring anyone — because nothing about following you is a position worth protecting.', bg: '#E6D9FF' },
  { icon: MessageSquare, title: 'Your community lives on rented land', detail: 'The server, the group chat, the comments — owned by someone else, with rules that change and members you can’t contact directly.', bg: '#D9ECFF' },
  { icon: TrendingDown, title: 'Loyalty that leaks', detail: 'Points nobody redeems, discount codes that train people to wait for discounts, and a rewards program your best customers forgot they joined.', bg: '#FFE8CF' },
]

const FEATURES = [
  { icon: Home, title: 'A members’ space you own', desc: 'Gated and branded on your own domain — or running inside WhatsApp, Telegram or Discord where your people already are. Discovery stays on the platforms; community comes home.', bg: CF.mint },
  { icon: Award, title: 'Membership tiers & status', desc: 'Points, badges, levels and recognition your day-ones actually want. Name the tiers whatever your community already calls them — Founding Fan, First 100, Day One.', bg: CF.lime },
  { icon: Gift, title: 'Rewards that route to your product', desc: 'Merch, tickets, samples, early access, the invite list. Value that costs you margin instead of cash and keeps the spend inside your own economy.', bg: CF.cyan },
  { icon: Send, title: 'Missions that turn members into reach', desc: 'Give people a job — clip this, invite two, review it, show up — and reward what actually landed rather than what got submitted.', bg: CF.periwinkle },
  { icon: Download, title: 'Own your member data', desc: 'The list, the ledger and the contact channel, exportable in full at any time in a format that works somewhere else. No lock-in, no permission needed.', bg: CF.lavender },
  { icon: ShieldCheck, title: 'Fraud and compliance, built in', desc: 'Verification tiers, per-member caps, delayed settlement and a campaign kill-switch. Rewards awarded on published criteria, never random draws. Consent language ships with the build.', bg: '#A6E1FA' },
]

const COMPARE = [
  { f: 'Branded space on your own domain', v: [true, false, true, false] },
  { f: 'Export your member list', v: [true, false, true, true] },
  { f: 'Points, tiers & status engine', v: [true, false, false, true] },
  { f: 'Rewards for contribution, not just purchases', v: [true, false, false, false] },
  { f: 'Referral missions scored on outcomes', v: [true, false, false, false] },
  { f: 'Fraud controls & campaign kill-switch', v: [true, false, false, true] },
  { f: 'Works without an online store', v: [true, true, true, false] },
  { f: 'Designed, built and run with you', v: [true, false, false, false] },
]

const STEPS = [
  { n: '01', t: 'Design', d: 'We map who your members are, what they would actually do for you, and what recognition is worth to them — before anything gets built.' },
  { n: '02', t: 'Stand up', d: 'The space goes live where your people already are, with tiers, points, roles and the rules that govern them.' },
  { n: '03', t: 'Activate', d: 'Missions go out. Members clip, invite, review, show up. Every submission is approved by a human before it carries your name anywhere.' },
  { n: '04', t: 'Reward', d: 'Status lands instantly. Value settles after a holding window, so what you pay for is what actually stuck.' },
  { n: '05', t: 'Hand over', d: 'Runbooks, training, and a clean transfer of the list, the ledger and the build. Your team runs it; we stay on call.' },
]

const SEGMENTS = [
  { icon: Heart, title: 'Fan bases', line: 'The people who show up for an artist, a team, a show. Give them a position, not just a follow.', bg: CF.mint },
  { icon: ShoppingCart, title: 'Consumer & FMCG brands', line: 'Loyalty that compounds instead of leaking — and customers who bring you customers.', bg: CF.lime },
  { icon: Users2, title: 'Communities & societies', line: 'Structure, roles and rewards for a group that outgrew its group chat.', bg: CF.cyan },
  { icon: Building2, title: 'Institutions & membership orgs', line: 'Alumni, congregations, associations — membership with a real ledger behind it.', bg: CF.lavender },
]

function Hero({ onSales, onAccess }) {
  return (
    <section style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 0' }}>
      <div className="ce-hero" style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(32px, 5vw, 64px)', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 32, alignItems: 'center', backgroundImage: `radial-gradient(ellipse at 85% 12%, ${ACCENT}44, transparent 55%), radial-gradient(ellipse at 8% 100%, ${CF.lime}2E, transparent 55%)` }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
            <Eyebrow color={ACCENT}>Community Engine</Eyebrow>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 9999, border: `1.5px solid ${ACCENT}`, color: ACCENT, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Zap size={12} /> Early access
            </span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', fontWeight: 500, lineHeight: 0.98, letterSpacing: '-0.03em', margin: 0, maxWidth: 900 }}>
            Turn your audience into <span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, #fff 30%, ${ACCENT} 55%, #fff 80%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>owners.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{ fontSize: 'clamp(16px, 1.9vw, 20px)', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', maxWidth: 720, marginTop: 24 }}>
            Community Engine is your <strong style={{ color: '#fff' }}>owned community layer</strong> — membership, loyalty, and fan economics that turn followers into members with a real stake. Built on top of the platforms you already use.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button onClick={onAccess} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 9999, background: ACCENT, color: CF.dark, border: `2px solid ${ACCENT}`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Request access <ArrowRight size={16} /></button>
            <button onClick={onSales} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 28px', borderRadius: 9999, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Tell us what you&apos;re building</button>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 28, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
            <strong style={{ color: '#fff' }}>No token. No coin. No NFT drops.</strong> Ownership mechanics, not speculation — so it works for any brand, crypto-native or not.
          </motion.p>
        </div>
        <motion.div className="ce-hero-art" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <span style={{ position: 'absolute', width: '78%', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}55, transparent 70%)`, filter: 'blur(12px)' }} />
          <SolutionFrenAnimated id="community-loyalty" color={ACCENT} sub={CF.lime} label="Community Engine" style={{ width: 'min(360px, 60vw)', aspectRatio: '1', position: 'relative' }} />
        </motion.div>
      </div>
    </section>
  )
}

export default function CommunityEngine() {
  const [modal, setModal] = useState({ open: false, variant: 'sales' })
  const [faqOpen, setFaqOpen] = useState(0)
  const openSales = () => setModal({ open: true, variant: 'sales' })
  const openAccess = () => setModal({ open: true, variant: 'access' })

  return (
    <div style={{ background: '#F5F4EE', color: CF.dark, minHeight: '100vh', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .ce-card-hover { transition: transform 300ms cubic-bezier(0.22,1,0.36,1); }
        .ce-card-hover:hover { transform: translateY(-4px); }
        @media (max-width: 860px){ .ce-hero { grid-template-columns: 1fr !important; } .ce-hero-art { order: -1; } }
        @media (max-width: 760px){ .ce-faq { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px){ .ce-stats { grid-template-columns: repeat(2, 1fr) !important; } .ce-stats > div:nth-child(3) { border-left: none !important; } }
        .ce-compare-scroll::-webkit-scrollbar { height: 6px; }
      ` }} />
      <SiteHeader accent={ACCENT} badgeLabel="Products" cta={{ label: 'Tell us what you\'re building', onClick: openSales }} />

      <main style={{ paddingBottom: 8 }}>
        <Hero onSales={openSales} onAccess={openAccess} />

        {/* Definitional (GEO) */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '8px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.white, padding: 'clamp(24px, 3vw, 36px)', marginTop: 8 }}>
              <p style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.75rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15, color: CF.dark }}>
                For fan bases, consumer brands, communities, and membership organizations.
              </p>
              <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 500, letterSpacing: '0.02em', color: CF.muted, marginTop: 14 }}>
                Discovery happens on the platforms. <span style={{ fontStyle: 'italic', color: '#7FA83A' }}>Community happens in the space you own.</span>
              </p>
            </div>
          </Reveal>
        </section>

        {/* Stats bar */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '8px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.dark, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', overflow: 'hidden' }} className="ce-stats">
              {STATS.map(([v, l], i) => (
                <div key={l} style={{ padding: 'clamp(22px, 3vw, 34px) 16px', textAlign: 'center', borderLeft: i ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                  <div style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600, color: '#fff' }}>{v}</div>
                  <div style={{ fontSize: 11.5, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, color: ACCENT, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* The tension */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal><div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.coral}>The problem</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>An audience with a group chat isn’t a community.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>Followers watch. Members belong. Owners build. Most brands stop at the first one and wonder why nobody stays.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {TENSION.map((t, i) => {
              const Icon = t.icon
              return (
                <Reveal key={t.title} delay={i * 0.08}>
                  <div className="ce-card-hover" style={{ ...cardBase, background: t.bg, padding: '30px 28px', height: '100%' }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: '#fff', border: `2px solid ${CF.dark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}><Icon size={21} color={CF.dark} /></div>
                    <h3 style={{ fontSize: 17, fontWeight: 600, color: CF.dark, marginBottom: 8 }}>{t.title}</h3>
                    <p style={{ fontSize: 14, color: CF.muted, lineHeight: 1.6 }}>{t.detail}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.2}><p style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, color: CF.dark, marginTop: 40 }}>Belonging has to be worth something. <span style={{ color: '#7FA83A' }}>So we make it worth something.</span></p></Reveal>
        </section>

        {/* Features */}
        <section id="features" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal><div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>The solution</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Everything you need to run an owned community.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>The space, the status ladder, the rewards, the growth loop, and the controls that keep it from being farmed.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <Reveal key={f.title} delay={i * 0.06}>
                  <div className="ce-card-hover" style={{ ...cardBase, background: f.bg, padding: '28px 26px', height: '100%' }}>
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
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', color: CF.dark, marginTop: 12 }}>A chat app and a points plugin aren’t the same thing.</h2>
          </div></Reveal>
          <Reveal delay={0.1}>
            <div className="ce-compare-scroll" style={{ ...cardBase, background: CF.white, overflowX: 'auto' }}>
              <div style={{ minWidth: 660 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, minmax(86px, 112px))', background: ACCENT, borderBottom: `2px solid ${CF.dark}` }}>
                  <div style={{ padding: '14px 18px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: CF.dark }}>Feature</div>
                  {['Chainfren', 'Discord', 'Circle', 'Smile.io'].map((p) => (
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
            <p style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: CF.muted, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
              Compared against each product&apos;s standard published features, July 2026. Feature sets change — check current terms. Where a competitor matches, we mark it: this is a comparison, not a sales pitch.
            </p>
          </Reveal>
          <Reveal delay={0.15}><div style={{ textAlign: 'center', marginTop: 28 }}>
            <button onClick={openAccess} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 9999, background: CF.dark, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Request access <ArrowRight size={15} /></button>
          </div></Reveal>
        </section>

        {/* How it works */}
        <section id="how" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal><div style={{ maxWidth: 820, marginBottom: 32 }}>
            <Eyebrow color={CF.indigo}>How it works</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Designed, built, and handed <span style={{ fontStyle: 'italic', color: '#7FA83A' }}>over.</span></h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16, maxWidth: 700 }}>We build it and run it with you, then give you the keys. Day-to-day operations run on an agent — moderation, onboarding, answering questions, surfacing the best contributions — so the layer costs what a real budget can carry.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="ce-card-hover" style={{ ...cardBase, background: CF.white, padding: '26px 24px', height: '100%' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: '#7FA83A', marginBottom: 12 }}>{s.n}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: CF.dark, marginBottom: 8 }}>{s.t}</h3>
                  <p style={{ fontSize: 14, color: CF.muted, lineHeight: 1.6 }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section id="who" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal><div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>Who it’s for</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Anyone with people worth keeping.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>Crypto-native or not — the mechanics work the same either way.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {SEGMENTS.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="ce-card-hover" style={{ ...cardBase, background: s.bg, padding: '26px 26px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: '#fff', border: `2px solid ${CF.dark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Icon size={20} color={CF.dark} /></div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: CF.dark, marginBottom: 6 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(8,21,60,0.78)', lineHeight: 1.5 }}>{s.line}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* Candor — the house pre-revenue proof block (copy doctrine, Adoption 1). */}
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
          <div className="ce-faq" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 32 }}>
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
                <Link href="/products/ai-agent-studio" style={{ padding: '16px 32px', borderRadius: 9999, background: 'transparent', border: '2px solid #fff', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Explore AI Agent Studio</Link>
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
