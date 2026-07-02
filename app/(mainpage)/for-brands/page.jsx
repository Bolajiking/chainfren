import Link from 'next/link'
import SiteHeader, { DEFAULT_LINKS, DEFAULT_CTA } from '../../components/SiteHeader'
import { HandshakeFrens } from '../../components/Frens'

export const metadata = {
  title: 'For Brands — Reach African & Crypto Audiences That Convert',
  description: "Connect your onchain brand to Africa's creators and global crypto KOLs. De-risk your Web3 go-to-market with curated creator campaigns and full-stack agency execution.",
}

const CF = {
  dark: '#08153C', white: '#FFFFFF', muted: '#4A5568', subtle: '#6B6776',
  accent: '#40ACFF', cyan: '#5ACDFF', mint: '#CBF0B8', periwinkle: '#8DAAFF',
}

const CARD_BASE = {
  borderRadius: 28, border: `2px solid ${CF.dark}`,
  position: 'relative', overflow: 'hidden', height: '100%',
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

const OFFERINGS = [
  {
    label: 'Go-to-market & strategy', tag: 'Agency', bg: CF.cyan, href: '/agency',
    body: 'Tokenomics, community, BD, branding, and full launch execution.',
    cta: 'See agency programs',
  },
  {
    label: 'Infrastructure & products', tag: 'Product', bg: CF.periwinkle, href: '/products',
    body: 'The onchain infrastructure that powers ownership and distribution.',
    cta: 'See products',
  },
]

export default function ForBrandsPage() {
  return (
    <div style={{ background: CF.white, fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <SiteHeader links={DEFAULT_LINKS} accent={CF.cyan} cta={DEFAULT_CTA} />

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 16px 0' }}>
        <div style={{
          ...CARD_BASE, background: CF.dark, color: CF.white,
          padding: 'clamp(36px, 6vw, 72px) clamp(24px, 5vw, 56px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
        }}>
          <div style={{ flex: '1 1 420px', minWidth: 0 }}>
            <Eyebrow color={CF.cyan}>For Brands</Eyebrow>
            <h1 style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 500, lineHeight: 1.03,
              letterSpacing: '-0.025em', margin: '18px 0 0',
            }}>
              Build culture people own. Reach the audiences that actually convert — onchain.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, maxWidth: 560, marginTop: 22 }}>
              Everything Chainfren offers brands — from creator campaigns to full go-to-market execution in the onchain economy.
            </p>
          </div>
          <HandshakeFrens style={{ width: 'min(300px, 38vw)', height: 'auto', flexShrink: 0 }} />
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(48px,8vw,80px) 16px 0' }}>
        <Eyebrow>What&apos;s here for you</Eyebrow>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 450, letterSpacing: '-0.02em', color: CF.dark, margin: '10px 0 32px' }}>
          Everything Chainfren offers brands.
        </h2>

        {/* ★ Surfaced Creator Network subsection — elevated first, per brand journey priority */}
        <Link href="/agency/creator-network" style={{ textDecoration: 'none', display: 'block', marginBottom: 8 }}>
          <div style={{
            ...CARD_BASE, background: CF.dark, color: CF.white, padding: 'clamp(24px, 4vw, 40px)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
          }}>
            <div style={{ flex: '1 1 320px', minWidth: 0 }}>
              <Eyebrow color={CF.cyan}>Creator Network</Eyebrow>
              <h3 style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)', fontWeight: 500, letterSpacing: '-0.015em', margin: '10px 0 10px' }}>
                Reach Africa&apos;s creators and the world&apos;s crypto KOLs.
              </h3>
              <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, maxWidth: 480 }}>
                Hire Chainfren&apos;s curated, vetted network to reach the audiences that convert — African household names and crypto-native voices — with campaigns built for onchain user acquisition and creators paid in stablecoins.
              </p>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
              padding: '13px 26px', borderRadius: 9999, background: CF.white, color: CF.dark,
              fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>Hire the network <Arrow /></span>
          </div>
        </Link>

        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {OFFERINGS.map((o) => (
            <Link key={o.label} href={o.href} style={{ textDecoration: 'none' }}>
              <div style={{ ...CARD_BASE, background: o.bg, padding: '28px 24px', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Eyebrow>{o.tag}</Eyebrow>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 500, color: CF.dark, marginBottom: 8, letterSpacing: '-0.01em' }}>{o.label}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(8,21,60,0.78)', lineHeight: 1.55, marginBottom: 16 }}>{o.body}</p>
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: CF.dark, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{o.cta} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(48px,8vw,88px) 16px' }}>
        <div style={{
          ...CARD_BASE, background: CF.dark, color: CF.white, padding: 'clamp(32px, 6vw, 64px)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 450, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
            Ready to build culture people own?
          </h2>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '15px 30px', borderRadius: 9999, background: CF.white, color: CF.dark,
            fontSize: 13.5, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', textDecoration: 'none',
          }}>Talk to Chainfren <Arrow /></Link>
        </div>
      </section>

      <footer style={{ maxWidth: 1180, margin: '0 auto', padding: '0 16px 60px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, paddingTop: 24, borderTop: '1px solid rgba(8,21,60,0.12)' }}>
          {[
            ['Explore', [['Agency', '/agency'], ['Creator Network', '/agency/creator-network'], ['Products', '/products'], ['Media', '/media']]],
            ['For you', [['For Creators', '/for-creators'], ['For Brands', '/for-brands']]],
            ['Company', [['Playbook', '/blog'], ['Contact', '/contact'], ['Join Chainfren', '/contact']]],
          ].map(([heading, links]) => (
            <div key={heading}>
              <div style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.14em', textTransform: 'uppercase', color: CF.subtle, marginBottom: 12 }}>{heading}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {links.map(([l, h]) => <Link key={l} href={h} style={{ fontSize: 13.5, color: CF.dark, textDecoration: 'none' }}>{l}</Link>)}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}
