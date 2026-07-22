import { Buffer } from 'node:buffer'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/server'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function GET() {
  const wordmark = await readFile(join(process.cwd(), 'public', 'logodark.svg'), 'utf8')
  const wordmarkDataUrl = `data:image/svg+xml;base64,${Buffer.from(wordmark).toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'flex-start',
          background: '#FFFEF8',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '72px',
          width: '100%',
        }}
      >
        <img alt="Chainfren" height="42" src={wordmarkDataUrl} width="168" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <span style={{ color: '#40607C', fontFamily: 'sans-serif', fontSize: 28, letterSpacing: '2px' }}>PUBLIC EDITION · 2026.1</span>
          <span style={{ color: '#08153C', fontFamily: 'sans-serif', fontSize: 86, fontWeight: 700, letterSpacing: '-4px' }}>The Chainfren thesis</span>
          <span style={{ color: '#08153C', fontFamily: 'sans-serif', fontSize: 34 }}>African creators have already won the attention. The next fight is ownership.</span>
        </div>
        <div style={{ background: 'linear-gradient(90deg, #5ACDFF, #CBF0B8)', height: '12px', width: '100%' }} />
      </div>
    ),
    size,
  )
}
