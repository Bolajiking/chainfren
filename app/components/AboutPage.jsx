'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import ChainfrenIcon from './ChainfrenIcon'
import { CF } from '../config/stack'
import { ABOUT } from '../config/aboutContent'

const ACCENT = CF.mint
const SERIF = 'Georgia, "Times New Roman", serif'
const cardBase = { borderRadius: 26, border: `2px solid ${CF.dark}`, position: 'relative', overflow: 'hidden' }

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

export default function AboutPage() {
  const [preH1, emH1, postH1] = ABOUT.hero.h1

  return (
    <div style={{ background: '#F5F4EE', color: CF.dark, minHeight: '100vh', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ab-in { from { opacity: 0; transform: translate3d(0, 20px, 0); } to { opacity: 1; transform: none; } }
        .ab-enter { animation: ab-in 0.75s cubic-bezier(0.22,1,0.36,1) both; animation-delay: var(--d, 0s); }
        .ab-reveal { animation: ab-in 0.7s cubic-bezier(0.22,1,0.36,1) both; animation-delay: var(--d, 0s); }
        @supports (animation-timeline: view()) {
          .ab-reveal { animation-timeline: view(); animation-range: entry 0% cover 26%; animation-delay: 0s; animation-fill-mode: both; }
        }
        @media (hover: hover) and (pointer: fine) {
          .ab-lift { transition: transform 300ms cubic-bezier(0.22,1,0.36,1); }
          .ab-lift:hover { transform: translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-enter, .ab-reveal { animation: none !important; opacity: 1 !important; transform: none !important; }
          .ab-lift { transition: none !important; }
        }
        @media (max-width: 900px) { .ab-hero { grid-template-columns: 1fr !important; } .ab-hero-art { display: none !important; } }
        @media (max-width: 760px) { .ab-two { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) {
          .ab-sec { padding-top: 52px !important; }
          .ab-card { padding: 24px 20px !important; }
          .ab-hero { padding: 30px 22px !important; border-radius: 22px !important; }
          .ab-grid { gap: 10px !important; grid-template-columns: 1fr !important; }
        }
        .ab-lift, .ab-card { -webkit-tap-highlight-color: transparent; }
      ` }} />

      <SiteHeader accent={ACCENT} badgeLabel="Company" cta={{ label: 'Work with us', href: '/contact' }} />

      <main style={{ paddingBottom: 8 }}>
        <section data-about-section="hero" style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 0' }}>
          <div className="ab-hero" style={{
            ...cardBase, background: CF.dark, color: '#fff', padding: 'clamp(34px, 5.5vw, 76px)',
            display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: 40, alignItems: 'center',
            backgroundImage: `radial-gradient(ellipse at 88% 10%, ${ACCENT}3D, transparent 58%), radial-gradient(ellipse at 4% 100%, ${CF.periwinkle}26, transparent 55%)`,
          }}>
            <div>
              <Eyebrow color={ACCENT}>{ABOUT.hero.eyebrow}</Eyebrow>
              <h1 className="ab-enter" style={{ fontSize: 'clamp(2.3rem, 5.2vw, 4.4rem)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.032em', margin: '22px 0 0', maxWidth: 940 }}>
                {preH1}
                <span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, #fff 32%, ${ACCENT} 56%, #fff 82%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{emH1}</span>
                {postH1}
              </h1>
              <p className="ab-enter" style={{ '--d': '0.12s', fontSize: 'clamp(16px, 1.85vw, 20px)', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', maxWidth: 760, marginTop: 26 }}>
                {ABOUT.hero.sub}
              </p>
              <div className="ab-enter" style={{ '--d': '0.24s', display: 'flex', gap: 'clamp(20px, 4vw, 34px)', marginTop: 'clamp(28px, 4vw, 40px)', flexWrap: 'wrap' }}>
                {ABOUT.hero.meta.map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 10.5, letterSpacing: '0.13em', textTransform: 'uppercase', color: ACCENT, fontWeight: 500 }}>{k}</div>
                    <div style={{ fontSize: 16, color: '#fff', marginTop: 6 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ab-hero-art ab-enter" style={{ '--d': '0.18s', display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <span style={{ position: 'absolute', width: '74%', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}44, transparent 70%)`, filter: 'blur(14px)' }} />
              <ChainfrenIcon color={ACCENT} size={240} style={{ position: 'relative' }} />
            </div>
          </div>
        </section>

        <section data-about-section="argument" id="thesis" className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0', scrollMarginTop: 130 }}>
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
          {ABOUT.argument.more && (
            <Reveal delay={0.1}>
              <div style={{ marginTop: 24, padding: '0 4px' }}>
                <Link href={ABOUT.argument.more.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: CF.dark, textDecoration: 'none', borderBottom: `2px solid ${ACCENT}`, paddingBottom: 4 }}>
                  {ABOUT.argument.more.label} <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          )}
        </section>

        <section data-about-section="build" id="what-we-build" className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0', scrollMarginTop: 130 }}>
          <SectionHead eyebrow={ABOUT.build.eyebrow} title={ABOUT.build.title} intro={ABOUT.build.intro} />
          <div className="ab-grid" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
            {ABOUT.build.items.map((it, i) => {
              const inner = (
                <div className="ab-lift ab-card" style={{ ...cardBase, background: CF.white, padding: '26px 26px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 19, fontWeight: 500, color: CF.dark, letterSpacing: '-0.015em', marginBottom: 12 }}>{it.name}</h3>
                  <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.6, flex: 1 }}>{it.line}</p>
                  {it.href && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 18, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: CF.dark }}>
                      Explore <ArrowUpRight size={13} />
                    </span>
                  )}
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

        <section data-about-section="join" id="join" className="ab-sec" style={{ maxWidth: 1480, margin: '0 auto', padding: '76px 16px 0', scrollMarginTop: 130 }}>
          <SectionHead eyebrow={ABOUT.join.eyebrow} title={ABOUT.join.title} intro={ABOUT.join.intro} />
          <div className="ab-grid" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {ABOUT.join.items.map((j, i) => (
              <Reveal key={j.who} delay={i * 0.05}>
                <Link href={j.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="ab-lift ab-card" style={{ ...cardBase, background: CF.white, padding: '24px 22px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: 19, fontWeight: 500, color: CF.dark, letterSpacing: '-0.015em', marginBottom: 10 }}>{j.who}</h3>
                    <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.6, flex: 1 }}>{j.line}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 20, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: CF.dark }}>
                      {j.label} <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}
