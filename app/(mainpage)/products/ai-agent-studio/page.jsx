import AiAgentStudio from '../../../components/AiAgentStudio'
import { TIERS } from '../../../config/aiAgentStudio'
import { solutionJsonLd, solutionMetadata, JsonLd } from '../../../config/solutionSchema'

export const metadata = solutionMetadata('ai-agents')

// The only Product with a published offer ladder, so it carries an offer
// catalogue on its Service node. Built from the same TIERS the page renders.
const OFFER_CATALOG = {
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Agent Studio tiers',
    itemListElement: TIERS.map((t) => ({
      '@type': 'Offer',
      name: t.name,
      category: t.kind,
      description: t.line,
      itemOffered: { '@type': 'Service', name: `AI Agent Studio — ${t.name}`, provider: { '@type': 'Organization', name: 'Chainfren' } },
    })),
  },
}

export default function Page() {
  return (
    <>
      <JsonLd blocks={solutionJsonLd('ai-agents', { service: OFFER_CATALOG })} />
      <AiAgentStudio />
    </>
  )
}
