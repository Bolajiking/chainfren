import AboutPage from '../../components/AboutPage'
import { ABOUT } from '../../config/aboutContent'
import { SITE, ID, SchemaScript, breadcrumbSchema } from '../../config/siteSchema'

export const metadata = {
  title: { absolute: `${ABOUT.meta.title} | Chainfren` },
  description: ABOUT.meta.description,
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: ABOUT.meta.title,
    description: ABOUT.meta.description,
    url: `${SITE.url}/about`,
    type: 'website',
    siteName: 'Chainfren',
  },
  twitter: {
    card: 'summary_large_image',
    title: ABOUT.meta.title,
    description: ABOUT.meta.description,
  },
}

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE.url}/about#webpage`,
    url: `${SITE.url}/about`,
    name: ABOUT.meta.title,
    description: ABOUT.meta.description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.org },
    mainEntity: { '@id': ID.org },
    inLanguage: 'en',
    significantLink: [
      `${SITE.url}/products`,
      `${SITE.url}/for-creators`,
      `${SITE.url}/for-brands`,
      `${SITE.url}/creator-network`,
      `${SITE.url}/sabi`,
      `${SITE.url}/contact`,
    ],
  },
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]),
]

export default function Page() {
  return (
    <>
      <SchemaScript schema={schema} />
      <AboutPage />
    </>
  )
}
