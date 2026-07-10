'use client'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import SolutionLeadModal from './SolutionLeadModal'
import SolutionFrenAnimated from './SolutionFrenAnimated'
import { CF, solutionByKey } from '../config/stack'
import { SOLUTION_CONTENT } from '../config/solutionsContent'

const SERIF = 'Georgia, "Times New Roman", serif'
const EASE = [0.22, 1, 0.36, 1]

function Reveal({ children, delay = 0, y = 32, className = '', style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  )
}

function Eyebrow({ children, color = CF.dark }) {
  return <span style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{children}</span>
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
    </svg>
  )
}

const cardBase = { borderRadius: 28, border: `2px solid ${CF.dark}`, position: 'relative', overflow: 'hidden' }

function Hero({ sol, content, onLead }) {
  const navy = content.heroTone === 'navy'
  const bg = navy ? CF.dark : CF.white
  const fg = navy ? '#fff' : CF.dark
  const [pre, em, post] = content.h1
  return (
    <section style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 0' }}>
      <div className="sp-hero" style={{ ...cardBase, background: bg, color: fg, padding: 'clamp(32px, 5vw, 64px)',
        display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 32, alignItems: 'center',
        backgroundImage: navy ? `radial-gradient(ellipse at 85% 15%, ${sol.accent}33, transparent 60%)` : 'none' }}>
        <div>
          <nav style={{ fontSize: 12, letterSpacing: '0.02em', color: navy ? 'rgba(255,255,255,0.6)' : CF.muted, marginBottom: 20 }}>
            <Link href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Products</Link>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>›</span>
            <span style={{ color: fg }}>{content.breadcrumb}</span>
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}
            style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.5rem)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em', margin: 0 }}>
            {pre}<span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, ${fg} 30%, ${sol.accent} 55%, ${fg} 80%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{em}</span>{post}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', lineHeight: 1.55, color: navy ? 'rgba(255,255,255,0.82)' : CF.muted, maxWidth: 620, marginTop: 24 }}>
            {content.subhead}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button onClick={() => onLead('access')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 9999,
              background: sol.accent, color: CF.dark, border: `2px solid ${sol.accent}`, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>Request access <Arrow /></button>
            <button onClick={() => onLead('demo')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 9999,
              background: 'transparent', color: navy ? '#fff' : CF.dark,
              border: `2px solid ${navy ? 'rgba(255,255,255,0.4)' : CF.dark}`, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>Book a demo <Arrow /></button>
          </motion.div>
        </div>
        <motion.div className="sp-hero-art" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <span style={{ position: 'absolute', width: '78%', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle, ${sol.accent}55, transparent 70%)`, filter: 'blur(10px)' }} />
          <SolutionFrenAnimated id={sol.key}
            color={navy ? sol.accent : CF.dark}
            sub={navy ? sol.accentB : (sol.key === 'community-loyalty' ? '#7FA83A' : sol.accent)}
            label={sol.name}
            style={{ width: 'min(340px, 60vw)', aspectRatio: '1', position: 'relative' }} />
        </motion.div>
      </div>
    </section>
  )
}

export default function SolutionPage({ solutionKey }) {
  const sol = solutionByKey(solutionKey)
  const content = SOLUTION_CONTENT[solutionKey]
  const accent = sol.accent
  const [modal, setModal] = useState({ open: false, variant: 'sales' })
  const [faqOpen, setFaqOpen] = useState(0)

  const openLead = (variant) => setModal({ open: true, variant })

  const builtOn = sol.builtOn

  return (
    <div style={{ background: '#F5F4EE', color: CF.dark, minHeight: '100vh', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sp-fren-settle { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
        .sp-fren { animation: sp-fren-settle 700ms ${'cubic-bezier(0.22,1,0.36,1)'} both; }
        @media (max-width: 860px) {
          .sp-hero { grid-template-columns: 1fr !important; }
          .sp-hero-art { order: -1; }
        }
        @media (prefers-reduced-motion: reduce) { .sp-fren { animation: none !important; } }
      ` }} />

      <SiteHeader accent={accent} badgeLabel="Products" cta={{ label: 'Talk to us', onClick: () => openLead('sales') }} />

      <main style={{ paddingBottom: 8 }}>
        <Hero sol={sol} content={content} onLead={openLead} />

        {/* Definitional (GEO) + tension */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '40px 16px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 8 }}>
            <Reveal>
              <div style={{ ...cardBase, background: CF.white, padding: 'clamp(28px, 4vw, 44px)', height: '100%' }}>
                <Eyebrow color={CF.muted}>What it is</Eyebrow>
                <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.5, color: CF.dark, marginTop: 16, fontWeight: 420, letterSpacing: '-0.01em' }}>
                  {content.definitional}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ ...cardBase, background: accent, padding: 'clamp(28px, 4vw, 44px)', height: '100%' }}>
                <Eyebrow>The tension</Eyebrow>
                <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', lineHeight: 1.45, color: CF.dark, marginTop: 16, fontWeight: 450, letterSpacing: '-0.015em' }}>
                  {content.tension}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* What's inside — capability bento */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal><div style={{ padding: '0 8px 28px', maxWidth: 760 }}>
            <Eyebrow color={CF.muted}>What’s inside</Eyebrow>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', fontWeight: 450, letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>
              The capabilities that produce the outcome.
            </h2>
          </div></Reveal>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {content.capabilities.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.06}>
                <div style={{ ...cardBase, background: CF.white, padding: '28px 26px', height: '100%', minHeight: 190, display: 'flex', flexDirection: 'column' }} className="sp-cap">
                  <span style={{ width: 40, height: 40, borderRadius: 12, background: accent, border: `1.5px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: 18, color: CF.dark, marginBottom: 18 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ fontSize: 19, fontWeight: 500, color: CF.dark, letterSpacing: '-0.01em', marginBottom: 8 }}>{c.t}</h3>
                  <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.6 }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Built on Chainfren products — skipped where builtOn is self-referential (see sol.hideBuiltOn) */}
        {!sol.hideBuiltOn && (
          <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
            <Reveal>
              <div style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(28px, 5vw, 56px)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
                backgroundImage: `radial-gradient(60% 70% at 90% 10%, ${accent}33, transparent 60%)` }}>
                <div style={{ flex: '1 1 420px', minWidth: 0 }}>
                  <Eyebrow color={accent}>Built on Chainfren infrastructure</Eyebrow>
                  <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)', fontWeight: 450, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '14px 0 10px' }}>
                    {builtOn.name}
                  </h2>
                  <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: 560 }}>
                    {builtOn.line} Solutions delivered on your own infrastructure — not rented, not borrowed.
                  </p>
                </div>
                <button onClick={() => openLead('access')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 9999, background: accent, color: CF.dark, border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer', flexShrink: 0 }}>Request access <Arrow /></button>
              </div>
            </Reveal>
          </section>
        )}

        {/* Who it's for */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: accent, padding: 'clamp(28px, 5vw, 56px)' }}>
              <Eyebrow>Who it’s for</Eyebrow>
              <p style={{ fontSize: 'clamp(1.4rem, 3vw, 2.25rem)', fontWeight: 450, letterSpacing: '-0.02em', lineHeight: 1.2, color: CF.dark, marginTop: 14, maxWidth: 900 }}>
                {sol.audience}.
              </p>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <div className="sp-faq" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 32 }}>
            <Reveal><div style={{ padding: '8px 8px 0' }}>
              <Eyebrow color={CF.muted}>FAQ</Eyebrow>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', fontWeight: 450, letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Common questions.</h2>
            </div></Reveal>
            <Reveal delay={0.1}>
              <div style={{ ...cardBase, background: CF.white, padding: '0 clamp(18px, 4vw, 32px)' }}>
                {content.faq.map((it, i) => {
                  const isOpen = faqOpen === i
                  return (
                    <div key={i} style={{ borderBottom: i < content.faq.length - 1 ? '1.5px solid rgba(8,21,60,0.12)' : 'none' }}>
                      <button onClick={() => setFaqOpen(isOpen ? -1 : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 'clamp(18px, 3vw, 24px) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, fontFamily: 'inherit' }}>
                        <span style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', fontWeight: 450, color: CF.dark, lineHeight: 1.3, flex: 1 }}>{it.q}</span>
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

        {/* Final CTA */}
        <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
          <Reveal>
            <div style={{ ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(40px, 7vw, 96px) clamp(28px, 6vw, 80px)',
              backgroundImage: `radial-gradient(ellipse at 80% 20%, ${accent}55, transparent 60%), radial-gradient(ellipse at 20% 100%, #3D1F73aa, transparent 60%)` }}>
              <Eyebrow color={accent}>Ready when you are</Eyebrow>
              <h2 style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)', fontWeight: 450, lineHeight: 0.98, letterSpacing: '-0.03em', margin: '20px 0 28px', maxWidth: 1000 }}>
                Ready to <span style={{ fontStyle: 'italic', color: accent }}>own it?</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', maxWidth: 680, marginBottom: 36 }}>
                Tell us what you’re building. The form takes 60 seconds. If we’re not the right team, we’ll point you to who is.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => openLead('sales')} style={{ padding: '16px 32px', borderRadius: 9999, background: accent, border: 'none', color: CF.dark, fontFamily: 'inherit', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Talk to us <Arrow /></button>
                <a href="mailto:hello@chainfren.com" style={{ padding: '16px 32px', borderRadius: 9999, background: 'transparent', border: '2px solid #fff', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>hello@chainfren.com</a>
              </div>
            </div>
          </Reveal>
        </section>

        <SiteFooter />
      </main>

      <SolutionLeadModal open={modal.open} variant={modal.variant} solution={sol.key} solutionName={sol.name} accent={accent} onClose={() => setModal((m) => ({ ...m, open: false }))} />

      <style dangerouslySetInnerHTML={{ __html: `
        .sp-cap { transition: transform 300ms cubic-bezier(0.22,1,0.36,1); }
        .sp-cap:hover { transform: translateY(-4px); }
        @media (max-width: 760px) { .sp-faq { grid-template-columns: 1fr !important; } }
      ` }} />
    </div>
  )
}
