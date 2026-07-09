import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import AudienceFren from '../../components/AudienceFren'
import { CF } from '../../config/stack'

export const metadata = {
  title: 'For Creators — Own Your Audience, Keep Your Money',
  description: 'Everything Chainfren builds for creators — the solutions, the tools, the network, and the stage. Own your audience, get paid directly, and build the business the platforms wouldn’t let you build.',
}

const CARD_BASE = { borderRadius: 28, border: `2px solid ${CF.dark}`, position: 'relative', overflow: 'hidden', height: '100%' }

function Eyebrow({ children, color = CF.dark }) {
  return <span style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{children}</span>
}
function Arrow({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>
}

const SOLUTIONS = [
  { label: 'Creator Growth OS', body: 'The operating system behind your audience. Grow it, own it, get paid directly.', href: '/solutions/creator-growth-os', bg: CF.periwinkle },
  { label: 'Media Launchpad', body: 'Launch a media presence you own — streaming, broadcast, publishing.', href: '/solutions/media-launchpad', bg: CF.cyan },
  { label: 'AI Agent Studio', body: 'Scale your presence, not your overhead.', href: '/solutions/ai-agents', bg: CF.lavender },
]

export default function ForCreatorsPage() {
  return (
    <div style={{ background: '#F5F4EE', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif', color: CF.dark }}>
      <SiteHeader accent={CF.mint} cta={{ label: 'Talk to Chainfren', href: '/contact' }} />

      {/* Hero */}
      <section style={{ maxWidth: 1220, margin: '0 auto', padding: '20px 16px 0' }}>
        <div style={{ ...CARD_BASE, background: CF.dark, color: '#fff', padding: 'clamp(36px, 6vw, 72px) clamp(24px, 5vw, 56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 440px', minWidth: 0 }}>
            <Eyebrow color={CF.mint}>For Creators</Eyebrow>
            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.025em', margin: '18px 0 0' }}>
              Own your audience. Keep your money. Build the business the platforms wouldn’t let you build.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, maxWidth: 560, marginTop: 22 }}>
              Everything Chainfren builds for creators — the solutions, the tools, the network, and the stage. Pick your door.
            </p>
          </div>
          <AudienceFren variant="creators" style={{ width: 'min(300px, 40vw)', aspectRatio: '1', flexShrink: 0 }} />
        </div>
      </section>

      {/* Section 1 — Your solutions */}
      <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(48px,7vw,80px) 16px 0' }}>
        <Eyebrow color={CF.muted}>Your solutions</Eyebrow>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 450, letterSpacing: '-0.02em', color: CF.dark, margin: '10px 0 28px' }}>Routed by what you’re building.</h2>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {SOLUTIONS.map((o) => (
            <Link key={o.label} href={o.href} style={{ textDecoration: 'none' }}>
              <div className="fc-card" style={{ ...CARD_BASE, background: o.bg, padding: '28px 24px', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1)' }}>
                <Eyebrow>Solution</Eyebrow>
                <div>
                  <h3 style={{ fontSize: 21, fontWeight: 500, color: CF.dark, marginBottom: 8, letterSpacing: '-0.01em' }}>{o.label}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(8,21,60,0.78)', lineHeight: 1.55, marginBottom: 16 }}>{o.body}</p>
                  <span style={{ fontSize: 12, fontWeight: 500, color: CF.dark, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Explore {o.label} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 2 — Your tools */}
      <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(40px,6vw,64px) 16px 0' }}>
        <Link href="/products" style={{ textDecoration: 'none' }}>
          <div style={{ ...CARD_BASE, background: CF.white, padding: 'clamp(24px, 4vw, 40px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 320px', minWidth: 0 }}>
              <Eyebrow color={CF.muted}>Your tools</Eyebrow>
              <h3 style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)', fontWeight: 500, letterSpacing: '-0.015em', color: CF.dark, margin: '10px 0 10px' }}>
                TiVi — your Netflix, Twitch, YouTube, owned. · TVinBio — the link-in-bio you actually own.
              </h3>
              <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.6, maxWidth: 520 }}>The products that let you monetize and own your work directly.</p>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0, padding: '13px 26px', borderRadius: 9999, border: `2px solid ${CF.dark}`, color: CF.dark, fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>See products <Arrow /></span>
          </div>
        </Link>
      </section>

      {/* Section 3 — Get paid (the Network) */}
      <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(32px,4vw,40px) 16px 0' }}>
        <Link href="/creator-network" style={{ textDecoration: 'none' }}>
          <div style={{ ...CARD_BASE, background: CF.dark, color: '#fff', padding: 'clamp(28px, 5vw, 52px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', backgroundImage: `radial-gradient(60% 70% at 90% 10%, ${CF.cyan}33, transparent 60%)` }}>
            <div style={{ flex: '1 1 340px', minWidth: 0 }}>
              <Eyebrow color={CF.cyan}>Creator Network</Eyebrow>
              <h3 style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.25rem)', fontWeight: 450, letterSpacing: '-0.02em', color: '#fff', margin: '12px 0 10px' }}>Get paid to work with crypto’s biggest brands.</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: 520 }}>Real campaigns, real budgets, paid fast in stablecoins.</p>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0, padding: '13px 26px', borderRadius: 9999, background: '#fff', color: CF.dark, fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Join the network <Arrow /></span>
          </div>
        </Link>
      </section>

      {/* Section 4 — Your stage (Media) */}
      <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(32px,4vw,40px) 16px 0' }}>
        <Link href="/media" style={{ textDecoration: 'none' }}>
          <div style={{ ...CARD_BASE, background: CF.mint, padding: 'clamp(24px, 4vw, 40px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <Eyebrow>Your stage</Eyebrow>
              <h3 style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)', fontWeight: 500, letterSpacing: '-0.015em', color: CF.dark, margin: '10px 0 6px' }}>Sabi — Africa’s onchain broadcasting network.</h3>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0, padding: '13px 26px', borderRadius: 9999, border: `2px solid ${CF.dark}`, color: CF.dark, fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Visit Sabi <Arrow /></span>
          </div>
        </Link>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(48px,8vw,88px) 16px 0' }}>
        <div style={{ ...CARD_BASE, background: CF.dark, color: '#fff', padding: 'clamp(32px, 6vw, 64px)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 450, letterSpacing: '-0.02em', margin: '0 0 24px' }}>Ready to build something you own?</h2>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 9999, background: '#fff', color: CF.dark, fontSize: 13.5, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', textDecoration: 'none' }}>Talk to Chainfren <Arrow /></Link>
        </div>
      </section>

      <SiteFooter maxWidth={1220} />
      <style dangerouslySetInnerHTML={{ __html: `.fc-card:hover { transform: translateY(-4px); }` }} />
    </div>
  )
}
