import './globals.css'
import ContextProvider from './components/utils/Provider'
import StyledJsxRegistry from './components/utils/StyledJsxRegistry'
import { THESIS_CONTENT_HASH } from '@/content/chainfren-thesis/generated-content-hash.mjs'
import { SITE, siteGraph, SchemaScript } from './config/siteSchema'

const TITLE = 'Chainfren — Ownership Infrastructure for the African Creator Economy'
const DESC =
  'Chainfren builds ownership infrastructure for the African creator economy: own your audience, your community, and your revenue instead of renting them from platforms. Four products — Media Launchpad, Creator Growth OS, Community Engine, AI Agent Studio — from Lagos.'

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: '%s | Chainfren',
  },
  description: DESC,
  applicationName: 'Chainfren',
  // Canonical fallback. Every route that can be reached by more than one URL
  // overrides this with its own; without a default, a stray query string or a
  // duplicate path splits ranking signal across two addresses.
  alternates: { canonical: '/' },
  authors: [{ name: 'Chainfren', url: SITE.url }],
  creator: 'Chainfren',
  publisher: 'Chainfren',
  category: 'technology',
  // Explicitly invite full snippets and large image previews. Without this,
  // Google caps text snippets conservatively — and the snippet IS the answer
  // in an AI Overview, so a truncated one costs the citation.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    siteName: 'Chainfren',
    locale: 'en_US',
    type: 'website',
    url: SITE.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
  },
  other: { 'thesis-content-sha256': THESIS_CONTENT_HASH },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Self-hosted Inter Display upright, preloaded so the font ships in
            the same critical request as the HTML, and the @font-face uses
            font-display: block to suppress FOUT entirely. No external font
            CDN, no metric swap on first load.

            The italic face is preloaded by ItalicFontPreload, which the
            surfaces that actually render Inter italic include. Routes that
            use Georgia for italic accents no longer download it. */}
        <link
          rel="preload"
          href="/fonts/InterVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* The sitewide entity graph — Organization + WebSite, emitted on every
            route so any page an engine lands on can resolve the brand. Every
            other schema on the site references these by @id rather than
            redeclaring the company. */}
        <SchemaScript schema={siteGraph} />
      </head>
      <body className="antialiased" style={{ fontFamily: '"Inter Display", "Inter", sans-serif' }}>
        <StyledJsxRegistry>
          <ContextProvider>
            {children}
          </ContextProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  )
}
