// ─────────────────────────────────────────────────────────────────────────
// /about — the institutional home for the thesis.
//
// This is the compressed public edition of the nine-chapter Chainfren thesis
// (docs/superpowers/specs/2026-07-21-chainfren-thesis-publication-design.md),
// restructured to work as a standard about page. It is the document to hand
// someone senior before a conversation: believers, investors, operators,
// partners, and prospective team.
//
// VOICE (from the thesis spec): Chainfren speaks as "we". Direct, declarative,
// Lagos-rooted, culturally specific, calm. No corporate filler, no vague
// claims, no artificial drama, no excessive promotion.
//
// PUBLICATION SAFETY (the load-bearing constraint, enforced by hand here since
// there is no build-time allowlist on this route). Excluded by name:
//   · runway, burn, revenue, budgets, any internal financial
//   · internal metrics, scoreboards, evidence registers, decision matrices
//   · partner and creator commercial terms
//   · dated internal roadmaps, gates, or targets
//   · fabricated proof of any kind
//   · the separate founder venture, which must not appear on this surface
// Public horizons replace the internal plan. Ambition is labelled as ambition.
//
// MATURITY LABELS are the approved vocabulary and must be re-checked against
// public reality before each publication: Live · Live core · Early access ·
// Building · Directional · Later.
// ─────────────────────────────────────────────────────────────────────────

export const ABOUT = {
  meta: {
    title: 'About Chainfren — Ownership Infrastructure for the African Creator Economy',
    description:
      'Chainfren builds ownership infrastructure for the African creator economy. Our thesis: African creators have already won the attention. The next fight is ownership. Read what we believe, what we build, how we work, and how to build with us.',
  },

  hero: {
    eyebrow: 'About Chainfren',
    // The thesis in one line. This is the sentence everything else on the page
    // is downstream of, and the one an answer engine should lift.
    h1: ['African creators have already won the attention. The next fight is ', 'ownership', '.'],
    sub: 'We are Chainfren. We build the infrastructure that lets creators, brands, and communities own their audience, their community, and their revenue, instead of renting them from platforms that can change the terms.',
    meta: [
      ['Founded', '2025'],
      ['Based in', 'Lagos, Nigeria'],
      ['Building for', 'Africa and worldwide'],
    ],
  },

  // ── The argument. Thesis chapters 01–04, compressed to four beats. ──────
  argument: {
    eyebrow: 'What we believe',
    title: 'The argument, in four steps.',
    intro: 'This is the argument in short. If you disagree with step two, nothing else we do will make sense to you, and that is a useful thing to find out early.',
    // /thesis shipped to master while this page was in flight. It is the full
    // nine-chapter version; this section is its compressed edition, so it links
    // out rather than competing with it.
    more: { label: 'Read the full thesis', href: '/thesis' },
    steps: [
      {
        n: '01',
        t: 'The gap',
        lead: 'Africa is online. The value still leaves.',
        body: 'Adoption was never the problem. The continent is mobile-first, young, and culturally decisive: African music, film, fashion, and internet humour set the tempo for a global audience. What has not followed is the money. The infrastructure underneath all that output was built somewhere else, for someone else, and it moves value in the direction it was designed to move it. Being online is not the same as benefiting from being online.',
      },
      {
        n: '02',
        t: 'The trap',
        lead: 'Attract, then extract.',
        body: 'Platforms open by subsidising reach. Creators build real audiences on systems they do not control. Then the terms change, because they always can: the algorithm, the take rate, the access, the rules. The creator owns the work and never owned the relationship underneath it. This is not a conspiracy and it does not require anyone to behave badly. It is what the model does when the network gets strong enough.',
      },
      {
        n: '03',
        t: 'The unlock',
        lead: 'Ownership can be a property of the system.',
        body: 'Open economic rails change what is possible to build. Value can settle directly, across borders, without waiting on a payout cycle or a bank that does not serve your country. Identity and access can live somewhere a single company cannot revoke. That is the part worth using, and it is the only part we use. Africa does not need more protocols or another whitepaper. It needs interfaces that work.',
      },
      {
        n: '04',
        t: 'The thesis',
        lead: 'Attention is the raw material. Ownership is the conversion.',
        body: 'Attention has already been won, at a scale most of the world underestimates. What has not been built is the layer that turns it into something durable: a direct relationship, a direct payment, a name that travels. That layer is the work. Our ambition is to become the default attention infrastructure for the African creator economy. We are stating that as an ambition, because it is one.',
      },
    ],
  },

  // ── The comparator. One sourced figure block, per the evidence rule. ────
  numbers: {
    eyebrow: 'The arithmetic',
    title: 'Why the take rate is the argument.',
    intro: 'The case for ownership is usually made on principle. It is stronger made on a number, against a named comparator.',
    items: [
      { figure: '~99%', label: 'Kept by ad-funded social platforms. Of roughly $150B a year, about $20B reaches the people who made the content, and most of that is YouTube alone.' },
      { figure: '45%', label: 'YouTube’s cut. It is the outlier that genuinely shares revenue, and it still keeps nearly half.' },
      { figure: '2–3%', label: 'What a card network charges to move money. Moving money is not the expensive part. Owning the audience is.' },
    ],
    source: 'Source: Chris Dixon, Read Write Own (Random House, 2024), ch. 8.',
    close: 'Two hundred people paying a creator $5 a month is $1,000 a month, and it does not care what the CPM is or which country the post came from. That is the entire economic case, and it is why we build for direct relationships rather than better reach.',
  },

  // ── Chapter 05 + 06. Architecture, then products with maturity labels. ──
  company: {
    eyebrow: 'How the company is built',
    title: 'Three pillars, one compounding system.',
    intro: 'Attention, then relationships, then infrastructure. Each one funds and feeds the next.',
    pillars: [
      { n: '01', t: 'Media', d: 'Sabi is our own broadcasting and editorial surface. It creates credible attention rather than buying it, and it is where the thinking gets published before it becomes a product.' },
      { n: '02', t: 'Creator Network', d: 'A curated network that turns attention into relationships and distribution, connecting onchain brands with African creators and international KOLs. Campaigns settle in stablecoins.' },
      { n: '03', t: 'Products and Solutions', d: 'Where the lessons become reusable infrastructure. Four products, sold separately, to different buyers, for different jobs.' },
    ],
    path: ['Attention', 'Participation', 'Ownership', 'Value'],
  },

  build: {
    eyebrow: 'What we build',
    title: 'Four products and the two engines behind them.',
    intro: 'Every label below is the real public stage, not an aspiration. We move them when the product moves, not before.',
    // stage values map to the approved label vocabulary.
    items: [
      { name: 'Media Launchpad', stage: 'Early access', runsOn: 'TiVi', line: 'A branded streaming channel you own: live and on demand, storefront, direct payments, and the subscriber data.', href: '/products/media-launchpad' },
      { name: 'Creator Growth OS', stage: 'Live core', runsOn: 'TVinBio', line: 'The business around an audience: capture it, sell to it, get paid directly, and hold the list and the name yourself.', href: '/products/creator-growth-os' },
      { name: 'Community Engine', stage: 'Early access', runsOn: null, line: 'An owned community layer on top of the platforms where discovery happens: membership, loyalty, and fan economics. Token-free by design.', href: '/products/community-engine' },
      { name: 'AI Agent Studio', stage: 'Early access', runsOn: null, line: 'Output without headcount: agents that create, distribute, and run acquisition, with a model locked to your brand.', href: '/products/ai-agent-studio' },
      { name: 'Creator Network', stage: 'Live', runsOn: null, line: 'Africa’s creators and global crypto KOLs, matched to onchain brands, managed and measured, settled in stablecoins.', href: '/creator-network' },
      { name: 'Sabi', stage: 'Building', runsOn: null, line: 'Our media arm and broadcasting network. Where the argument gets made in public.', href: '/sabi' },
      { name: 'Indy', stage: 'Directional', runsOn: null, line: 'A creator business manager, and the direction a connected version of everything above eventually points. Not a shipped product.', href: null },
      { name: 'Star Factor', stage: 'Later', runsOn: null, line: 'A flagship entertainment format designed to prove the thesis in front of an audience rather than argue it. A milestone, not a current product.', href: null },
    ],
  },

  // ── Chapter 07. Principles only. No internal machinery. ────────────────
  principles: {
    eyebrow: 'How we work',
    title: 'Eight things we hold to.',
    items: [
      { t: 'You own what we build', d: 'Every engagement ends with the asset in your hands: the audience, the data, the software, the relationships. If leaving costs you your audience, it was never yours.' },
      { t: 'Done-with-you has to end', d: 'The arc is Diagnose, Design, Build, Launch, Grow, and then handover. We are trying to make ourselves unnecessary on a schedule, not indispensable indefinitely.' },
      { t: 'Crypto only where it earns its place', d: 'It shows up in settlement and in portable identity, because those are two problems it genuinely solves. It shows up nowhere else. One of our products is deliberately token-free.' },
      { t: 'Human truth starts the work', d: 'The brief comes from what someone actually does all day, not from a category or a trend deck. Automation before understanding just makes the wrong thing faster.' },
      { t: 'The work is the proof', d: 'We would rather show a mechanism than describe an outcome. Export the list. Withdraw the money. Watch the thing launch.' },
      { t: 'We say when we are not the fit', d: 'On the first call, before anyone has spent money. A wrong-fit client is worse for us than no client, and it takes longer to admit later.' },
      { t: 'Distribution is part of the product', d: 'Something built with no plan for how it reaches people is not finished. We treat reach as a design problem, not a phase that happens after launch.' },
      { t: 'We publish real numbers or none', d: 'No invented traction, no borrowed logos, no testimonials from people who do not exist. When we have results, they get published. Until then, we say so.' },
    ],
  },

  // ── Chapter 08. Public horizons, no dates. ─────────────────────────────
  road: {
    eyebrow: 'The road ahead',
    title: 'Four horizons, in order.',
    intro: 'Direction, not a schedule. We publish dates when they are real.',
    items: [
      { n: '01', t: 'Build the distribution', d: 'Strengthen Sabi, the Creator Network, and the current product set until reach is something we own rather than rent.' },
      { n: '02', t: 'Convert reach into ownership', d: 'Turn that distribution into owned relationships and direct revenue for the people we work with, through Products and Solutions.' },
      { n: '03', t: 'Prove it in public', d: 'Demonstrate the thesis through flagship formats, with Star Factor as the major milestone, in front of an audience rather than in a deck.' },
      { n: '04', t: 'Connect the system', d: 'Move toward one connected creator business system. Indy is the directional shape of that, and it is a direction rather than a commitment.' },
    ],
  },

  // ── The founder note. ─────────────────────────────────────────────────
  //
  // ⚠️ DRAFT — NOT YET PASSED BY THE FOUNDER.
  // This is written in his published register (the "Africa Deserves a Better
  // Internet" essay voice: essayistic and formal, not the lowercase punchy
  // one he uses on X) and it is signed with his name, which means it must not
  // ship as-is without his edit. House rule: never publish a person's prose in
  // their name without their pass. Everything factual below is drawn from his
  // own published work and public role — nothing here is invented.
  //
  // Deliberately excluded: the personal pseudonym (the operating framework
  // flags a naming collision), any second role at another company, and any
  // separate venture.
  founder: {
    eyebrow: 'From the founder',
    name: 'Bolaji Majiyagbe',
    role: 'Founder, Chainfren',
    location: 'Lagos, Nigeria',
    draft: true,
    body: [
      // "trained as … and spent …" doubled the conjunction once the discipline
      // got longer, so the first one becomes a comma. Same sentence, cleaner beat.
      'I trained as an Electrical and Network Engineer, then spent the last five years in crypto, which is a longer way of saying I like systems and I got tired of watching a badly designed one decide what my friends were worth.',
      'The thing that started Chainfren was not an idea about technology. It was a pattern. Every year, someone I knew would put out work that travelled further than they could have imagined, get numbers a Western creator would build a career on, and end the month roughly where they started. The talent was never the constraint. The audience was never the constraint. The rails underneath were built somewhere else, for someone else, and they moved value in the direction they were designed to move it.',
      'You cannot argue a system like that into behaving differently. You can only build the alternative and make it good enough that choosing it is obvious. That is the work: not more protocols, not more whitepapers, better products, built here, for the way this market actually pays and watches and belongs.',
      'We are early, and I would rather say so than dress it up. The maturity label on every product above is a real reflection of that.',
      // The invitation gets its own paragraph so it lands on its own weight
      // rather than trailing the admission. Short last line, then the signature.
      'But if you have read this far and recognised the problem, I would rather hear from you now than after we have proven it.',
    ],
    // The essay is real, published, and carries his byline — the strongest
    // public proof of the thesis that exists today.
    link: { label: 'Read the essay: Africa Deserves a Better Internet', href: '/blog' },
  },

  // ── Chapter 09. One CTA per audience, no wall of buttons. ──────────────
  join: {
    eyebrow: 'Build with us',
    title: 'Five ways in.',
    intro: 'Pick the one that describes you. Every route reaches a person, usually within a day.',
    items: [
      { who: 'Creators', line: 'Own the audience you already earned.', cta: 'Explore for creators', href: '/for-creators' },
      { who: 'Brands', line: 'Build culture people own, and reach the creators who move it.', cta: 'Explore for brands', href: '/for-brands' },
      { who: 'Partners', line: 'Infrastructure, rails, distribution, and capital that fits the thesis.', cta: 'Partner with Chainfren', href: '/contact' },
      { who: 'Talent', line: 'Small team, high trust, real ownership of outcomes. Lagos-rooted, working worldwide.', cta: 'Join the team', href: '/contact' },
      { who: 'Supporters', line: 'Watch the work happen, in public, as it happens.', cta: 'Follow the work', href: '/sabi' },
    ],
  },

  faq: [
    { q: 'What does Chainfren do?', a: 'We build ownership infrastructure for the African creator economy: products and done-with-you solutions that let creators, brands, and communities own their audience, community, and revenue rather than renting them from platforms.' },
    { q: 'Where are you based?', a: 'Lagos, Nigeria. We work with clients across Africa and worldwide, and we build for African market realities first: mobile money, cross-border settlement, and the payment rails that assume a US bank account and therefore do not work here.' },
    { q: 'Is Chainfren a crypto company?', a: 'We are web3-native, but crypto is a rail rather than the pitch. It appears in exactly two places, because those are the two places it earns its keep: settlement that does not wait on a payout cycle, and identity that travels with the person who owns it. Community Engine is deliberately token-free so it works for brands that will never touch crypto.' },
    { q: 'Is this an agency?', a: 'No. An agency rents you reach on platforms you do not own, and the engagement ends with a campaign. Our engagements end with infrastructure in your hands and your team running it.' },
    { q: 'How do you make money?', a: 'Done-with-you engagements, priced on outcome rather than hours, and the Creator Network. Every engagement opens with a free diagnostic call before anyone spends anything.' },
    { q: 'Why Africa?', a: 'Because the gap between cultural output and captured value is widest here, which makes it the place the work matters most and the place it is hardest to fake. Building for the constraint, mobile-first, low-bandwidth, multi-currency, produces infrastructure that works everywhere else too.' },
    { q: 'Are you hiring?', a: 'We are a small team by design and we hire when a specific outcome needs an owner. If you read the thesis and recognised the problem, tell us what you would take responsibility for.' },
    { q: 'Are you raising?', a: 'Talk to us. The clearest way to start is to read this page and the product pages, then tell us which part of the argument you think is wrong.' },
  ],
}
