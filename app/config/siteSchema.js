// ─────────────────────────────────────────────────────────────────────────
// The sitewide entity graph — Organization · WebSite · the canonical @ids.
//
// WHY THIS FILE EXISTS
// Search engines and LLMs resolve a brand into a single entity, then attach
// everything else to it. Before this file, every page declared its own
// anonymous `{ '@type': 'Organization', name: 'Chainfren' }` — five separate
// unlinked mentions rather than one entity with five references. This gives
// Chainfren one stable @id that every Service, Article, and Breadcrumb points
// back to, which is what lets an engine say "these pages are all the same
// company" with confidence rather than inference.
//
// The graph is emitted once, in the root layout, so it is present on every
// route including ones that ship no other structured data.
// ─────────────────────────────────────────────────────────────────────────

export const SITE = {
  url: 'https://www.chainfren.com',
  name: 'Chainfren',
  legalName: 'Chainfren',
  email: 'hello@chainfren.com',
  locality: 'Lagos',
  country: 'NG',
  founded: '2025',
  logo: 'https://www.chainfren.com/chainfrenlogo.png',
  // One sentence, quotable verbatim. This is the string an answer engine is
  // most likely to lift when asked "what is Chainfren?" — it leads with the
  // category, names the audience, and states the differentiator.
  description:
    'Chainfren is an ownership infrastructure company for the African creator economy. It builds products and done-with-you solutions that let creators, brands, and communities own their audience, their community, and their revenue — instead of renting them from platforms.',
  sameAs: [
    'https://x.com/chainfren',
    'https://www.linkedin.com/company/chainfren',
  ],
}

// Stable identifiers. Referenced, never redefined — that is the whole point.
export const ID = {
  org: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
}

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ID.org,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: { '@type': 'ImageObject', url: SITE.logo },
  image: SITE.logo,
  description: SITE.description,
  email: SITE.email,
  foundingDate: SITE.founded,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.locality,
    addressCountry: SITE.country,
  },
  areaServed: [
    { '@type': 'Place', name: 'Africa' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  knowsAbout: [
    'creator economy',
    'audience ownership',
    'direct-to-fan monetization',
    'stablecoin settlement',
    'community and loyalty programs',
    'live streaming infrastructure',
    'AI agents for marketing',
    'African creator economy',
  ],
  sameAs: SITE.sameAs,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: SITE.email,
    areaServed: ['NG', 'Africa', 'Worldwide'],
    availableLanguage: ['en'],
  },
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': ID.website,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { '@id': ID.org },
  inLanguage: 'en',
}

// One @graph rather than N sibling <script> tags: it lets the nodes reference
// each other by @id, which is how the relationships survive parsing.
export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema],
}

// Renders any set of schema nodes. Kept here so every surface emits JSON-LD
// the same way.
export function SchemaScript({ schema }) {
  const blocks = Array.isArray(schema) ? schema : [schema]
  return blocks.map((b, i) => (
    <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />
  ))
}

// Breadcrumbs: a real trail, ending on the current page. Engines use these for
// SERP breadcrumb display and for understanding site hierarchy.
export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: t.path ? SITE.url + t.path : undefined,
    })),
  }
}
