import Link from 'next/link'
import SiteHeader from '../../../../components/SiteHeader'
import CreatorApplyForm from '../../../../components/CreatorApplyForm'

export const metadata = {
  title: 'Apply to Join the Chainfren Creator Network',
  description: 'Apply to join the Chainfren Creator Network — get real campaigns with real budgets from leading onchain brands, paid in stablecoins on delivery.',
}

const CF = { dark: '#08153C', muted: '#4A5568', cyan: '#5ACDFF' }

export default function CreatorNetworkApplyPage() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <SiteHeader badgeLabel="Agency" accent={CF.cyan} cta={{ label: 'Join Chainfren', href: '/contact' }} />

      <nav aria-label="Breadcrumb" style={{ maxWidth: 640, margin: '8px auto 0', padding: '0 20px' }}>
        <ol style={{ display: 'flex', gap: 6, listStyle: 'none', padding: 0, margin: 0, fontSize: 12, color: CF.muted, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          <li><Link href="/agency" style={{ color: CF.muted, textDecoration: 'none' }}>Agency</Link></li>
          <li aria-hidden="true">›</li>
          <li><Link href="/agency/creator-network" style={{ color: CF.muted, textDecoration: 'none' }}>Creator Network</Link></li>
          <li aria-hidden="true">›</li>
          <li style={{ color: CF.dark }}>Apply</li>
        </ol>
      </nav>

      <header style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 40px', textAlign: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: CF.dark, border: `1.5px solid ${CF.dark}`, borderRadius: 9999, padding: '6px 14px', display: 'inline-block' }}>
          Creator Network
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 450, letterSpacing: '-0.025em', lineHeight: 1.05, color: CF.dark, margin: '18px 0 12px' }}>
          Get paid to work with crypto&apos;s biggest brands.
        </h1>
        <p style={{ fontSize: 16.5, color: CF.muted, lineHeight: 1.55 }}>
          Real campaigns with real budgets from leading onchain brands. Vetted deals, no scams, paid in stablecoins the moment you deliver.
        </p>
      </header>

      <CreatorApplyForm />
    </div>
  )
}
