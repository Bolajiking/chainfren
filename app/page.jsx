import SiteHeader, { DEFAULT_LINKS, DEFAULT_CTA } from "./components/SiteHeader"
import MainGrid from "./components/MainGrid"
import { PRODUCTS } from "./config/stack"
import { SOLUTION_CONTENT } from "./config/solutionsContent"
import { SITE, ID, SchemaScript } from "./config/siteSchema"

// The homepage is the entity anchor: it is where an engine resolves "what is
// Chainfren" before it reads anything else. Two nodes beyond the sitewide
// Organization/WebSite graph emitted in the root layout:
//
//   WebPage   — names this URL as the primary description of the company.
//   ItemList  — the four Products in order, each with its canonical
//               definitional sentence. This is what lets an answer engine reply
//               to "what does Chainfren offer" with the real list rather than
//               whatever it manages to scrape out of the visual grid.
const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE.url}/#webpage`,
    url: SITE.url,
    name: 'Chainfren — Ownership Infrastructure for the African Creator Economy',
    description: SITE.description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.org },
    primaryImageOfPage: { '@type': 'ImageObject', url: SITE.logo },
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE.url}/#products`,
    name: 'Chainfren products',
    description: 'The four products Chainfren ships, each sold separately to a different buyer.',
    numberOfItems: PRODUCTS.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: PRODUCTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        '@id': `${SITE.url}${p.url}#service`,
        name: `Chainfren ${p.name}`,
        url: `${SITE.url}${p.url}`,
        description: SOLUTION_CONTENT[p.key]?.definitional,
        provider: { '@id': ID.org },
      },
    })),
  },
]

export default function Home() {
  return (
    <div className="font-fontspring">
      <SchemaScript schema={homeSchema} />
      <SiteHeader links={DEFAULT_LINKS} cta={DEFAULT_CTA} />
      <MainGrid />
    </div>
  )
}
