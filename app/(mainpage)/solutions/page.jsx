'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import AgencyContactModal from '../../components/AgencyContactModal'
import AudienceFren from '../../components/AudienceFren'
import StarFactorNotifyCard from '../../components/StarFactorNotifyCard'
import { CF, SOLUTION_PERSONAS, personaStack, FEATURED } from '../../config/stack'

const CARD_BASE = { borderRadius: 28, border: `2px solid ${CF.dark}`, position: 'relative', overflow: 'hidden', height: '100%', transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)' }

const openContact = () => { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('cf:open-contact')) }

function Eyebrow({ children, color = CF.dark }) {
  return <span style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{children}</span>
}
function Arrow({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>
}

function Hero() {
  return (
    <section style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 0' }}>
      <div style={{ ...CARD_BASE, background: CF.white, padding: 'clamp(32px, 5vw, 60px)' }}>
        <Eyebrow color={CF.muted}>Chainfren Solutions</Eyebrow>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em', color: CF.dark, margin: '20px 0 0', maxWidth: 1000 }}>
          Built for <span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, ${CF.dark} 40%, ${CF.accent} 60%, ${CF.dark} 80%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>who you are.</span>
        </h1>
        <p style={{ fontSize: 19, color: CF.muted, lineHeight: 1.55, maxWidth: 680, marginTop: 22 }}>
          Same products, packaged for your world. The whole Chainfren stack — Media Launchpad, Creator Growth OS, Community Engine, and AI Agent Studio — assembled into one plan for creators, and one for brands. Pick your side.
        </p>
      </div>
    </section>
  )
}

function PersonaCard({ persona }) {
  const stack = personaStack(persona)
  const isCreators = persona.key === 'creators'
  const frenColor = isCreators ? CF.dark : CF.dark
  return (
    <Link href={persona.href} style={{ textDecoration: 'none' }}>
      <article className="sv-card" style={{ ...CARD_BASE, background: CF.white, display: 'flex', flexDirection: 'column', minHeight: 560 }}>
        {/* Art panel */}
        <div style={{ position: 'relative', background: persona.accent, borderBottom: `2px solid ${CF.dark}`, padding: '28px 28px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', minHeight: 236, overflow: 'hidden' }}>
          <span style={{ position: 'absolute', top: 22, left: 28, fontSize: 11, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase', color: CF.dark }}>{persona.tag}</span>
          <AudienceFren variant={persona.frenVariant} color={frenColor} style={{ width: 'min(240px, 62%)', aspectRatio: '1' }} />
        </div>
        {/* Body */}
        <div style={{ padding: 'clamp(24px, 3vw, 32px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.25rem)', fontWeight: 500, letterSpacing: '-0.02em', color: CF.dark, lineHeight: 1.05, marginBottom: 12 }}>{persona.name}</h2>
          <p style={{ fontSize: 15.5, color: CF.muted, lineHeight: 1.6, marginBottom: 20 }}>{persona.blurb}</p>
          <div style={{ marginBottom: 24 }}>
            <Eyebrow color={CF.muted}>The stack</Eyebrow>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {stack.map((p) => (
                <span key={p.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 9999, border: `1.5px solid rgba(8,21,60,0.18)`, fontSize: 12.5, fontWeight: 500, color: CF.dark }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: p.accent }} />{p.name}
                </span>
              ))}
            </div>
          </div>
          <span style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 9999, background: CF.dark, color: '#fff', fontSize: 12.5, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', alignSelf: 'flex-start' }}>
            Explore the {persona.name.replace('For ', '').toLowerCase()} stack <Arrow size={13} />
          </span>
        </div>
      </article>
    </Link>
  )
}

function Personas() {
  return (
    <section style={{ maxWidth: 1480, margin: '0 auto', padding: '40px 16px 0' }}>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {SOLUTION_PERSONAS.map((p) => <PersonaCard key={p.key} persona={p} />)}
      </div>
    </section>
  )
}

function NetworkAndStarFactor() {
  const cn = FEATURED.creatorNetwork
  return (
    <section style={{ maxWidth: 1480, margin: '0 auto', padding: '8px 16px 0' }}>
      <div className="sv-band" style={{ display: 'grid', gap: 8, gridTemplateColumns: '1.6fr 1fr' }}>
        {/* Creator Network — featured */}
        <Link href={cn.href} style={{ textDecoration: 'none' }}>
          <div className="sv-card" style={{ ...CARD_BASE, background: CF.dark, color: '#fff', padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 300, backgroundImage: `radial-gradient(70% 70% at 92% 8%, ${CF.cyan}44, transparent 60%), radial-gradient(60% 60% at 0% 100%, ${CF.periwinkle}33, transparent 60%)` }}>
            <Eyebrow color={CF.cyan}>{cn.tag}</Eyebrow>
            <div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 450, letterSpacing: '-0.02em', lineHeight: 1.08, margin: '14px 0 12px', maxWidth: 620 }}>Creator Network</h3>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: 560, marginBottom: 20 }}>{cn.line}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 9999, background: '#fff', color: CF.dark, fontSize: 12.5, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{cn.cta} <Arrow size={13} /></span>
            </div>
          </div>
        </Link>
        {/* Star Factor — coming soon */}
        <StarFactorNotifyCard cardBase={CARD_BASE} cf={CF} />
      </div>
    </section>
  )
}

function ClosingCTA() {
  return (
    <section id="contact" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{ ...CARD_BASE, background: CF.dark, color: '#fff', padding: 'clamp(40px, 7vw, 96px) clamp(28px, 6vw, 80px)', backgroundImage: `radial-gradient(ellipse at 80% 20%, ${CF.accent}55, transparent 60%), radial-gradient(ellipse at 20% 100%, #3D1F73aa, transparent 60%)` }}>
        <Eyebrow color={CF.accent}>Ready when you are</Eyebrow>
        <h2 style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)', fontWeight: 450, lineHeight: 0.98, letterSpacing: '-0.03em', margin: '20px 0 32px', maxWidth: 1000 }}>
          Not sure where to start? <span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, #fff 30%, ${CF.accent} 50%, #fff 70%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Just tell us what you’re building.</span>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', maxWidth: 720, marginBottom: 40 }}>
          A real human reads every submission and replies within 24 hours. We’ll point you to the right stack — creator or brand — and scope it to your goals.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={openContact} style={{ padding: '16px 32px', borderRadius: 9999, background: CF.ctaGrad, border: '2px solid transparent', color: CF.primary, fontFamily: 'inherit', fontSize: 14, fontWeight: 450, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Tell us what you’re building <Arrow /></button>
          <a href="mailto:hello@chainfren.com" style={{ padding: '16px 32px', borderRadius: 9999, background: 'transparent', border: '2px solid #fff', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 450, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>hello@chainfren.com</a>
        </div>
      </div>
    </section>
  )
}

export default function SolutionsChooser() {
  const [contactOpen, setContactOpen] = useState(false)
  React.useEffect(() => {
    const h = () => setContactOpen(true)
    window.addEventListener('cf:open-contact', h)
    return () => window.removeEventListener('cf:open-contact', h)
  }, [])
  return (
    <div style={{ background: '#F5F4EE', color: CF.dark, minHeight: '100vh', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .sv-card:hover { transform: translateY(-6px); }
        @media (max-width: 820px) { .sv-band { grid-template-columns: 1fr !important; } }
      ` }} />
      <SiteHeader accent={CF.accent} badgeLabel="Solutions" cta={{ label: 'Talk to us', onClick: () => setContactOpen(true) }} />
      <main style={{ paddingBottom: 8 }}>
        <Hero />
        <Personas />
        <NetworkAndStarFactor />
        <ClosingCTA />
        <SiteFooter />
      </main>
      <AgencyContactModal open={contactOpen} onClose={() => setContactOpen(false)} accent={CF.accent} />
    </div>
  )
}
