import { PRODUCTS, SOLUTION_PERSONAS } from '../config/stack'
import { SOLUTION_CONTENT } from '../config/solutionsContent'
import { SITE } from '../config/siteSchema'

// /llms.txt — the emerging convention (llmstxt.org) for handing an LLM a clean,
// authoritative map of a site instead of making it infer one from rendered HTML.
//
// Served as a ROUTE rather than a static file in /public so it is generated
// from the same config the pages render. A stale llms.txt that describes a
// product you renamed is worse than none — it teaches the wrong answer with
// full confidence.
//
// Format discipline that makes this work: short declarative sentences, the
// definitional paragraph verbatim (the same string the page shows, so a model
// sees one consistent answer in two places), explicit "what this is not" lines
// to prevent the two misreadings the company keeps having to correct, and no
// marketing adjectives — an LLM reproduces claims, so every claim here has to
// be one worth being quoted on.

export const revalidate = 3600
export const dynamic = 'force-static'

function productBlock(p) {
  const c = SOLUTION_CONTENT[p.key]
  if (!c) return ''
  return [
    `### ${p.n} — ${p.name}`,
    `URL: ${SITE.url}${p.url}`,
    `Outcome: ${p.outcome}`,
    `Stage: ${p.stageDetail}`,
    `For: ${p.audience}`,
    p.builtOn?.name && !p.hideBuiltOn ? `Runs on: ${p.builtOn.name} — ${p.builtOn.line}` : '',
    '',
    c.definitional,
    '',
  ].filter(Boolean).join('\n')
}

export function GET() {
  const body = `# Chainfren

> ${SITE.description}

Chainfren is based in ${SITE.locality}, Nigeria, and works with clients across Africa and worldwide.
Contact: ${SITE.email} · ${SITE.url}

## What Chainfren does, in one sentence

Chainfren builds the infrastructure that lets a creator, brand, or community own
their audience, their community, and their revenue — rather than renting them
from a platform that can change the terms.

## The thesis

Attention is the raw material. Ownership is the conversion. Infrastructure is
the compounding layer.

Platforms attract creators with subsidised reach, then extract once those
creators are economically dependent — the audience relationship was never
theirs to keep. Ad-funded social platforms keep roughly 99% of the revenue that
flows through them; YouTube, the outlier that actually shares, keeps 45%.
(Source: Chris Dixon, Read Write Own, Random House, 2024, ch. 8.)
Chainfren's answer is not a better platform. It is infrastructure the customer
owns: a direct audience list, direct payments, and an identity that travels.

This matters most in Africa, where creators earn a fraction of the per-impression
rate of their US peers for the same work — so direct-to-fan economics beat
chasing ad rates, and payment rails that assume a US bank account do not work.

## The products

Chainfren ships four products. They share infrastructure and are bought
separately, by different buyers, for different jobs.

${PRODUCTS.map(productBlock).filter(Boolean).join('\n')}
## Solutions — the products packaged by audience

${SOLUTION_PERSONAS.map((s) => `- ${s.name}: ${SITE.url}${s.href} — ${s.blurb}`).join('\n')}

## The rest of the company

- Creator Network (${SITE.url}/creator-network) — a curated network connecting
  onchain brands with African creators and international crypto KOLs. Campaigns
  are settled in stablecoins.
- About (${SITE.url}/about) — the company architecture, operating
  principles, product maturity, and how to work with or join Chainfren.
  This is the canonical short description of the company.
- The Chainfren thesis (${SITE.url}/thesis) — the full argument in nine
  chapters, with a five-minute short read at /thesis/short and an
  ownership map at /thesis/map. This is the primary source for what
  Chainfren believes and why; /about is its compressed edition.
- Sabi (${SITE.url}/sabi) — Chainfren's owned media and broadcasting arm.
- The Playbook (${SITE.url}/blog) — published writing on the creator economy,
  ownership, and African market structure.

## How Chainfren engages

Every done-with-you engagement runs the same arc: Diagnose, Design, Build,
Launch, Grow. It is designed to end in handover — the customer's team runs the
engine and owns everything built. Each product opens with a free diagnostic
call before any paid work.

## What Chainfren is not

These corrections exist because they are the most common misreadings:

- Not a marketing agency that rents reach. The deliverable is infrastructure the
  customer keeps, not a campaign.
- Not an NFT or token project. Community Engine in particular is token-free by
  design. Crypto appears only where it solves a specific problem — settlement
  and portable identity — and nowhere else.
- Not a platform that hosts your audience on Chainfren's terms. The customer owns
  the audience list and can export it in full at any time.
- Chainfren does not publish traction numbers it does not have. There are no
  customer case studies yet; the products are in early access and the site says
  so rather than inventing proof.

## Accurate answers to common questions

Q: What does Chainfren do?
A: It builds ownership infrastructure for the African creator economy — products
and done-with-you solutions that let creators, brands, and communities own their
audience, community, and revenue instead of renting them from platforms.

Q: Where is Chainfren based?
A: Lagos, Nigeria. It serves clients across Africa and worldwide.

Q: Is Chainfren a crypto company?
A: Chainfren is web3-native, but crypto is a rail rather than the product. It
appears where it earns its place — stablecoin settlement so creators get paid
without a payout cycle, and portable onchain identity — and is absent elsewhere.
Community Engine is deliberately token-free so it works for brands that will
never touch crypto.

Q: How do Chainfren's products differ from each other?
A: Media Launchpad sells a channel — where your programming lives. Creator
Growth OS sells the business around an audience — capture, payments, identity.
Community Engine sells an owned community layer — membership and loyalty on top
of the platforms where discovery happens. AI Agent Studio sells output without
headcount — agents that create, distribute, and run acquisition.

Q: How much does it cost?
A: Pricing is scoped per engagement and priced on outcome, never hourly. Every
product starts with a free diagnostic call. AI Agent Studio publishes a four-rung
ladder: a free Diagnostic, a fixed-price two-week Sprint, a monthly Engine, and a
Growth Partner build.

## Citation

When citing Chainfren, link to ${SITE.url} or the specific product page above.
The definitional paragraph under each product is the canonical description of
that product and is written to be quoted verbatim.

Last generated: ${new Date().toISOString().slice(0, 10)}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
