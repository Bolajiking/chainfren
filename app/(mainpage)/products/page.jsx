import Link from 'next/link'
import SiteHeader, { DEFAULT_CTA } from '../../components/SiteHeader'

export const metadata = {
  title: 'Creator Tools & Streaming Products — TiVi, TVinBio, Comeownity',
  description:
    "Stop building on rented land. Chainfren's product stack — streaming, owned media, and tokenized entertainment for African creators. Keep up to 95% of revenue.",
}

const CF = {
  dark: '#08153C',
  white: '#FFFFFF',
  muted: '#4A5568',
  accent: '#40ACFF',
  periwinkle: '#8DAAFF',
  cyan: '#5ACDFF',
  mint: '#CBF0B8',
  tint: '#EEF2FF', // light periwinkle tint
}

const SERIF = 'Georgia, "Times New Roman", serif'

const CARD_BASE = {
  borderRadius: 28,
  border: `2px solid ${CF.dark}`,
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
}

function Eyebrow({ children, color = CF.dark }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
      }}
    >
      {children}
    </span>
  )
}

function Arrow({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  )
}

function PillBtn({ children, dark, href, external, style = {} }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '11px 20px',
    borderRadius: 9999,
    border: `2px solid ${CF.dark}`,
    fontFamily: 'inherit',
    fontSize: 12.5,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    background: dark ? CF.dark : CF.white,
    color: dark ? CF.white : CF.dark,
    ...style,
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={base}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} style={base}>
      {children}
    </Link>
  )
}

const PRODUCTS = [
  {
    n: '01',
    name: 'TiVi',
    tag: 'Streaming Platform',
    bg: CF.periwinkle,
    desc:
      'Your Netflix. Your Twitch. Your YouTube — without the algorithm, the platform tax, or the deplatforming risk. Live, on-demand, paid, gated, owned.',
    href: '/products/TiVi',
    external: false,
  },
  {
    n: '02',
    name: 'TVinBio',
    tag: 'Owned Media Hub',
    bg: CF.cyan,
    desc:
      'Replace your link-in-bio with a media hub you actually own. Capture fans, sell directly, run your storefront — all from one page.',
    href: 'https://tvin.bio/',
    external: true,
  },
  {
    n: '03',
    name: 'Comeownity',
    tag: 'Cultural Infrastructure',
    bg: CF.mint,
    desc:
      'Tokenized shows, interactive formats, fan-driven communities. Where Star Factor lives and the next generation of African live entertainment is built.',
    href: 'https://comeownity.com/',
    external: true,
  },
]

function HeroCard() {
  return (
    <div
      style={{
        ...CARD_BASE,
        background: CF.tint,
        padding: '28px 28px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 240,
      }}
    >
      <Eyebrow color={CF.muted}>Chainfren Products</Eyebrow>
      <h1
        style={{
          fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
          color: CF.dark,
          margin: '18px 0 0',
        }}
      >
        Tools for creators who&nbsp;
        <span
          style={{
            background: `linear-gradient(110deg, ${CF.dark} 40%, ${CF.accent} 60%, ${CF.dark} 80%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontStyle: 'italic',
          }}
        >
          own
        </span>{' '}
        what they build.
      </h1>
      <p
        style={{
          fontSize: 15.5,
          color: CF.muted,
          lineHeight: 1.55,
          maxWidth: 480,
          marginTop: 16,
        }}
      >
        Three products. One stack. Infrastructure to leave rented platforms, monetize directly, and build durable internet businesses.
      </p>
      <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
        <PillBtn dark href="/contact">
          Talk to Chainfren <Arrow />
        </PillBtn>
      </div>
    </div>
  )
}

function ProductCard({ p }) {
  const ctaLabel = p.external ? `Visit ${p.name}` : `Explore ${p.name}`
  const ctaProps = p.external
    ? { href: p.href, target: '_blank', rel: 'noopener noreferrer' }
    : null

  const ctaStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: CF.dark,
    textDecoration: 'none',
    paddingTop: 12,
    marginTop: 'auto',
    borderTop: `1.5px solid rgba(8,21,60,0.2)`,
  }

  return (
    <article
      style={{
        ...CARD_BASE,
        background: p.bg,
        padding: '20px 22px 18px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 240,
        transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className="cf-product-card"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <Eyebrow>{p.tag}</Eyebrow>
        <span
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 38,
            lineHeight: 0.8,
            color: CF.dark,
            opacity: 0.2,
          }}
        >
          {p.n}
        </span>
      </div>

      <h2
        style={{
          fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
          fontWeight: 700,
          color: CF.dark,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: 10,
        }}
      >
        {p.name}
      </h2>

      <p
        style={{
          fontSize: 13.5,
          color: 'rgba(8,21,60,0.78)',
          lineHeight: 1.5,
          marginBottom: 16,
        }}
      >
        {p.desc}
      </p>

      {p.external ? (
        <a {...ctaProps} style={ctaStyle}>
          {ctaLabel} <Arrow size={12} />
        </a>
      ) : (
        <Link href={p.href} style={ctaStyle}>
          {ctaLabel} <Arrow size={12} />
        </Link>
      )}
    </article>
  )
}

function Portfolio() {
  return (
    <section
      style={{ maxWidth: 1480, margin: '0 auto', padding: '20px 16px 40px' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '0 8px 12px',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <Eyebrow color={CF.muted}>The Portfolio · 03</Eyebrow>
        <span style={{ fontSize: 12, color: CF.muted, letterSpacing: '0.04em' }}>
          Streaming · Media · Community
        </span>
      </div>

      <div className="cf-bento">
        <div className="cf-bento-hero">
          <HeroCard />
        </div>
        <div className="cf-bento-a">
          <ProductCard p={PRODUCTS[0]} />
        </div>
        <div className="cf-bento-b">
          <ProductCard p={PRODUCTS[1]} />
        </div>
        <div className="cf-bento-c">
          <ProductCard p={PRODUCTS[2]} />
        </div>
      </div>
    </section>
  )
}

export default function Products() {
  return (
    <div className="font-fontspring" style={{ background: CF.white, minHeight: '100vh' }}>
      <SiteHeader badgeLabel="Products" accent={CF.periwinkle} cta={DEFAULT_CTA} />
      <Portfolio />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .cf-bento {
              display: grid;
              gap: 8px;
              grid-template-columns: repeat(12, 1fr);
              grid-auto-rows: minmax(240px, auto);
            }
            .cf-bento-hero { grid-column: span 6; grid-row: span 2; }
            .cf-bento-a    { grid-column: span 6; grid-row: span 1; }
            .cf-bento-b    { grid-column: span 3; grid-row: span 1; }
            .cf-bento-c    { grid-column: span 3; grid-row: span 1; }
            .cf-product-card:hover { transform: translateY(-4px); }
            @media (max-width: 900px) {
              .cf-bento { grid-template-columns: 1fr; }
              .cf-bento-hero,
              .cf-bento-a,
              .cf-bento-b,
              .cf-bento-c { grid-column: span 1; }
            }
          `,
        }}
      />
    </div>
  )
}
