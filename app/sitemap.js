import { client } from './contentful/contentful'
import { PRODUCTS, SOLUTION_PERSONAS } from './config/stack'
import { SITE } from './config/siteSchema'

// Dynamic sitemap. Next serves this at /sitemap.xml.
//
// `priority` and `changeFrequency` are hints, not instructions — Google has
// said it largely ignores them. They are set anyway because Bing and several
// AI crawlers still read them, and because they cost nothing. `lastModified`
// is the field that actually earns recrawls, so blog entries carry their real
// Contentful update timestamp rather than a build-time now().

export const revalidate = 3600

function url(path, { priority = 0.7, changeFrequency = 'monthly', lastModified = new Date() } = {}) {
  return { url: `${SITE.url}${path}`, lastModified, changeFrequency, priority }
}

export default async function sitemap() {
  const posts = await client
    .getEntries({ content_type: 'blog', select: 'fields.slug,sys.updatedAt' })
    .then((r) => r.items)
    .catch(() => [])

  const blogEntries = posts
    .filter((p) => p?.fields?.slug)
    .map((p) =>
      url(`/blog/${p.fields.slug}`, {
        priority: 0.7,
        changeFrequency: 'yearly',
        lastModified: p.sys?.updatedAt ? new Date(p.sys.updatedAt) : new Date(),
      }),
    )

  // Product routes are generated from the same config the nav and pages read,
  // so a new Product can never ship without appearing in the sitemap.
  const productEntries = PRODUCTS.flatMap((p) => [
    url(p.url, { priority: 0.9, changeFrequency: 'weekly' }),
    ...(p.children || []).map((c) => url(c.url, { priority: 0.7, changeFrequency: 'monthly' })),
  ])

  const personaEntries = SOLUTION_PERSONAS.map((p) => url(p.href, { priority: 0.8, changeFrequency: 'monthly' }))

  return [
    url('/', { priority: 1.0, changeFrequency: 'weekly' }),
    url('/products', { priority: 0.9, changeFrequency: 'weekly' }),
    ...productEntries,
    ...personaEntries,
    url('/about', { priority: 0.9, changeFrequency: 'monthly' }),
    url('/solutions', { priority: 0.8, changeFrequency: 'monthly' }),
    url('/creator-network', { priority: 0.8, changeFrequency: 'monthly' }),
    url('/creator-network/apply', { priority: 0.6, changeFrequency: 'monthly' }),
    url('/sabi', { priority: 0.7, changeFrequency: 'weekly' }),
    url('/blog', { priority: 0.8, changeFrequency: 'weekly' }),
    ...blogEntries,
    url('/contact', { priority: 0.7, changeFrequency: 'yearly' }),
    url('/products/media-launchpad/demo', { priority: 0.6, changeFrequency: 'monthly' }),
  ]
}
