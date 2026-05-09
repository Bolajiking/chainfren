import './globals.css'
import ContextProvider from './components/utils/Provider'

export const metadata = {
  title: {
    default: 'Chainfren — The Growth Engine Behind Africa\'s Creators',
    template: '%s | Chainfren',
  },
  description: 'Chainfren builds the infrastructure giving African creators owned audiences, direct payments, and real ownership. Agency, products, and the Sabi broadcasting network — from Lagos, Nigeria.',
  keywords: ['African creators', 'creator economy Africa', 'Web3 Africa', 'onchain creator economy', 'Chainfren', 'Sabi', 'TiVi streaming', 'Lagos Nigeria', 'creator tools'],
  openGraph: {
    title: 'Chainfren — The Growth Engine Behind Africa\'s Creators',
    description: 'Owned audiences. Direct payments. Real ownership. Infrastructure for Africa\'s creator economy, from Lagos.',
    siteName: 'Chainfren',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chainfren — The Growth Engine Behind Africa\'s Creators',
    description: 'Infrastructure for Africa\'s creator economy. Agency, products, and the Sabi broadcasting network.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="antialiased" style={{ fontFamily: '"Inter Display", "Inter", sans-serif' }}>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
