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

// AboutPage is the node search engines should treat as the authoritative
// description of the company, so it carries `mainEntity` pointing at the
// sitewide Organization rather than describing the company a second time.
// The FAQ is emitted as data because these are the exact questions an
// evaluator or an answer engine asks about a company they have not met.
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
    ],
  },
  // The founder as a resolvable entity rather than a name in a paragraph.
  // `founder` on the Organization is what lets a knowledge graph connect the
  // person to the company, which is the difference between "a company in Lagos"
  // and "the company Bolaji Majiyagbe founded" when someone searches either.
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/about#founder`,
    name: ABOUT.founder.name,
    jobTitle: 'Founder',
    worksFor: { '@id': ID.org },
    address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
    knowsAbout: ['creator economy', 'audience ownership', 'African creator economy', 'stablecoin settlement'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ID.org,
    founder: { '@id': `${SITE.url}/about#founder` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE.url}/about#faq`,
    mainEntity: ABOUT.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
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
