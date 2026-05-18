import React from 'react'
import Link from 'next/link'
import SiteHeader, { DEFAULT_CTA } from '../../components/SiteHeader'
import { client } from '@/app/contentful/contentful'

const MINT = '#CBF0B8'

function formatDate(iso) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return null
  }
}

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

const Page = async () => {
  const blogEntries = await client.getEntries({ content_type: 'blog' }).catch(() => ({ items: [] }))

  const placeholderArticles = Array.from({ length: 6 }).map((_, i) => ({
    title: `1000 True Fans — How creators and brands can use web3 for growth`,
    excerpt: 'A field guide to owned audiences, direct payments, and culture-as-infrastructure for the next wave of African creators.',
    slug: `article-${i + 1}`,
    date: null,
    readMin: 6,
  }))

  const articles = blogEntries.items.length
    ? blogEntries.items.map((item) => ({
        title: item.fields.title || 'Untitled',
        slug: item.fields.slug,
        excerpt: item.fields.excerpt || item.fields.subtitle || '',
        date: formatDate(item.sys?.createdAt),
        readMin: Math.max(1, Math.round(countWords(item.fields.content) / 220)),
      }))
    : placeholderArticles

  const [featured, ...rest] = articles

  return (
    <div className="cf-blog-root min-h-screen bg-white">
      <SiteHeader badgeLabel="Sabi" accent={MINT} cta={DEFAULT_CTA} />

      <div className="cf-blog">
        {/* Hero */}
        <header className="cf-blog__hero">
          <div className="cf-blog__eyebrow">
            <span className="cf-blog__eyebrow-dot" aria-hidden="true" />
            <span>Sabi</span>
            <span className="cf-blog__eyebrow-sep" aria-hidden="true">/</span>
            <span>The Playbook</span>
          </div>
          <h1 className="cf-blog__title">
            Notes from Africa&apos;s onchain{' '}
            <em>broadcasting network.</em>
          </h1>
          <p className="cf-blog__lede">
            Field notes, strategy pieces, and culture coverage from the Chainfren team — built for creators and brands rewriting the playbook from Lagos out.
          </p>
        </header>

        {/* Featured */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="cf-blog__featured">
            <div className="cf-blog__featured-meta">
              <span className="cf-blog__index">01</span>
              <span className="cf-blog__featured-label">Featured</span>
            </div>
            <h2 className="cf-blog__featured-title">{featured.title}</h2>
            {featured.excerpt && (
              <p className="cf-blog__featured-excerpt">{featured.excerpt}</p>
            )}
            <div className="cf-blog__row">
              {featured.date && <span>{featured.date}</span>}
              {featured.date && <span className="cf-blog__dot" aria-hidden="true">·</span>}
              <span>{featured.readMin} min read</span>
              <span className="cf-blog__cta">
                Read article
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>
        )}

        {/* Rest of the list */}
        {rest.length > 0 && (
          <section className="cf-blog__list" aria-label="All articles">
            <header className="cf-blog__list-head">
              <h3>All articles</h3>
              <span>{String(rest.length + 1).padStart(2, '0')} pieces</span>
            </header>
            <ul>
              {rest.map((article, i) => (
                <li key={article.slug} className="cf-blog__item">
                  <Link href={`/blog/${article.slug}`} className="cf-blog__item-link">
                    <span className="cf-blog__index">{String(i + 2).padStart(2, '0')}</span>
                    <div className="cf-blog__item-body">
                      <h4 className="cf-blog__item-title">{article.title}</h4>
                      {article.excerpt && (
                        <p className="cf-blog__item-excerpt">{article.excerpt}</p>
                      )}
                      <div className="cf-blog__row cf-blog__row--mini">
                        {article.date && <span>{article.date}</span>}
                        {article.date && <span className="cf-blog__dot" aria-hidden="true">·</span>}
                        <span>{article.readMin} min read</span>
                      </div>
                    </div>
                    <span className="cf-blog__item-arrow" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}

export default Page
