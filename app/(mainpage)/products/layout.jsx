import { SITE } from '../../config/siteSchema'

// Metadata for the /products overview route. Child product pages export their
// own metadata, which overrides this per-route.
export const metadata = {
  title: { absolute: 'Solutions — Four Ways to Own What You Build | Chainfren' },
  description:
    'Chainfren’s four products: Media Launchpad, Creator Growth OS, Community Engine, and AI Agent Studio — the ways creators and brands own their audience, revenue, and community instead of renting them.',
  alternates: { canonical: `${SITE.url}/products` },
  openGraph: {
    title: 'Chainfren Products — Four Ways to Own What You Build',
    description: 'Media Launchpad, Creator Growth OS, Community Engine, and AI Agent Studio — ownership infrastructure for Africa’s creator economy.',
    url: `${SITE.url}/products`,
    type: 'website',
    siteName: 'Chainfren',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chainfren Products — Four Ways to Own What You Build',
    description: 'Media Launchpad, Creator Growth OS, Community Engine, and AI Agent Studio.',
  },
}

export default function ProductsLayout({ children }) {
  return children
}
