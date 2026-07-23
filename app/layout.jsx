import './globals.css'
import ContextProvider from './components/utils/Provider'
import StyledJsxRegistry from './components/utils/StyledJsxRegistry'

export const metadata = {
  metadataBase: new URL('https://www.chainfren.com'),
  title: {
    default: 'Chainfren — Ownership Infrastructure for the African Creator Economy',
    template: '%s | Chainfren',
  },
  description: 'Owned audiences. Direct payments. Real ownership. Chainfren is the ownership infrastructure for Africa\'s creator economy — agency, products, and the Sabi broadcasting network, from Lagos.',
  keywords: ['African creators', 'creator economy Africa', 'Web3 Africa', 'onchain creator economy', 'Chainfren', 'Sabi', 'TiVi streaming', 'Lagos Nigeria', 'creator tools'],
  openGraph: {
    title: 'Chainfren — Ownership Infrastructure for the African Creator Economy',
    description: 'Owned audiences. Direct payments. Real ownership. Chainfren is the ownership infrastructure for Africa\'s creator economy — agency, products, and the Sabi broadcasting network, from Lagos.',
    siteName: 'Chainfren',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chainfren — Ownership Infrastructure for the African Creator Economy',
    description: 'Owned audiences. Direct payments. Real ownership. Chainfren is the ownership infrastructure for Africa\'s creator economy — agency, products, and the Sabi broadcasting network, from Lagos.',
  },
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
