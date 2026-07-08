// ─────────────────────────────────────────────────────────────────────────
// The living Chainfren stack — single source of truth.
//
// Nav mega-menus, the mobile overlay, the footer, the homepage slider, and
// the solution landing pages all read from this file. Adding a solution, a
// vertical, or flipping a stage badge is a one-line edit here; every surface
// updates. (Media Launchpad Buildout §5.2 — the living-nav pattern.)
// ─────────────────────────────────────────────────────────────────────────

export const CF = {
  dark: '#08153C',
  primary: '#09011B',
  white: '#FFFFFF',
  accent: '#40ACFF',
  electric: '#40ACFF',
  periwinkle: '#8DAAFF',
  cyan: '#5ACDFF',
  mint: '#CBF0B8',
  lime: '#C8EB6D',
  lavender: '#A6E1FA',
  indigo: '#4D7AFF',
  coral: '#FF6B6B',
  muted: '#4A5568',
  dim: '#8896AB',
  subtle: '#6B6776',
  lightBlue: '#E6F4FF',
  ctaGrad: 'linear-gradient(to right, #40CBFF, #40FFCC)',
}

// Stage badges — render from `stage`; as a solution matures the label
// changes here and every nav/menu surface reflects it automatically.
export const STAGE = {
  'early-access': { label: 'Early access', tone: 'accent' },
  'live-core': { label: 'Live core', tone: 'live' },
  live: { label: 'Live', tone: 'live' },
}

export const SOLUTIONS = [
  {
    key: 'media-launchpad',
    n: '01',
    name: 'Media Launchpad',
    nickname: 'TiVi',
    outcome: 'Launch the media presence you own.',
    emphasis: 'own',
    url: '/solutions/media-launchpad',
    accent: CF.cyan,
    accentB: CF.periwinkle,
    pose: 'reach',
    stage: 'early-access',
    stageDetail: 'Now in Early Access',
    flagship: true,
    audience: 'Creators · public figures · communities · institutions',
    builtOn: { name: 'TiVi', line: 'Your Netflix. Your Twitch. Your YouTube — owned.', href: '/solutions/media-launchpad' },
    primaryCta: 'demo',
    children: [
      { name: 'Sports & Leagues', slug: 'sports', url: '/solutions/media-launchpad/sports' },
      { name: 'Churches & Ministries', slug: 'churches', url: '/solutions/media-launchpad/churches' },
      { name: 'Events & Concerts', slug: 'events', url: '/solutions/media-launchpad/events' },
      { name: 'Film & Cinema', slug: 'film', url: '/solutions/media-launchpad/film' },
      { name: 'Music & Artists', slug: 'music', url: '/solutions/media-launchpad/music' },
      { name: 'Content Creators', slug: 'creators', url: '/solutions/media-launchpad/creators' },
    ],
  },
  {
    key: 'creator-growth-os',
    n: '02',
    name: 'Creator Growth OS',
    nickname: null,
    outcome: 'Turn influence into a business you keep.',
    emphasis: 'keep',
    url: '/solutions/creator-growth-os',
    accent: CF.periwinkle,
    accentB: CF.cyan,
    pose: 'stride',
    stage: 'live-core',
    stageDetail: 'Powered by TVinBio — live',
    flagship: false,
    audience: 'Creators · public figures · creator-founders · creator-led brands',
    builtOn: { name: 'TVinBio', line: 'Your link-in-bio, but you actually own it.', href: 'https://tvin.bio/', external: true, cta: 'Try TVinBio' },
    primaryCta: 'sales',
  },
  {
    key: 'community-loyalty',
    n: '03',
    name: 'Community Engine',
    nickname: null,
    outcome: 'Turn your audience into owners.',
    emphasis: 'owners',
    url: '/solutions/community-loyalty',
    accent: CF.mint,
    accentB: CF.lime,
    pose: 'squad',
    stage: 'live-core',
    stageDetail: 'Powered by Comeownity',
    flagship: false,
    audience: 'Communities · institutions · fan bases · cultural & consumer brands',
    builtOn: { name: 'Comeownity', line: 'Tokenized shows, fan-driven communities. Cultural infrastructure.', href: 'https://comeownity.com/', external: true, cta: 'Explore Comeownity' },
    primaryCta: 'sales',
  },
  {
    key: 'ai-agents',
    n: '04',
    name: 'AI Agent Studio',
    nickname: null,
    outcome: 'Scale your presence, not your overhead.',
    emphasis: 'overhead',
    url: '/solutions/ai-agents',
    accent: CF.lavender,
    accentB: CF.electric,
    pose: 'echo',
    stage: 'early-access',
    stageDetail: 'Early access',
    flagship: false,
    audience: 'Creators · brands · communities scaling output without scaling headcount',
    builtOn: { name: "Chainfren's proven agent work", line: 'The AI layer that powers every other solution.', href: '/solutions/ai-agents' },
    // The "Built on Chainfren infrastructure" band is self-referential for this
    // solution (it built on itself) — hidden on the page while builtOn data
    // stays intact for the hero's secondary-CTA logic.
    hideBuiltOn: true,
    primaryCta: 'sales',
  },
]

export const solutionByKey = (key) => SOLUTIONS.find((s) => s.key === key)

// Featured cards per menu (Solutions Pages Spec §5.1).
export const FEATURED = {
  creatorNetwork: {
    tag: 'Featured',
    name: 'Creator Network',
    line: "Africa's biggest creators, matched to the biggest brands in crypto. Curated, vetted, paid onchain.",
    cta: 'Explore the network',
    href: '/creator-network',
    img: '/3d.png',
  },
}

// Footer "Explore" map — generated from the same config so nav, footer and
// sitemap can never drift apart.
export const FOOTER_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      ['Solutions', '/solutions'],
      ['Creator Network', '/creator-network'],
      ['Products', '/products'],
      ['Media', '/media'],
    ],
  },
  {
    heading: 'Solutions',
    links: SOLUTIONS.map((s) => [s.name, s.url]),
  },
  {
    heading: 'For you',
    links: [
      ['For Creators', '/for-creators'],
      ['For Brands', '/for-brands'],
    ],
  },
  {
    heading: 'Company',
    links: [
      ['Playbook', '/blog'],
      ['Contact', '/contact'],
      ['Join Chainfren', '/contact'],
    ],
  },
]
