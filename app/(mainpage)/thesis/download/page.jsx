import { THESIS_CONTENT_HASH } from '@/content/chainfren-thesis/generated-content-hash.mjs'

export const metadata = { title: 'Download the Chainfren Thesis' }

export default function ThesisDownloadPage() {
  return <main><h1>Download the Chainfren Thesis</h1><p>A print-ready, A4 edition of the full public thesis.</p><a href="/downloads/chainfren-thesis-2026.1.pdf" download="chainfren-thesis-2026.1.pdf">Download PDF</a><small>Source SHA-256: {THESIS_CONTENT_HASH}</small></main>
}
