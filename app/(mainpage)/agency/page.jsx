'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import AgencyContactModal from '../../components/AgencyContactModal'
import ChainfrenWordmark from '../../components/ChainfrenWordmark'
import ChainfrenIcon from '../../components/ChainfrenIcon'

const AGENCY_LINKS = [
  { label: 'Programs', anchor: '#programs' },
  { label: 'Process',  anchor: '#process' },
  { label: 'FAQ',      anchor: '#faq' },
]

const openContact = () => {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('cf:open-contact'))
}

const CF = {
  dark: '#08153C',
  primary: '#09011B',
  white: '#FFFFFF',
  accent: '#40ACFF',
  periwinkle: '#8DAAFF',
  cyan: '#5ACDFF',
  mint: '#CBF0B8',
  lime: '#C8EB6D',
  limeBright: '#CCFF00',
  lavender: '#A6E1FA',
  indigo: '#4D7AFF',
  coral: '#FF6B6B',
  muted: '#4A5568',
  dim: '#8896AB',
  subtle: '#6B6776',
  lightBlue: '#E6F4FF',
  ctaGrad: 'linear-gradient(to right, #40CBFF, #40FFCC)',
}

const CARD_BASE = {
  borderRadius: 28,
  border: `2px solid ${CF.dark}`,
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
}

const SERIF = 'Georgia, "Times New Roman", serif'

function Eyebrow({ children, color = CF.dark }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 450, letterSpacing: '0.12em',
      textTransform: 'uppercase', color,
    }}>{children}</span>
  )
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
    </svg>
  )
}

function PillBtn({ children, dark, gradient, onClick, full, href, style = {} }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: '12px 26px', borderRadius: 9999,
    border: `2px solid ${CF.dark}`,
    fontFamily: 'inherit', fontSize: 13, fontWeight: 450,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'opacity 200ms, background 200ms, color 200ms',
    width: full ? '100%' : 'auto',
    textDecoration: 'none',
  }
  let bg, color
  if (gradient) { bg = CF.ctaGrad; color = CF.primary; base.border = '2px solid transparent' }
  else if (dark) { bg = CF.dark; color = CF.white }
  else { bg = CF.white; color = CF.dark }
  const onEnter = (e) => {
    if (!gradient && !dark) { e.currentTarget.style.background = CF.dark; e.currentTarget.style.color = CF.white }
    else { e.currentTarget.style.opacity = 0.85 }
  }
  const onLeave = (e) => {
    if (!gradient && !dark) { e.currentTarget.style.background = CF.white; e.currentTarget.style.color = CF.dark }
    else { e.currentTarget.style.opacity = 1 }
  }
  if (href) {
    return (
      <Link href={href} onMouseEnter={onEnter} onMouseLeave={onLeave}
        style={{ ...base, background: bg, color, ...style }}>
        {children}
      </Link>
    )
  }
  return (
    <button onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{ ...base, background: bg, color, ...style }}>
      {children}
    </button>
  )
}

function HeroBento({ accent }) {
  const scrollPrograms = () =>
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <section id="top" style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 0' }}>
      <div className="cf-bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 8, alignItems: 'stretch' }}>
        <div className="cf-bento-main" style={{ gridColumn: 'span 8' }}>
          <div className="cf-hero-pad" style={{
            ...CARD_BASE, background: CF.white, padding: '40px 44px 36px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 520,
          }}>
            <Eyebrow color={CF.muted}>Chainfren Agency</Eyebrow>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 500, lineHeight: 1.02,
              letterSpacing: '-0.025em', color: CF.dark, margin: '24px 0 0',
            }}>
              Build the growth&nbsp;
              <span style={{
                background: `linear-gradient(110deg, ${CF.dark} 40%, ${accent} 60%, ${CF.dark} 80%)`,
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent', fontStyle: 'italic',
              }}>system</span> behind your audience.
            </h1>
            <p style={{ fontSize: 19, color: CF.muted, lineHeight: 1.55, maxWidth: 640, marginTop: 24 }}>
              We help African creators and brands own their audience, get paid directly, and build past rented platforms. Strategy, infrastructure, execution — from the team building it from inside.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
              <PillBtn dark onClick={openContact}>Tell us what you&apos;re building <Arrow /></PillBtn>
              <PillBtn onClick={scrollPrograms}>See programs</PillBtn>
            </div>
          </div>
        </div>

        <div className="cf-bento-side" style={{ gridColumn: 'span 4', display: 'grid', gap: 8, gridTemplateRows: '1fr 1fr' }}>
          <a
            href="https://starfactor.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="cf-card-pad cf-starfactor"
            style={{
              ...CARD_BASE, background: CF.dark, color: CF.white,
              padding: 0, display: 'flex', flexDirection: 'column',
              textDecoration: 'none',
              backgroundImage: `radial-gradient(60% 50% at 88% 0%, ${CF.coral}77 0%, transparent 60%), radial-gradient(55% 45% at 10% 0%, ${CF.lime}66 0%, transparent 60%), radial-gradient(70% 60% at 95% 100%, ${CF.cyan}55 0%, transparent 60%), radial-gradient(80% 60% at 0% 100%, ${CF.periwinkle}66 0%, transparent 60%)`,
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 10.5, fontWeight: 480, letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', background: CF.coral,
                  boxShadow: `0 0 0 4px ${CF.coral}33`, animation: 'cf-pulse 2s infinite',
                }} />
                Live · Lagos
              </span>
              <span style={{
                fontSize: 10, fontWeight: 450, letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase',
              }}>24/7</span>
            </div>

            <div style={{
              flex: 1, padding: '18px 18px 14px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14,
            }}>
              <Eyebrow color={CF.lime}>Star Factor</Eyebrow>
              <div>
                <div style={{
                  fontFamily: SERIF, fontStyle: 'italic', fontWeight: 450,
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em',
                  background: `linear-gradient(110deg, ${CF.lime} 0%, ${CF.coral} 35%, ${CF.cyan} 70%, ${CF.periwinkle} 100%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>Star Factor.</div>
                <p style={{
                  fontSize: 12.5, lineHeight: 1.45, color: 'rgba(255,255,255,0.75)',
                  marginTop: 8, maxWidth: 260,
                }}>
                  Africa&apos;s first onchain reality entertainment platform.
                </p>
              </div>
            </div>

            <div style={{
              padding: '12px 18px 14px', borderTop: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.18)', position: 'relative' }}>
                  <span style={{ position: 'absolute', inset: '0 35% 0 0', background: `linear-gradient(90deg, ${CF.lime}, ${CF.coral}, ${CF.cyan})`, borderRadius: 2 }} />
                  <span style={{ position: 'absolute', top: -4, left: '65%', width: 11, height: 11, borderRadius: '50%', background: CF.coral, boxShadow: `0 0 0 3px ${CF.coral}44` }} />
                </span>
                <span style={{ fontSize: 10, fontWeight: 450, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>LIVE</span>
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11.5, fontWeight: 450, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: CF.white,
              }}>
                Watch on starfactor.xyz <Arrow size={11} />
              </span>
            </div>
          </a>

          <div className="cf-card-pad" style={{
            ...CARD_BASE, background: CF.dark, color: CF.white, padding: '24px 26px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ChainfrenIcon color={CF.white} style={{ width: '70%', maxHeight: 130 }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ArgumentSection({ accent }) {
  // Three beats: the win, the trap, the move. Each one sentence-led, then
  // proof. Reads in under 30 seconds — that's the point.
  const lines = [
    {
      n: '01',
      lead: 'African creators already won the attention.',
      body: 'Music tops global charts. Content travels further per dollar than anywhere on earth. The paychecks haven’t caught up.',
    },
    {
      n: '02',
      lead: 'The platforms still own the upside.',
      body: 'They control the audience, the data, the reach, and the money. They rewrite the rules every quarter. You’re building on rented land.',
    },
    {
      n: '03',
      lead: 'Chainfren builds what platforms won’t.',
      body: 'Audience you own. Payment rails you control. Identity that travels with you. Smart contracts that cross borders. Stablecoins that work everywhere. We don’t sell consulting — we sell ownership.',
    },
  ]
  return (
    <section id="argument" style={{ maxWidth: 1480, margin: '0 auto', padding: '40px 16px 0' }}>
      <div style={{
        ...CARD_BASE, background: CF.white,
        padding: 'clamp(40px, 6vw, 80px) clamp(28px, 5vw, 72px)',
      }}>
        <Eyebrow color={CF.muted}>The argument</Eyebrow>
        <h2 style={{
          fontSize: 'clamp(2rem, 4.5vw, 4rem)', fontWeight: 450, lineHeight: 1.05,
          letterSpacing: '-0.025em', color: CF.dark, margin: '20px 0 36px', maxWidth: 980,
        }}>
          Attention is not&nbsp;ownership.
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 32, marginBottom: 48,
        }}>
          {lines.map((l) => (
            <div key={l.n}>
              <div style={{
                fontFamily: SERIF, fontSize: 32, color: accent, lineHeight: 1,
                marginBottom: 12, fontWeight: 450,
              }}>{l.n}</div>
              <p style={{ fontSize: 19, color: CF.dark, lineHeight: 1.3, fontWeight: 450, letterSpacing: '-0.005em', marginBottom: 10 }}>
                {l.lead}
              </p>
              <p style={{ fontSize: 15.5, color: CF.muted, lineHeight: 1.65 }}>{l.body}</p>
            </div>
          ))}
        </div>
        <div style={{
          padding: '32px 40px', background: CF.dark, color: CF.white, borderRadius: 20,
          display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        }}>
          <div style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 450,
            lineHeight: 1.2, letterSpacing: '-0.015em', flex: '1 1 460px',
          }}>
            Attention is no longer enough. <span style={{ color: accent }}>Ownership</span> is the next stage of growth — and crypto is the technology that finally makes it real.
          </div>
          <div style={{
            fontSize: 12, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}>— Chainfren thesis</div>
        </div>
      </div>
    </section>
  )
}

function ProgramsSection({ accent }) {
  // Programs absorb the old "Who We Serve" — each card leads with the audience
  // it's built for, then the promise, then the pitch.
  const programs = [
    {
      n: '01', title: 'Creator Growth OS',
      tagline: 'Turn your audience into your business.',
      bg: CF.periwinkle, img: '/3d.png',
      forWhom: 'Musicians · podcasters · athletes · public figures · creator-founders',
      pitch: 'Your owned-audience operating system, end to end. Direct fan relationships. Your own revenue rails. A business no platform can take away.',
    },
    {
      n: '02', title: 'Owned Media Launchpad',
      tagline: 'Launch your platform. Keep your revenue.',
      bg: CF.cyan, img: '/3d3.png',
      forWhom: 'Churches · event companies · sports leagues · music labels · media houses',
      pitch: 'We build, launch, and run your owned media platform. Streaming, community, commerce, ownership — one stack you fully control.',
    },
    {
      n: '03', title: 'Onchain Brand & Community Launch',
      tagline: 'Build culture people can join, own, and shape.',
      bg: CF.lime, img: '/3d5.png',
      forWhom: 'Creator-led brands · fan communities · cultural brands · consumer brands entering Web3',
      pitch: 'A real community growth system. Web3 used only where it serves your audience. No NFT stunts. No hype drops.',
    },
  ]
  return (
    <section id="programs" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 24, padding: '0 8px 32px', flexWrap: 'wrap',
      }}>
        <div style={{ maxWidth: 880 }}>
          <Eyebrow color={CF.muted}>The programs</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(2rem, 4.2vw, 3.5rem)', fontWeight: 450,
            letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12,
          }}>
            Three programs. Three outcomes.<br />
            <span style={{ color: CF.muted, fontWeight: 380 }}>Pick the one that matches what you&apos;re building.</span>
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
        {programs.map((p) => (
          <article key={p.n}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            style={{
              ...CARD_BASE, background: p.bg, padding: 0, display: 'flex', flexDirection: 'column',
              minHeight: 600, transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
            }}>
            <div style={{
              padding: '26px 28px 0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }}>
              <div>
                <Eyebrow>Program {p.n}</Eyebrow>
                <div style={{
                  fontFamily: SERIF, fontWeight: 450,
                  fontSize: 96, lineHeight: 0.85, color: CF.dark,
                  letterSpacing: '-0.05em', marginTop: 6,
                }}>{p.n}</div>
              </div>
              <img src={p.img} alt="" style={{ width: 120, height: 120, objectFit: 'contain', opacity: 0.95 }} />
            </div>

            <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{
                fontSize: 11, fontWeight: 450, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'rgba(8,21,60,0.7)', marginBottom: 14,
              }}>
                For: {p.forWhom}
              </div>
              <h3 style={{
                fontSize: 28, fontWeight: 450, color: CF.dark,
                lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 6,
              }}>{p.title}</h3>
              <p style={{
                fontFamily: SERIF, fontStyle: 'italic',
                fontSize: 17, color: 'rgba(8,21,60,0.75)', marginBottom: 18, lineHeight: 1.4,
              }}>{p.tagline}</p>
              <p style={{ fontSize: 14.5, color: 'rgba(8,21,60,0.85)', lineHeight: 1.6, marginBottom: 22 }}>
                {p.pitch}
              </p>

              <div style={{ marginTop: 'auto' }}>
                <PillBtn dark full onClick={openContact}>Talk to us <Arrow /></PillBtn>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Process() {
  // Five tight steps. Each step = one sentence. No moat block, no Sabi spur —
  // that work belongs in Proof where it earns its place.
  const steps = [
    { n: '01', t: 'Diagnose', d: 'Free 30-minute call. We learn what you’re building. If we’re not the right team, we say so on the call.' },
    { n: '02', t: 'Design',   d: 'Two weeks. Written plan: positioning, infrastructure, distribution, KPIs. You sign off before we build a thing.' },
    { n: '03', t: 'Build',    d: 'Audience capture, payment rails, community layer, onchain where it earns its place. You own everything.' },
    { n: '04', t: 'Launch',   d: 'We run the launch. You’re the protagonist. Press, partnerships, distribution — our work, your win.' },
    { n: '05', t: 'Grow',     d: '8–12 weeks of operational support. We stay until your team can run the engine without us.' },
  ]
  return (
    <section id="process" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{ padding: '0 8px 32px', maxWidth: 880 }}>
        <Eyebrow color={CF.muted}>How we work</Eyebrow>
        <h2 style={{
          fontSize: 'clamp(2rem, 4.2vw, 3.5rem)', fontWeight: 450,
          letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12,
        }}>From attention to ownership.</h2>
      </div>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {steps.map(s => (
          <div key={s.n} style={{ ...CARD_BASE, background: CF.white, padding: '24px 24px 22px', minHeight: 200 }}>
            <div style={{
              fontFamily: SERIF, fontWeight: 450,
              fontSize: 48, lineHeight: 0.85, color: CF.dark,
              letterSpacing: '-0.04em', marginBottom: 14,
            }}>{s.n}</div>
            <h3 style={{ fontSize: 20, fontWeight: 450, color: CF.dark, marginBottom: 8, letterSpacing: '-0.01em' }}>{s.t}</h3>
            <p style={{ fontSize: 14, color: CF.muted, lineHeight: 1.55 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProofInProgress({ accent }) {
  return (
    <section id="proof" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div className="cf-proof-grid" style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(12, 1fr)' }}>
        <div className="cf-proof-main" style={{ gridColumn: 'span 7' }}>
          <div style={{
            ...CARD_BASE, background: CF.dark,
            backgroundImage: `radial-gradient(circle at 80% 20%, ${accent}55, transparent 50%), radial-gradient(circle at 20% 80%, #3D1F73aa, transparent 50%)`,
            color: CF.white, padding: 'clamp(28px, 4vw, 48px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 460,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, background: CF.coral, borderRadius: '50%', boxShadow: `0 0 0 5px ${CF.coral}33`, animation: 'cf-pulse 2s infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Build in public</span>
            </div>
            <div>
              <div style={{
                fontFamily: SERIF, fontWeight: 450,
                fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.9,
                letterSpacing: '-0.04em',
                background: `linear-gradient(135deg, ${CF.white}, ${accent})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Star Factor.</div>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', marginTop: 20, maxWidth: 600 }}>
                Africa&apos;s first onchain reality entertainment platform — transparent voting, prediction markets, contestant-owned identity. We&apos;re building it ourselves, in public.
              </p>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24,
              paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)',
            }}>
              {[['24/7', 'Live format'], ['Onchain', 'Voting & predictions'], ['Lagos', 'Built from inside']].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 22, fontWeight: 450, color: accent, letterSpacing: '-0.01em' }}>{k}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 420 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cf-proof-side" style={{ gridColumn: 'span 5' }}>
          <div className="cf-card-pad" style={{
            ...CARD_BASE, background: CF.lime, padding: '32px 32px 28px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 460,
          }}>
            <Eyebrow>Proof in progress</Eyebrow>
            <div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', fontWeight: 450, lineHeight: 1.15,
                letterSpacing: '-0.015em', color: CF.dark, marginBottom: 14,
              }}>The playbook is happening in public.</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'rgba(8,21,60,0.78)' }}>
                Production, infrastructure, audience onboarding, sponsorship, community — what we learn building Star Factor is what we use to build every creator and brand we work with. When season one airs, the full case study lands in Sabi.
              </p>
            </div>
            <PillBtn dark href="/media">Subscribe to Sabi <Arrow /></PillBtn>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  // Trimmed to the five questions every visitor actually has. The rest
  // belongs in a discovery call.
  const qs = [
    { q: 'Who is Chainfren Agency for?',
      a: 'African creators, creator-led brands, media and entertainment companies, communities, and cultural brands ready to own their growth. If you’re building a serious internet business around an audience, you’re who we’re built for.' },
    { q: 'Do I need to understand Web3 to work with you?',
      a: 'No. We do, and we translate where it matters. Crypto and digital assets only show up where they solve a real problem — cross-border payments, ownership that survives platform changes, identity that travels. If your project doesn’t need Web3 to succeed, we say so.' },
    { q: 'How is this different from a normal agency? Or a Web3 agency?',
      a: 'A normal agency builds your reach on platforms you don’t own. A typical Web3 agency builds tokens or NFTs for hype. We’re a growth agency that uses crypto where it earns its place — to build owned audience, direct revenue, and real ownership. The tech serves the business outcome, not the other way around.' },
    { q: 'What does an engagement cost?',
      a: 'Scoped to your stage, audience, and goals. Anything from a two-week diagnostic to a multi-month build. The intake form asks about budget up front so we can match you to the right engagement — and not waste your time if it’s not a fit.' },
    { q: 'How do we start?',
      a: 'Fill out the intake form — 60 seconds. A real human reads every submission and replies within 24 hours, usually faster. From there we either set up a discovery call, or we point you to a team better suited if we’re not it.' },
  ]
  const [open, setOpen] = React.useState(0)
  return (
    <section id="faq" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div className="cf-faq-grid" style={{
        display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: 32,
      }}>
        <div style={{ padding: '8px 8px 0' }}>
          <Eyebrow color={CF.muted}>FAQ</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 450,
            letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12,
          }}>Common questions.</h2>
          <p style={{ fontSize: 15, color: CF.muted, lineHeight: 1.6, marginTop: 16, maxWidth: 360 }}>
            Quick answers. Anything else? Bring it to the discovery call.
          </p>
        </div>
        <div className="cf-faq-card" style={{ ...CARD_BASE, background: CF.white, padding: '0 clamp(18px, 4vw, 32px)' }}>
          {qs.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{
                borderBottom: i < qs.length - 1 ? '1.5px solid rgba(8,21,60,0.12)' : 'none',
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 'clamp(18px, 3vw, 24px) 0', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between', gap: 14,
                  fontFamily: 'inherit',
                }}>
                  <span style={{
                    fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)', fontWeight: 450,
                    color: CF.dark, lineHeight: 1.3, letterSpacing: '-0.005em',
                    flex: 1, minWidth: 0, overflowWrap: 'anywhere',
                  }}>{it.q}</span>
                  <span style={{
                    width: 30, height: 30, borderRadius: '50%',
                    border: `2px solid ${CF.dark}`,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), background 200ms, color 200ms',
                    background: isOpen ? CF.dark : CF.white,
                    color: isOpen ? CF.white : CF.dark,
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </span>
                </button>
                <div
                  className={isOpen ? 'cf-faq-answer cf-faq-answer-open' : 'cf-faq-answer'}
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 400ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{
                      fontSize: 'clamp(14px, 1.4vw, 15px)', color: CF.muted, lineHeight: 1.65,
                      paddingBottom: 'clamp(18px, 3vw, 24px)',
                      paddingRight: 'clamp(0px, 4vw, 48px)',
                      overflowWrap: 'anywhere',
                    }}>
                      {it.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ClosingCTA({ accent }) {
  return (
    <section id="contact" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{
        ...CARD_BASE, background: CF.dark, color: CF.white,
        padding: 'clamp(40px, 7vw, 96px) clamp(28px, 6vw, 80px)',
        backgroundImage: `radial-gradient(ellipse at 80% 20%, ${accent}55, transparent 60%), radial-gradient(ellipse at 20% 100%, #3D1F73aa, transparent 60%)`,
      }}>
        <Eyebrow color={accent}>Ready when you are</Eyebrow>
        <h2 style={{
          fontSize: 'clamp(2.25rem, 6vw, 5.5rem)', fontWeight: 450,
          lineHeight: 0.98, letterSpacing: '-0.03em',
          margin: '20px 0 32px', maxWidth: 1100,
        }}>
          Ready to build beyond&nbsp;
          <span style={{
            background: `linear-gradient(110deg, ${CF.white} 30%, ${accent} 50%, ${CF.white} 70%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontStyle: 'italic',
          }}>rented platforms?</span>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', maxWidth: 720, marginBottom: 40 }}>
          Tell us what you&apos;re building. We&apos;ll scope an engagement to your stage and goals — including pricing. The form takes 60 seconds. If we&apos;re not the right team, we&apos;ll point you to who is.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={openContact} style={{
            padding: '16px 32px', borderRadius: 9999,
            background: CF.ctaGrad, border: '2px solid transparent',
            color: CF.primary, fontFamily: 'inherit', fontSize: 14, fontWeight: 450,
            letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            transition: 'opacity 200ms',
          }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 0.85}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
          >Tell us what you&apos;re building <Arrow /></button>
          <a href="mailto:hello@chainfren.com" style={{
            padding: '16px 32px', borderRadius: 9999,
            background: 'transparent', border: `2px solid ${CF.white}`,
            color: CF.white, fontFamily: 'inherit', fontSize: 14, fontWeight: 450,
            letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            textDecoration: 'none',
          }}>hello@chainfren.com</a>
        </div>
      </div>
    </section>
  )
}

function PageFooter() {
  return (
    <footer className="cf-footer-pad" style={{
      maxWidth: 1480, margin: '64px auto 0', padding: '40px 24px 28px',
      borderTop: `1px solid rgba(8,21,60,0.12)`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <ChainfrenWordmark fontSize={22} />
        <span style={{ fontSize: 12, color: CF.subtle }}>2025 © Chainfren. All rights reserved.</span>
      </div>
      <div style={{ display: 'flex', gap: 22, fontSize: 12, color: CF.subtle, fontWeight: 420, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        <a href="https://x.com/chainfren" style={{ color: 'inherit', textDecoration: 'none' }}>X</a>
        <a href="https://chainfren.com" style={{ color: 'inherit', textDecoration: 'none' }}>chainfren.com</a>
        <a href="mailto:hello@chainfren.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@chainfren.com</a>
      </div>
    </footer>
  )
}

export default function AgencyPage() {
  const accent = CF.accent
  const [contactOpen, setContactOpen] = useState(false)

  React.useEffect(() => {
    const handler = () => setContactOpen(true)
    window.addEventListener('cf:open-contact', handler)
    return () => window.removeEventListener('cf:open-contact', handler)
  }, [])

  return (
    <div className="cf-agency-root" style={{
      background: '#F5F4EE', color: CF.dark, minHeight: '100vh',
      fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif',
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
@keyframes cf-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.92)}}
@media (max-width:820px){
  .cf-faq-grid,.cf-bento-grid,.cf-proof-grid{grid-template-columns:1fr !important;gap:20px !important}
  .cf-bento-main,.cf-bento-side,.cf-proof-main,.cf-proof-side{grid-column:1 / -1 !important}
}
@media (max-width:640px){
  .cf-agency-root [style*="min-height"]{min-height:0 !important}
  .cf-agency-root .cf-card-pad{padding:22px 20px !important}
  .cf-agency-root .cf-hero-pad{padding:28px 22px !important}
  .cf-agency-root .cf-footer-pad{padding:26px 20px 22px !important}
}
      ` }} />
      <SiteHeader
        accent={accent}
        badgeLabel="Agency"
        links={AGENCY_LINKS}
        cta={{ label: 'Get in touch', onClick: () => setContactOpen(true) }}
      />
      {/* Flex column + order utilities re-sequence sections on mobile (CTA
          before argument, proof before FAQ) without duplicating markup.
          md:order-none resets to flex default (0) on desktop, so the JSX
          source order wins above the md breakpoint. */}
      <main className="flex flex-col" style={{ paddingBottom: 24 }}>
        <div className="order-1 md:order-none"><HeroBento accent={accent} /></div>
        <div className="order-3 md:order-none"><ArgumentSection accent={accent} /></div>
        <div className="order-2 md:order-none"><ProgramsSection accent={accent} /></div>
        <div className="order-4 md:order-none"><Process /></div>
        <div className="order-5 md:order-none"><ProofInProgress accent={accent} /></div>
        <div className="order-6 md:order-none"><FAQ /></div>
        <div className="order-7 md:order-none"><ClosingCTA accent={accent} /></div>
        <div className="order-8 md:order-none"><PageFooter /></div>
      </main>
      <AgencyContactModal open={contactOpen} onClose={() => setContactOpen(false)} accent={accent} />
    </div>
  )
}
