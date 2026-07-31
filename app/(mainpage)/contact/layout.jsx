import { SITE, ID, SchemaScript } from '../../config/siteSchema'

export const metadata = {
  title: { absolute: 'Contact Chainfren — Ownership Infrastructure in Lagos, Nigeria | Chainfren' },
  description:
    "Talk to Chainfren about Media Launchpad, Creator Growth OS, Community Engine, AI Agent Studio, the Creator Network, or Sabi media. Every engagement opens with a free 30-minute call. Based in Lagos, Nigeria; working worldwide.",
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: 'Contact Chainfren',
    description: 'Tell us what you\u2019re building. Every engagement opens with a free 30-minute call. Lagos, Nigeria \u00b7 worldwide.',
    url: `${SITE.url}/contact`,
    type: 'website',
    siteName: 'Chainfren',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Chainfren',
    description: 'Tell us what you\u2019re building. Free 30-minute call, real human, 24 hours.',
  },
}

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE.url}/contact#webpage`,
    url: `${SITE.url}/contact`,
    name: 'Contact Chainfren',
    description:
      'Talk to Chainfren about products, solutions, the Creator Network, or Sabi media. Every engagement opens with a free 30-minute call.',
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.org },
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE.url}/contact` },
    ],
  },
]

export default function ContactLayout({ children }) {
  return (
    <>
      <SchemaScript schema={schema} />
      {children}
    </>
  )
}
