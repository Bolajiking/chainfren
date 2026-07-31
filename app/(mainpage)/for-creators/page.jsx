import PersonaLanding from '../../components/PersonaLanding'
import { PERSONA_CONTENT } from '../../config/personaContent'
import { SITE, ID, SchemaScript, breadcrumbSchema } from '../../config/siteSchema'
import { personaByKey, personaStack } from '../../config/stack'

const c = PERSONA_CONTENT.creators
export const metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: `${SITE.url}/for-creators` },
  openGraph: { title: `${c.meta.title} | Chainfren`, description: c.meta.description, type: 'website', url: `${SITE.url}/for-creators`, siteName: 'Chainfren' },
  twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description },
}

// The persona pages carry the page-level FAQ and the curated product stack.
// Both were rendered-only; as data they make the page answerable for
// "what does Chainfren offer creators".
const stack = personaStack(personaByKey('creators'))
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE.url}/for-creators#webpage`,
    url: `${SITE.url}/for-creators`,
    name: c.meta.title,
    description: c.meta.description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.org },
    inLanguage: 'en',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: stack.length,
      itemListElement: stack.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          '@id': `${SITE.url}${p.url}#service`,
          name: `Chainfren ${p.name}`,
          url: `${SITE.url}${p.url}`,
          provider: { '@id': ID.org },
        },
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE.url}/for-creators#faq`,
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'For Creators', path: '/for-creators' },
  ]),
]

export default function ForCreatorsPage() {
  return (
    <>
      <SchemaScript schema={schema} />
      <PersonaLanding personaKey="creators" />
    </>
  )
}
