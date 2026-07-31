import { ImageResponse } from 'next/server'

// A dedicated card for /about, because this is the page that gets shared into
// a DM before an investor call or a hiring conversation. The sitewide card
// sells the company; this one leads with the thesis line, which is the thing
// worth arguing with.

export const runtime = 'edge'
export const alt = 'About Chainfren — African creators have already won the attention. The next fight is ownership.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const NAVY = '#08153C'
const MINT = '#CBF0B8'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: NAVY,
          backgroundImage: `radial-gradient(72% 82% at 86% 6%, ${MINT}26, transparent 60%), radial-gradient(60% 70% at 4% 100%, #8DAAFF1A, transparent 58%)`,
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 20, letterSpacing: 3, textTransform: 'uppercase', color: MINT, fontWeight: 600 }}>
            Chainfren
          </div>
          <div style={{ display: 'flex', fontSize: 18, letterSpacing: 2.4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            The thesis
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 8 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 62,
              lineHeight: 1.08,
              letterSpacing: -2,
              color: '#FFFFFF',
              fontWeight: 500,
              maxWidth: 960,
            }}
          >
            African creators have already won the attention.
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 14,
              fontSize: 62,
              lineHeight: 1.08,
              letterSpacing: -2,
              color: MINT,
              fontWeight: 500,
              fontStyle: 'italic',
            }}
          >
            The next fight is ownership.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 22, color: 'rgba(255,255,255,0.6)' }}>chainfren.com/about</div>
          <div style={{ display: 'flex', fontSize: 22, color: 'rgba(255,255,255,0.6)' }}>Lagos, Nigeria</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
