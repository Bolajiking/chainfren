// Full landing-page copy for the template-driven solution pages
// (Creator Growth OS · Community Engine · AI Agent Studio).
// Verbatim from the Solutions Pages Spec §2.4 — the definitional paragraphs
// are written to be quoted by AI search and must stay crawlable & unchanged.
//
// Media Launchpad is the flagship and has its own full SaaS page, so it is
// not templated here.
//
// PROOF SLOT: each solution page has a pre-built proof section that shows a
// candor line until real proof exists. To add proof as clients land, set:
//   proof: { quote: '…', author: 'Name', role: 'Title, Org' }
// on that solution's entry below — it renders in place of the candor block, no
// layout work. Vertical landers use the same idea via `quote: {…}` in their
// data.js (rendered by VerticalLandingTemplate's QuoteSection).

// The shared "How we work" strip — lifted from the live agency page.
export const HOW_WE_WORK = {
  eyebrow: 'How we work',
  title: 'From attention to ownership.',
  steps: [
    { n: '01', t: 'Diagnose', d: 'Free 30-minute call. We learn what you’re building. If we’re not the right team, we say so on the call.' },
    { n: '02', t: 'Design', d: 'A written plan: positioning, infrastructure, distribution, KPIs. You sign off before we build a thing.' },
    { n: '03', t: 'Build', d: 'Audience capture, payment rails, community layer, onchain where it earns its place. You own everything.' },
    { n: '04', t: 'Launch', d: 'We run the launch. You’re the protagonist. Press, partnerships, distribution — our work, your win.' },
    { n: '05', t: 'Grow', d: 'Operational support until your team can run the engine without us.' },
  ],
}

export const SOLUTION_CONTENT = {
  'creator-growth-os': {
    breadcrumb: 'Creator Growth OS',
    heroTone: 'navy',
    h1: ['Turn influence into a business you ', 'keep', '.'],
    subhead: 'The operating system behind your audience — owned audience, direct payments, creator commerce. Grow the audience, own the relationship, keep the revenue.',
    definitional:
      'Creator Growth OS is Chainfren’s productized solution for creators, public figures, and creator-led brands to grow and own their audience and revenue. It combines owned-audience infrastructure, direct fan payments, content monetization, creator commerce, and onchain identity into one operating system — so influence becomes a durable business the creator keeps.',
    tension:
      'You did the hard part — you won the attention. But attention on rented platforms pays the platform first. Growth OS re-wires it: the audience becomes yours, the payments come direct, and the business compounds under your name.',
    capabilities: [
      { t: 'Owned-audience capture', d: 'First-party data and channels you control — your existing platforms become the top of the funnel.' },
      { t: 'Content monetization', d: 'Paid, gated, subscriptions — the revenue core of the system, not a bolt-on.' },
      { t: 'Direct payments & commerce', d: 'Get paid directly, including in stablecoins — no platform tax, no payout cycles.' },
      { t: 'Onchain identity', d: 'An identity and audience that travels across platforms and can’t be taken away.' },
      { t: 'Growth strategy', d: 'Reach turned into recurring, owned revenue — the operating cadence behind the audience.' },
    ],
    faq: [
      { q: 'What is Creator Growth OS?', a: 'Creator Growth OS is Chainfren’s productized solution for creators and creator-led brands to grow and own their audience and revenue — owned-audience infrastructure, direct payments, monetization, commerce, and onchain identity in one operating system.' },
      { q: 'Where does content monetization fit?', a: 'Inside the OS — direct payments, gated content, commerce, and subscriptions are the revenue core of the system, not a separate product.' },
      { q: 'What happens to my existing platforms?', a: 'You keep them — they become the top of your funnel. The OS captures that audience into channels you own.' },
      { q: 'How do I get paid?', a: 'Directly, including in stablecoins — no platform tax, no waiting on payout cycles.' },
    ],
    serviceType: 'Creator growth & audience-ownership operating system',
    meta: {
      title: 'Creator Growth OS — Own Your Audience & Revenue',
      description: 'The operating system behind your audience. Grow and own your audience, monetize directly, and keep the revenue — Chainfren’s Creator Growth OS turns influence into a business you keep.',
    },
  },

  'community-loyalty': {
    breadcrumb: 'Community Engine',
    heroTone: 'white',
    h1: ['Turn your audience into ', 'owners', '.'],
    subhead: 'Loyalty, fan economics, and membership that turn your community into stakeholders — invested, active, and compounding in value. Your owned community layer.',
    definitional:
      'Community Engine is Chainfren’s productized solution for turning audiences into owned communities. It designs and runs community architecture, membership and loyalty programs, and fan economics for communities, fan bases, and brands — converting passive followers into stakeholders with a real stake in what they’re part of. Token-free by design, so it works for any brand, crypto-native or not.',
    tension:
      'Followers watch. Members belong. Owners build. Most “communities” are audiences with a group chat — no stake, no reason to stay. We build the version where belonging is real because ownership is real.',
    capabilities: [
      { t: 'Community architecture', d: 'The structure and day-to-day management that turns an audience into a community.' },
      { t: 'Membership & rewards', d: 'Status, recognition, and rewards that reward your day-ones and give members a reason to stay.' },
      { t: 'Fan economics', d: 'Participation mechanics that give members a reason to stay and a share in the upside.' },
      { t: 'Brand loyalty programs', d: 'Customers → advocates → owners — loyalty that compounds instead of leaking.' },
      { t: 'The owned community layer', d: 'Loyalty, membership, and fan economics you own and keep — not rented from a platform.' },
    ],
    faq: [
      { q: 'What is Community Engine?', a: 'Community Engine is Chainfren’s productized solution for turning audiences into owned communities — community architecture, membership and loyalty programs, and fan economics that convert followers into stakeholders.' },
      { q: 'Is this an NFT or token project?', a: 'No. Community Engine is token-free by design — no coin, no NFT stunts, no hype drops. Loyalty and ownership mechanics that work for any brand, crypto-native or not.' },
      { q: 'What does “members as owners” actually mean?', a: 'Members get a real stake in the community — recognition, rewards, and status that make belonging worth something, plus loyalty that compounds as the community grows. Ownership of the relationship, not a token.' },
      { q: 'Who runs the community day to day?', a: 'We can build it and hand it over, or build and run it with you — scoped per engagement.' },
    ],
    serviceType: 'Community architecture, membership & loyalty programs',
    meta: {
      title: 'Community Engine — Turn Fans into Stakeholders',
      description: 'Turn followers into owners. Chainfren designs membership, fan economics, and loyalty programs that convert audiences into invested communities that compound — token-free by design.',
    },
  },

  'ai-agents': {
    breadcrumb: 'AI Agent Studio',
    heroTone: 'navy',
    h1: ['Scale your presence, not your ', 'overhead', '.'],
    subhead: 'AI agents and automation that create, engage, and run the work — an always-on version of you, working across content, community, and operations.',
    definitional:
      'AI Agent Studio is Chainfren’s productized AI-native growth engine for creators, brands, and consumer companies. It builds custom AI agents, always-on content pipelines, AI-automated content distribution, and acquisition automation — so a creator or brand can grow reach, content, and revenue without multiplying headcount.',
    tension:
      'You are the product, the marketer, the community manager, and the operations team. That ceiling is why most creators plateau. Agents remove the ceiling — the repetitive work runs itself, and your presence works while you sleep.',
    capabilities: [
      { t: 'Custom AI agents', d: 'Branded characters and an always-on presence that engages your audience in your voice.' },
      { t: 'AI content pipelines', d: 'Generation, repurposing, and scale — output multiplied without more headcount.' },
      { t: 'Operations automation', d: 'Workflows, moderation, and distribution that run themselves.' },
      { t: 'Audience intelligence', d: 'Personalization and insight that make every touchpoint sharper.' },
    ],
    faq: [
      { q: 'What is AI Agent Studio?', a: 'AI Agent Studio is Chainfren’s AI-native growth engine for creators, brands, and consumer companies. We audit how the work actually happens, prescribe what to fix — off-the-shelf before bespoke — then run content, distribution, and acquisition with AI agents, so you grow output without multiplying headcount.' },
      { q: 'Where do we start?', a: 'A free diagnostic — a no-lose audit that leaves you with one high-leverage fix. From there, a two-week Sprint, the monthly Engine, or the full Growth Partner build.' },
      { q: 'Do you build everything from scratch?', a: 'No — we prescribe before we build. Off-the-shelf tools where they exist; bespoke (a brand-locked model, owned personas, your context layer) only where it earns its place.' },
      { q: 'Does this replace my team?', a: 'It replaces repetition, not judgment. Your people do the human work; agents do the rest.' },
    ],
    serviceType: 'AI-native growth engine — agents, content pipelines, distribution & acquisition',
    meta: {
      title: 'AI Agent Studio — AI-Native Growth Engine for Brands & Creators',
      description: 'Chainfren AI Agent Studio: custom AI agents, content pipelines, creator-powered distribution, and automated acquisition — one always-on machine that scales your presence, not your overhead. Built for creators, brands, and African consumer & FMCG companies.',
    },
  },
}
