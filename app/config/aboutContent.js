import {
  PUBLIC_CTAS,
  PUBLIC_INITIATIVE_MATURITY,
  PUBLIC_PRODUCT_MATURITY,
} from '../../content/chainfren-thesis/public-config.mjs'

const PUBLIC_ABOUT_OFFERING_IDS = [
  'media-launchpad',
  'creator-growth-os',
  'community-engine',
  'ai-agent-studio',
  'creator-network',
  'sabi',
  'star-factor',
]

const publicOfferingRecords = new Map(
  [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]
    .map((record) => [record.id, record]),
)

const ABOUT_OFFERINGS = PUBLIC_ABOUT_OFFERING_IDS.map((id) => {
  const record = publicOfferingRecords.get(id)

  if (!record) {
    throw new Error(`Missing canonical public record for About offering: ${id}`)
  }

  return {
    name: id === 'media-launchpad' ? 'Media Launchpad (TiVi)' : record.label,
    line: id === 'sabi'
      ? "Chainfren's home for broadcasts and publications on blockchains, AI, and the technologies unlocking the African economy."
      : record.description,
    href: record.href,
  }
})

export const ABOUT = {
  meta: {
    title: 'About Chainfren: Ownership Infrastructure for the African Creator Economy',
    description: 'Chainfren is a distribution-first company building products that help Africans own the value their attention generates on the internet.',
  },
  hero: {
    eyebrow: 'About Chainfren',
    h1: ['African creators have already won the attention. The next fight is ', 'ownership', '.'],
    sub: 'Chainfren is a distribution-first company built to enable Africans to own the full value their attention generates on the internet. We build for creators, brands, and their audiences.',
    meta: [
      ['Founded', '2025'],
      ['Based in', 'Lagos, Nigeria'],
      ['Building for', 'Africa and worldwide'],
    ],
  },
  argument: {
    eyebrow: 'What we believe',
    title: 'The argument, in four steps.',
    intro: 'The short version of the Chainfren thesis.',
    more: { label: 'Read the full thesis', href: '/thesis' },
    steps: [
      {
        n: '01',
        t: 'The gap',
        lead: 'Africa is online. The value still leaves.',
        body: 'African creators, brands, and audiences shape what people watch and value online. Too little of that value returns as lasting control, direct relationships, or income.',
      },
      {
        n: '02',
        t: 'The trap',
        lead: 'Attract, build dependence, then extract.',
        body: 'Platforms and middlemen help people find an audience. The problem begins when access becomes dependence. Someone else can change how people discover you, how you reach your audience, or how you get paid, and you have no practical way to leave.',
      },
      {
        n: '03',
        t: 'The unlock',
        lead: 'Open rails make another model possible.',
        body: 'Open rails, enabled by blockchain technology where it is useful, can support direct payments, portable identity, and participation beyond one company. The work is to turn those capabilities into products people can use.',
      },
      {
        n: '04',
        t: 'The thesis',
        lead: 'Africans should own the value their attention creates.',
        body: 'Chainfren works where attention becomes a relationship and that relationship can produce durable value. We build so Africans can keep what they create and still have the freedom to leave.',
      },
    ],
  },
  build: {
    eyebrow: 'What we build',
    title: 'Products for the part after attention.',
    intro: 'We turn what we learn from culture and distribution into products people can use.',
    items: ABOUT_OFFERINGS,
  },
  join: {
    eyebrow: 'Work with us',
    title: 'Find your way in.',
    intro: 'Choose the path that fits what you want to build.',
    items: [
      {
        who: 'Creators',
        line: 'Build a business around the audience you earned.',
        ...PUBLIC_CTAS.creators,
      },
      {
        who: 'Brands',
        line: 'Reach culture through products and distribution built for participation.',
        ...PUBLIC_CTAS.brands,
      },
      {
        who: 'Partners',
        line: 'Bring infrastructure, distribution, or capital that fits the mission.',
        ...PUBLIC_CTAS.partners,
      },
      {
        who: 'Potential hires',
        line: 'Help build the products and systems behind the mission.',
        ...PUBLIC_CTAS.talent,
      },
    ],
  },
}
