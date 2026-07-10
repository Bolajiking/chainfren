import { solutionByKey } from './stack'
import { SOLUTION_CONTENT } from './solutionsContent'

const BASE = 'https://chainfren.com'

// Build Service + FAQPage + BreadcrumbList JSON-LD for a solution page.
// Consistent entity naming ("Chainfren <Solution>") so search and LLMs bind
// each solution to the brand. (Solutions Pages Spec §2.5)
export function solutionJsonLd(solutionKey) {
  const sol = solutionByKey(solutionKey)
  const content = SOLUTION_CONTENT[solutionKey]
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Chainfren ${sol.name}`,
    serviceType: content.serviceType,
    description: content.definitional,
    provider: { '@type': 'Organization', name: 'Chainfren', url: BASE },
    areaServed: ['Africa', 'Global'],
    audience: { '@type': 'Audience', audienceType: sol.audience },
    url: BASE + sol.url,
  }
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Products', item: `${BASE}/products` },
      { '@type': 'ListItem', position: 2, name: sol.name, item: BASE + sol.url },
    ],
  }
  return [service, faq, breadcrumb]
}

export function JsonLd({ blocks }) {
  return blocks.map((b, i) => (
    <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />
  ))
}
