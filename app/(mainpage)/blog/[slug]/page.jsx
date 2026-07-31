import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader, { DEFAULT_CTA } from '../../../components/SiteHeader'
import { client } from '@/app/contentful/contentful'
import ContentfulImage from '@/app/components/utils/ContentfulImage'
import Richtext from '@/app/components/utils/Richtext'
import ReadMoreSection from './ReadMoreSection'
import { SITE, ID, SchemaScript, breadcrumbSchema } from '@/app/config/siteSchema'

const NAVY = '#08153C'
const MINT = '#CBF0B8'

function countWords(node) {
  if (!node) return 0
  if (typeof node === 'string') return node.split(/\s+/).filter(Boolean).length
  if (Array.isArray(node)) return node.reduce((s, n) => s + countWords(n), 0)
  if (typeof node === 'object') {
    if (node.value) return countWords(node.value)
    if (node.content) return countWords(node.content)
  }
  return 0
}

function formatDate(iso) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  } catch {
    return null
  }
}

const Page = async ({ params }) => {
  const { slug } = params

  const blogPost = await client
    .getEntries({ content_type: 'blog', 'fields.slug[match]': slug })
    .then((res) => res.items[0])
    .catch(() => null)

  // A missing slug must return a real 404, not a styled "not found" page on a
  // 200. A soft 404 gets indexed as thin content and dilutes the archive; it
  // also teaches crawlers that every /blog/<anything> URL resolves, which
  // invites unbounded crawl of URLs that will never exist.
  if (!blogPost) notFound()

  const allPosts = await client.getEntries({ content_type: 'blog' }).catch(() => ({ items: [] }))
  const otherPosts = allPosts.items.filter((p) => p.fields.slug !== slug).slice(0, 3)

  const { title, content, coverImage } = blogPost.fields
  const words = countWords(content)
  const readMin = Math.max(1, Math.round(words / 220))
  const publishedAt = formatDate(blogPost.sys?.createdAt)

  // Article schema. `wordCount` and `timeRequired` are the fields that let an
  // engine judge depth before fetching; `isPartOf` and `publisher` bind the
  // post to the sitewide entity by @id rather than repeating the company.
  const url = `${SITE.url}/blog/${slug}`
  const cover = coverImage?.fields?.file?.url ? `https:${coverImage.fields.file.url}` : undefined
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description: excerpt(content) || undefined,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: blogPost.sys?.createdAt,
    dateModified: blogPost.sys?.updatedAt || blogPost.sys?.createdAt,
    author: { '@id': ID.org },
    publisher: { '@id': ID.org },
    isPartOf: { '@id': ID.website },
    inLanguage: 'en',
    wordCount: words || undefined,
    timeRequired: `PT${readMin}M`,
    articleSection: 'The Playbook',
    ...(cover ? { image: { '@type': 'ImageObject', url: cover } } : {}),
  }

  return (
    <div className="cf-article-root min-h-screen bg-white">
      <SchemaScript schema={[articleSchema, breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'The Playbook', path: '/blog' },
        { name: title, path: `/blog/${slug}` },
      ])]} />
      <SiteHeader badgeLabel="Sabi" accent={MINT} cta={DEFAULT_CTA} />

      <article className="cf-article">
        {/* Back link */}
        <div className="cf-article__back">
          <Link href="/blog" className="cf-article__back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>All Articles</span>
          </Link>
        </div>

        {/* Header */}
        <header className="cf-article__header">
          <span className="cf-article__chip">Sabi · The Playbook</span>
          <h1 className="cf-article__title">{title}</h1>
          <div className="cf-article__meta">
            {publishedAt && <span>{publishedAt}</span>}
            {publishedAt && <span className="cf-article__dot" aria-hidden="true">·</span>}
            <span>{readMin} min read</span>
          </div>
        </header>

        {/* Cover */}
        {coverImage && (
          <figure className="cf-article__cover">
            <ContentfulImage
              alt={`Cover image for ${title}`}
              src={coverImage.fields.file.url}
              width={coverImage.fields.file.details.image.width}
              height={coverImage.fields.file.details.image.height}
            />
          </figure>
        )}

        {/* Body */}
        <div className="cf-article__body">
          <Richtext content={content} />
        </div>

        {/* Footer */}
        <footer className="cf-article__footer">
          <Link href="/blog" className="cf-article__back-link cf-article__back-link--solid">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to all articles</span>
          </Link>
        </footer>

        {otherPosts.length > 0 && <ReadMoreSection posts={otherPosts} />}
      </article>
    </div>
  )
}

export default Page

// ── SEO / GEO ───────────────────────────────────────────────────────────
// Articles carried no metadata at all before this: no title, no description,
// no canonical, no Article schema. Every post inherited the homepage title, so
// the whole archive competed with itself for one identity and none of it was
// eligible for an article-rich result or a citation.

function plainText(node, out = []) {
  if (!node || out.length > 60) return out
  if (typeof node === 'string') { out.push(node); return out }
  if (Array.isArray(node)) { node.forEach((n) => plainText(n, out)); return out }
  if (typeof node === 'object') {
    if (typeof node.value === 'string') out.push(node.value)
    if (node.content) plainText(node.content, out)
  }
  return out
}

// A real excerpt from the body, trimmed on a word boundary. Descriptions cut
// mid-word read as broken and get rewritten by Google — which forfeits control
// of the snippet, and the snippet is what an answer engine quotes.
function excerpt(content, limit = 158) {
  const text = plainText(content).join(' ').replace(/\s+/g, ' ').trim()
  if (!text) return null
  if (text.length <= limit) return text
  const cut = text.slice(0, limit)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`
}

async function getPost(slug) {
  return client
    .getEntries({ content_type: 'blog', 'fields.slug[match]': slug })
    .then((res) => res.items[0])
    .catch(() => null)
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Article not found', robots: { index: false, follow: true } }

  const { title, content, coverImage } = post.fields
  const description = excerpt(content) || SITE.description
  const url = `${SITE.url}/blog/${params.slug}`
  const cover = coverImage?.fields?.file?.url ? `https:${coverImage.fields.file.url}` : undefined

  return {
    title: { absolute: `${title} | Chainfren` },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'Chainfren',
      publishedTime: post.sys?.createdAt,
      modifiedTime: post.sys?.updatedAt,
      authors: ['Chainfren'],
      ...(cover ? { images: [{ url: cover, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(cover ? { images: [cover] } : {}),
    },
  }
}

export async function generateStaticParams() {
  const queryOptions = { content_type: 'blog', select: 'fields.slug' }
  const articles = await client.getEntries(queryOptions)
  return articles.items.map((article) => ({ slug: article.fields.slug }))
}
