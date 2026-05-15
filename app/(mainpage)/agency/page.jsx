'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import AgencyContactModal from '../../components/AgencyContactModal'

const AGENCY_LINKS = [
  { label: 'Programs', anchor: '#programs' },
  { label: 'Pillars', anchor: '[data-screen-label="05 Pillars"]' },
  { label: 'How', anchor: '[data-screen-label="06 How We Work"]' },
  { label: 'FAQ', anchor: '[data-screen-label="09 FAQ"]' },
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
      fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
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
    fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
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
    <section data-screen-label="01 Hero" style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 0' }}>
      <div className="cf-bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 8, alignItems: 'stretch' }}>
        <div className="cf-bento-main" style={{ gridColumn: 'span 8' }}>
          <div className="cf-hero-pad" style={{
            ...CARD_BASE, background: CF.white, padding: '40px 44px 36px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 520,
          }}>
            <Eyebrow color={CF.muted}>Chainfren Agency</Eyebrow>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 700, lineHeight: 1.02,
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
              We help ambitious African creators and brands own their audience, monetize directly, and build beyond rented platforms — using crypto, digital assets, and onchain infrastructure to give them ownership the platforms were never going to allow. Strategy, infrastructure, and execution from the team building Africa&apos;s onchain creator economy from inside it.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
              <PillBtn dark onClick={openContact}>Tell us what you&apos;re building <Arrow /></PillBtn>
              <PillBtn onClick={scrollPrograms}>Explore programs</PillBtn>
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
            {/* top chrome — live status */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 10.5, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', background: CF.coral,
                  boxShadow: `0 0 0 4px ${CF.coral}33`, animation: 'cf-pulse 2s infinite',
                }} />
                Live · Lagos
              </span>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase',
              }}>24/7</span>
            </div>

            {/* main poster */}
            <div style={{
              flex: 1, padding: '18px 18px 14px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14,
            }}>
              <Eyebrow color={CF.lime}>Star Factor</Eyebrow>
              <div>
                <div style={{
                  fontFamily: SERIF, fontStyle: 'italic', fontWeight: 700,
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

            {/* bottom chrome — scrubber + cta */}
            <div style={{
              padding: '12px 18px 14px', borderTop: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.18)', position: 'relative' }}>
                  <span style={{ position: 'absolute', inset: '0 35% 0 0', background: `linear-gradient(90deg, ${CF.lime}, ${CF.coral}, ${CF.cyan})`, borderRadius: 2 }} />
                  <span style={{ position: 'absolute', top: -4, left: '65%', width: 11, height: 11, borderRadius: '50%', background: CF.coral, boxShadow: `0 0 0 3px ${CF.coral}44` }} />
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>LIVE</span>
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em',
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
            <img src="/cfnlogg.svg" alt="" style={{ width: '70%', maxHeight: 130, objectFit: 'contain', filter: 'invert(1) brightness(2)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ArgumentSection({ accent }) {
  const lines = [
    'African creators have already won the attention war. Music tops global charts. Content travels further per dollar than anywhere else on earth. Africans are shaping language, fashion, and culture across the internet — and getting paid pennies for it.',
    'The platforms still control the audience, the data, the reach, and the money. Algorithms decide who eats this month. Payment terms are designed elsewhere. Communities are scattered across apps that can change the rules tomorrow without warning.',
    'Chainfren Agency uses crypto, digital assets, and onchain infrastructure to build what the platforms will never give you: owned audience, direct revenue, community, and identity you control. Smart contracts that move value across borders. Stablecoin payments that don’t depend on local rails. Onchain identity that travels with your audience. We don’t sell consulting. We sell ownership.',
  ]
  return (
    <section data-screen-label="02 Argument" style={{ maxWidth: 1480, margin: '0 auto', padding: '40px 16px 0' }}>
      <div style={{
        ...CARD_BASE, background: CF.white,
        padding: 'clamp(40px, 6vw, 80px) clamp(28px, 5vw, 72px)',
      }}>
        <Eyebrow color={CF.muted}>The argument</Eyebrow>
        <h2 style={{
          fontSize: 'clamp(2rem, 4.5vw, 4rem)', fontWeight: 700, lineHeight: 1.05,
          letterSpacing: '-0.025em', color: CF.dark, margin: '20px 0 36px', maxWidth: 980,
        }}>
          Attention is not&nbsp;ownership.
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 32, marginBottom: 48,
        }}>
          {lines.map((p, i) => (
            <div key={i}>
              <div style={{
                fontFamily: SERIF, fontSize: 32, color: accent, lineHeight: 1,
                marginBottom: 8, fontWeight: 700,
              }}>0{i + 1}</div>
              <p style={{ fontSize: 17, color: CF.muted, lineHeight: 1.65 }}>{p}</p>
            </div>
          ))}
        </div>
        <div style={{
          padding: '32px 40px', background: CF.dark, color: CF.white, borderRadius: 20,
          display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        }}>
          <div style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 700,
            lineHeight: 1.2, letterSpacing: '-0.015em', flex: '1 1 460px',
          }}>
            Attention is no longer enough. <span style={{ color: accent }}>Ownership</span> is the next stage of growth — and crypto is the technology that finally makes it real.
          </div>
          <div style={{
            fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}>— Chainfren thesis</div>
        </div>
      </div>
    </section>
  )
}

function WhoWeServe() {
  const cards = [
    { title: 'Creators', bg: CF.periwinkle, num: '01', tag: 'Creator Growth OS',
      desc: 'Musicians, podcasters, athletes, public figures, educators, and digital creators ready to turn attention into a real business. You have the audience. We build the system underneath it.' },
    { title: 'Creator-Led Brands', bg: CF.cyan, num: '02', tag: 'Creator Growth OS · Onchain Brand & Community',
      desc: 'Founders, cultural operators, and creators building products, communities, media brands, fashion brands, events, and digital businesses around their audience. The brand and the creator are the same thing — and we build for that reality.' },
    { title: 'Media, Event & Entertainment Brands', bg: CF.lime, num: '03', tag: 'Owned Media Launchpad',
      desc: 'Churches, sports leagues, podcasts, music labels, event companies, livestream shows, and media houses ready to own distribution and monetize directly. You already pull the crowd. Stop renting the room.' },
    { title: 'Communities & Cultural Brands', bg: CF.mint, num: '04', tag: 'Onchain Brand & Community Launch',
      desc: 'Fan communities, Web3 communities, meme communities, lifestyle brands, and cultural movements that want deeper participation, real ownership, and infrastructure that respects what you’ve built.' },
  ]
  return (
    <section data-screen-label="03 Who We Serve" style={{ maxWidth: 1480, margin: '0 auto', padding: '40px 16px 0' }}>
      <div style={{ padding: '0 8px 28px', maxWidth: 980 }}>
        <Eyebrow color={CF.muted}>Who we serve</Eyebrow>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 700,
          letterSpacing: '-0.02em', lineHeight: 1.08, color: CF.dark, marginTop: 12,
        }}>
          Built for the creators and brands ready to own their growth.
        </h2>
      </div>
      <div style={{
        display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
      }}>
        {cards.map((c) => (
          <div key={c.num}
            className="cf-card-pad"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            style={{
              ...CARD_BASE, background: c.bg, padding: '28px 26px 24px',
              display: 'flex', flexDirection: 'column', minHeight: 380,
              transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
              <Eyebrow>{'\n'}</Eyebrow>
              <span style={{
                fontFamily: SERIF, fontWeight: 700,
                fontSize: 56, lineHeight: 0.8, color: CF.dark, opacity: 0.18,
              }}>{c.num}</span>
            </div>
            <h3 style={{
              fontSize: 26, fontWeight: 700, color: CF.dark,
              lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 14,
            }}>{c.title}</h3>
            <p style={{ fontSize: 14.5, color: 'rgba(8,21,60,0.78)', lineHeight: 1.55, flex: 1 }}>{c.desc}</p>
            <div style={{
              marginTop: 18, paddingTop: 14, borderTop: `1.5px dashed rgba(8,21,60,0.25)`,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: CF.dark, opacity: 0.85,
            }}>
              ★ Most relevant: {c.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProgramsSection({ accent }) {
  const programs = [
    {
      n: '01', title: 'Creator Growth OS',
      tagline: 'Turn your audience into your business.',
      bg: CF.periwinkle, img: '/3d.png',
      pitch: 'We build your owned-audience operating system end to end — direct fan relationships, your own revenue rails, and a business no platform can take away.',
      rows: [
        { k: 'For', v: 'Musicians, podcasters, athletes, public figures, digital creators, creator-founders' },
        { k: 'Timeline & Delivery', v: 'Scoped on discovery call' },
      ],
    },
    {
      n: '02', title: 'Owned Media Launchpad',
      tagline: 'Launch your platform. Own your audience. Keep your revenue.',
      bg: CF.cyan, img: '/3d3.png',
      pitch: 'We build, launch, and operate your owned media platform — streaming, community, commerce, and ownership in one stack you fully control.',
      rows: [
        { k: 'For', v: 'Churches, event companies, sports leagues, music labels, media houses, podcast networks' },
        { k: 'Timeline & Delivery', v: 'Scoped on discovery call' },
      ],
    },
    {
      n: '03', title: 'Onchain Brand & Community Launch',
      tagline: 'Build culture people can join, own, and participate in.',
      bg: CF.lime, img: '/3d5.png',
      pitch: 'We build a real community growth system for your brand — Web3 used only where it serves your audience. No NFT stunts, no hype drops.',
      rows: [
        { k: 'For', v: 'Creator-led brands, fan communities, cultural brands, fashion and lifestyle brands, music projects, consumer brands entering Web3' },
        { k: 'Timeline & Delivery', v: 'Scoped on discovery call' },
      ],
    },
  ]
  return (
    <section id="programs" data-screen-label="04 Programs" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 24, padding: '0 8px 32px', flexWrap: 'wrap',
      }}>
        <div style={{ maxWidth: 880 }}>
          <Eyebrow color={CF.muted}>The programs</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(2rem, 4.2vw, 3.5rem)', fontWeight: 700,
            letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12,
          }}>
            Three programs. Three outcomes.<br />
            <span style={{ color: CF.muted, fontWeight: 500 }}>Pick the one that matches what you&apos;re building.</span>
          </h2>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '10px 18px', border: `2px solid ${CF.dark}`, borderRadius: 9999,
          fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: CF.dark,
        }}>
          <span style={{ width: 8, height: 8, background: accent, borderRadius: '50%' }} /> Tier 3 · Productized
        </div>
      </div>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
        {programs.map((p) => (
          <article key={p.n}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            style={{
              ...CARD_BASE, background: p.bg, padding: 0, display: 'flex', flexDirection: 'column',
              minHeight: 720, transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
            }}>
            <div style={{
              padding: '26px 28px 0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }}>
              <div>
                <Eyebrow>Program {p.n}</Eyebrow>
                <div style={{
                  fontFamily: SERIF, fontWeight: 700,
                  fontSize: 96, lineHeight: 0.85, color: CF.dark,
                  letterSpacing: '-0.05em', marginTop: 6,
                }}>{p.n}</div>
              </div>
              <img src={p.img} alt="" style={{ width: 120, height: 120, objectFit: 'contain', opacity: 0.95 }} />
            </div>

            <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{
                fontSize: 28, fontWeight: 700, color: CF.dark,
                lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 6,
              }}>{p.title}</h3>
              <p style={{
                fontFamily: SERIF, fontStyle: 'italic',
                fontSize: 17, color: 'rgba(8,21,60,0.75)', marginBottom: 18, lineHeight: 1.4,
              }}>{p.tagline}</p>
              <p style={{ fontSize: 14.5, color: 'rgba(8,21,60,0.85)', lineHeight: 1.6, marginBottom: 22 }}>
                {p.pitch}
              </p>

              <div style={{
                background: 'rgba(255,255,255,0.55)', borderRadius: 14,
                border: '1.5px solid rgba(8,21,60,0.18)',
                padding: '4px 14px', marginBottom: 22,
              }}>
                {p.rows.map((r, i) => (
                  <div key={r.k} style={{
                    display: 'flex', gap: 14, padding: '12px 0',
                    borderBottom: i < p.rows.length - 1 ? '1px solid rgba(8,21,60,0.12)' : 'none',
                  }}>
                    <div style={{
                      width: 96, flexShrink: 0,
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: CF.dark, opacity: 0.6,
                    }}>{r.k}</div>
                    <div style={{ fontSize: 13.5, color: CF.dark, lineHeight: 1.4, flex: 1 }}>{r.v}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto' }}>
                <PillBtn dark full onClick={openContact}>Read more <Arrow /></PillBtn>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ServicePillars() {
  const pillars = [
    { n: '01', t: 'Positioning & Narrative',
      d: 'Define your story, category, audience, message, and market position.',
      caps: ['Brand positioning', 'Creator story', 'Website copy', 'Campaign messaging', 'Offer architecture', 'Social profile direction', 'Brand voice guide'] },
    { n: '02', t: 'Owned Audience Strategy',
      d: 'Build direct audience channels beyond rented platforms.',
      caps: ['Email strategy', 'WhatsApp & community funnels', 'CRM & audience database', 'TVinBio funnel', 'Audience capture systems', 'Fan journey design', 'Lead magnets'] },
    { n: '03', t: 'Monetization & Commerce',
      d: 'Turn attention into revenue.',
      caps: ['Offer design', 'Pricing strategy', 'Memberships', 'Paid content', 'Pay-per-view', 'Creator stores', 'Sponsorship packages', 'Digital products', 'Payment infrastructure'] },
    { n: '04', t: 'Community Growth',
      d: 'Turn passive followers into active members.',
      caps: ['Community structure', 'Onboarding', 'Engagement rituals', 'Ambassador programs', 'Rewards', 'Moderation systems', 'Retention strategy', 'Community analytics'] },
    { n: '05', t: 'Media & Distribution',
      d: 'Produce and distribute content that grows trust and demand.',
      caps: ['Content strategy', 'Livestreams', 'Podcasts', 'Short-form video', 'Launch content', 'Newsletters', 'Social distribution', 'Creator-led storytelling', 'Syndication'] },
    { n: '06', t: 'Onchain Access & Loyalty',
      d: 'Use crypto where it actually helps. Token-gated access for paying members. Stablecoin payments that work across borders. Wallet-based identity that travels with your audience. The Web3 features that solve real problems — not the ones that don’t.',
      caps: ['Token-gated access', 'Digital collectibles', 'Membership passes', 'Loyalty programs', 'Fan rewards', 'Wallet onboarding', 'Stablecoin payments', 'Cross-border payouts', 'Onchain identity'] },
  ]
  return (
    <section data-screen-label="05 Pillars" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{ padding: '0 8px 32px', maxWidth: 880 }}>
        <Eyebrow color={CF.muted}>The capabilities</Eyebrow>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 700,
          letterSpacing: '-0.02em', lineHeight: 1.08, color: CF.dark, marginTop: 12,
        }}>
          The capabilities behind the work.
        </h2>
        <p style={{ fontSize: 16, color: CF.muted, lineHeight: 1.6, marginTop: 14, maxWidth: 700 }}>
          Every Program is delivered through these six capabilities. We don&apos;t sell them as standalone services — we sell outcomes. Here&apos;s how the work gets done.
        </p>
      </div>
      <div style={{
        display: 'grid', gap: 8,
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
      }}>
        {pillars.map(p => (
          <div key={p.n}
            onMouseEnter={(e) => {
              const cap = e.currentTarget.querySelector('.caps')
              if (cap) cap.style.maxHeight = '400px'
            }}
            onMouseLeave={(e) => {
              const cap = e.currentTarget.querySelector('.caps')
              if (cap) cap.style.maxHeight = '0px'
            }}
            style={{
              ...CARD_BASE, background: CF.white, padding: '24px 26px 22px',
              cursor: 'pointer', minHeight: 220,
            }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12 }}>
              <span style={{
                fontFamily: SERIF, fontWeight: 700,
                fontSize: 28, color: CF.dark, letterSpacing: '-0.02em',
              }}>{p.n}</span>
              <span style={{ flex: 1, height: 1.5, background: CF.dark, opacity: 0.15 }} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: CF.dark, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: 8 }}>{p.t}</h3>
            <p style={{ fontSize: 15, color: CF.muted, lineHeight: 1.55, marginBottom: 14 }}>{p.d}</p>
            <div className="caps" style={{
              maxHeight: 0, overflow: 'hidden',
              transition: 'max-height 400ms cubic-bezier(0.22,1,0.36,1)',
            }}>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 6,
                paddingTop: 8, borderTop: '1px dashed rgba(8,21,60,0.18)', marginTop: 4,
              }}>
                {p.caps.map(c => (
                  <span key={c} style={{
                    fontSize: 11, fontWeight: 600, padding: '4px 10px',
                    border: `1.5px solid ${CF.dark}`, borderRadius: 9999,
                    color: CF.dark, letterSpacing: '0.02em',
                  }}>{c}</span>
                ))}
              </div>
            </div>
            <div style={{
              marginTop: 'auto', paddingTop: 8,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: CF.dark, opacity: 0.45,
            }}>Hover to expand →</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function HowWeWork({ accent }) {
  const steps = [
    { n: '01', t: 'Diagnose',
      d: 'A free 30-minute discovery call. We learn what you’re building, what’s broken, and what success looks like. No pitch deck, no slides — just a conversation. If we’re not the right team, we’ll tell you on the call and point you to who is.' },
    { n: '02', t: 'Design',
      d: 'Within two weeks of engagement start, you have a written growth plan: positioning, audience, infrastructure stack, distribution map, KPIs. You sign off before we build a single thing.' },
    { n: '03', t: 'Build',
      d: 'We build the infrastructure: audience capture, smart contracts and stablecoin payment rails, community layer, content stack, wallet-based identity where it earns its place. You own everything we build. The keys, the data, the relationships — all yours.' },
    { n: '04', t: 'Launch',
      d: 'We run the launch. Press, community, distribution, partnerships — the full operation, with you as the protagonist and us behind the curtain. Your win, with our work.' },
    { n: '05', t: 'Grow',
      d: 'Post-launch, we run the growth motion until your team can run it alone — typically 8–12 weeks of operational support. We don’t disappear after launch week. We stay until the engine is running.' },
  ]
  return (
    <section data-screen-label="06 How We Work" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{ padding: '0 8px 32px', maxWidth: 880 }}>
        <Eyebrow color={CF.muted}>How we work</Eyebrow>
        <h2 style={{
          fontSize: 'clamp(2rem, 4.2vw, 3.5rem)', fontWeight: 700,
          letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12,
        }}>From attention to ownership.</h2>
      </div>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {steps.map(s => (
          <div key={s.n} style={{ ...CARD_BASE, background: CF.white, padding: '24px 24px 22px' }}>
            <div style={{
              fontFamily: SERIF, fontWeight: 700,
              fontSize: 56, lineHeight: 0.85, color: CF.dark,
              letterSpacing: '-0.04em', marginBottom: 14,
            }}>{s.n}</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: CF.dark, marginBottom: 10, letterSpacing: '-0.01em' }}>{s.t}</h3>
            <p style={{ fontSize: 14, color: CF.muted, lineHeight: 1.6 }}>{s.d}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{
          ...CARD_BASE, background: CF.dark, color: CF.white,
          padding: 'clamp(28px, 4vw, 56px) clamp(28px, 5vw, 72px)',
          backgroundImage: `radial-gradient(circle at 90% 30%, ${accent}33, transparent 50%), radial-gradient(circle at 10% 90%, #3D1F7344, transparent 50%)`,
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
            <div style={{ flex: '0 0 auto', minWidth: 240 }}>
              <Eyebrow color={accent}>Our moat</Eyebrow>
              <div style={{
                fontFamily: SERIF, fontWeight: 700,
                fontSize: 'clamp(8rem, 14vw, 14rem)', lineHeight: 0.85, color: CF.white,
                letterSpacing: '-0.05em', marginTop: 6,
                background: `linear-gradient(180deg, ${CF.white}, ${accent})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>06</div>
            </div>
            <div style={{ flex: '1 1 380px' }}>
              <h3 style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700,
                lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16,
              }}>Document.</h3>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.85)', marginBottom: 14 }}>
                Where possible, we turn the work into a public case study, published in <strong style={{ color: accent }}>Sabi</strong>. Real numbers, replicable plays, your win written for the next creator to learn from.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.7)' }}>
                The African creator economy is starved of public playbooks. We&apos;re here to change that.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p style={{
        textAlign: 'center', marginTop: 28, padding: '0 16px',
        fontFamily: SERIF, fontStyle: 'italic',
        fontSize: 18, color: CF.muted, lineHeight: 1.5,
      }}>
        Every step happens with your team in the room. Chainfren is the engine; you&apos;re the protagonist.
      </p>
    </section>
  )
}

function WhyChainfren({ accent }) {
  const claims = [
    { t: 'We build where culture is happening.',
      d: 'Lagos-based, Africa-rooted, internet-native. We understand the creators, communities, brands, and platforms shaping the market — not as observers, but as builders inside it. No remote-only Western agency can match what’s learned by being here.' },
    { t: 'We use crypto where it earns its place.',
      d: 'Smart contracts, stablecoins, onchain identity, digital assets — but only where they solve real problems for creators and brands. We don’t do tokens for hype. We don’t recommend Web3 for its own sake. We use the tools that move value across borders, prove ownership, and let audiences travel with their identity. Where the technology earns its place, we lean in. Where it doesn’t, we say so.' },
    { t: 'We own the infrastructure we recommend.',
      d: 'TiVi, TVinBio, and Comeownity aren’t theories. They’re products we’re building for the same future we help clients enter. When we tell you what to use, we know it works because we use it.' },
    { t: 'We think in ownership, not campaigns.',
      d: 'Reach is useful. Ownership is better. Every engagement is designed to help you own more audience, revenue, data, and community — not to earn another viral moment that disappears in a week.' },
    { t: 'We’re builders, not deck merchants.',
      d: 'We write, design, ship code, run launches, manage communities, and answer Discord pings at 2am. Decks are tools, not deliverables.' },
    { t: 'We make the playbook public.',
      d: 'Through Sabi, we document what works so the African creator economy gets better, faster. Every engagement that becomes a case study is a gift to the next creator who needs the same map.' },
  ]
  return (
    <section data-screen-label="07 Why Chainfren" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{
        ...CARD_BASE, background: CF.white,
        padding: 'clamp(32px, 5vw, 64px) clamp(28px, 5vw, 64px)',
      }}>
        <div style={{ marginBottom: 40 }}>
          <Eyebrow color={CF.muted}>Why Chainfren</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(2rem, 4.2vw, 3.5rem)', fontWeight: 700,
            letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12,
          }}>We are not a normal&nbsp;agency.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {claims.map((c, i) => (
            <div key={c.t} style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(60px, 80px) 1fr',
              gap: 'clamp(20px, 4vw, 60px)',
              padding: '28px 0',
              borderTop: i === 0 ? `2px solid ${CF.dark}` : 'none',
              borderBottom: `2px solid ${CF.dark}`,
            }}>
              <div style={{
                fontFamily: SERIF, fontWeight: 700,
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', color: accent,
                letterSpacing: '-0.02em',
              }}>0{i + 1}</div>
              <div className="cf-claim-row" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.4fr',
                gap: 'clamp(20px, 4vw, 60px)', alignItems: 'baseline',
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.875rem)', fontWeight: 700,
                  color: CF.dark, lineHeight: 1.15, letterSpacing: '-0.015em',
                }}>{c.t}</h3>
                <p style={{ fontSize: 16, color: CF.muted, lineHeight: 1.6 }}>{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProofInProgress({ accent }) {
  return (
    <section data-screen-label="08 Proof" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
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
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Build in public</span>
            </div>
            <div>
              <div style={{
                fontFamily: SERIF, fontWeight: 700,
                fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.9,
                letterSpacing: '-0.04em',
                background: `linear-gradient(135deg, ${CF.white}, ${accent})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Star Factor.</div>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', marginTop: 20, maxWidth: 600 }}>
                Chainfren is building Star Factor — an onchain reality entertainment platform, with transparent voting, prediction markets, and contestant-owned identity. The most ambitious project of its kind ever attempted from the continent.
              </p>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24,
              paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)',
            }}>
              {[['24/7', 'Live format'], ['Onchain', 'Voting & predictions'], ['Lagos', 'Built from inside it']].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: accent, letterSpacing: '-0.01em' }}>{k}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>{v}</div>
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
            <Eyebrow>Section 09 · Proof in progress</Eyebrow>
            <div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', fontWeight: 700, lineHeight: 1.15,
                letterSpacing: '-0.015em', color: CF.dark, marginBottom: 14,
              }}>The build is happening in public.</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'rgba(8,21,60,0.78)' }}>
                The playbook behind Star Factor — production, infrastructure, audience onboarding, sponsorship, community — informs how we help every creator and brand build their own owned-media future. When season one airs, this becomes a full case study with real numbers.
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
  const qs = [
    { q: 'Who is Chainfren Agency for?',
      a: 'African creators, creator-led brands, media and entertainment companies, communities, and cultural brands ready to build owned growth systems. If you’re building serious internet businesses around an audience you want to own, you’re who we’re built for.' },
    { q: 'What does Chainfren actually build?',
      a: 'Owned audience capture, direct payment rails, community infrastructure, streaming platforms, onchain mechanics, content systems — and the strategic and creative work that turns all of it into a working growth engine. The kind of infrastructure platforms wouldn’t let you build because they were built for them, not for you.' },
    { q: 'Do I need to understand Web3 to work with you?',
      a: 'No. We do, and we’ll translate where it matters. We use crypto and digital asset technology only where it solves real problems — direct payments across borders, ownership that survives platform changes, identity that travels with your audience. If your project doesn’t need Web3 to succeed, we’ll tell you.' },
    { q: 'What’s the difference between Chainfren and a regular agency? And between Chainfren and a Web3 agency?',
      a: 'A regular agency builds your reach on platforms you don’t own. A typical Web3 agency builds tokens or NFT drops for hype. Chainfren is neither. We’re a growth agency that uses crypto, digital assets, and onchain infrastructure to build something specific: durable internet businesses for creators and brands. Owned audience instead of rented attention. Direct payment instead of platform fees. Real ownership instead of follower counts. The technology serves the business outcome, not the other way around.' },
    { q: 'What’s the difference between Chainfren Agency and Chainfren Products?',
      a: 'The Products (TiVi, TVinBio, Comeownity) are software you can use directly, often as the infrastructure layer underneath your business. The Agency is the done-with-you team that builds, launches, and grows the business on top of those Products. Many engagements use both.' },
    { q: 'What does an engagement cost?',
      a: 'Pricing is scoped to your specific stage, audience, and goals. We have engagements ranging from focused two-week diagnostics to multi-month full-scale programs. The intake form asks about your budget range up front — we do this so we can match you to the right engagement, and so neither of us wastes time if it’s not a fit. We’ll always be honest about whether we’re the right team for your stage.' },
    { q: 'Do you work with early creators?',
      a: 'Yes, but pragmatically. If you’re under 10K followers and unmonetized, an Audit is the best place to start — you’ll get clarity on what to focus on before committing to a larger engagement.' },
    { q: 'How do we start?',
      a: 'Fill out the intake form — 60 seconds, the basics about you and what you’re building. A real human from Chainfren reads every submission and reaches out within 24 hours, usually faster. From there, we’ll either set up a call to dig deeper, or we’ll be honest if we’re not the right team and point you somewhere that is.' },
  ]
  const [open, setOpen] = React.useState(0)
  return (
    <section data-screen-label="09 FAQ" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div className="cf-faq-grid" style={{
        display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: 32,
      }}>
        <div style={{ padding: '8px 8px 0' }}>
          <Eyebrow color={CF.muted}>FAQ</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700,
            letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, marginTop: 12,
          }}>Common questions.</h2>
          <p style={{ fontSize: 15, color: CF.muted, lineHeight: 1.6, marginTop: 16, maxWidth: 360 }}>
            Quick answers to what we get asked most. Anything missing? Bring it to the discovery call.
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
                    fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)', fontWeight: 700,
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
    <section data-screen-label="10 Closing CTA" style={{ maxWidth: 1480, margin: '0 auto', padding: '64px 16px 0' }}>
      <div style={{
        ...CARD_BASE, background: CF.dark, color: CF.white,
        padding: 'clamp(40px, 7vw, 96px) clamp(28px, 6vw, 80px)',
        backgroundImage: `radial-gradient(ellipse at 80% 20%, ${accent}55, transparent 60%), radial-gradient(ellipse at 20% 100%, #3D1F73aa, transparent 60%)`,
      }}>
        <Eyebrow color={accent}>Ready when you are</Eyebrow>
        <h2 style={{
          fontSize: 'clamp(2.25rem, 6vw, 5.5rem)', fontWeight: 700,
          lineHeight: 0.98, letterSpacing: '-0.03em',
          margin: '20px 0 36px', maxWidth: 1100,
        }}>
          Ready to build beyond&nbsp;
          <span style={{
            background: `linear-gradient(110deg, ${CF.white} 30%, ${accent} 50%, ${CF.white} 70%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontStyle: 'italic',
          }}>rented platforms?</span>
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 28, marginBottom: 44,
        }}>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.82)' }}>
            Whether you&apos;re a creator with attention you can&apos;t yet monetize, a brand ready for its own platform, a community looking for real participation, or a media operator done with the platform tax — tell us what you&apos;re building.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.7)' }}>
            We&apos;ll learn what you&apos;re building, show you how Chainfren works, and scope an engagement to your specific stage and goals — including pricing. No pitch deck, no slides, no hard sell. The form takes 60 seconds. If we&apos;re not the right team, we&apos;ll point you to who is.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={openContact} style={{
            padding: '16px 32px', borderRadius: 9999,
            background: CF.ctaGrad, border: '2px solid transparent',
            color: CF.primary, fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
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
            color: CF.white, fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
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
        <img src="/chainlogo.png" alt="" style={{ height: 22 }} />
        <span style={{ fontSize: 12, color: CF.subtle }}>2025 © Chainfren. All rights reserved.</span>
      </div>
      <div style={{ display: 'flex', gap: 22, fontSize: 12, color: CF.subtle, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
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
      fontFamily: '"Inter Display", "Inter", sans-serif',
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
@keyframes cf-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.92)}}
@media (max-width:820px){
  .cf-faq-grid,.cf-bento-grid,.cf-proof-grid{grid-template-columns:1fr !important;gap:20px !important}
  .cf-bento-main,.cf-bento-side,.cf-proof-main,.cf-proof-side{grid-column:1 / -1 !important}
  .cf-claim-row{grid-template-columns:1fr !important;gap:14px !important}
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
      <main style={{ paddingBottom: 24 }}>
        <HeroBento accent={accent} />
        <ArgumentSection accent={accent} />
        <WhoWeServe />
        <ProgramsSection accent={accent} />
        <ServicePillars />
        <HowWeWork accent={accent} />
        <WhyChainfren accent={accent} />
        <ProofInProgress accent={accent} />
        <FAQ />
        <ClosingCTA accent={accent} />
        <PageFooter />
      </main>
      <AgencyContactModal open={contactOpen} onClose={() => setContactOpen(false)} accent={accent} />
    </div>
  )
}
