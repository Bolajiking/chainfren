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

export const FAQS = [
  { q: 'What is AI Agent Studio?', a: 'AI Agent Studio is Chainfren’s productized AI-native growth engine for creators, brands, and consumer companies. It combines four modules — an AI Content Engine, AI & Creator Distribution, Automation & Acquisition, and Intelligence & Measurement — into one always-on machine that grows reach, content, and revenue without multiplying headcount.' },
  { q: 'What are the four modules?', a: '01 — AI Content Engine: endless on-brand assets from a brand-locked model, with an always-on pipeline that repurposes one idea into weeks of content. 02 — AI & Creator Distribution: AI distribution agents that publish, schedule, and cross-post across every channel 24/7, plus the warm creator graph, owned AI personas, and community activation. 03 — Automation & Acquisition: AI lead capture, WhatsApp commerce, and payments on local rails and stablecoins. 04 — Intelligence & Measurement: one dashboard for reach, brand lift, CAC, and sell-through, with AI optimization on top.' },
  { q: 'Can AI agents distribute my content automatically?', a: 'Yes — that’s the core of Module 02. AI distribution agents publish, schedule, repurpose, and cross-post your content across every channel around the clock, so reach and revenue grow without anyone manually posting. Your content pipeline keeps producing and the agents keep distributing, 24/7.' },
  { q: 'How is this different from an AI video or content agency?', a: 'A content agency stops at “we made the asset.” We own the outcome, not the deliverable — content plus distribution plus automated acquisition, measured end to end. That’s the difference between a studio and a growth engine, and it’s why we price the outcome, never the hour.' },
  { q: 'Do you build everything from scratch?', a: 'No — we prescribe before we build. We audit your workflow, cut the waste, and recommend the right tools, off-the-shelf where they already exist. We build bespoke — a brand-locked model, owned personas, your context layer — only where it genuinely earns its place. You never pay us to build what you can buy.' },
  { q: 'How do you actually deliver?', a: 'Audit → Optimize → Automate, in that order. We watch how the work really happens, cut the process down first, and only then automate what’s left — because automating a bloated process just makes the bloat run faster.' },
  { q: 'Will everything actually look and sound like my brand?', a: 'Yes. We train a brand-locked model on your voice, style, and rules, so on-brand is the default rather than the exception — with your approval loop on what ships.' },
  { q: 'Do you work with consumer and FMCG brands?', a: 'Yes — challenger and homegrown consumer brands and the digital arms of mid-size FMCG are a core focus. FMCG is the most content-hungry, always-on category in Africa, and AI-native distribution is a 10× on cost and speed. Culture in, distribution out.' },
  { q: 'How does pricing work?', a: 'One system, sold as how much of it you switch on — starting free. Book a free Diagnostic first; from there, The Sprint (a two-week fixed-price proof), Engine (modules 01–03, monthly), and Growth Partner (all four modules plus the bespoke build). Pricing is a subscription base plus performance upside — never hourly, never pure project. Stablecoin settlement is available as the pan-African option.' },
  { q: 'Where do we start?', a: 'The free Diagnostic — a no-lose audit that leaves you with one high-leverage fix whether or not we go further. When you’re ready to prove it, The Sprint is a low-friction, fixed-price two-week engagement that earns the full engine.' },
  { q: 'Does this replace my team?', a: 'It replaces repetition, not judgment. Your people do the human work — taste, relationships, decisions. The agents and pipelines do everything that shouldn’t need a human.' },
]
