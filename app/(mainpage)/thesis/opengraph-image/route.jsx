import { Buffer } from 'node:buffer'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'

export async function GET() {
  const wordmark = await readFile(join(process.cwd(), 'public', 'logodark.svg'), 'utf8')
  const wordmarkDataUrl = `data:image/svg+xml;base64,${Buffer.from(wordmark).toString('base64')}`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFFEF8"/>
  <image href="${wordmarkDataUrl}" x="72" y="72" width="168" height="42"/>
  <text x="72" y="330" fill="#40607C" font-family="Arial, sans-serif" font-size="28" letter-spacing="2">PUBLIC EDITION · 2026.1</text>
  <text x="72" y="430" fill="#08153C" font-family="Arial, sans-serif" font-size="86" font-weight="700">The Chainfren thesis</text>
  <text x="72" y="495" fill="#08153C" font-family="Arial, sans-serif" font-size="34">African creators have already won the attention. The next fight is ownership.</text>
  <linearGradient id="thesis-accent" x1="0" x2="1"><stop stop-color="#5ACDFF"/><stop offset="1" stop-color="#CBF0B8"/></linearGradient>
  <rect x="72" y="546" width="1056" height="12" fill="url(#thesis-accent)"/>
</svg>`

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  })
}
