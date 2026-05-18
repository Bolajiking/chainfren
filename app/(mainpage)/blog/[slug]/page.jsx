import React from 'react'
import Link from 'next/link'
import SiteHeader, { DEFAULT_CTA } from '../../../components/SiteHeader'
import { client } from '@/app/contentful/contentful'
import ContentfulImage from '@/app/components/utils/ContentfulImage'
import Richtext from '@/app/components/utils/Richtext'
import ReadMoreSection from './ReadMoreSection'

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

  if (!blogPost) {
    return (
      <div className="cf-article-root min-h-screen bg-white">
        <SiteHeader badgeLabel="Sabi" accent={MINT} cta={DEFAULT_CTA} />
        <div className="cf-article">
          <span className="cf-article__chip">Sabi · The Playbook</span>
          <h1 className="cf-article__title" style={{ marginTop: 18 }}>Article not found.</h1>
          <p style={{ color: '#4A5568', marginTop: 18 }}>
            We couldn&apos;t find this story. It may have moved — try the index for the latest pieces.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link href="/blog" className="cf-article__back-link cf-article__back-link--solid">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to all articles</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const allPosts = await client.getEntries({ content_type: 'blog' }).catch(() => ({ items: [] }))
  const otherPosts = allPosts.items.filter((p) => p.fields.slug !== slug).slice(0, 3)

  const { title, content, coverImage } = blogPost.fields
  const words = countWords(content)
  const readMin = Math.max(1, Math.round(words / 220))
  const publishedAt = formatDate(blogPost.sys?.createdAt)

  return (
    <div className="cf-article-root min-h-screen bg-white">
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

export async function generateStaticParams() {
  const queryOptions = { content_type: 'blog', select: 'fields.slug' }
  const articles = await client.getEntries(queryOptions)
  return articles.items.map((article) => ({ slug: article.fields.slug }))
}
