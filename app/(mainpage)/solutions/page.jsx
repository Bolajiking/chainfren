'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import AgencyContactModal from '../../components/AgencyContactModal'
import ChainfrenIcon from '../../components/ChainfrenIcon'
import { Fren } from '../../components/Frens'
import { CF, SOLUTIONS } from '../../config/stack'

const SERIF = 'Georgia, "Times New Roman", serif'
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
      <div className="sv-hero" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 8, alignItems: 'stretch' }}>
        <div style={{ gridColumn: 'span 8' }} className="sv-hero-main">
          <div style={{ ...CARD_BASE, background: CF.white, padding: 'clamp(28px, 4vw, 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 520 }}>
            <Eyebrow color={CF.muted}>Chainfren Solutions</Eyebrow>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em', color: CF.dark, margin: '24px 0 0' }}>
              Four ways to <span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, ${CF.dark} 40%, ${CF.accent} 60%, ${CF.dark} 80%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>own</span> what you build.
            </h1>
            <p style={{ fontSize: 19, color: CF.muted, lineHeight: 1.55, maxWidth: 640, marginTop: 24 }}>
              Productized solutions for creators and brands serious about ownership — launch your media, grow your audience, build your community, scale it all with AI. Done with you, on infrastructure you keep.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
              <button onClick={openContact} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 9999, border: `2px solid ${CF.dark}`, background: CF.dark, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 450, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Tell us what you’re building <Arrow /></button>
              <a href="#solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 9999, border: `2px solid ${CF.dark}`, background: CF.white, color: CF.dark, textDecoration: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 450, letterSpacing: '0.06em', textTransform: 'uppercase' }}>See solutions</a>
            </div>
          </div>
        </div>
        <div style={{ gridColumn: 'span 4', display: 'grid', gap: 8, gridTemplateRows: '1.3fr 1fr' }} className="sv-hero-side">
          <Link href="/creator-network" style={{ textDecoration: 'none' }}>
            <div style={{ ...CARD_BASE, background: CF.dark, color: '#fff', padding: '26px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundImage: `radial-gradient(70% 60% at 90% 10%, ${CF.cyan}44, transparent 60%)` }}>
              <Eyebrow color={CF.cyan}>Featured</Eyebrow>
              <div>
                <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 8 }}>Creator Network</div>
                <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>Africa’s biggest creators, matched to the biggest brands in crypto. Curated, vetted, paid onchain.</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Explore the network <Arrow size={12} /></span>
              </div>
            </div>
          </Link>
          <div style={{ ...CARD_BASE, background: CF.mint, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <ChainfrenIcon color={CF.dark} style={{ width: '60%', maxHeight: 120 }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionsGrid() {
  return (
    <section id="solutions" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0', scrollMarginTop: 120 }}>
      <div style={{ padding: '0 8px 28px', maxWidth: 880 }}>
        <Eyebrow color={CF.muted}>The solutions</Eyebrow>
        <h2 style={{ fontSize: 'clamp(2rem, 4.2vw, 3.5rem)', fontWeight: 450, letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>
          Four solutions. One outcome: ownership.
        </h2>
      </div>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {SOLUTIONS.map((sol) => (
          <Link key={sol.key} href={sol.url} style={{ textDecoration: 'none' }}>
            <article className="sv-card" style={{ ...CARD_BASE, background: sol.accent, padding: 0, display: 'flex', flexDirection: 'column', minHeight: 480 }}>
              <div style={{ padding: '26px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Eyebrow>Solution {sol.n}</Eyebrow>
                  <div style={{ fontFamily: SERIF, fontWeight: 450, fontSize: 88, lineHeight: 0.85, color: CF.dark, letterSpacing: '-0.05em', marginTop: 6 }}>{sol.n}</div>
                </div>
                <Fren pose={sol.pose} colorA={CF.dark} colorB={sol.accentB} sw={18} size={110} style={{ width: 110, height: 110, flexShrink: 0 }} />
              </div>
              <div style={{ padding: '20px 28px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: 26, fontWeight: 450, color: CF.dark, lineHeight: 1.05, letterSpacing: '-0.015em', marginTop: 6, marginBottom: 6 }}>
                  {sol.name}{sol.nickname ? <span style={{ opacity: 0.55, fontSize: 18 }}> · {sol.nickname}</span> : null}
                </h3>
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: 'rgba(8,21,60,0.8)', lineHeight: 1.35, marginBottom: 16 }}>{sol.outcome}</p>
                <p style={{ fontSize: 13, fontWeight: 450, letterSpacing: '0.02em', color: 'rgba(8,21,60,0.7)', lineHeight: 1.5, marginBottom: 20 }}>For: {sol.audience}</p>
                <span style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 9999, background: CF.dark, color: '#fff', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', alignSelf: 'flex-start' }}>
                  Explore {sol.name} <Arrow size={13} />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Argument() {
  const lines = [
    { n: '01', lead: 'African creators already won the attention.', body: 'Music tops global charts. Content travels further per dollar than anywhere on earth. The paychecks haven’t caught up.' },
    { n: '02', lead: 'The platforms still own the upside.', body: 'They control the audience, the data, the reach, and the money. They rewrite the rules every quarter. You’re building on rented land.' },
    { n: '03', lead: 'Chainfren builds what platforms won’t.', body: 'Audience you own. Payment rails you control. Identity that travels. Smart contracts that cross borders. We don’t sell consulting — we sell ownership.' },
  ]
  return (
    <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{ ...CARD_BASE, background: CF.white, padding: 'clamp(40px, 6vw, 80px) clamp(28px, 5vw, 72px)' }}>
        <Eyebrow color={CF.muted}>The argument</Eyebrow>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', fontWeight: 450, lineHeight: 1.05, letterSpacing: '-0.025em', color: CF.dark, margin: '20px 0 36px', maxWidth: 980 }}>Attention is not&nbsp;ownership.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginBottom: 48 }}>
          {lines.map((l) => (
            <div key={l.n}>
              <div style={{ fontFamily: SERIF, fontSize: 32, color: CF.accent, lineHeight: 1, marginBottom: 12 }}>{l.n}</div>
              <p style={{ fontSize: 19, color: CF.dark, lineHeight: 1.3, fontWeight: 450, marginBottom: 10 }}>{l.lead}</p>
              <p style={{ fontSize: 15.5, color: CF.muted, lineHeight: 1.65 }}>{l.body}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: '32px 40px', background: CF.dark, color: '#fff', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 450, lineHeight: 1.2, letterSpacing: '-0.015em', flex: '1 1 460px' }}>
            Attention is no longer enough. <span style={{ color: CF.accent }}>Ownership</span> is the next stage of growth — and crypto is the technology that finally makes it real.
          </div>
          <div style={{ fontSize: 12, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>— Chainfren thesis</div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const qs = [
    { q: 'Who are Chainfren Solutions for?', a: 'African creators, creator-led brands, media and entertainment companies, communities, and cultural brands ready to own their growth. If you’re building a serious internet business around an audience, you’re who we’re built for.' },
    { q: 'Do I need to understand Web3 to work with you?', a: 'No. We do, and we translate where it matters. Crypto and digital assets only show up where they solve a real problem — cross-border payments, ownership that survives platform changes, identity that travels.' },
    { q: 'How is this different from a normal agency? Or a Web3 agency?', a: 'A normal agency builds your reach on platforms you don’t own. A typical Web3 agency builds tokens or NFTs for hype. We build owned audience, direct revenue, and real ownership — the tech serves the business outcome, not the other way around.' },
    { q: 'What does an engagement cost?', a: 'Scoped to your stage, audience, and goals — anything from a short diagnostic to a multi-month build. Talk to us and we’ll match you to the right engagement, including pricing.' },
    { q: 'How do we start?', a: 'Tell us what you’re building — 60 seconds. A real human reads every submission and replies within 24 hours, usually faster.' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <section style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div className="sv-faq" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 32 }}>
        <div style={{ padding: '8px 8px 0' }}>
          <Eyebrow color={CF.muted}>FAQ</Eyebrow>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 450, letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12 }}>Common questions.</h2>
        </div>
        <div style={{ ...CARD_BASE, background: CF.white, padding: '0 clamp(18px, 4vw, 32px)' }}>
          {qs.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderBottom: i < qs.length - 1 ? '1.5px solid rgba(8,21,60,0.12)' : 'none' }}>
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

function ClosingCTA() {
  return (
    <section id="contact" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{ ...CARD_BASE, background: CF.dark, color: '#fff', padding: 'clamp(40px, 7vw, 96px) clamp(28px, 6vw, 80px)', backgroundImage: `radial-gradient(ellipse at 80% 20%, ${CF.accent}55, transparent 60%), radial-gradient(ellipse at 20% 100%, #3D1F73aa, transparent 60%)` }}>
        <Eyebrow color={CF.accent}>Ready when you are</Eyebrow>
        <h2 style={{ fontSize: 'clamp(2.25rem, 6vw, 5.5rem)', fontWeight: 450, lineHeight: 0.98, letterSpacing: '-0.03em', margin: '20px 0 32px', maxWidth: 1100 }}>
          Ready to build beyond <span style={{ fontStyle: 'italic', background: `linear-gradient(110deg, #fff 30%, ${CF.accent} 50%, #fff 70%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>rented platforms?</span>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', maxWidth: 720, marginBottom: 40 }}>
          Tell us what you’re building. We’ll scope an engagement to your stage and goals — including pricing. The form takes 60 seconds. If we’re not the right team, we’ll point you to who is.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={openContact} style={{ padding: '16px 32px', borderRadius: 9999, background: CF.ctaGrad, border: '2px solid transparent', color: CF.primary, fontFamily: 'inherit', fontSize: 14, fontWeight: 450, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Tell us what you’re building <Arrow /></button>
          <a href="mailto:hello@chainfren.com" style={{ padding: '16px 32px', borderRadius: 9999, background: 'transparent', border: '2px solid #fff', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 450, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>hello@chainfren.com</a>
        </div>
      </div>
    </section>
  )
}

export default function SolutionsOverview() {
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
        @media (max-width: 900px) {
          .sv-hero { grid-template-columns: 1fr !important; }
          .sv-hero-main, .sv-hero-side { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 760px) { .sv-faq { grid-template-columns: 1fr !important; } }
      ` }} />
      <SiteHeader accent={CF.accent} badgeLabel="Solutions" cta={{ label: 'Talk to us', onClick: () => setContactOpen(true) }} />
      <main style={{ paddingBottom: 8 }}>
        <Hero />
        <SolutionsGrid />
        <Argument />
        <FAQ />
        <ClosingCTA />
        <SiteFooter />
      </main>
      <AgencyContactModal open={contactOpen} onClose={() => setContactOpen(false)} accent={CF.accent} />
    </div>
  )
}
