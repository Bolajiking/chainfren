'use client'
// The full, premium persona Solutions pages — /for-creators and /for-brands.
// One component, driven by app/config/personaContent.js; design tokens (accent,
// pose, url, name) come from PRODUCTS in stack.js. Stripe /enterprise-style:
// hero → tension → the product stack → network → how it works → media → FAQ → CTA.
import React, { useState } from 'react'
import Link from 'next/link'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import AudienceFren from './AudienceFren'
import { Fren } from './Frens'
import { CF, productByKey } from '../config/stack'
import { HOW_WE_WORK } from '../config/solutionsContent'
import { PERSONA_CONTENT } from '../config/personaContent'

const SERIF = 'Georgia, "Times New Roman", serif'
const CARD_BASE = { borderRadius: 28, border: `2px solid ${CF.dark}`, position: 'relative', overflow: 'hidden', height: '100%' }

function Eyebrow({ children, color = CF.dark }) {
  return <span style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{children}</span>
}
function Arrow({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>
}
function Check({ color = CF.dark }) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><polyline points="20 6 9 17 4 12" /></svg>
}

function Hero({ c, accent }) {
  return (
    <section style={{ maxWidth: 1220, margin: '0 auto', padding: '20px 16px 0' }}>
      <div style={{ ...CARD_BASE, background: CF.dark, color: '#fff', padding: 'clamp(36px, 6vw, 72px) clamp(24px, 5vw, 56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', backgroundImage: `radial-gradient(60% 70% at 92% 8%, ${accent}2e, transparent 60%)` }}>
        <div style={{ flex: '1 1 440px', minWidth: 0 }}>
          <Eyebrow color={accent}>{c.hero.eyebrow}</Eyebrow>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.025em', margin: '18px 0 0' }}>{c.hero.h1}</h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, maxWidth: 580, marginTop: 22 }}>{c.hero.sub}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 30, flexWrap: 'wrap' }}>
            <Link href={c.hero.primaryCta.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 9999, background: accent, color: CF.dark, fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none' }}>{c.hero.primaryCta.label} <Arrow /></Link>
            <a href="#stack" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 9999, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none' }}>See the stack</a>
          </div>
        </div>
        <AudienceFren variant={c.frenVariant} color={accent} style={{ width: 'min(320px, 42vw)', aspectRatio: '1', flexShrink: 0 }} />
      </div>
    </section>
  )
}

function Tension({ c }) {
  return (
    <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(48px,7vw,80px) 16px 0' }}>
      <div style={{ ...CARD_BASE, background: CF.white, padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 56px)' }}>
        <Eyebrow color={CF.muted}>{c.tension.eyebrow}</Eyebrow>
        <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', fontWeight: 450, letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, margin: '14px 0 40px', maxWidth: 900 }}>{c.tension.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
          {c.tension.points.map((p) => (
            <div key={p.n}>
              <div style={{ fontFamily: SERIF, fontSize: 32, color: CF.accent, lineHeight: 1, marginBottom: 12 }}>{p.n}</div>
              <p style={{ fontSize: 19, color: CF.dark, lineHeight: 1.3, fontWeight: 450, marginBottom: 10 }}>{p.lead}</p>
              <p style={{ fontSize: 15.5, color: CF.muted, lineHeight: 1.65 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StackCard({ item }) {
  const p = productByKey(item.key)
  if (!p) return null
  return (
    <article className="pl-card" style={{ ...CARD_BASE, background: p.accent, padding: '26px 26px 28px', display: 'flex', flexDirection: 'column', minHeight: 440, transition: 'transform 320ms cubic-bezier(0.22,1,0.36,1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <Eyebrow>Product {p.n}</Eyebrow>
        <Fren pose={p.pose} colorA={CF.dark} colorB={p.accentB} sw={18} size={72} style={{ width: 72, height: 72, flexShrink: 0 }} />
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 500, color: CF.dark, lineHeight: 1.05, letterSpacing: '-0.015em', marginBottom: 6 }}>
        {p.name}{p.nickname ? <span style={{ opacity: 0.55, fontSize: 16 }}> · {p.nickname}</span> : null}
      </h3>
      <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 17, color: 'rgba(8,21,60,0.82)', lineHeight: 1.35, marginBottom: 18 }}>{item.angle}</p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
        {item.bullets.map((b) => (
          <li key={b} style={{ display: 'flex', gap: 9, fontSize: 14, color: 'rgba(8,21,60,0.82)', lineHeight: 1.45 }}><Check /> {b}</li>
        ))}
      </ul>
      <Link href={p.url} style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', padding: '11px 20px', borderRadius: 9999, background: CF.dark, color: '#fff', fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none' }}>
        Explore {p.name} <Arrow size={12} />
      </Link>
    </article>
  )
}

function Stack({ c }) {
  return (
    <section id="stack" style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(48px,7vw,80px) 16px 0', scrollMarginTop: 110 }}>
      <div style={{ padding: '0 4px 28px', maxWidth: 820 }}>
        <Eyebrow color={CF.muted}>{c.stackIntro.eyebrow}</Eyebrow>
        <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 450, letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, margin: '12px 0 10px' }}>{c.stackIntro.title}</h2>
        <p style={{ fontSize: 16, color: CF.muted, lineHeight: 1.6, maxWidth: 640 }}>{c.stackIntro.sub}</p>
      </div>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {c.stack.map((item) => <StackCard key={item.key} item={item} />)}
      </div>
    </section>
  )
}

function NetworkBand({ c, accent }) {
  const n = c.network
  return (
    <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(40px,6vw,64px) 16px 0' }}>
      <Link href={n.cta.href} style={{ textDecoration: 'none' }}>
        <div className="pl-band" style={{ ...CARD_BASE, background: CF.dark, color: '#fff', padding: 'clamp(28px, 5vw, 56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', backgroundImage: `radial-gradient(60% 70% at 90% 10%, ${accent}44, transparent 60%)`, transition: 'transform 320ms cubic-bezier(0.22,1,0.36,1)' }}>
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <Eyebrow color={accent}>{n.eyebrow}</Eyebrow>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 450, letterSpacing: '-0.02em', lineHeight: 1.08, color: '#fff', margin: '12px 0 12px', maxWidth: 620 }}>{n.title}</h3>
            <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: 560 }}>{n.body}</p>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0, padding: '13px 26px', borderRadius: 9999, background: '#fff', color: CF.dark, fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{n.cta.label} <Arrow /></span>
        </div>
      </Link>
    </section>
  )
}

function HowItWorks({ accent }) {
  return (
    <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(40px,6vw,64px) 16px 0' }}>
      <div style={{ ...CARD_BASE, background: CF.white, padding: 'clamp(32px, 5vw, 56px)' }}>
        <Eyebrow color={CF.muted}>{HOW_WE_WORK.eyebrow}</Eyebrow>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.75rem)', fontWeight: 450, letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, margin: '12px 0 40px', maxWidth: 720 }}>{HOW_WE_WORK.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 24 }}>
          {HOW_WE_WORK.steps.map((s) => (
            <div key={s.n}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: accent, border: `1.5px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: 17, color: CF.dark, marginBottom: 16 }}>{s.n}</div>
              <h3 style={{ fontSize: 17, fontWeight: 500, color: CF.dark, letterSpacing: '-0.01em', marginBottom: 8 }}>{s.t}</h3>
              <p style={{ fontSize: 14, color: CF.muted, lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MediaBand({ c }) {
  const m = c.media
  if (!m) return null
  return (
    <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(32px,4vw,40px) 16px 0' }}>
      <Link href={m.cta.href} style={{ textDecoration: 'none' }}>
        <div className="pl-band" style={{ ...CARD_BASE, background: CF.mint, padding: 'clamp(24px, 4vw, 44px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', transition: 'transform 320ms cubic-bezier(0.22,1,0.36,1)' }}>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <Eyebrow>{m.eyebrow}</Eyebrow>
            <h3 style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.9rem)', fontWeight: 500, letterSpacing: '-0.015em', color: CF.dark, margin: '10px 0 8px' }}>{m.title}</h3>
            <p style={{ fontSize: 14.5, color: 'rgba(8,21,60,0.7)', lineHeight: 1.55, maxWidth: 560 }}>{m.body}</p>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0, padding: '13px 26px', borderRadius: 9999, border: `2px solid ${CF.dark}`, color: CF.dark, fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{m.cta.label} <Arrow /></span>
        </div>
      </Link>
    </section>
  )
}

function FAQ({ c }) {
  const [open, setOpen] = useState(0)
  return (
    <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(48px,7vw,80px) 16px 0' }}>
      <div className="pl-faq" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 32 }}>
        <div style={{ padding: '4px 8px 0' }}>
          <Eyebrow color={CF.muted}>FAQ</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.75rem)', fontWeight: 450, letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Common questions.</h2>
        </div>
        <div style={{ ...CARD_BASE, background: CF.white, padding: '0 clamp(18px, 4vw, 32px)' }}>
          {c.faq.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderBottom: i < c.faq.length - 1 ? '1.5px solid rgba(8,21,60,0.12)' : 'none' }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 'clamp(18px,3vw,24px) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, fontFamily: 'inherit' }}>
                  <span style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', fontWeight: 450, color: CF.dark, lineHeight: 1.3, flex: 1 }}>{it.q}</span>
                  <span style={{ width: 30, height: 30, borderRadius: '50%', border: `2px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), background 200ms', background: isOpen ? CF.dark : CF.white, color: isOpen ? '#fff' : CF.dark }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </span>
                </button>
                <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 400ms cubic-bezier(0.22,1,0.36,1)' }}>
                  <div style={{ overflow: 'hidden' }}><p style={{ fontSize: 15, color: CF.muted, lineHeight: 1.65, paddingBottom: 'clamp(18px,3vw,24px)', paddingRight: 'clamp(0px,4vw,48px)' }}>{it.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ClosingCTA({ c, accent }) {
  return (
    <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(48px,8vw,88px) 16px 0' }}>
      <div style={{ ...CARD_BASE, background: CF.dark, color: '#fff', padding: 'clamp(36px, 6vw, 72px)', textAlign: 'center', backgroundImage: `radial-gradient(ellipse at 80% 15%, ${accent}44, transparent 60%), radial-gradient(ellipse at 15% 100%, #3D1F7399, transparent 60%)` }}>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', fontWeight: 450, letterSpacing: '-0.025em', lineHeight: 1.05, margin: '0 auto 28px', maxWidth: 760 }}>{c.closing.title}</h2>
        <Link href={c.closing.cta.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 9999, background: accent, color: CF.dark, fontSize: 13.5, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', textDecoration: 'none' }}>{c.closing.cta.label} <Arrow /></Link>
      </div>
    </section>
  )
}

export default function PersonaLanding({ personaKey }) {
  const c = PERSONA_CONTENT[personaKey]
  const accent = CF[c.accentKey] || CF.accent
  return (
    <div style={{ background: '#F5F4EE', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif', color: CF.dark }}>
      <SiteHeader accent={accent} cta={c.hero.primaryCta} />
      <Hero c={c} accent={accent} />
      <Tension c={c} />
      <Stack c={c} />
      <NetworkBand c={c} accent={accent} />
      <HowItWorks accent={accent} />
      <MediaBand c={c} />
      <FAQ c={c} />
      <ClosingCTA c={c} accent={accent} />
      <SiteFooter maxWidth={1220} />
      <style dangerouslySetInnerHTML={{ __html: `
        .pl-card:hover { transform: translateY(-4px); }
        .pl-band:hover { transform: translateY(-3px); }
        @media (max-width: 760px) { .pl-faq { grid-template-columns: 1fr !important; } }
      ` }} />
    </div>
  )
}
