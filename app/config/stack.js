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

// The four productized offers. Formerly framed as "Solutions"; now Chainfren's
// Products (the building blocks), matching the Stripe model where Solutions are
// these products packaged per audience. `key` values are unchanged so
// SOLUTION_CONTENT, SolutionFrenAnimated, and page `solutionKey` props still map;
// only the public `url` slugs moved under /products.
export const PRODUCTS = [
  {
    key: 'media-launchpad',
    n: '01',
    name: 'Media Launchpad',
    nickname: 'TiVi',
    outcome: 'Launch the media presence you own.',
    emphasis: 'own',
    url: '/products/media-launchpad',
    accent: CF.cyan,
    accentB: CF.periwinkle,
    pose: 'reach',
    stage: 'early-access',
    stageDetail: 'Now in Early Access',
    flagship: true,
    audience: 'Creators · public figures · communities · institutions',
    builtOn: { name: 'TiVi', line: 'Your Netflix. Your Twitch. Your YouTube — owned.', href: '/products/media-launchpad' },
    primaryCta: 'demo',
    children: [
      { name: 'Sports & Leagues', slug: 'sports', url: '/products/media-launchpad/sports' },
      { name: 'Churches & Ministries', slug: 'churches', url: '/products/media-launchpad/churches' },
      { name: 'Events & Concerts', slug: 'events', url: '/products/media-launchpad/events' },
      { name: 'Film & Cinema', slug: 'film', url: '/products/media-launchpad/film' },
      { name: 'Music & Artists', slug: 'music', url: '/products/media-launchpad/music' },
      { name: 'Content Creators', slug: 'creators', url: '/products/media-launchpad/creators' },
    ],
  },
  {
    key: 'creator-growth-os',
    n: '02',
    name: 'Creator Growth OS',
    nickname: null,
    outcome: 'Turn influence into a business you keep.',
    emphasis: 'keep',
    url: '/products/creator-growth-os',
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
    url: '/products/community-engine',
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
    url: '/products/ai-agent-studio',
    accent: CF.lavender,
    accentB: CF.electric,
    pose: 'echo',
    stage: 'early-access',
    stageDetail: 'Early access',
    flagship: false,
    audience: 'Creators · brands · communities scaling output without scaling headcount',
    builtOn: { name: "Chainfren's proven agent work", line: 'The AI layer that powers every other product.', href: '/products/ai-agent-studio' },
    // The "Built on Chainfren infrastructure" band is self-referential for this
    // solution (it built on itself) — hidden on the page while builtOn data
    // stays intact for the hero's secondary-CTA logic.
    hideBuiltOn: true,
    primaryCta: 'sales',
  },
]

// Legacy alias — many surfaces still import { SOLUTIONS }. Keeps them working
// through the Products rename with zero behavioural change.
export const SOLUTIONS = PRODUCTS

export const productByKey = (key) => PRODUCTS.find((p) => p.key === key)
// Backwards-compatible name kept for SolutionPage.jsx and friends.
export const solutionByKey = productByKey

// ─────────────────────────────────────────────────────────────────────────
// Solutions = the products packaged per audience (the Stripe "Solutions"
// model). Two personas, each a standalone landing page whose "stack" is a
// curated ordering of the four Products above. Nav, the /solutions chooser,
// and the persona pages all read this.
// ─────────────────────────────────────────────────────────────────────────
export const SOLUTION_PERSONAS = [
  {
    key: 'creators',
    name: 'For Creators',
    href: '/for-creators',
    frenVariant: 'creators',
    accent: CF.mint,
    tag: 'Solution',
    blurb: 'Own your audience, keep your money, and build the business the platforms wouldn’t let you build.',
    // Ordered by what a creator reaches for first.
    productKeys: ['creator-growth-os', 'media-launchpad', 'ai-agents', 'community-loyalty'],
  },
  {
    key: 'brands',
    name: 'For Brands',
    href: '/for-brands',
    frenVariant: 'brands',
    accent: CF.cyan,
    tag: 'Solution',
    blurb: 'Build culture people own — community that compounds, AI that scales, media you control, and the creators who move it.',
    productKeys: ['community-loyalty', 'ai-agents', 'media-launchpad'],
  },
]

export const personaByKey = (key) => SOLUTION_PERSONAS.find((p) => p.key === key)
// Resolve a persona's productKeys into full Product objects (nav + pages).
export const personaStack = (persona) =>
  (persona?.productKeys || []).map(productByKey).filter(Boolean)

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
  // Star Factor's coming-soon notice — relocated from the old Products menu into
  // Solutions. Opens the shared NotifyModal (no dedicated page yet).
  starFactor: {
    tag: 'Coming Soon',
    name: 'Star Factor',
    line: "Africa's first onchain reality entertainment platform. Be first to know when it drops.",
    cta: 'Get notified',
    action: 'notify',
    notifySource: 'nav-star-factor',
    img: '/3d6.png',
  },
}

// Footer "Explore" map — generated from the same config so nav, footer and
// sitemap can never drift apart.
export const FOOTER_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      ['Products', '/products'],
      ['Solutions', '/solutions'],
      ['Creator Network', '/creator-network'],
      ['Media', '/media'],
    ],
  },
  {
    heading: 'Products',
    links: PRODUCTS.map((p) => [p.name, p.url]),
  },
  {
    heading: 'Solutions',
    links: SOLUTION_PERSONAS.map((p) => [p.name, p.href]),
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
