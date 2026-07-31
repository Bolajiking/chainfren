import { solutionByKey } from './stack'
import { SOLUTION_CONTENT } from './solutionsContent'
import { SITE, ID } from './siteSchema'

// Was 'https://chainfren.com' while every other surface used the www host — two
// different absolute URLs for the same entity, which is how a knowledge graph
// ends up with two half-confident records instead of one. Single source now.
const BASE = SITE.url

// Build Service + FAQPage + BreadcrumbList JSON-LD for a Product page.
// Consistent entity naming ("Chainfren <Product>") so search and LLMs bind each
// Product to the brand.
//
// One source of truth: the FAQ emitted here is the same array the page renders
// (SOLUTION_CONTENT[key].faq), so the structured data can never drift from what
// a visitor actually sees. Media Launchpad previously shipped a 4-item FAQ in
// its JSON-LD against a 7-item FAQ on the page — that is what this prevents.
//
// `opts` carries the per-Product extras that don't generalize:
//   service  → merged into the Service node (e.g. hasOfferCatalog, audience)
//   extra    → additional top-level nodes (e.g. SoftwareApplication for TiVi)
export function solutionJsonLd(solutionKey, opts = {}) {
  const sol = solutionByKey(solutionKey)
  const content = SOLUTION_CONTENT[solutionKey]
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE}${sol.url}#service`,
    name: `Chainfren ${sol.name}`,
    alternateName: sol.name,
    serviceType: content.serviceType,
    description: content.definitional,
    // References the sitewide Organization by @id instead of declaring another
    // anonymous one — one entity, many references.
    provider: { '@id': ID.org },
    areaServed: [
      { '@type': 'Place', name: 'Africa' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    audience: { '@type': 'Audience', audienceType: sol.audience },
    url: BASE + sol.url,
    isPartOf: { '@id': ID.website },
    ...(opts.service || {}),
  }
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE}${sol.url}#faq`,
    mainEntity: content.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  // Three levels, starting at Home — a breadcrumb that starts mid-tree tells an
  // engine the page is a root when it isn't.
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE}/products` },
      { '@type': 'ListItem', position: 3, name: sol.name, item: BASE + sol.url },
    ],
  }
  return [service, faq, breadcrumb, ...(opts.extra || [])]
}

// ─────────────────────────────────────────────────────────────────────────
// Vertical landers (/products/media-launchpad/{churches,music,…}).
//
// These are the site's clearest long-tail intent pages — "streaming platform
// for churches" is a real query with real volume and almost no ownership-framed
// answer behind it. They shipped with a title and nothing else: no canonical,
// no schema, no breadcrumb, so they read to a crawler as orphan pages rather
// than as children of Media Launchpad.
// ─────────────────────────────────────────────────────────────────────────
export function verticalJsonLd({ slug, name, description }) {
  const url = `${BASE}/products/media-launchpad/${slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `Chainfren Media Launchpad — ${name}`,
      serviceType: `Owned streaming channel for ${name.toLowerCase()}`,
      description,
      provider: { '@id': ID.org },
      areaServed: [
        { '@type': 'Place', name: 'Africa' },
        { '@type': 'Place', name: 'Worldwide' },
      ],
      audience: { '@type': 'Audience', audienceType: name },
      isPartOf: { '@id': `${BASE}/products/media-launchpad#service` },
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE}/products` },
        { '@type': 'ListItem', position: 3, name: 'Media Launchpad', item: `${BASE}/products/media-launchpad` },
        { '@type': 'ListItem', position: 4, name, item: url },
      ],
    },
  ]
}

export function verticalMetadata({ slug, title, description }) {
  const url = `${BASE}/products/media-launchpad/${slug}`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', siteName: 'Chainfren' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

// Standard <head> metadata for a Product route, from the same config the page
// renders — so title/description can't drift from the page either.
export function solutionMetadata(solutionKey) {
  const sol = solutionByKey(solutionKey)
  const { meta } = SOLUTION_CONTENT[solutionKey]
  const url = BASE + sol.url
  return {
    title: { absolute: `${meta.title} | Chainfren` },
    description: meta.description,
    alternates: { canonical: url },
    openGraph: { title: `${meta.title} | Chainfren`, description: meta.description, type: 'website', url },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
  }
}

export function JsonLd({ blocks }) {
  return blocks.map((b, i) => (
    <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />
  ))
}
