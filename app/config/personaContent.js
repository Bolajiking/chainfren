// Full landing-page copy for the two persona Solutions pages — /for-creators
// and /for-brands. Rendered by components/PersonaLanding.jsx. Design tokens
// (accent, pose, url, name) come from PRODUCTS in stack.js; this file holds the
// persona-specific framing, the per-product angle + "what you get", and the FAQ.

export const PERSONA_CONTENT = {
  creators: {
    key: 'creators',
    name: 'For Creators',
    frenVariant: 'creators',
    accentKey: 'mint',
    meta: {
      title: 'For Creators — Own Your Audience, Keep Your Money',
      description:
        'Everything Chainfren builds for creators, in one stack — grow and own your audience, launch owned media, turn fans into owners, and scale it all with AI. Own your audience, get paid directly, and build the business the platforms wouldn’t let you build.',
    },
    hero: {
      eyebrow: 'For Creators',
      h1: 'Own your audience. Keep your money. Build the business the platforms wouldn’t let you build.',
      sub: 'Everything Chainfren builds for creators, in one stack — grow and own your audience, launch owned media, turn fans into owners, and scale it all with AI. On infrastructure you keep.',
      primaryCta: { label: 'Tell us what you\'re building', href: '/contact' },
    },
    tension: {
      eyebrow: 'Why this matters',
      title: 'You won the attention. Now own it.',
      points: [
        { n: '01', lead: 'You already won the attention.', body: 'Your content travels further per dollar than almost anywhere on earth. Africa’s creators top global charts. The paychecks haven’t followed.' },
        { n: '02', lead: 'The platform keeps the upside.', body: 'They own the audience, the data, the reach, and the money — and they rewrite the rules every quarter. You’re building on rented land.' },
        { n: '03', lead: 'Ownership changes the math.', body: 'Own the audience, get paid direct, and every part of your business compounds under your name — not a platform’s.' },
      ],
    },
    stackIntro: {
      eyebrow: 'Your stack',
      title: 'Four products. Built for creators who want to own it all.',
      sub: 'Start with one and add the rest as you grow — every product runs on infrastructure you keep.',
    },
    stack: [
      { key: 'creator-growth-os', angle: 'Own the audience, keep the revenue.', bullets: ['First-party audience and channels you control', 'Direct payments, including stablecoins — no platform tax', 'Onchain identity that travels across platforms'] },
      { key: 'media-launchpad', angle: 'Launch a media presence you own.', bullets: ['Your branded live + on-demand streaming channel', 'Built-in storefront and direct fan payments', 'Keep 100% of revenue and your subscriber data'] },
      { key: 'ai-agents', angle: 'Scale your presence, not your overhead.', bullets: ['Custom agents that engage in your voice', 'Always-on content pipelines and repurposing', 'Automate the repetitive ops behind the scenes'] },
      { key: 'community-loyalty', angle: 'Turn your fans into owners.', bullets: ['Membership, loyalty, and rewards', 'Fan economics that reward your day-ones', 'A community with a real stake in your rise'] },
    ],
    network: {
      eyebrow: 'Creator Network',
      title: 'Get paid to work with crypto’s biggest brands.',
      body: 'Real campaigns, real budgets, paid fast in stablecoins. Join the curated network that matches Africa’s biggest creators to the biggest brands in crypto.',
      cta: { label: 'Join the network', href: '/creator-network' },
    },
    media: {
      eyebrow: 'Your stage',
      title: 'Sabi — Africa’s onchain broadcasting network.',
      body: 'When you’re ready to broadcast beyond your own channel, Sabi is the signal.',
      cta: { label: 'Visit Sabi', href: '/sabi' },
    },
    faq: [
      { q: 'Do I have to leave the platforms I’m already on?', a: 'No — they become the top of your funnel. The stack captures that audience into channels you own, so a platform change can never wipe out your business.' },
      { q: 'How do I actually get paid?', a: 'Directly, including in stablecoins — no platform tax, no waiting on payout cycles.' },
      { q: 'Do I need to understand crypto?', a: 'No. We do, and we translate where it matters. Crypto only shows up where it solves a real problem — payments, ownership, and identity that travels.' },
      { q: 'Can I start with just one product?', a: 'Yes. Most creators start with Creator Growth OS or Media Launchpad and add the rest as they grow.' },
    ],
    closing: {
      title: 'Ready to build something you own?',
      cta: { label: 'Tell us what you\'re building', href: '/contact' },
    },
  },

  brands: {
    key: 'brands',
    name: 'For Brands',
    frenVariant: 'brands',
    accentKey: 'cyan',
    meta: {
      title: 'For Brands — Community, Creators & Culture That Converts',
      description:
        'Everything Chainfren builds for brands, in one stack — community that compounds, AI that scales, media you control, and the creators who move culture. Build culture people own.',
    },
    hero: {
      eyebrow: 'For Brands',
      h1: 'Build culture people own. Reach the audiences that actually convert.',
      sub: 'Everything Chainfren builds for brands, in one stack — community that compounds, AI that scales, media you control, and the creators who move culture.',
      primaryCta: { label: 'Tell us what you\'re building', href: '/contact' },
    },
    tension: {
      eyebrow: 'Why this matters',
      title: 'Reach isn’t the problem. Ownership is.',
      points: [
        { n: '01', lead: 'Reach isn’t the problem.', body: 'You can buy impressions anywhere. Almost none of them convert, and even fewer stay.' },
        { n: '02', lead: 'Rented audiences leak.', body: 'Followers you don’t own, loyalty that resets to zero, culture you rent one campaign at a time.' },
        { n: '03', lead: 'Owned communities compound.', body: 'Turn customers into stakeholders and every campaign builds an asset you keep — not one you re-buy next quarter.' },
      ],
    },
    stackIntro: {
      eyebrow: 'Your stack',
      title: 'Built to compound and convert.',
      sub: 'The products that turn audiences into owned communities, culture, and revenue.',
    },
    stack: [
      { key: 'community-loyalty', angle: 'Turn customers into stakeholders.', bullets: ['Loyalty that compounds instead of leaking', 'Membership and ownership programs', 'Advocates who market on your behalf'] },
      { key: 'ai-agents', angle: 'Always-on brand presence and operations.', bullets: ['Branded agents that engage at scale', 'Content pipelines without more headcount', 'Automated moderation and distribution'] },
      { key: 'media-launchpad', angle: 'Owned channels, broadcast on your terms.', bullets: ['Your own branded streaming channel', 'First-party audience data you keep', 'Distribution no algorithm can throttle'] },
    ],
    network: {
      eyebrow: 'Creator Network',
      title: 'Reach the creators who move culture.',
      body: 'Africa’s biggest creators and the world’s crypto KOLs — curated, vetted, and built to convert. Brief once; we match, manage, and measure.',
      cta: { label: 'Hire the network', href: '/creator-network' },
    },
    media: {
      eyebrow: 'Your channels',
      title: 'Broadcast your brand on Africa’s onchain signal.',
      body: 'Sabi is the owned-media network for brands ready to broadcast on their own terms.',
      cta: { label: 'Explore Sabi', href: '/sabi' },
    },
    faq: [
      { q: 'Is this an NFT play?', a: 'No. Ownership mechanics, not speculation — Web3 shows up only where it serves the customer, never as a hype drop.' },
      { q: 'How is this different from an agency?', a: 'A normal agency rents you reach on platforms you don’t own. We build owned audience, community, and media you keep — the tech serves the business outcome.' },
      { q: 'Which product do we start with?', a: 'Usually Community Engine or AI Agent Studio — we scope the right entry point on a free 30-minute call.' },
      { q: 'Do we need our own crypto team?', a: 'No. We build it and can run it with you, then hand over the engine when your team is ready. You keep the asset either way.' },
    ],
    closing: {
      title: 'Ready to build culture people own?',
      cta: { label: 'Tell us what you\'re building', href: '/contact' },
    },
  },
}
