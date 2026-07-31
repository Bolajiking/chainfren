'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import AgencyContactModal from './AgencyContactModal'
import ChainfrenIcon from './ChainfrenIcon'
import { CF } from '../config/stack'
import { ABOUT } from '../config/aboutContent'

// The institutional home for the thesis. Structured as an about page, written
// as the argument: what we believe, the arithmetic behind it, how the company
// is built, what we ship and at what maturity, how we work, where we are going,
// where we honestly are today, and six ways in.
//
// Design language is the house system: 2px navy borders, 26px radius, warm
// off-white ground, weights capped at 500, Georgia serif reserved for numerals,
// italic as the emphasis device, cards lift rather than scale on hover.

const ACCENT = CF.mint
const SERIF = 'Georgia, "Times New Roman", serif'
const cardBase = { borderRadius: 26, border: `2px solid ${CF.dark}`, position: 'relative', overflow: 'hidden' }

// Maturity labels use the approved vocabulary. Tone maps to how much the label
// is a claim: live states are strong, forward-looking states are quiet, so the
// page cannot flatter itself by styling.
const STAGE_TONE = {
  Live: { bg: CF.mint, fg: CF.dark },
  'Live core': { bg: CF.cyan, fg: CF.dark },
  'Early access': { bg: CF.periwinkle, fg: CF.dark },
  Building: { bg: CF.lavender, fg: CF.dark },
  Directional: { bg: 'transparent', fg: CF.muted, border: true },
  Later: { bg: 'transparent', fg: CF.muted, border: true },
}

// Reveal is CSS-only. Framer-motion set `initial={{opacity: 0}}`, which meant
// every section of this page was invisible until the JS bundle parsed and
// hydrated — a blank screen on a slow connection, on the one page most likely
// to be opened from a link on a phone. A CSS keyframe runs off the stylesheet
// instead, so content paints with the HTML and animates whether or not the
// bundle ever arrives. `--d` staggers siblings without a JS timer.
function Reveal({ children, delay = 0, style, className = '' }) {
  return (
    <div className={`ab-reveal ${className}`} style={delay ? { ...style, '--d': `${delay}s` } : style}>
      {children}
    </div>
  )
}

function Eyebrow({ children, color = CF.dark }) {
  return <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color }}>{children}</span>
}

function SectionHead({ eyebrow, title, intro, align = 'left', maxWidth = 820, eyebrowColor = CF.muted }) {
  const centered = align === 'center'
  return (
    <Reveal>
      <div style={{ maxWidth, marginBottom: 40, ...(centered ? { marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' } : { padding: '0 4px' }) }}>
        <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
        <h2 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.4rem)', fontWeight: 500, letterSpacing: '-0.028em', lineHeight: 1.03, color: CF.dark, marginTop: 14 }}>{title}</h2>
        {intro && <p style={{ fontSize: 'clamp(16px, 1.7vw, 18px)', lineHeight: 1.6, color: CF.muted, marginTop: 18 }}>{intro}</p>}
      </div>
    </Reveal>
  )
}

function StageChip({ stage }) {
  const tone = STAGE_TONE[stage] || STAGE_TONE.Directional
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '4px 11px', borderRadius: 9999,
      background: tone.bg, color: tone.fg,
      border: tone.border ? `1.5px solid ${CF.dim}` : `1.5px solid ${CF.dark}`,
      fontSize: 10, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>{stage}</span>
  )
}

export default function AboutPage() {
  const [faqOpen, setFaqOpen] = useState(0)
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)
  const [preH1, emH1, postH1] = ABOUT.hero.h1

  return (
    <div style={{ background: '#F5F4EE', color: CF.dark, minHeight: '100vh', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Motion ────────────────────────────────────────────────────
           Everything here is CSS so content is painted and animated by the
           stylesheet, never gated behind the JS bundle. Both keyframes end at
           the visible state, so a failed animation still leaves readable text. */
        @keyframes ab-in { from { opacity: 0; transform: translate3d(0, 20px, 0); } to { opacity: 1; transform: none; } }

        .ab-enter { animation: ab-in 0.75s cubic-bezier(0.22,1,0.36,1) both; animation-delay: var(--d, 0s); }

        /* Scroll-linked where supported, so sections arrive as you reach them.
           Browsers without scroll-driven animations get the same keyframe on
           load — the fallback is a working animation, not a missing one. */
        .ab-reveal { animation: ab-in 0.7s cubic-bezier(0.22,1,0.36,1) both; animation-delay: var(--d, 0s); }
        @supports (animation-timeline: view()) {
          .ab-reveal {
            animation-timeline: view();
            animation-range: entry 0% cover 26%;
            animation-delay: 0s;
            animation-fill-mode: both;
          }
        }

        /* Hover lift is a pointer affordance. On touch it only ever fires as a
           sticky stuck-state after a tap, so it is scoped to real pointers. */
        @media (hover: hover) and (pointer: fine) {
          .ab-lift { transition: transform 300ms cubic-bezier(0.22,1,0.36,1); }
          .ab-lift:hover { transform: translateY(-4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-enter, .ab-reveal { animation: none !important; opacity: 1 !important; transform: none !important; }
          .ab-lift { transition: none !important; }
        }

        /* ── Layout ────────────────────────────────────────────────────── */
        @media (max-width: 900px) { .ab-hero { grid-template-columns: 1fr !important; } .ab-hero-art { display: none !important; } }
        @media (max-width: 860px) { .ab-founder { grid-template-columns: 1fr !important; } }
        @media (max-width: 760px) { .ab-faq { grid-template-columns: 1fr !important; } .ab-two { grid-template-columns: 1fr !important; } }

        /* ── Mobile ────────────────────────────────────────────────────
           Section rhythm and card padding both come down, so the page reads as
           a considered mobile layout rather than a desktop one squeezed. */
        @media (max-width: 640px) {
          .ab-sec { padding-top: 52px !important; }
          .ab-card { padding: 24px 20px !important; }
          .ab-hero { padding: 30px 22px !important; border-radius: 22px !important; }
          .ab-grid { gap: 10px !important; }
          /* Single column below 640: auto-fit minimums that are wider than a
             phone otherwise leave one orphaned card per row. */
          .ab-grid { grid-template-columns: 1fr !important; }
        }

        /* Stop the tap-highlight flash on the card links. */
        .ab-lift, .ab-card { -webkit-tap-highlight-color: transparent; }
      ` }} />

      <SiteHeader accent={ACCENT} badgeLabel="Company" cta={{ label: 'Tell us what you\'re building', onClick: openContact }} />

      <main style={{ paddingBottom: 8 }}>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 0' }}>
          <div className="ab-hero" style={{
            ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(34px, 5.5vw, 76px)',
            display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: 40, alignItems: 'center',
            backgroundImage: `radial-gradient(ellipse at 88% 10%, ${ACCENT}3D, transparent 58%), radial-gradient(ellipse at 4% 100%, ${CF.periwinkle}26, transparent 55%)`,
          }}>
            <div>
              <Eyebrow color={ACCENT}>{ABOUT.hero.eyebrow}</Eyebrow>
              <h1
                className="ab-enter"
                style={{ fontSize: 'clamp(2.3rem, 5.2vw, 4.4rem)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.032em', margin: '22px 0 0', maxWidth: 940 }}
              >
                {preH1}
                <span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, #fff 32%, ${ACCENT} 56%, #fff 82%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{emH1}</span>
                {postH1}
              </h1>
              <p
                className="ab-enter"
                style={{ '--d': '0.12s', fontSize: 'clamp(16px, 1.85vw, 20px)', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', maxWidth: 760, marginTop: 26 }}
              >
                {ABOUT.hero.sub}
              </p>
              <div
                className="ab-enter"
                style={{ '--d': '0.24s', display: 'flex', gap: 'clamp(20px, 4vw, 34px)', marginTop: 'clamp(28px, 4vw, 40px)', flexWrap: 'wrap' }}
              >
                {ABOUT.hero.meta.map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 10.5, letterSpacing: '0.13em', textTransform: 'uppercase', color: ACCENT, fontWeight: 500 }}>{k}</div>
                    <div style={{ fontSize: 16, color: '#fff', marginTop: 6 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ab-hero-art ab-enter"
              style={{ '--d': '0.18s', display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <span style={{ position: 'absolute', width: '74%', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}44, transparent 70%)`, filter: 'blur(14px)' }} />
              <ChainfrenIcon color={ACCENT} size={240} style={{ position: 'relative' }} />
            </div>
          </div>
        </section>

        {/* ── The argument ─────────────────────────────────────────────── */}
        <section id="thesis" className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0', scrollMarginTop: 130 }}>
          <SectionHead eyebrow={ABOUT.argument.eyebrow} title={ABOUT.argument.title} intro={ABOUT.argument.intro} />
          <div style={{ display: 'grid', gap: 8 }}>
            {ABOUT.argument.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="ab-lift ab-two ab-card" style={{
                  ...cardBase, background: i === 3 ? CF.dark : CF.white, color: i === 3 ? '#fff' : CF.dark,
                  padding: 'clamp(28px, 3.6vw, 48px)', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 'clamp(20px, 3vw, 48px)',
                  backgroundImage: i === 3 ? `radial-gradient(60% 80% at 92% 8%, ${ACCENT}2E, transparent 60%)` : 'none',
                }}>
                  <div>
                    <span style={{ fontFamily: SERIF, fontSize: 30, color: i === 3 ? ACCENT : CF.dim, letterSpacing: '-0.02em' }}>{s.n}</span>
                    <h3 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, margin: '14px 0 12px' }}>{s.t}</h3>
                    <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', lineHeight: 1.35, fontStyle: 'italic', color: i === 3 ? ACCENT : CF.dark, letterSpacing: '-0.01em' }}>{s.lead}</p>
                  </div>
                  <p style={{ fontSize: 'clamp(15px, 1.6vw, 16.5px)', lineHeight: 1.7, color: i === 3 ? 'rgba(255,255,255,0.82)' : CF.muted, alignSelf: 'center' }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── The arithmetic ───────────────────────────────────────────── */}
        <section className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0' }}>
          <SectionHead eyebrow={ABOUT.numbers.eyebrow} title={ABOUT.numbers.title} intro={ABOUT.numbers.intro} align="center" maxWidth={760} />
          <div className="ab-grid" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {ABOUT.numbers.items.map((s, i) => (
              <Reveal key={s.figure} delay={i * 0.06}>
                <div className="ab-lift ab-card" style={{ ...cardBase, background: CF.white, padding: '32px 28px', height: '100%' }}>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(2.6rem, 5vw, 3.6rem)', lineHeight: 1, color: CF.dark, letterSpacing: '-0.02em' }}>{s.figure}</div>
                  <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.6, marginTop: 16 }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.14}>
            <div style={{ ...cardBase, background: ACCENT, padding: 'clamp(26px, 4vw, 44px)', marginTop: 8 }}>
              <p style={{ fontSize: 'clamp(16px, 2vw, 21px)', lineHeight: 1.5, color: CF.dark, fontWeight: 500, letterSpacing: '-0.012em', maxWidth: 940 }}>{ABOUT.numbers.close}</p>
              <p style={{ fontSize: 12.5, color: 'rgba(8,21,60,0.62)', marginTop: 18 }}>{ABOUT.numbers.source}</p>
            </div>
          </Reveal>
        </section>

        {/* ── The company ──────────────────────────────────────────────── */}
        <section className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0' }}>
          <SectionHead eyebrow={ABOUT.company.eyebrow} title={ABOUT.company.title} intro={ABOUT.company.intro} />
          <div className="ab-grid" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {ABOUT.company.pillars.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div className="ab-lift ab-card" style={{ ...cardBase, background: CF.white, padding: '30px 28px', height: '100%' }}>
                  <span style={{ fontFamily: SERIF, fontSize: 26, color: CF.dim }}>{p.n}</span>
                  <h3 style={{ fontSize: 21, fontWeight: 500, color: CF.dark, letterSpacing: '-0.015em', margin: '12px 0 10px' }}>{p.t}</h3>
                  <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.65 }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {/* The public value path */}
          <Reveal delay={0.16}>
            <div style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(26px, 4vw, 40px)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 22px)', flexWrap: 'wrap', justifyContent: 'center' }}>
              {ABOUT.company.path.map((step, i) => (
                <React.Fragment key={step}>
                  <span style={{ fontSize: 'clamp(15px, 2.2vw, 22px)', fontWeight: 500, letterSpacing: '-0.015em', color: i === ABOUT.company.path.length - 1 ? ACCENT : '#fff' }}>{step}</span>
                  {i < ABOUT.company.path.length - 1 && <ArrowRight size={16} color="rgba(255,255,255,0.45)" />}
                </React.Fragment>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── What we build ────────────────────────────────────────────── */}
        <section id="what-we-build" className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0', scrollMarginTop: 130 }}>
          <SectionHead eyebrow={ABOUT.build.eyebrow} title={ABOUT.build.title} intro={ABOUT.build.intro} />
          <div className="ab-grid" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
            {ABOUT.build.items.map((it, i) => {
              const inner = (
                <div className="ab-lift ab-card" style={{ ...cardBase, background: CF.white, padding: '26px 26px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                    <h3 style={{ fontSize: 19, fontWeight: 500, color: CF.dark, letterSpacing: '-0.015em' }}>{it.name}</h3>
                    <StageChip stage={it.stage} />
                  </div>
                  <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.6, flex: 1 }}>{it.line}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, gap: 10 }}>
                    {it.runsOn
                      ? <span style={{ fontSize: 12, color: CF.dim, letterSpacing: '0.02em' }}>Runs on {it.runsOn}</span>
                      : <span />}
                    {it.href && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: CF.dark }}>
                        Explore <ArrowUpRight size={13} />
                      </span>
                    )}
                  </div>
                </div>
              )
              return (
                <Reveal key={it.name} delay={i * 0.04}>
                  {it.href ? <Link href={it.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>{inner}</Link> : inner}
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* ── Principles ───────────────────────────────────────────────── */}
        <section id="principles" className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0', scrollMarginTop: 130 }}>
          <SectionHead eyebrow={ABOUT.principles.eyebrow} title={ABOUT.principles.title} intro={ABOUT.principles.intro} />
          <div className="ab-grid" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {ABOUT.principles.items.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.04}>
                <div className="ab-lift ab-card" style={{ ...cardBase, background: i % 2 === 0 ? CF.white : ACCENT, padding: '28px 26px', height: '100%' }}>
                  <span style={{ display: 'block', width: 30, height: 3.5, borderRadius: 2, background: i % 2 === 0 ? ACCENT : CF.dark, marginBottom: 18 }} />
                  <h3 style={{ fontSize: 17.5, fontWeight: 500, color: CF.dark, letterSpacing: '-0.012em', marginBottom: 10 }}>{p.t}</h3>
                  <p style={{ fontSize: 14.5, color: i % 2 === 0 ? CF.muted : 'rgba(8,21,60,0.76)', lineHeight: 1.65 }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── The road ahead ───────────────────────────────────────────── */}
        <section className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0' }}>
          <SectionHead eyebrow={ABOUT.road.eyebrow} title={ABOUT.road.title} intro={ABOUT.road.intro} />
          <div className="ab-grid" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {ABOUT.road.items.map((r, i) => (
              <Reveal key={r.n} delay={i * 0.06}>
                <div className="ab-lift ab-card" style={{ ...cardBase, background: CF.white, padding: '28px 26px', height: '100%' }}>
                  <span style={{ fontFamily: SERIF, fontSize: 26, color: CF.dim }}>{r.n}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 500, color: CF.dark, letterSpacing: '-0.012em', margin: '12px 0 10px' }}>{r.t}</h3>
                  <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.65 }}>{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Founder note ─────────────────────────────────────────────── */}
        <section id="founder" className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0', scrollMarginTop: 130 }}>
          <Reveal>
            <div className="ab-founder" style={{
              ...cardBase, background: CF.white, padding: 'clamp(30px, 4.6vw, 60px)',
              display: 'grid', gridTemplateColumns: '0.42fr 1fr', gap: 'clamp(24px, 4vw, 60px)',
            }}>
              {/* Attribution rail. Sits beside the note on desktop and above it
                  on mobile, so the reader knows who is speaking before they
                  start reading rather than after. */}
              <div>
                <Eyebrow color={CF.muted}>{ABOUT.founder.eyebrow}</Eyebrow>
                <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{
                    width: 52, height: 52, borderRadius: 14, background: ACCENT,
                    border: `2px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0,
                  }}>
                    <ChainfrenIcon color={CF.dark} size={26} />
                  </span>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 500, color: CF.dark, letterSpacing: '-0.012em' }}>{ABOUT.founder.name}</div>
                    <div style={{ fontSize: 13.5, color: CF.muted, marginTop: 3 }}>{ABOUT.founder.role}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: CF.dim, marginTop: 18, letterSpacing: '0.02em' }}>{ABOUT.founder.location}</div>
                {ABOUT.founder.link && (
                  <Link href={ABOUT.founder.link.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 26,
                    fontSize: 11.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase',
                    color: CF.dark, textDecoration: 'none', borderBottom: `2px solid ${ACCENT}`, paddingBottom: 3,
                  }}>
                    {ABOUT.founder.link.label} <ArrowUpRight size={13} />
                  </Link>
                )}
              </div>

              <div style={{ display: 'grid', gap: 20, alignContent: 'center' }}>
                {ABOUT.founder.body.map((para, i) => (
                  <p key={i} style={{
                    fontSize: i === 0 ? 'clamp(18px, 2.1vw, 22px)' : 'clamp(15.5px, 1.7vw, 17px)',
                    lineHeight: i === 0 ? 1.45 : 1.72,
                    letterSpacing: i === 0 ? '-0.015em' : '0',
                    color: i === 0 ? CF.dark : CF.muted,
                    fontWeight: i === 0 ? 500 : 400,
                  }}>{para}</p>
                ))}
                <div style={{ marginTop: 6, fontFamily: SERIF, fontSize: 19, fontStyle: 'italic', color: CF.dark }}>
                  {ABOUT.founder.name}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Build with us ────────────────────────────────────────────── */}
        <section id="join" className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0', scrollMarginTop: 130 }}>
          <SectionHead eyebrow={ABOUT.join.eyebrow} title={ABOUT.join.title} intro={ABOUT.join.intro} />
          <div className="ab-grid" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {ABOUT.join.items.map((j, i) => (
              <Reveal key={j.who} delay={i * 0.05}>
                <Link href={j.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="ab-lift ab-card" style={{ ...cardBase, background: CF.white, padding: '28px 26px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: 19, fontWeight: 500, color: CF.dark, letterSpacing: '-0.015em', marginBottom: 10 }}>{j.who}</h3>
                    <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.6, flex: 1 }}>{j.line}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 20, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: CF.dark }}>
                      {j.cta} <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0', scrollMarginTop: 130 }}>
          <div className="ab-faq" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 32 }}>
            <Reveal>
              <div style={{ padding: '4px 4px 0' }}>
                <Eyebrow color={CF.muted}>FAQ</Eyebrow>
                <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', fontWeight: 500, letterSpacing: '-0.028em', lineHeight: 1.03, color: CF.dark, marginTop: 14 }}>Questions we get asked.</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ ...cardBase, background: CF.white, padding: '0 clamp(18px, 4vw, 32px)' }}>
                {ABOUT.faq.map((it, i) => {
                  const isOpen = faqOpen === i
                  return (
                    <div key={i} style={{ borderBottom: i < ABOUT.faq.length - 1 ? '1.5px solid rgba(8,21,60,0.12)' : 'none' }}>
                      <button onClick={() => setFaqOpen(isOpen ? -1 : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 'clamp(18px,3vw,22px) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, fontFamily: 'inherit' }}>
                        <span style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', fontWeight: 500, color: CF.dark, lineHeight: 1.3, flex: 1 }}>{it.q}</span>
                        <span style={{ width: 30, height: 30, borderRadius: '50%', border: `2px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), background 200ms', background: isOpen ? CF.dark : CF.white, color: isOpen ? '#fff' : CF.dark }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </span>
                      </button>
                      <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 400ms cubic-bezier(0.22,1,0.36,1)' }}>
                        <div style={{ overflow: 'hidden' }}>
                          <p style={{ fontSize: 15, color: CF.muted, lineHeight: 1.7, paddingBottom: 'clamp(18px, 3vw, 24px)', paddingRight: 'clamp(0px, 4vw, 48px)' }}>{it.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────────────────── */}
        <section className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(40px, 7vw, 96px) clamp(28px, 6vw, 80px)', backgroundImage: `radial-gradient(ellipse at 80% 20%, ${ACCENT}4D, transparent 60%), radial-gradient(ellipse at 20% 100%, #3D1F73aa, transparent 60%)` }}>
              <Eyebrow color={ACCENT}>Ready when you are</Eyebrow>
              <h2 style={{ fontSize: 'clamp(2.1rem, 5.5vw, 4.4rem)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.032em', margin: '20px 0 26px', maxWidth: 980 }}>
                Tell us which part of the argument you think is <span style={{ fontStyle: 'italic', color: ACCENT }}>wrong.</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', maxWidth: 680, marginBottom: 36 }}>
                Or which part you want to help build. Either one is a good first message. The form takes 60 seconds and a real person reads it.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={openContact} style={{ padding: '16px 32px', borderRadius: 9999, background: ACCENT, border: 'none', color: CF.dark, fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  Tell us what you&apos;re building <ArrowRight size={16} />
                </button>
                <a href="mailto:hello@chainfren.com" style={{ padding: '16px 32px', borderRadius: 9999, background: 'transparent', border: '2px solid #fff', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  hello@chainfren.com
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <SiteFooter />
      </main>

      <AgencyContactModal open={contactOpen} onClose={() => setContactOpen(false)} accent={ACCENT} />
    </div>
  )
}
