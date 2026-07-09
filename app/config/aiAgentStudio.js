// Shared data for the AI Agent Studio solution page. Plain module (no
// 'use client') so the server component in page.jsx can read it for JSON-LD
// while the client component renders it. Keeps schema and UI in lockstep.

export const TIERS = [
  {
    name: 'The Sprint', kind: 'Land offer', flagship: false,
    line: 'A fixed-price, two-week proof. Low friction, fast to value.',
    points: ['An AI content batch', 'One creator push', 'A measurement snapshot'],
    cta: 'Start with a Sprint', variant: 'sales',
  },
  {
    name: 'Engine', kind: 'Core · flagship', flagship: true,
    line: 'The always-on machine — Content, Distribution, and Acquisition, running monthly.',
    points: ['Modules 01–03, fully operated', 'Monthly subscription base', 'The flagship engine most brands run on'],
    cta: 'Talk to us', variant: 'sales',
  },
  {
    name: 'Growth Partner', kind: 'Premium', flagship: false,
    line: 'The full engine plus strategy and first-party data, aligned to your outcome.',
    points: ['All four modules', 'Strategy + first-party data ownership', 'Performance or equity-linked kicker'],
    cta: 'Become a partner', variant: 'sales',
  },
]

export const FAQS = [
  { q: 'What is AI Agent Studio?', a: 'AI Agent Studio is Chainfren’s productized AI-native growth engine for creators, brands, and consumer companies. It combines four modules — an AI Content Engine, AI & Creator Distribution, Automation & Acquisition, and Intelligence & Measurement — into one always-on machine that grows reach, content, and revenue without multiplying headcount.' },
  { q: 'What are the four modules?', a: '01 — AI Content Engine: endless on-brand assets from a brand-locked model, with an always-on pipeline that repurposes one idea into weeks of content. 02 — AI & Creator Distribution: AI distribution agents that publish, schedule, and cross-post across every channel 24/7, plus the warm creator graph, owned AI personas, and community activation. 03 — Automation & Acquisition: AI lead capture, WhatsApp commerce, and payments on local rails and stablecoins. 04 — Intelligence & Measurement: one dashboard for reach, brand lift, CAC, and sell-through, with AI optimization on top.' },
  { q: 'Can AI agents distribute my content automatically?', a: 'Yes — that’s the core of Module 02. AI distribution agents publish, schedule, repurpose, and cross-post your content across every channel around the clock, so reach and revenue grow without anyone manually posting. Your content pipeline keeps producing and the agents keep distributing, 24/7.' },
  { q: 'How is this different from an AI video or content agency?', a: 'A content agency stops at “we made the asset.” We own the outcome, not the deliverable — content plus distribution plus automated acquisition, measured end to end. That’s the difference between a studio and a growth engine, and it’s why we price the outcome, never the hour.' },
  { q: 'Will everything actually look and sound like my brand?', a: 'Yes. We train a brand-locked model on your voice, style, and rules, so on-brand is the default rather than the exception — with your approval loop on what ships.' },
  { q: 'Do you work with consumer and FMCG brands?', a: 'Yes — challenger and homegrown consumer brands and the digital arms of mid-size FMCG are a core focus. FMCG is the most content-hungry, always-on category in Africa, and AI-native distribution is a 10× on cost and speed. Culture in, distribution out.' },
  { q: 'How does pricing work?', a: 'One system, sold as how much of it you switch on: The Sprint (a two-week fixed-price proof), Engine (modules 01–03, monthly), and Growth Partner (all four modules plus strategy). Pricing is a subscription base plus performance upside — never hourly, never pure project. Stablecoin settlement is available as the pan-African option.' },
  { q: 'Can I start small before committing to a retainer?', a: 'That’s exactly what The Sprint is for — a low-friction, fixed-price two-week proof that earns the full engine. See the output before you scale it.' },
  { q: 'Does this replace my team?', a: 'It replaces repetition, not judgment. Your people do the human work — taste, relationships, decisions. The agents and pipelines do everything that shouldn’t need a human.' },
]
