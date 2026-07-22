import { THESIS_CONTENT_HASH } from '@/content/chainfren-thesis/generated-content-hash.mjs'

const title = 'Download the Chainfren thesis'
const description = 'Download the print-ready public edition of the Chainfren thesis.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/thesis/download' },
  openGraph: { title, description, url: '/thesis/download', type: 'website', images: ['/thesis/opengraph-image'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/thesis/opengraph-image'] },
}

export default function ThesisDownloadPage() {
  return <main><h1>Download the Chainfren Thesis</h1><p>A print-ready, A4 edition of the full public thesis.</p><a href="/downloads/chainfren-thesis-2026.1.pdf" download="chainfren-thesis-2026.1.pdf">Download PDF</a><small>Source SHA-256: {THESIS_CONTENT_HASH}</small></main>
}
