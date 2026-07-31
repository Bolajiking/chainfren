// Shared data for the AI Agent Studio solution page. Plain module (no
// 'use client') so the server component in page.jsx can read it for JSON-LD
// while the client component renders it. Keeps schema and UI in lockstep.

// The offer ladder — prescribe-first, four rungs. A free diagnostic is the wedge
// (earns trust before it asks for money); the paid rungs run Audit → Optimize →
// Automate, and we prescribe off-the-shelf before we build bespoke. Pricing is
// intent, not actuals — subscription base plus performance upside, never hourly.
export const TIERS = [
  {
    name: 'The Diagnostic', kind: 'Free · start here', flagship: false, free: true,
    line: 'A free audit of where your growth actually leaks — content, distribution, acquisition, and the busywork in between. You leave with one high-leverage fix, whether or not we work together.',
    points: [
      'A live walkthrough of how the work really happens',
      'The five-signal waste scan: tabs, copy-paste, waiting, rework, handoffs',
      'One fix you can use immediately — no build required',
    ],
    cta: 'Book your free diagnostic', variant: 'sales',
  },
  {
    name: 'The Sprint', kind: 'Land offer', flagship: false,
    line: 'A fixed-price, two-week proof. We audit the workflow, prescribe what to fix — off-the-shelf where it exists, we don’t build what you can buy — and ship one working automation with a measurement snapshot.',
    points: ['Audit → Optimize → Automate on your highest-leverage workflow', 'A prescription of the right tools — bought or built', 'One automation live + a measurement snapshot'],
    cta: 'Start with a Sprint', variant: 'sales',
  },
  {
    name: 'Engine', kind: 'Core · flagship', flagship: true,
    line: 'The always-on machine — Content, Distribution, and Acquisition, operated with you, month over month.',
    points: ['Modules 01–03, operated with you', 'Monthly subscription base plus performance upside', 'The flagship engine most brands run on'],
    cta: 'Tell us what you\'re building', variant: 'sales',
  },
  {
    name: 'Growth Partner', kind: 'Premium · the build', flagship: false,
    line: 'Everything in the Engine, plus the bespoke build — a brand-locked model that’s only yours, owned AI personas, and the first-party data and context layer that compounds. Context is the moat.',
    points: ['All four modules + strategy', 'A brand-locked model + your owned context layer', 'Performance- or equity-linked partnership'],
    cta: 'Become a partner', variant: 'sales',
  },
]

// FAQ moved to config/solutionsContent.js ('ai-agents'.faq) so the page and
// its FAQPage JSON-LD render from one array. TIERS stays here — it drives both
// the pricing ladder and the Offer catalogue in the route's structured data.
