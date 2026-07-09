'use client'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Sparkles, Megaphone, Workflow, LineChart, Check, ArrowRight, Zap,
  Fingerprint, Bot, Network, Repeat, Users, Radio, Target, Coins, Gauge,
} from 'lucide-react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import SolutionLeadModal from './SolutionLeadModal'
import { Fren } from './Frens'
import SolutionFrenAnimated from './SolutionFrenAnimated'
import { CF, solutionByKey } from '../config/stack'
import { TIERS, FAQS } from '../config/aiAgentStudio'

const SOL = solutionByKey('ai-agents')
const ACCENT = SOL.accent // lavender #A6E1FA
const ACCENT_B = SOL.accentB // electric #40ACFF
const EASE = [0.22, 1, 0.36, 1]
const SERIF = 'Georgia, "Times New Roman", serif'
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

// ── Content ─────────────────────────────────────────────────────────────
const STATS = [
  ['10×', 'Content velocity vs legacy'],
  ['24/7', 'Always-on acquisition'],
  ['Days', 'To first output, not weeks'],
  ['1', 'Brand-locked model per client'],
]

const TENSION = [
  { icon: Users, title: 'You are the whole team', detail: 'Product, marketer, community manager, ops — all one person. That ceiling is why most creators and brands plateau.', bg: '#E6D9FF' },
  { icon: Radio, title: 'Reach you rent', detail: 'Your attention lives on platforms you don’t own. Every post is taxed by an algorithm that can change overnight.', bg: '#D9ECFF' },
  { icon: Target, title: 'Spend you can’t measure', detail: 'Marketing that can’t prove reach, brand lift, or sell-through. You’re flying blind and paying full price for it.', bg: '#FFE8CF' },
]

export const MODULES = [
  {
    icon: Sparkles, n: '01', name: 'AI Content Engine', tag: 'Always-on creative supply',
    line: 'Endless on-brand assets at the speed culture moves — shoot-and-wait becomes generate-and-ship.',
    bg: ACCENT,
    points: [
      'Product & lifestyle visuals, UGC-style video ads, meme & culture content, campaign and packaging mockups',
      'A brand-locked model per client, so every asset is unmistakably yours',
      'An always-on pipeline that repurposes one idea into weeks of posts, clips, and formats',
      'Localized variants across markets, languages, and dialects',
    ],
  },
  {
    icon: Megaphone, n: '02', name: 'AI & Creator Distribution', tag: 'Automated reach',
    line: 'Content pushed where attention lives — AI agents distributing on autopilot, plus the creator warm-graph, owned and earned under one roof.',
    bg: CF.periwinkle,
    points: [
      'AI distribution agents that publish, schedule, and cross-post across every channel — 24/7, no manual posting',
      'The creator warm-graph, influencer seeding, and meme insertion',
      'WhatsApp / Telegram and community activation, native TikTok / IG / X pushes',
      'Owned AI-influencer personas — distribution you control, not rent',
    ],
  },
  {
    icon: Workflow, n: '03', name: 'Automation & Acquisition', tag: 'The conversion machine',
    line: 'Turn reach into customers — 24/7 acquisition ops at a fraction of the headcount.',
    bg: CF.mint,
    points: [
      'AI-agent lead capture & nurture, WhatsApp commerce funnels, automated engagement',
      'Retargeting, referral loops, and first-party data capture',
      'Payments on local rails and stablecoins',
    ],
  },
  {
    icon: LineChart, n: '04', name: 'Intelligence & Measurement', tag: 'The proof and the moat',
    line: 'One dashboard for everything that matters — finally, marketing you can measure.',
    bg: CF.lime,
    points: [
      'Reach, brand lift, engagement velocity, CAC where trackable, sell-through signals',
      'AI-driven optimization and always-on culture listening',
      'Data compounds per client — the engine gets smarter over time',
    ],
  },
]

const MOAT = [
  { icon: Fingerprint, title: 'A model that’s only yours', d: 'A brand-locked model trained on your world — every asset is on-brand by construction, not by luck.' },
  { icon: Bot, title: 'Personas you own', d: 'Owned AI-influencer personas are distribution you control, not audience you rent from a platform.' },
  { icon: Network, title: 'The creator graph', d: 'Real relationships with the people who move African culture. Content, most agencies have. Distribution through culture, they can’t copy.' },
  { icon: Gauge, title: 'Intelligence that compounds', d: 'Every client makes the engine sharper. The data moat widens with each campaign — and so does your edge.' },
]

const STEPS = [
  { n: '01', t: 'Diagnose', d: 'A free call. We learn what you’re building and where growth is stuck. If we’re not the right team, we say so.' },
  { n: '02', t: 'Design', d: 'A written plan: positioning, the modules you switch on, distribution, and the KPIs we’ll move. You sign off first.' },
  { n: '03', t: 'Build', d: 'We train your brand-locked model, wire the pipelines, and stand up the acquisition and measurement layer.' },
  { n: '04', t: 'Launch', d: 'The machine goes live — content shipping, creators activated, funnels converting, the dashboard tracking it all.' },
  { n: '05', t: 'Grow', d: 'We optimize against the numbers. The engine compounds, and your data moat widens every month.' },
]

// ── Hero ────────────────────────────────────────────────────────────────
function Hero({ onSales, onEarly }) {
  return (
    <section style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 0' }}>
      <div className="ai-hero" style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(32px, 5vw, 64px)',
        display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 32, alignItems: 'center',
        backgroundImage: `radial-gradient(ellipse at 85% 12%, ${ACCENT_B}44, transparent 55%), radial-gradient(ellipse at 6% 100%, ${ACCENT}2e, transparent 55%)` }}>
        <div>
          <nav style={{ fontSize: 12, letterSpacing: '0.02em', color: 'rgba(255,255,255,0.6)', marginBottom: 18 }}>
            <Link href="/solutions" style={{ color: 'inherit', textDecoration: 'none' }}>Solutions</Link>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>›</span>
            <span style={{ color: '#fff' }}>AI Agent Studio</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <Eyebrow color={ACCENT}>AI Agent Studio</Eyebrow>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 9999, border: `1.5px solid ${ACCENT}`, color: ACCENT, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Zap size={12} /> Early access
            </span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}
            style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.75rem)', fontWeight: 500, lineHeight: 0.98, letterSpacing: '-0.03em', margin: 0 }}>
            Scale your presence,<br />not your <span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, #fff 30%, ${ACCENT_B} 55%, #fff 80%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>overhead.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{ fontSize: 'clamp(16px, 1.9vw, 20px)', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', maxWidth: 640, marginTop: 24 }}>
            We don’t just make content. We build the <strong style={{ color: '#fff' }}>machine that grows the brand</strong> — AI agents and automation that create, distribute, convert, and measure, running while you sleep.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button onClick={onSales} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 9999, background: ACCENT, color: CF.dark, border: `2px solid ${ACCENT}`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Talk to us <ArrowRight size={16} /></button>
            <button onClick={onEarly} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 28px', borderRadius: 9999, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Request early access</button>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 28, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
            <strong style={{ color: '#fff' }}>Culture in, distribution out.</strong>
          </motion.p>
        </div>
        <motion.div className="ai-hero-art" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <span style={{ position: 'absolute', width: '78%', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT_B}55, transparent 70%)`, filter: 'blur(12px)' }} />
          <SolutionFrenAnimated id="ai-agents" color={ACCENT} sub={ACCENT_B} label="AI Agent Studio" style={{ width: 'min(360px, 60vw)', aspectRatio: '1', position: 'relative' }} />
        </motion.div>
      </div>
    </section>
  )
}

export default function AiAgentStudio() {
  const [modal, setModal] = useState({ open: false, variant: 'sales' })
  const [faqOpen, setFaqOpen] = useState(0)
  const openSales = () => setModal({ open: true, variant: 'sales' })
  const openEarly = () => setModal({ open: true, variant: 'early-access' })

  return (
    <div style={{ background: '#F5F4EE', color: CF.dark, minHeight: '100vh', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .ai-card-hover { transition: transform 300ms cubic-bezier(0.22,1,0.36,1); }
        .ai-card-hover:hover { transform: translateY(-4px); }
        @media (max-width: 860px){ .ai-hero { grid-template-columns: 1fr !important; } .ai-hero-art { order: -1; } }
        @media (max-width: 760px){ .ai-faq { grid-template-columns: 1fr !important; } .ai-get { grid-template-columns: 1fr !important; } .ai-modules { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px){ .ai-stats { grid-template-columns: repeat(2, 1fr) !important; } .ai-stats > div:nth-child(3){ border-left: none !important; } }
      ` }} />
      <SiteHeader accent={ACCENT} badgeLabel="Solutions" cta={{ label: 'Talk to us', onClick: openSales }} />

      <main style={{ paddingBottom: 8 }}>
        <Hero onSales={openSales} onEarly={openEarly} />

        {/* Definitional (GEO) */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '8px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.white, padding: 'clamp(24px, 3vw, 40px)', marginTop: 8 }}>
              <p style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.16, color: CF.dark }}>
                <span style={{ fontStyle: 'italic', color: ACCENT_B }}>AI-native growth engine</span> for creators, brands, and consumer companies.
              </p>
              <p style={{ fontSize: 'clamp(13px, 1.4vw, 15.5px)', fontWeight: 500, letterSpacing: '0.01em', color: CF.muted, marginTop: 16, maxWidth: 900, lineHeight: 1.6 }}>
                Grow reach, content, and revenue without growing headcount. Content, Distribution, Acquisition and Intelligence by AI agents at a speed and cost legacy agencies can’t match.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Stats bar */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '8px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.dark, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="ai-stats">
              {STATS.map(([v, l], i) => (
                <div key={l} style={{ padding: 'clamp(22px, 3vw, 34px) 16px', textAlign: 'center', borderLeft: i ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                  <div style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600, color: '#fff' }}>{v}</div>
                  <div style={{ fontSize: 11.5, letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 500, color: ACCENT, marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* The tension */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal><div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.coral}>The tension</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Growth shouldn’t depend on you doing everything.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>Most creators and brands hit the same three walls. Every one of them is a job an engine can do better than a person.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {TENSION.map((p, i) => {
              const Icon = p.icon
              return (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="ai-card-hover" style={{ ...cardBase, background: p.bg, padding: '30px 28px', height: '100%' }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: '#fff', border: `2px solid ${CF.dark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}><Icon size={21} color={CF.dark} /></div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: CF.dark, marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(8,21,60,0.72)', lineHeight: 1.6 }}>{p.detail}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.2}><p style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, color: CF.dark, marginTop: 40 }}>There’s a better way to grow. <span style={{ color: ACCENT_B }}>We built the machine.</span></p></Reveal>
        </section>

        {/* The engine — four modules */}
        <section id="engine" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal><div style={{ maxWidth: 760, marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>The engine</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>One machine. Four modules.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>Not a menu of services — a single system, sold as how much of it you switch on. Content in, customers out.</p>
          </div></Reveal>
          <div className="ai-modules" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {MODULES.map((m, i) => {
              const Icon = m.icon
              return (
                <Reveal key={m.n} delay={i * 0.07}>
                  <div className="ai-card-hover" style={{ ...cardBase, background: m.bg, padding: 'clamp(28px, 3.4vw, 40px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                      <div style={{ width: 50, height: 50, borderRadius: 14, background: '#fff', border: `2px solid ${CF.dark}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={23} color={CF.dark} /></div>
                      <span style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 400, color: 'rgba(8,21,60,0.35)', lineHeight: 1 }}>{m.n}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(8,21,60,0.55)' }}>{m.tag}</span>
                    <h3 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', fontWeight: 600, color: CF.dark, letterSpacing: '-0.02em', margin: '8px 0 10px' }}>{m.name}</h3>
                    <p style={{ fontSize: 15.5, color: 'rgba(8,21,60,0.8)', lineHeight: 1.55, marginBottom: 20 }}>{m.line}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 'auto', paddingTop: 20, borderTop: `2px solid ${CF.dark}18` }}>
                      {m.points.map((pt) => (
                        <div key={pt} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                          <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', border: `2px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><Check size={11} color={CF.dark} /></span>
                          <span style={{ fontSize: 14, color: CF.dark, lineHeight: 1.5 }}>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* Dual framing — for consumer & FMCG brands */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(32px, 5vw, 64px)',
              display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 32, alignItems: 'center',
              backgroundImage: `radial-gradient(70% 80% at 92% 12%, ${ACCENT_B}3a, transparent 60%), radial-gradient(60% 70% at 4% 100%, ${ACCENT}26, transparent 60%)` }} className="ai-hero">
              <div>
                <Eyebrow color={ACCENT}>For consumer & FMCG brands</Eyebrow>
                <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3.1rem)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, margin: '14px 0 16px' }}>
                  Culture in. <span style={{ fontStyle: 'italic', color: ACCENT }}>Distribution out.</span>
                </h2>
                <p style={{ fontSize: 16.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, maxWidth: 620, marginBottom: 20 }}>
                  FMCG is the most content-hungry, always-on category in Africa — and a brand game to its core. That’s exactly where AI-native distribution is a 10× on cost and speed. Finally, always-on marketing that’s measurable, at a fraction of what legacy agencies charge.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26 }}>
                  {[
                    'Reach, brand lift, share of voice, and sell-through — measured, not guessed',
                    'The creator warm-graph: distribution through culture, not just content',
                    'Currency-native rails — settle in stablecoins across pan-African B2B',
                  ].map((b) => (
                    <div key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: ACCENT, border: `2px solid ${ACCENT}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}><Check size={12} color={CF.dark} /></span>
                      <span style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.9)' }}>{b}</span>
                    </div>
                  ))}
                </div>
                <button onClick={openSales} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 9999, background: ACCENT, color: CF.dark, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Grow your brand <ArrowRight size={15} /></button>
              </div>
              <div className="ai-hero-art" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <span style={{ position: 'absolute', width: '76%', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}44, transparent 70%)`, filter: 'blur(14px)' }} />
                <Fren pose="arrow" colorA={ACCENT} colorB={ACCENT_B} sw={20} size={300} style={{ width: 'min(320px, 40vw)', height: 'auto', position: 'relative' }} />
              </div>
            </div>
          </Reveal>
        </section>

        {/* The ladder — three tiers */}
        <section id="pricing" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal><div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>The ladder</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>One system. Switch on as much as you need.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>A fast, affordable proof earns the full engine. Pricing is a subscription base plus performance upside — never hourly, never pure project.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', alignItems: 'stretch' }}>
            {TIERS.map((t, i) => {
              const hero = t.flagship
              return (
                <Reveal key={t.name} delay={i * 0.08}>
                  <div style={{ ...cardBase, background: hero ? CF.dark : (i === 0 ? CF.white : ACCENT), color: hero ? '#fff' : CF.dark, padding: 'clamp(28px, 3.4vw, 40px)', height: '100%', display: 'flex', flexDirection: 'column',
                    backgroundImage: hero ? `radial-gradient(80% 60% at 85% 8%, ${ACCENT_B}44, transparent 60%)` : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                      <Eyebrow color={hero ? ACCENT : 'rgba(8,21,60,0.55)'}>{t.kind}</Eyebrow>
                      {hero && <span style={{ padding: '3px 10px', borderRadius: 9999, background: ACCENT, color: CF.dark, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Most run this</span>}
                    </div>
                    <h3 style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', fontWeight: 600, letterSpacing: '-0.02em', color: hero ? '#fff' : CF.dark, marginBottom: 10 }}>{t.name}</h3>
                    <p style={{ fontSize: 15, color: hero ? 'rgba(255,255,255,0.8)' : 'rgba(8,21,60,0.75)', lineHeight: 1.55, marginBottom: 22 }}>{t.line}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26 }}>
                      {t.points.map((pt) => (
                        <div key={pt} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                          <span style={{ width: 20, height: 20, borderRadius: '50%', background: hero ? ACCENT : '#fff', border: `2px solid ${hero ? ACCENT : CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><Check size={11} color={CF.dark} /></span>
                          <span style={{ fontSize: 14, color: hero ? 'rgba(255,255,255,0.92)' : CF.dark, lineHeight: 1.5 }}>{pt}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setModal({ open: true, variant: t.variant })} style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 24px', borderRadius: 9999, background: hero ? ACCENT : CF.dark, color: hero ? CF.dark : '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t.cta} <ArrowRight size={14} /></button>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.2}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 22, color: CF.muted, fontSize: 13.5 }}>
            <Coins size={15} /> Stablecoin settlement available — the pan-African option.
          </div></Reveal>
        </section>

        {/* How we work */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal><div style={{ maxWidth: 760, marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>How we work</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>From attention to ownership.</h2>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="ai-card-hover" style={{ ...cardBase, background: CF.white, padding: '26px 24px', height: '100%' }}>
                  <span style={{ fontFamily: SERIF, fontSize: 30, color: ACCENT_B, lineHeight: 1 }}>{s.n}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: CF.dark, margin: '14px 0 8px' }}>{s.t}</h3>
                  <p style={{ fontSize: 13.5, color: CF.muted, lineHeight: 1.6 }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* The moat */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal><div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>Why it’s defensible</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>A studio makes assets. We own the outcome.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>Content, any agency can promise. Four things make this engine hard to copy — and worth the premium.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {MOAT.map((m, i) => {
              const Icon = m.icon
              return (
                <Reveal key={m.title} delay={i * 0.07}>
                  <div className="ai-card-hover" style={{ ...cardBase, background: CF.white, padding: '30px 26px', height: '100%' }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: ACCENT, border: `2px solid ${CF.dark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}><Icon size={21} color={CF.dark} /></div>
                    <h3 style={{ fontSize: 17.5, fontWeight: 600, color: CF.dark, marginBottom: 8, letterSpacing: '-0.01em' }}>{m.title}</h3>
                    <p style={{ fontSize: 14, color: CF.muted, lineHeight: 1.6 }}>{m.d}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <div className="ai-faq" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 32 }}>
            <Reveal><div style={{ padding: '8px 8px 0' }}>
              <Eyebrow color={CF.indigo}>FAQ</Eyebrow>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Frequently asked questions.</h2>
            </div></Reveal>
            <Reveal delay={0.1}>
              <div style={{ ...cardBase, background: CF.white, padding: '0 clamp(18px, 4vw, 32px)' }}>
                {FAQS.map((it, i) => {
                  const isOpen = faqOpen === i
                  return (
                    <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? '1.5px solid rgba(8,21,60,0.12)' : 'none' }}>
                      <button onClick={() => setFaqOpen(isOpen ? -1 : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 'clamp(18px,3vw,22px) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, fontFamily: 'inherit' }}>
                        <span style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', fontWeight: 600, color: CF.dark, lineHeight: 1.3, flex: 1 }}>{it.q}</span>
                        <span style={{ width: 30, height: 30, borderRadius: '50%', border: `2px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), background 200ms', background: isOpen ? CF.dark : CF.white, color: isOpen ? '#fff' : CF.dark }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </span>
                      </button>
                      <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 400ms cubic-bezier(0.22,1,0.36,1)' }}>
                        <div style={{ overflow: 'hidden' }}><p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.65, paddingBottom: 'clamp(18px,3vw,22px)', paddingRight: 'clamp(0px,4vw,48px)' }}>{it.a}</p></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section id="get-started" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(40px, 7vw, 96px) clamp(28px, 6vw, 80px)',
              backgroundImage: `radial-gradient(ellipse at 80% 20%, ${ACCENT_B}55, transparent 60%), radial-gradient(ellipse at 20% 100%, ${ACCENT}30, transparent 60%)` }}>
              <Eyebrow color={ACCENT}>Ready when you are</Eyebrow>
              <h2 style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)', fontWeight: 500, lineHeight: 0.98, letterSpacing: '-0.03em', margin: '20px 0 28px', maxWidth: 1000 }}>
                Build the machine that <span style={{ fontStyle: 'italic', color: ACCENT }}>grows it.</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', maxWidth: 680, marginBottom: 36 }}>
                Tell us what you’re building. The form takes 60 seconds. Start with a two-week Sprint or go straight to the full engine — if we’re not the right team, we’ll point you to who is.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={openSales} style={{ padding: '16px 32px', borderRadius: 9999, background: ACCENT, border: 'none', color: CF.dark, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Talk to us <ArrowRight size={16} /></button>
                <a href="mailto:hello@chainfren.com" style={{ padding: '16px 32px', borderRadius: 9999, background: 'transparent', border: '2px solid #fff', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>hello@chainfren.com</a>
              </div>
            </div>
          </Reveal>
        </section>

        <SiteFooter />
      </main>

      <SolutionLeadModal open={modal.open} variant={modal.variant} solution="ai-agents" solutionName="AI Agent Studio" accent={ACCENT} onClose={() => setModal((m) => ({ ...m, open: false }))} />
    </div>
  )
}
