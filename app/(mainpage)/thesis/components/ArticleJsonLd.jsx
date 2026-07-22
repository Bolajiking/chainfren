import { THESIS_CONTENT_VERSION } from '@/content/chainfren-thesis/public-config.mjs'
import { THESIS_CONTENT_HASH } from '@/content/chainfren-thesis/generated-content-hash.mjs'

const PUBLISHER_URL = 'https://www.chainfren.com'

export default function ArticleJsonLd({ canonicalUrl, headline, description, dateModified }) {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    headline,
    description,
    dateModified,
    version: THESIS_CONTENT_VERSION,
    identifier: THESIS_CONTENT_HASH,
    publisher: {
      '@type': 'Organization',
      name: 'Chainfren',
      url: PUBLISHER_URL,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
}
