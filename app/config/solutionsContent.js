// Shared copy for the Product pages.
//
// Each of the four Products renders from its own page component
// (MediaLaunchpad · CreatorGrowthOS · CommunityEngine · AiAgentStudio) on one
// shared framework: hero → definitional → stats → problem → features →
// compare → how you buy it → who it's for → candor → FAQ → get started.
// Visual/product data (stats, features, comparison rows, segments) lives in
// each component. THIS file holds only what has to be shared with the server:
//
//   meta         → <head> title/description on the route
//   definitional → the GEO paragraph, quoted by AI search; also Service.description in JSON-LD
//   serviceType  → Service.serviceType in JSON-LD
//   faq          → rendered by the page AND emitted as FAQPage JSON-LD (one source, never drifts)
//
// Keep the definitional paragraphs crawlable and stable — they are written to
// be extracted verbatim by answer engines.
//
// EVIDENCE RULES (framework non-negotiables, applied to public copy):
//   · No invented traction. A figure ships only with a source, rendered.
//   · Mechanisms, not outcomes, until a paying client exists.

// The shared "How we work" strip — used by the persona (For Creators /
// For Brands) landing pages.
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
  'media-launchpad': {
    breadcrumb: 'Media Launchpad',
    definitional:
      'Media Launchpad is Chainfren’s productized solution for launching a branded media presence you own. It stands up live and on-demand streaming, a built-in storefront, direct fan payments, and first-party audience data for creators, churches, sports leagues, event organizers, filmmakers, and musicians — so the channel, the audience, and the revenue belong to the organization that built them. It runs on TiVi.',
    serviceType: 'Owned media platform launch — streaming, broadcasting, distribution & direct monetization',
    faq: [
      { q: 'What’s the difference between TiVi and Media Launchpad?', a: 'TiVi is the platform — launch it yourself in minutes. Media Launchpad is the full solution: Chainfren designs, builds, and launches your entire media presence on TiVi, done with you. Same infrastructure; choose your level of hands-on.' },
      { q: 'How much does TiVi cost?', a: 'TiVi offers a free tier to get started and flexible plans as you grow. Unlike platforms that take 30–50% of your revenue, all TiVi plans let you keep 100% of what you earn from your audience.' },
      { q: 'Do I need coding skills?', a: 'No. Launch your branded streaming channel in minutes with our no-code setup. If you can set up a social media profile, you can launch on TiVi.' },
      { q: 'Can I import my existing videos?', a: 'Absolutely. Upload directly or migrate your content from YouTube, Vimeo, or other platforms. Your content library transfers seamlessly.' },
      { q: 'How is TiVi different from YouTube or Twitch?', a: 'YouTube takes 45% of your ad revenue and owns your audience data. Twitch takes 50%. TiVi takes zero — you keep 100% of revenue through direct payments, own your subscriber data, and control your channel without algorithm interference.' },
      { q: 'What about discoverability?', a: 'TiVi is your home base, not a discovery platform. You bring your audience from social media through your link-in-bio, then own that relationship directly. Think of it as the Shopify for live creators.' },
      { q: 'Can organizations and brands use TiVi?', a: 'Yes. TiVi serves individual creators, churches, sports leagues, music labels, event promoters, and film studios. Any organization that needs a branded streaming channel with direct monetization.' },
    ],
    meta: {
      title: 'Media Launchpad (TiVi) — Own Your Streaming Channel & Audience',
      description: 'Launch a branded streaming channel you own. TiVi by Chainfren: live + on-demand video, direct payments, built-in storefront — keep 100% of revenue and own your audience data.',
    },
  },

  'creator-growth-os': {
    breadcrumb: 'Creator Growth OS',
    definitional:
      'Creator Growth OS is Chainfren’s productized solution for creators, public figures, and creator-led brands to grow and own their audience and revenue. It combines owned-audience capture, direct fan payments, content monetization, creator commerce, and onchain identity into one operating system — so influence becomes a durable business the creator keeps. It runs on TVinBio, live at tvin.bio.',
    serviceType: 'Creator growth & audience-ownership operating system',
    faq: [
      { q: 'What is Creator Growth OS?', a: 'Creator Growth OS is Chainfren’s productized solution for creators and creator-led brands to grow and own their audience and revenue — owned-audience capture, direct payments, monetization, commerce, and onchain identity in one operating system. It runs on TVinBio, which is live at tvin.bio.' },
      { q: 'How is this different from Media Launchpad?', a: 'Media Launchpad gives you a channel — the place your programming lives. Creator Growth OS gives you the business around an audience: capture, payments, monetization, and identity. Same infrastructure underneath, two different questions. If you are asking “where do I broadcast?”, that is Media Launchpad. If you are asking “how do I turn the people watching into a business I keep?”, that is this.' },
      { q: 'What does it run on?', a: 'TVinBio — live at tvin.bio, and free to try yourself. Creator Growth OS is the done-with-you layer on top: we configure it, wire the capture and payment rails, and run the operating cadence with you until your team can.' },
      { q: 'How do I get paid?', a: 'Directly — cards, mobile money, and stablecoins. No platform cut, no waiting on a payout cycle, and no ad rate deciding what your work is worth based on where you live.' },
      { q: 'What do I keep if I leave?', a: 'Your money, held in a wallet you can withdraw from without our cooperation. Your audience list, exportable in full. Your content and storefront. And your name, as an ENS name registered to you — that piece is rolling out now, and we say so rather than pretending it already shipped everywhere.' },
      { q: 'Do I have to leave the platforms I’m on?', a: 'No. They become the top of your funnel. Discovery still happens where the algorithms are; the OS captures that audience into channels you own, so a platform decision can never wipe out your business.' },
      { q: 'Do I need to understand crypto?', a: 'No. Crypto shows up in two places, because those are the two places it earns its place: money that settles without a middleman, and a name that travels with you. Everything else is a normal product.' },
      { q: 'How does pricing work?', a: 'Start free. TVinBio is self-serve and live — set up your hub yourself. The done-with-you engagement is scoped on a call: setup, then the monthly operating cadence, then handover to your team. We price the outcome, never the hour.' },
      { q: 'Where do we start?', a: 'A free 30-minute call — you leave with the one fix worth doing first whether or not we go further. Or try TVinBio yourself; the self-serve door is already open.' },
    ],
    meta: {
      title: 'Creator Growth OS — Own Your Audience & Revenue',
      description: 'The operating system behind your audience. Capture it, sell to it, and keep the list, the money and the name — Chainfren’s Creator Growth OS turns influence into a business you keep. Runs on TVinBio.',
    },
  },

  'community-loyalty': {
    breadcrumb: 'Community Engine',
    definitional:
      'Community Engine is Chainfren’s productized solution for building an owned community layer — the members’ space a creator or brand owns, built on top of the platforms where discovery already happens. It designs and runs community architecture, membership and loyalty programs, fan economics, and a fan-powered growth loop for communities, fan bases, and consumer brands — converting passive followers into members with a structural stake in what they are part of. Token-free by design, so it works for any brand, crypto-native or not.',
    serviceType: 'Owned community layer — architecture, membership & loyalty, fan economics',
    faq: [
      { q: 'What is Community Engine?', a: 'Community Engine is Chainfren’s productized solution for building an owned community layer — the members’ space a creator or brand owns, built on top of the platforms where discovery already happens. It covers community architecture, membership and loyalty, fan economics, and a growth loop that turns members into distribution.' },
      { q: 'Is this an NFT or token project?', a: 'No. Community Engine is token-free by design — no coin, no NFT stunts, no hype drops. Removing the token removes the securities question, the speculation, and the wallet onboarding cliff, which is what makes it work for any brand, crypto-native or not. Ownership mechanics, not speculation.' },
      { q: 'Where does the community actually live?', a: 'Wherever your people already are — a gated members’ space on your own domain, a channel you own, or the layer running inside WhatsApp, Telegram or Discord. A dedicated app only when the community is large enough to justify the install. It is a layer on top of the platforms, not a migration away from them.' },
      { q: 'What do “owners” actually own?', a: 'Two things, both written down. You own the member list, the direct channel to every person on it, the exportable data, the community space and its economics, the loyalty ledger, and everything we build. Your members own their identity, their contribution record, their consent, and their earned standing — carried with them rather than held at your discretion.' },
      { q: 'Is this just a loyalty program?', a: 'A loyalty program makes people stay. This is built to make them bring others: missions are scored on outcomes, so a member’s work reaches new people. We measure it against what you currently pay to acquire a customer — and if member-driven acquisition doesn’t beat your paid acquisition, we will tell you and price it as the loyalty layer it turned out to be.' },
      { q: 'Who runs it day to day?', a: 'We can build it and hand it over, or build and run it with you. Most day-to-day operations run on an agent — moderation, onboarding, answering questions, surfacing the best contributions, running campaigns — with humans on the judgment calls and the approval gate.' },
      { q: 'How do you stop the rewards being farmed?', a: 'Verification tiers gate reward size, there are caps per member, per mission and per period, rewards settle after a holding window so a referral that churns never pays, and every campaign has a kill-switch that can claw back what hasn’t settled. Nothing carrying your name is distributed without a person approving it.' },
      { q: 'What about promotions law and member data?', a: 'Both are designed in from the start. Rewards are awarded on published, deterministic criteria — no random draws, because a prize by chance is a lottery in most jurisdictions including Nigeria. And a member list is personal data, which makes you the data controller under NDPR, and GDPR for any EU member; the consent language ships as part of the build.' },
      { q: 'How does pricing work?', a: 'Start with a free 30-minute call, then a scoped pilot: one cohort, one mission type, one number — what a member-driven signup costs you versus a paid one. From there, the full engine run with you, and eventually a handover to your team. Priced per engagement, never hourly.' },
    ],
    meta: {
      title: 'Community Engine — Your Owned Community Layer',
      description: 'Turn followers into members with a real stake. Chainfren builds the owned community layer — membership, loyalty, fan economics and a member-powered growth loop — on top of the platforms where discovery happens. Token-free by design.',
    },
  },

  'ai-agents': {
    breadcrumb: 'AI Agent Studio',
    definitional:
      'AI Agent Studio is Chainfren’s productized AI-native growth engine for creators, brands, and consumer companies. It builds custom AI agents, always-on content pipelines, AI-automated content distribution, and acquisition automation — so a creator or brand can grow reach, content, and revenue without multiplying headcount.',
    serviceType: 'AI-native growth engine — agents, content pipelines, distribution & acquisition',
    faq: [
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
    ],
    meta: {
      title: 'AI Agent Studio — AI-Native Growth Engine for Brands & Creators',
      description: 'Chainfren AI Agent Studio: custom AI agents, content pipelines, creator-powered distribution, and automated acquisition — one always-on machine that scales your presence, not your overhead. Built for creators, brands, and African consumer & FMCG companies.',
    },
  },
}
