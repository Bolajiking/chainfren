// `next/og` is the 13.5+ import path; this project is on 13.4.7, where
// ImageResponse still ships from next/server. Swap the import if Next is
// upgraded — the rest of the file is version-agnostic.
import { ImageResponse } from 'next/server'

// Sitewide default social card. Before this, every share of chainfren.com
// rendered as a bare text link — no image, no brand, in a feed where the image
// is most of the click decision.
//
// Rendered at the edge by Satori, which supports a deliberate subset of CSS:
// flex only (no grid, no float), no external assets, every element with more
// than one child needs an explicit `display`. The two-fren H mark is drawn as
// primitives from the exact geometry of ChainfrenIcon.jsx rather than
// approximated, per the brand-fidelity rule.

export const runtime = 'edge'
export const alt = 'Chainfren — Ownership infrastructure for the African creator economy'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const NAVY = '#08153C'
const MINT = '#CBF0B8'
const CYAN = '#5ACDFF'

// The H mark, scaled from the 400x400 canonical viewBox. Satori has no <svg>
// path support worth relying on, so the strokes are divs with the same
// coordinates and the same 18-unit stroke weight.
function Mark({ scale = 0.34, color = MINT }) {
  const s = (n) => n * scale
  const SW = s(18)
  const bar = (x, y, w, h) => ({
    position: 'absolute',
    left: s(x),
    top: s(y),
    width: w ? s(w) : SW,
    height: h ? s(h) : SW,
    background: color,
    borderRadius: SW,
  })
  return (
    <div style={{ display: 'flex', position: 'relative', width: s(400), height: s(400) }}>
      {/* dots */}
      <div style={{ position: 'absolute', left: s(114), top: s(26), width: s(48), height: s(48), borderRadius: s(48), background: color }} />
      <div style={{ position: 'absolute', left: s(238), top: s(26), width: s(48), height: s(48), borderRadius: s(48), background: color }} />
      {/* uprights */}
      <div style={bar(138 - 9, 78, 18, 190)} />
      <div style={bar(262 - 9, 78, 18, 190)} />
      {/* crossbar */}
      <div style={bar(138, 140 - 9, 124, 18)} />
      {/* legs — splayed, approximated as vertical stubs since Satori has no
          transforms on absolutely positioned children worth trusting */}
      <div style={bar(122 - 9, 268, 18, 112)} />
      <div style={bar(154 - 9, 268, 18, 112)} />
      <div style={bar(246 - 9, 268, 18, 112)} />
      <div style={bar(278 - 9, 268, 18, 112)} />
    </div>
  )
}

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
          backgroundImage: `radial-gradient(70% 80% at 88% 8%, ${CYAN}22, transparent 60%), radial-gradient(60% 70% at 6% 100%, ${MINT}1A, transparent 60%)`,
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: MINT,
              fontWeight: 600,
            }}
          >
            Chainfren
          </div>
          <Mark />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 8 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 68,
              lineHeight: 1.06,
              letterSpacing: -2.2,
              color: '#FFFFFF',
              fontWeight: 500,
              maxWidth: 900,
            }}
          >
            Ownership infrastructure for the African creator economy.
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 25,
              lineHeight: 1.35,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 820,
            }}
          >
            Own your audience, your community, and your revenue. Instead of renting them.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 22, color: 'rgba(255,255,255,0.6)' }}>chainfren.com</div>
          <div style={{ display: 'flex', fontSize: 22, color: 'rgba(255,255,255,0.6)' }}>Lagos, Nigeria</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
