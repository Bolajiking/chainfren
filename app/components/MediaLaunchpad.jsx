'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Play, Lock, DollarSign, Users, Wallet, BarChart2, Check, X, ArrowRight,
  Trophy, Church, Ticket, Film, Music, Tv, Zap,
} from 'lucide-react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import SolutionLeadModal from './SolutionLeadModal'
import SolutionFrenAnimated from './SolutionFrenAnimated'
import { CF, solutionByKey } from '../config/stack'

const SOL = solutionByKey('media-launchpad')
const ACCENT = SOL.accent // cyan
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

const FEATURES = [
  { icon: Play, title: 'Livestream & on-demand', desc: 'Go live in HD on any device or build a VOD library your audience can access anytime. Your content, your rules — no surprise takedowns.', bg: CF.periwinkle },
  { icon: Lock, title: 'Gate & monetize access', desc: 'Subscriptions, pay-per-view, or VIP tiers. Set your own prices with direct wallet-to-wallet payments. No middlemen.', bg: CF.cyan },
  { icon: DollarSign, title: 'Built-in storefront', desc: 'Sell merch, digital downloads, tickets, or bundles directly from your channel page. Replace five tools with one.', bg: CF.mint },
  { icon: Users, title: 'Own your audience', desc: 'Unlike YouTube or Twitch, you own your subscriber data. Export it anytime. No algorithm decides who sees your content.', bg: CF.lavender },
  { icon: Wallet, title: 'Keep 100% of revenue', desc: 'YouTube takes 45–55%. Twitch takes 50%. TiVi takes zero. Direct payments mean every dollar your audience spends goes to you.', bg: CF.lime },
  { icon: BarChart2, title: 'Actionable analytics', desc: 'Understand viewer behavior, track revenue in real time, and grow faster with first-party data you actually own.', bg: '#A6E1FA' },
]
const STATS = [['100%', 'Revenue to you'], ['0%', 'Platform cut'], ['<1min', 'To launch'], ['5+', 'Tools replaced']]
const PROBLEMS = [
  { stat: '45–55%', label: 'Revenue taken by YouTube & Twitch', detail: 'Major platforms pocket nearly half of what your audience pays to support you.', bg: '#FFDFDF' },
  { stat: '0%', label: 'Audience data you own on Twitch', detail: 'You cannot export a single subscriber email. Get banned and you lose everything.', bg: '#FFE8CF' },
  { stat: '96%', label: 'Of creators earn under $100K/year', detail: 'Platforms optimize for the top 1%. The algorithm decides who gets paid, not your talent.', bg: '#E6D9FF' },
]
const COMPARE = [
  { f: 'Revenue to creator', v: ['100%', '45–50%', '50%', '95%'] },
  { f: 'Audience data ownership', v: [true, false, false, false] },
  { f: 'Built-in storefront', v: [true, false, false, false] },
  { f: 'No algorithm dependency', v: [true, false, false, false] },
  { f: 'Export subscriber list', v: [true, false, false, false] },
  { f: 'Custom branded channel', v: [true, false, false, false] },
  { f: 'Direct wallet payments', v: [true, false, false, false] },
  { f: 'Link-in-bio storefront', v: [true, false, false, false] },
]
const VERTICALS = [
  { icon: Trophy, title: 'Sports & Leagues', stat: '$37.7B global sports OTT market', line: 'Every game. Every fan. Your league’s streaming home.', slug: 'sports', bg: CF.cyan },
  { icon: Church, title: 'Churches & Ministries', stat: '87% of churches streaming', line: 'Your ministry. Your platform. Your congregation.', slug: 'churches', bg: CF.mint },
  { icon: Ticket, title: 'Events & Concerts', stat: '$1.5T global events industry', line: 'Your venue never closes.', slug: 'events', bg: CF.lavender },
  { icon: Film, title: 'Film & Cinema', stat: '$381B VOD market by 2032', line: 'Your own cinema. Screen your work. Own your audience.', slug: 'film', bg: CF.lime },
  { icon: Music, title: 'Music & Artists', stat: '$39B global digital music market', line: 'Your own MTV. Your music. Your fans.', slug: 'music', bg: CF.periwinkle },
  { icon: Tv, title: 'Content Creators', stat: '$214B global creator economy', line: 'You are the network. Your page is the channel.', slug: 'creators', bg: '#A6E1FA' },
]
const TESTIMONIALS = [
  { quote: 'TiVi let us launch our own pay-per-view sports streams in a weekend. Revenue tripled compared to what we made on Twitch.', author: 'Mark R.', role: 'Event Organizer', bg: CF.periwinkle },
  { quote: 'We moved from YouTube to our own platform, kept 100% of donations, and finally own our congregation data. No more ads before sermons.', author: 'Pastor Samuel', role: 'Faith Community Leader', bg: CF.mint },
  { quote: 'As an indie creator, I was tired of algorithms deciding my income. TiVi gave me full control and direct sales in one place. It just works.', author: 'Jane D.', role: 'Content Creator', bg: CF.cyan },
]
const FAQS = [
  { q: 'What’s the difference between TiVi and Media Launchpad?', a: 'TiVi is the platform — launch it yourself in minutes. Media Launchpad is the full solution: Chainfren designs, builds, and launches your entire media presence on TiVi, done with you. Same infrastructure; choose your level of hands-on.' },
  { q: 'How much does TiVi cost?', a: 'TiVi offers a free tier to get started and flexible plans as you grow. Unlike platforms that take 30–50% of your revenue, all TiVi plans let you keep 100% of what you earn from your audience.' },
  { q: 'Do I need coding skills?', a: 'No. Launch your branded streaming channel in minutes with our no-code setup. If you can set up a social media profile, you can launch on TiVi.' },
  { q: 'Can I import my existing videos?', a: 'Absolutely. Upload directly or migrate your content from YouTube, Vimeo, or other platforms. Your content library transfers seamlessly.' },
  { q: 'How is TiVi different from YouTube or Twitch?', a: 'YouTube takes 45–55% of your revenue and owns your audience data. Twitch takes 50%. TiVi takes zero — you keep 100% of revenue through direct payments, own your subscriber data, and control your channel without algorithm interference.' },
  { q: 'What about discoverability?', a: 'TiVi is your home base, not a discovery platform. You bring your audience from social media through your link-in-bio, then own that relationship directly. Think of it as the Shopify for live creators.' },
  { q: 'Can organizations and brands use TiVi?', a: 'Yes. TiVi serves individual creators, churches, sports leagues, music labels, event promoters, and film studios. Any organization that needs a branded streaming channel with direct monetization.' },
]

function Hero({ onDemo, onEarly }) {
  return (
    <section style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 0' }}>
      <div className="ml-hero" style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(32px, 5vw, 64px)', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 32, alignItems: 'center', backgroundImage: `radial-gradient(ellipse at 85% 12%, ${ACCENT}44, transparent 55%), radial-gradient(ellipse at 8% 100%, ${CF.periwinkle}33, transparent 55%)` }}>
        <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
          <Eyebrow color={ACCENT}>Media Launchpad · TiVi</Eyebrow>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 9999, border: `1.5px solid ${ACCENT}`, color: ACCENT, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <Zap size={12} /> Now in Early Access
          </span>
        </div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', fontWeight: 500, lineHeight: 0.98, letterSpacing: '-0.03em', margin: 0, maxWidth: 900 }}>
          Your channel. Your audience. Your <span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, #fff 30%, ${ACCENT} 55%, #fff 80%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>revenue.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          style={{ fontSize: 'clamp(16px, 1.9vw, 20px)', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', maxWidth: 720, marginTop: 24 }}>
          TiVi is the all-in-one streaming platform where creators and brands own their audience and keep <strong style={{ color: '#fff' }}>100% of their earnings</strong>. Stream live or on-demand, sell directly, and never depend on an algorithm again.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <button onClick={onEarly} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 9999, background: ACCENT, color: CF.dark, border: `2px solid ${ACCENT}`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Request Early Access <ArrowRight size={16} /></button>
          <button onClick={onDemo} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 28px', borderRadius: 9999, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Book a Free Demo</button>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 28, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
          Joining the <strong style={{ color: '#fff' }}>$214B global creator economy</strong> — built for the 96% of creators platforms ignore.
        </motion.p>
        </div>
        <motion.div className="ml-hero-art" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <span style={{ position: 'absolute', width: '78%', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}55, transparent 70%)`, filter: 'blur(12px)' }} />
          <SolutionFrenAnimated id="media-launchpad" color={ACCENT} sub={CF.periwinkle} label="Media Launchpad" style={{ width: 'min(360px, 60vw)', aspectRatio: '1', position: 'relative' }} />
        </motion.div>
      </div>
    </section>
  )
}

export default function MediaLaunchpad() {
  const [modal, setModal] = useState({ open: false, variant: 'demo' })
  const [faqOpen, setFaqOpen] = useState(0)
  const openDemo = () => setModal({ open: true, variant: 'demo' })
  const openEarly = () => setModal({ open: true, variant: 'early-access' })

  return (
    <div style={{ background: '#F5F4EE', color: CF.dark, minHeight: '100vh', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .ml-card-hover { transition: transform 300ms cubic-bezier(0.22,1,0.36,1); }
        .ml-card-hover:hover { transform: translateY(-4px); }
        @media (max-width: 860px){ .ml-hero { grid-template-columns: 1fr !important; } .ml-hero-art { order: -1; } }
        @media (max-width: 760px){ .ml-faq { grid-template-columns: 1fr !important; } .ml-get { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px){ .ml-stats { grid-template-columns: repeat(2, 1fr) !important; } .ml-stats > div:nth-child(3) { border-left: none !important; } }
        .ml-compare-scroll::-webkit-scrollbar { height: 6px; }
      ` }} />
      <SiteHeader accent={ACCENT} badgeLabel="Solutions" cta={{ label: 'Book a demo', onClick: openDemo }} />

      <main style={{ paddingBottom: 8 }}>
        <Hero onDemo={openDemo} onEarly={openEarly} />

        {/* Definitional (GEO) */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '8px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.white, padding: 'clamp(24px, 3vw, 36px)', marginTop: 8 }}>
              <p style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.75rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15, color: CF.dark }}>
                For creators, churches, sports leagues, event organizers, filmmakers, and musicians.
              </p>
              <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 500, letterSpacing: '0.02em', color: CF.muted, marginTop: 14 }}>
                Launch your fully branded streaming channel equipped with live and on-demand video, <span style={{ fontStyle: 'italic', color: ACCENT }}>video shopping</span>, and instant payments.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Stats bar */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '8px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.dark, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', overflow: 'hidden' }} className="ml-stats">
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
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Stop renting your audience from algorithms.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>Creators and brands pour years into building audiences on platforms that don’t belong to them. One algorithm change, one policy shift, and everything disappears.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.08}>
                <div className="ml-card-hover" style={{ ...cardBase, background: p.bg, padding: '30px 28px', height: '100%' }}>
                  <div style={{ fontSize: 40, fontWeight: 600, color: CF.dark, marginBottom: 8 }}>{p.stat}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: CF.dark, marginBottom: 8 }}>{p.label}</h3>
                  <p style={{ fontSize: 14, color: CF.muted, lineHeight: 1.6 }}>{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}><p style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, color: CF.dark, marginTop: 40 }}>There has to be a better way. <span style={{ color: ACCENT }}>There is.</span></p></Reveal>
        </section>

        {/* Features */}
        <section id="features" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal><div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>The solution</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Everything you need to own your channel.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>Streaming, storefront, audience data, and direct payments — consolidated into one experience.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <Reveal key={f.title} delay={i * 0.06}>
                  <div className="ml-card-hover" style={{ ...cardBase, background: f.bg, padding: '28px 26px', height: '100%' }}>
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
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', color: CF.dark, marginTop: 12 }}>See why creators switch to TiVi.</h2>
          </div></Reveal>
          <Reveal delay={0.1}>
            <div className="ml-compare-scroll" style={{ ...cardBase, background: CF.white, overflowX: 'auto' }}>
              <div style={{ minWidth: 620 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, minmax(70px, 100px))', background: ACCENT, borderBottom: `2px solid ${CF.dark}` }}>
                  <div style={{ padding: '14px 18px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: CF.dark }}>Feature</div>
                  {['TiVi', 'YouTube', 'Twitch', 'Kick'].map((p) => (
                    <div key={p} style={{ padding: '14px 8px', textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: CF.dark, borderLeft: `1px solid ${CF.dark}22` }}>{p}</div>
                  ))}
                </div>
                {COMPARE.map((row, i) => (
                  <div key={row.f} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, minmax(70px, 100px))', background: i % 2 ? '#FAFAFA' : '#fff', borderBottom: i < COMPARE.length - 1 ? `1px solid ${CF.dark}15` : 'none' }}>
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
          <Reveal delay={0.15}><div style={{ textAlign: 'center', marginTop: 28 }}>
            <button onClick={openEarly} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 9999, background: CF.dark, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Switch to TiVi <ArrowRight size={15} /></button>
          </div></Reveal>
        </section>

        {/* Self-serve vs done-with-you */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal><div style={{ maxWidth: 820, marginBottom: 32 }}>
            <Eyebrow color={CF.muted}>Two ways to launch</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Launch it yourself — or launch it <span style={{ fontStyle: 'italic', color: ACCENT }}>with</span> us.</h2>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <Reveal>
              <div style={{ ...cardBase, background: CF.white, padding: 'clamp(28px, 4vw, 40px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Eyebrow color={CF.indigo}>Self-serve · TiVi</Eyebrow>
                <h3 style={{ fontSize: 24, fontWeight: 500, color: CF.dark, margin: '14px 0 12px', letterSpacing: '-0.01em' }}>Launch your branded channel in under a minute.</h3>
                <p style={{ fontSize: 15, color: CF.muted, lineHeight: 1.6, marginBottom: 24 }}>No code, no contracts, keep 100%. The platform, run by you.</p>
                <button onClick={openEarly} style={{ marginTop: 'auto', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 9999, background: 'transparent', color: CF.dark, border: `2px solid ${CF.dark}`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Request Early Access <ArrowRight size={14} /></button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(28px, 4vw, 40px)', height: '100%', display: 'flex', flexDirection: 'column', backgroundImage: `radial-gradient(70% 60% at 90% 10%, ${ACCENT}33, transparent 60%)` }}>
                <Eyebrow color={ACCENT}>Done-with-you · Media Launchpad</Eyebrow>
                <h3 style={{ fontSize: 24, fontWeight: 500, color: '#fff', margin: '14px 0 12px', letterSpacing: '-0.01em' }}>We design, build, and launch your entire media presence.</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 20 }}>For organizations and serious creators: strategy, setup, content architecture, monetization design, and launch execution — on TiVi. You own everything at the end.</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                  {['Diagnose', 'Design', 'Build', 'Launch', 'Grow'].map((s) => (
                    <span key={s} style={{ padding: '5px 12px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.85)' }}>{s}</span>
                  ))}
                </div>
                <button onClick={openDemo} style={{ marginTop: 'auto', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 9999, background: ACCENT, color: CF.dark, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Book a demo <ArrowRight size={14} /></button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Industries */}
        <section id="industries" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal><div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>Built for every vertical</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>One platform. Every vertical.</h2>
            <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>From solo creators to sports leagues to megachurches — TiVi gives any organization a branded streaming channel without the enterprise price tag.</p>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {VERTICALS.map((v, i) => {
              const Icon = v.icon
              return (
                <Reveal key={v.slug} delay={i * 0.05}>
                  <Link href={`/solutions/media-launchpad/${v.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="ml-card-hover" style={{ ...cardBase, background: v.bg, padding: '26px 26px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: '#fff', border: `2px solid ${CF.dark}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={20} color={CF.dark} /></div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(8,21,60,0.7)' }}>{v.stat}</span>
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 600, color: CF.dark, marginBottom: 6 }}>{v.title}</h3>
                      <p style={{ fontSize: 14, color: 'rgba(8,21,60,0.78)', lineHeight: 1.5, marginBottom: 16 }}>{v.line}</p>
                      <span style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: CF.dark }}>Explore <ArrowRight size={13} /></span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal><div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow color={CF.indigo}>Testimonials</Eyebrow>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', fontWeight: 500, letterSpacing: '-0.02em', color: CF.dark, marginTop: 12 }}>Creators love TiVi.</h2>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.1}>
                <div style={{ ...cardBase, background: t.bg, padding: '30px 28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>{Array.from({ length: 5 }).map((_, j) => <span key={j} style={{ color: CF.dark, fontSize: 15 }}>★</span>)}</div>
                  <blockquote style={{ flex: 1, fontSize: 15, lineHeight: 1.6, color: CF.dark, margin: 0 }}>“{t.quote}”</blockquote>
                  <div style={{ marginTop: 22, paddingTop: 18, borderTop: `2px solid ${CF.dark}18` }}>
                    <div style={{ fontWeight: 600, color: CF.dark }}>{t.author}</div>
                    <div style={{ fontSize: 13, color: CF.muted }}>{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <div className="ml-faq" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 32 }}>
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

        {/* Get started */}
        <section id="get-started" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 140 }}>
          <Reveal>
            <div style={{ ...cardBase, background: ACCENT, overflow: 'hidden' }}>
              <div className="ml-get" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ padding: 'clamp(32px, 4vw, 56px)' }}>
                  <Eyebrow>Get started</Eyebrow>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: CF.dark, margin: '12px 0 16px' }}>Ready to own your audience?</h2>
                  <p style={{ fontSize: 15.5, color: 'rgba(8,21,60,0.75)', lineHeight: 1.6, marginBottom: 24 }}>Join the next generation of creators, churches, sports leagues, and brands building their own streaming channels. No credit card required.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {['Launch your branded channel in under a minute', 'Keep 100% of every dollar', 'Own your subscriber data — export anytime', 'Replace 5+ tools with one'].map((b) => (
                      <div key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', border: `2px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}><Check size={12} color={CF.dark} /></span>
                        <span style={{ fontSize: 14.5, color: CF.dark }}>{b}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={openDemo} style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: CF.dark }}>Or book a free demo call instead <ArrowRight size={15} /></button>
                </div>
                <div style={{ padding: 'clamp(32px, 4vw, 56px)' }}>
                  <InlineEarlyAccess />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <SiteFooter />
      </main>

      <SolutionLeadModal open={modal.open} variant={modal.variant} solution="media-launchpad" solutionName="Media Launchpad" accent={ACCENT} onClose={() => setModal((m) => ({ ...m, open: false }))} />
    </div>
  )
}

function InlineEarlyAccess() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [data, setData] = useState({ email: '', channel: '', vertical: '' })
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!data.email.trim()) return
    setSubmitting(true)
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ formType: 'solution-early-access', solution: 'media-launchpad', solutionName: 'Media Launchpad', ...data }) })
      setDone(true)
    } catch (_) {} finally { setSubmitting(false) }
  }
  const inp = { width: '100%', padding: '13px 16px', borderRadius: 14, background: '#fff', border: `2px solid ${CF.dark}`, color: CF.dark, fontFamily: 'inherit', fontSize: 14.5, outline: 'none' }
  return (
    <div style={{ ...cardBase, background: '#fff', padding: 30 }}>
      {done ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: CF.mint, border: `2px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Check size={26} color={CF.dark} /></div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: CF.dark }}>You’re on the list.</h3>
          <p style={{ fontSize: 14, color: CF.muted, marginTop: 8 }}>We onboard in waves — watch your inbox.</p>
        </div>
      ) : (
        <>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: CF.dark, marginBottom: 4 }}>Request Early Access</h3>
          <p style={{ fontSize: 13.5, color: CF.dim, marginBottom: 18 }}>Be among the first to launch your own channel.</p>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input required type="email" placeholder="Email address" value={data.email} onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))} style={inp} />
            <input placeholder="Channel / brand name" value={data.channel} onChange={(e) => setData((d) => ({ ...d, channel: e.target.value }))} style={inp} />
            <select value={data.vertical} onChange={(e) => setData((d) => ({ ...d, vertical: e.target.value }))} style={{ ...inp, appearance: 'none', cursor: 'pointer', color: data.vertical ? CF.dark : CF.dim }}>
              <option value="">Vertical (optional)</option>
              {['sports', 'churches', 'events', 'film', 'music', 'creators', 'other'].map((v) => <option key={v} value={v}>{v[0].toUpperCase() + v.slice(1)}</option>)}
            </select>
            <button type="submit" disabled={submitting} style={{ width: '100%', padding: '15px 24px', borderRadius: 9999, background: CF.dark, color: '#fff', border: 'none', cursor: submitting ? 'wait' : 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 4 }}>{submitting ? 'Submitting…' : 'Request Early Access →'}</button>
          </form>
        </>
      )}
    </div>
  )
}
