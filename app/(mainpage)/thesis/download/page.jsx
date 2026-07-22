import Link from 'next/link'
import { THESIS_CONTENT_HASH } from '@/lib/thesis/content-hash.mjs'

export const metadata = { title: 'Download the Chainfren Thesis' }

export default function ThesisDownloadPage() {
  return <main><h1>Download the Chainfren Thesis</h1><p>A print-ready, A4 edition of the full public thesis.</p><a href="/artifacts/Chainfren-Thesis.pdf" download="Chainfren-Thesis.pdf">Download PDF</a><p><Link href="/thesis/print">Open print edition</Link></p><small>Source SHA-256: {THESIS_CONTENT_HASH}</small></main>
}
