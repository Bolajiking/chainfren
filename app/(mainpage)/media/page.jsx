import Link from 'next/link'
import SiteHeader, { DEFAULT_CTA } from '../../components/SiteHeader'

export const metadata = {
  title: 'Media — Watch and Read from Chainfren',
  description:
    'Live broadcasts, upcoming streams, and articles from Chainfren on African creators, ownership, and onchain culture.',
}

const CF = {
  dark: '#08153C',
  white: '#FFFFFF',
  muted: '#4A5568',
  accent: '#40ACFF',
  periwinkle: '#8DAAFF',
  cyan: '#5ACDFF',
  mint: '#CBF0B8',
  coral: '#FF6B6B',
  live: '#FF1F3D',
  tint: '#EEF2FF',
}

const SERIF = 'Georgia, "Times New Roman", serif'

const CARD_BASE = {
  borderRadius: 28,
  border: `2px solid ${CF.dark}`,
  position: 'relative',
  overflow: 'hidden',
}

const ARTICLE_BG = [CF.cyan, CF.periwinkle, CF.mint, CF.tint]

// Flip to true when a broadcast goes live
const LIVE = false

const NEXT_BROADCAST = {
  title: 'Africa’s onchain broadcasting network',
  guest: 'Sabi Sessions',
  when: 'Launching 2026 — be first to know',
}

const SCHEDULE = [
  { date: '2026', show: 'Sabi Sessions', topic: 'Conversations with the artists owning their audiences' },
  { date: '2026', show: 'Friday Sabi', topic: 'The week in African culture, sized for your commute' },
  { date: 'Soon', show: 'Sabi Live · Lagos', topic: 'In person. By invitation.' },
]

function Eyebrow({ children, color = CF.dark }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 450,
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

function LiveDot() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 11,
        fontWeight: 480,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#fff',
      }}
    >
      <span
        className="cf-live-dot"
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: CF.live,
          boxShadow: `0 0 0 4px ${CF.live}33`,
          display: 'inline-block',
        }}
      />
      Live now
    </span>
  )
}

function HeroPlayer() {
  if (LIVE) {
    return (
      <div
        style={{
          ...CARD_BASE,
          background: CF.dark,
          color: '#fff',
          minHeight: 'clamp(280px, 56vw, 520px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            flex: 1,
            background: `radial-gradient(120% 120% at 80% 20%, ${CF.accent} 0%, ${CF.dark} 60%)`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            aria-label="Play live stream"
            style={{
              width: 84,
              height: 84,
              borderRadius: 999,
              background: '#fff',
              border: `2px solid ${CF.dark}`,
              color: CF.dark,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div style={{ position: 'absolute', top: 20, left: 20 }}>
            <LiveDot />
          </div>
        </div>
        <div
          style={{
            padding: 'clamp(20px, 3vw, 28px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <Eyebrow color="rgba(255,255,255,0.6)">Broadcasting now</Eyebrow>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 450,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {NEXT_BROADCAST.title} — {NEXT_BROADCAST.guest}
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        ...CARD_BASE,
        background: CF.dark,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* player top chrome */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.12)',
          fontSize: 11, fontWeight: 450, letterSpacing: '0.12em', textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'rgba(255,255,255,0.6)' }}>
          <span style={{ display: 'inline-flex', gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
          </span>
          <span>Chainfren Media</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.55)' }}>
          <span style={{
            padding: '3px 8px', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 4, fontSize: 9.5,
          }}>HD</span>
          <span>Sabi · Live soon</span>
        </div>
      </div>

      {/* poster / placeholder graphic with copy */}
      <div
        style={{
          position: 'relative',
          padding: 'clamp(28px, 4vw, 52px) clamp(24px, 4vw, 44px)',
          minHeight: 'clamp(280px, 44vw, 440px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18,
          backgroundImage: `radial-gradient(120% 100% at 80% 10%, ${CF.accent}44 0%, transparent 55%), radial-gradient(100% 100% at 10% 110%, #3D1F73aa 0%, transparent 60%)`,
        }}
      >
        <Eyebrow color={CF.accent}>Coming soon</Eyebrow>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            color: '#fff',
            margin: 0,
            maxWidth: 900,
          }}
        >
          Stories and broadcasts from&nbsp;
          <span
            style={{
              background: `linear-gradient(110deg, #fff 30%, ${CF.accent} 50%, #fff 70%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}
          >
            Africa&apos;s
          </span>{' '}
          creator economy.
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.55, maxWidth: 640, margin: 0,
          }}
        >
          Live broadcasts when they happen. Articles from the team building the infrastructure underneath.
        </p>

        {/* decorative play badge */}
        <div
          aria-hidden
          style={{
            position: 'absolute', right: 'clamp(24px, 4vw, 44px)', bottom: 'clamp(24px, 4vw, 44px)',
            width: 64, height: 64, borderRadius: 999,
            border: '1.5px solid rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.05)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* bottom chrome — scrubber */}
      <div
        style={{
          padding: '14px 20px',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}
      >
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 10.5, fontWeight: 480, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: CF.coral,
            boxShadow: `0 0 0 4px ${CF.coral}33`, animation: 'cf-pulse 2s infinite',
          }} />
          Live soon
        </span>
        <span style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.18)', position: 'relative' }}>
          <span style={{ position: 'absolute', inset: '0 65% 0 0', background: CF.accent, borderRadius: 2 }} />
          <span style={{
            position: 'absolute', top: -4, left: '35%',
            width: 11, height: 11, borderRadius: '50%', background: CF.accent,
            boxShadow: `0 0 0 3px ${CF.accent}33`,
          }} />
        </span>
        <span style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)' }}>
          00:00 / ∞
        </span>
      </div>

      {/* actions */}
      <div style={{
        padding: '16px 20px 18px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', gap: 10, flexWrap: 'wrap',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <Link
          href="#schedule"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 20px', borderRadius: 9999,
            border: `2px solid ${CF.white}`, background: CF.white, color: CF.dark,
            fontSize: 12.5, fontWeight: 450, letterSpacing: '0.06em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          See schedule <Arrow />
        </Link>
        <Link
          href="#read"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 20px', borderRadius: 9999,
            border: `2px solid rgba(255,255,255,0.4)`, background: 'transparent', color: '#fff',
            fontSize: 12.5, fontWeight: 450, letterSpacing: '0.06em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Read articles
        </Link>
      </div>
    </div>
  )
}

function NextUpCard() {
  return (
    <div
      style={{
        ...CARD_BASE,
        background: CF.dark,
        color: '#fff',
        padding: 'clamp(24px, 3vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        minHeight: 'clamp(220px, 30vw, 280px)',
      }}
    >
      <Eyebrow color={CF.coral}>First broadcast</Eyebrow>
      <div>
        <h3
          style={{
            fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
            fontWeight: 450,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {NEXT_BROADCAST.guest}
        </h3>
        <div
          style={{
            fontSize: 13,
            fontWeight: 450,
            color: CF.coral,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: 6,
          }}
        >
          {NEXT_BROADCAST.title}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
          {NEXT_BROADCAST.when}
        </div>
      </div>
      <Link
        href="/contact"
        style={{
          marginTop: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '12px 18px',
          borderRadius: 9999,
          background: CF.coral,
          color: '#fff',
          border: 'none',
          fontWeight: 450,
          fontSize: 12,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        Set reminder <Arrow />
      </Link>
    </div>
  )
}

function WatchSection() {
  return (
    <section style={{ padding: '20px 16px 0' }}>
      <div className="cf-watch-grid">
        <div className="cf-watch-hero">
          <HeroPlayer />
        </div>
        <div className="cf-watch-side">
          <NextUpCard />
        </div>
      </div>

      <div
        id="schedule"
        style={{
          marginTop: 32,
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: '0 8px 14px',
        }}
      >
        <Eyebrow color={CF.muted}>Programming</Eyebrow>
        <span style={{ fontSize: 12, color: CF.muted, letterSpacing: '0.04em' }}>
          Launching 2026
        </span>
      </div>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          borderTop: `2px solid ${CF.dark}`,
        }}
      >
        {SCHEDULE.map((s, i) => (
          <li
            key={i}
            className="cf-schedule-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr auto',
              alignItems: 'center',
              gap: 24,
              padding: '22px 16px',
              borderBottom: `1.5px solid rgba(8,21,60,0.18)`,
            }}
          >
            <span
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                fontWeight: 450,
                color: CF.dark,
                letterSpacing: '-0.01em',
                fontStyle: 'italic',
              }}
            >
              {s.date}
            </span>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 450,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: CF.muted,
                  marginBottom: 6,
                }}
              >
                {s.show}
              </div>
              <div
                style={{
                  fontSize: 'clamp(16px, 1.7vw, 19px)',
                  fontWeight: 420,
                  color: CF.dark,
                  lineHeight: 1.25,
                  letterSpacing: '-0.01em',
                }}
              >
                {s.topic}
              </div>
            </div>
            <Link
              href="/contact"
              className="cf-schedule-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                fontWeight: 450,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: CF.dark,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                padding: '8px 14px',
                borderRadius: 9999,
                border: `1.5px solid ${CF.dark}`,
              }}
            >
              Notify me <Arrow size={12} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ArticleCard({ article, idx }) {
  const bg = ARTICLE_BG[idx % ARTICLE_BG.length]
  return (
    <Link
      href={`/blog/${article.slug}`}
      style={{
        ...CARD_BASE,
        background: bg,
        padding: '24px 24px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        minHeight: 220,
        textDecoration: 'none',
        color: CF.dark,
        transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className="cf-article-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Eyebrow>Article</Eyebrow>
        <span
          style={{
            fontFamily: SERIF,
            fontWeight: 450,
            fontSize: 28,
            lineHeight: 0.8,
            color: CF.dark,
            opacity: 0.2,
          }}
        >
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>
      <h3
        style={{
          fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
          fontWeight: 450,
          lineHeight: 1.2,
          color: CF.dark,
          margin: 0,
          flex: 1,
        }}
      >
        {article.title}
      </h3>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          fontWeight: 450,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: CF.dark,
          paddingTop: 14,
          borderTop: `1.5px solid rgba(8,21,60,0.2)`,
        }}
      >
        Read <Arrow size={12} />
      </span>
    </Link>
  )
}

async function fetchArticles() {
  if (!process.env.SPACE_ID || !process.env.ACCESS_TOKEN) return []
  try {
    const { createClient } = await import('contentful')
    const c = createClient({
      space: process.env.SPACE_ID,
      accessToken: process.env.ACCESS_TOKEN,
    })
    const entries = await c.getEntries({ content_type: 'blog' })
    return entries.items.slice(0, 6).map((item) => ({
      title: item.fields.title,
      slug: item.fields.slug,
    }))
  } catch {
    return []
  }
}

async function ReadSection() {
  const articles = await fetchArticles()

  return (
    <section id="read" style={{ padding: '48px 16px 56px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: '0 8px 16px',
        }}
      >
        <div>
          <Eyebrow color={CF.muted}>Read</Eyebrow>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 450,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: CF.dark,
              marginTop: 8,
            }}
          >
            From the team.
          </h2>
        </div>
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 450,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: CF.dark,
            textDecoration: 'none',
            borderBottom: `1.5px solid ${CF.dark}`,
            paddingBottom: 2,
          }}
        >
          All articles <Arrow size={12} />
        </Link>
      </div>

      {articles.length > 0 ? (
        <div
          className="cf-articles-grid"
          style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {articles.map((a, i) => (
            <ArticleCard key={a.slug || i} article={a} idx={i} />
          ))}
        </div>
      ) : (
        <Link
          href="/blog"
          style={{
            ...CARD_BASE,
            background: CF.cyan,
            padding: 'clamp(28px, 4vw, 44px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 16,
            textDecoration: 'none',
            color: CF.dark,
          }}
        >
          <Eyebrow>The Playbook</Eyebrow>
          <h3
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              fontWeight: 450,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: 720,
              margin: 0,
            }}
          >
            Web3 growth strategies, market analysis, and field notes for African creators.
          </h3>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 9999,
              border: `2px solid ${CF.dark}`,
              background: CF.dark,
              color: '#fff',
              fontSize: 12.5,
              fontWeight: 450,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Browse all articles <Arrow />
          </span>
        </Link>
      )}
    </section>
  )
}

export default function Media() {
  return (
    <div className="font-fontspring" style={{ background: CF.white, minHeight: '100vh' }}>
      <SiteHeader badgeLabel="Media" accent={CF.mint} cta={DEFAULT_CTA} />
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <WatchSection />
        <ReadSection />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .cf-watch-grid {
              display: grid;
              gap: 8px;
              grid-template-columns: 1.6fr 1fr;
              align-items: stretch;
            }
            .cf-watch-hero, .cf-watch-side { display: flex; }
            .cf-watch-hero > *, .cf-watch-side > * { width: 100%; }
            .cf-article-card:hover { transform: translateY(-4px); }
            @media (max-width: 800px) {
              .cf-watch-grid { grid-template-columns: 1fr; }
              .cf-schedule-row {
                grid-template-columns: 1fr !important;
                align-items: flex-start !important;
                gap: 10px !important;
                padding: 20px 8px !important;
              }
              .cf-schedule-cta { align-self: flex-start; }
            }
            @keyframes cf-live-pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.55; transform: scale(0.78); }
            }
            .cf-live-dot { animation: cf-live-pulse 1.4s ease-in-out infinite; }
          `,
        }}
      />
    </div>
  )
}
