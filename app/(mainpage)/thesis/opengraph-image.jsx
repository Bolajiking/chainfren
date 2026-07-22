import { ImageResponse } from 'next/server'

export const runtime = 'edge'
export const alt = 'The Chainfren thesis'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FFFEF8', color: '#08153C', padding: '72px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: 28, letterSpacing: '-0.04em', fontWeight: 700 }}>
          <span style={{ width: 20, height: 20, borderRadius: 999, background: '#5ACDFF', display: 'flex' }} />
          Chainfren
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 920 }}>
          <p style={{ fontSize: 28, margin: 0, color: '#40607C', letterSpacing: '0.02em' }}>PUBLIC EDITION · 2026.1</p>
          <h1 style={{ fontSize: 86, lineHeight: 1, letterSpacing: '-0.075em', margin: '18px 0 28px' }}>The Chainfren thesis</h1>
          <p style={{ fontSize: 34, lineHeight: 1.2, margin: 0, maxWidth: 840 }}>African creators have already won the attention. The next fight is ownership.</p>
        </div>
        <div style={{ display: 'flex', width: '100%', height: 12, background: 'linear-gradient(90deg, #5ACDFF 0%, #CBF0B8 100%)' }} />
      </div>
    ),
    size,
  )
}
