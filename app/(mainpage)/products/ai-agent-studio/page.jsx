import AiAgentStudio from '../../../components/AiAgentStudio'
import { FAQS, TIERS } from '../../../config/aiAgentStudio'
import { SOLUTION_CONTENT } from '../../../config/solutionsContent'

const BASE = 'https://chainfren.com'
const c = SOLUTION_CONTENT['ai-agents']

export const metadata = {
  title: { absolute: `${c.meta.title} | Chainfren` },
  description: c.meta.description,
  alternates: { canonical: `${BASE}/products/ai-agent-studio` },
  openGraph: {
    title: `${c.meta.title} | Chainfren`,
    description: c.meta.description,
    type: 'website',
    url: `${BASE}/products/ai-agent-studio`,
  },
  twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description },
}

function JsonLd() {
  const service = {
    '@context': 'https://schema.org', '@type': 'Service', name: 'Chainfren AI Agent Studio',
    serviceType: c.serviceType, description: c.definitional,
    provider: { '@type': 'Organization', name: 'Chainfren', url: BASE },
    areaServed: ['Africa', 'Global'],
    audience: { '@type': 'Audience', audienceType: 'Creators, brands, and consumer & FMCG companies scaling output without scaling headcount' },
    url: `${BASE}/products/ai-agent-studio`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'AI Agent Studio tiers',
      itemListElement: TIERS.map((t) => ({
        '@type': 'Offer', name: t.name, category: t.kind, description: t.line,
        itemOffered: { '@type': 'Service', name: `AI Agent Studio — ${t.name}`, provider: { '@type': 'Organization', name: 'Chainfren' } },
      })),
    },
  }
  const faq = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Products', item: `${BASE}/products` },
      { '@type': 'ListItem', position: 2, name: 'AI Agent Studio', item: `${BASE}/products/ai-agent-studio` },
    ],
  }
  return [service, faq, breadcrumb].map((b, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />)
}

export default function Page() {
  return (
    <>
      <JsonLd />
      <AiAgentStudio />
    </>
  )
}
