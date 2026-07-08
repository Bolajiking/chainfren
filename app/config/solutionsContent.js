// Full landing-page copy for the template-driven solution pages
// (Creator Growth OS · Community Engine · AI Agent Studio).
// Verbatim from the Solutions Pages Spec §2.4 — the definitional paragraphs
// are written to be quoted by AI search and must stay crawlable & unchanged.
//
// Media Launchpad is the flagship and has its own full SaaS page, so it is
// not templated here.

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
    subhead: 'Tokenized membership, fan economics, and loyalty systems that make your community stakeholders — invested, active, and compounding in value.',
    definitional:
      'Community Engine is Chainfren’s productized solution for turning audiences into owned communities. It designs and runs community architecture, tokenized membership, fan economics, and brand loyalty programs for communities, fan bases, and brands — converting passive followers into stakeholders with a real share in what they’re part of.',
    tension:
      'Followers watch. Members belong. Owners build. Most “communities” are audiences with a group chat — no stake, no reason to stay. We build the version where belonging is real because ownership is real.',
    capabilities: [
      { t: 'Community architecture', d: 'The structure and day-to-day management that turns an audience into a community.' },
      { t: 'Tokenized membership & rewards', d: 'Membership, status, and rewards that live onchain — provable, portable, real.' },
      { t: 'Fan economics', d: 'Participation mechanics that give members a reason to stay and a share in the upside.' },
      { t: 'Brand ownership programs', d: 'Customers → advocates → owners — loyalty that compounds instead of leaking.' },
      { t: 'The smart-contract layer', d: 'The mechanics that make membership and ownership real, not symbolic.' },
    ],
    faq: [
      { q: 'What is Community Engine?', a: 'Community Engine is Chainfren’s productized solution for turning audiences into owned communities — community architecture, tokenized membership, fan economics, and loyalty programs that convert followers into stakeholders.' },
      { q: 'Is this an NFT project?', a: 'No. Web3 is used only where it serves your audience — no NFT stunts, no hype drops. Ownership mechanics, not speculation.' },
      { q: 'What does “members as owners” actually mean?', a: 'Membership, rewards, and status live onchain — so belonging is provable, portable, and can carry real value.' },
      { q: 'Who runs the community day to day?', a: 'We can build it and hand it over, or build and run it with you — scoped per engagement.' },
    ],
    serviceType: 'Community architecture, tokenized membership & loyalty',
    meta: {
      title: 'Community Engine — Turn Fans into Stakeholders',
      description: 'Turn followers into owners. Chainfren designs tokenized membership, fan economics, and loyalty systems that convert audiences into invested communities that compound.',
    },
  },

  'ai-agents': {
    breadcrumb: 'AI Agent Studio',
    heroTone: 'navy',
    h1: ['Scale your presence, not your ', 'overhead', '.'],
    subhead: 'AI agents and automation that create, engage, and run the work — an always-on version of you, working across content, community, and operations.',
    definitional:
      'AI Agent Studio is Chainfren’s productized solution for scaling creators, brands, and communities with artificial intelligence. It builds custom AI agents, AI content pipelines, and operational automation — so a creator or brand can multiply output, presence, and engagement without multiplying headcount.',
    tension:
      'You are the product, the marketer, the community manager, and the operations team. That ceiling is why most creators plateau. Agents remove the ceiling — the repetitive work runs itself, and your presence works while you sleep.',
    capabilities: [
      { t: 'Custom AI agents', d: 'Branded characters and an always-on presence that engages your audience in your voice.' },
      { t: 'AI content pipelines', d: 'Generation, repurposing, and scale — output multiplied without more headcount.' },
      { t: 'Operations automation', d: 'Workflows, moderation, and distribution that run themselves.' },
      { t: 'Audience intelligence', d: 'Personalization and insight that make every touchpoint sharper.' },
    ],
    faq: [
      { q: 'What is AI Agent Studio?', a: 'AI Agent Studio is Chainfren’s productized solution for scaling creators, brands, and communities with AI — custom agents, content pipelines, and operational automation that multiply output without multiplying headcount.' },
      { q: 'What can an agent actually do?', a: 'Create and repurpose content, engage your audience in your voice, run repetitive operations — the always-on layer of your business.' },
      { q: 'Will it sound like me?', a: 'Yes — agents are trained on your voice, style, and rules, with your approval loop on what ships.' },
      { q: 'Does this replace my team?', a: 'It replaces repetition, not judgment. Your people do the human work; agents do the rest.' },
    ],
    serviceType: 'AI agents, content pipelines & operational automation',
    meta: {
      title: 'AI Agent Studio for Creators & Brands',
      description: 'AI agents that create, engage, and run the work. Chainfren builds custom agents, content pipelines, and automation so creators and brands scale presence, not overhead.',
    },
  },
}
