import { SITE } from './config/siteSchema'

// Next serves this at /robots.txt.
//
// AI CRAWLER POLICY — deliberate, and the opposite of most companies' default.
// Chainfren's content is its marketing, not a moat: there is nothing here that
// loses value by being read, and everything to gain from being the source an
// answer engine cites when someone asks who builds ownership infrastructure for
// African creators. So every known AI crawler is allowed, including the ones
// most sites reflexively block.
//
// The two categories are worth keeping straight, because blocking the wrong one
// is a silent own-goal:
//   · RETRIEVAL bots (OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended)
//     fetch pages to answer a live question and cite the source. Blocking these
//     removes you from AI answers entirely.
//   · TRAINING bots (GPTBot, CCBot, anthropic-ai, Applebot-Extended) read for
//     model training. Allowed here on the same logic — being in the weights is
//     how a brand becomes the default answer without a citation being needed.
//
// To reverse any of this later, move that agent into its own rule with
// `disallow: '/'`. Retired routes are disallowed below so crawl budget is not
// spent re-reading redirects.

const AI_CRAWLERS = [
  // Retrieval / answer engines
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Google-Extended',
  'Bingbot',
  'DuckAssistBot',
  'Amazonbot',
  'YouBot',
  // Training
  'GPTBot',
  'anthropic-ai',
  'CCBot',
  'Applebot',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'cohere-ai',
  'Diffbot',
  'Timpibot',
]

// `/learn` is 307-redirected to `/` while retired, and the Next internals are
// never useful to a crawler. Keeping them out preserves crawl budget for the
// pages that convert.
const DISALLOW = ['/api/', '/_next/static/chunks/', '/learn', '/learn/']

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
