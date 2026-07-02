import CreatorNetworkPage from '../../../components/CreatorNetworkPage'

export const metadata = {
  title: 'Crypto Creator Network — African Creators & Global KOLs for Onchain Brands',
  description: 'Chainfren Creator Network connects onchain brands to Africa\'s biggest creators and international crypto KOLs. Curated, vetted, paid in stablecoins. Hire the network or apply to join.',
  keywords: ['crypto creator network', 'Web3 influencer marketing agency', 'African crypto KOLs', 'onchain creator marketing', 'crypto influencer agency Africa', 'hire crypto influencers', 'African creator agency', 'crypto marketing agency Nigeria', 'stablecoin creator payments'],
  openGraph: {
    title: 'Chainfren Creator Network — African Creators & Global KOLs for Onchain Brands',
    description: 'Curated network of African creators, international crypto KOLs, and partner agencies — built exclusively for onchain brands. Hire the network or apply to join.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chainfren Creator Network',
    description: 'Africa\'s biggest creators and the world\'s crypto KOLs, curated and paid in stablecoins.',
  },
}

const FAQ_JSONLD = [
  { q: 'What is the Chainfren Creator Network?', a: 'The Chainfren Creator Network is a curated network of African creators, international crypto KOLs, and partner marketing agencies, built exclusively for onchain brands. It is the creator-sourcing division of the Chainfren agency.' },
  { q: 'Who is the network for?', a: 'Two sides — onchain brands that need credible creator distribution, and creators who want real, well-paid campaigns with leading crypto brands.' },
  { q: 'What kind of creators are in the network?', a: 'Mainstream African creators across music, comedy, sport, lifestyle and tech; international crypto-native KOLs; and partner agencies. Every creator is vetted for authentic reach, engagement, and brand safety.' },
  { q: 'How do brands work with the network?', a: 'Brands send a brief; Chainfren returns a matched, vetted roster, supports activation, and handles creator payment in stablecoins. Engagements range from single campaigns to ongoing growth partnerships.' },
  { q: 'How do creators join?', a: 'Creators apply through the network and are vetted for reach, engagement, and brand safety. Accepted creators access campaigns from leading onchain brands and are paid in stablecoins on delivery.' },
  { q: 'How are creators paid?', a: 'In stablecoins, settled onchain, on delivery — removing the delays and banking friction of traditional creator payments.' },
  { q: 'What makes Chainfren different?', a: 'Chainfren works exclusively with onchain brands and specialises in bridging mainstream creators into crypto credibly — a curated, vetted network, campaigns built for onchain acquisition, and instant stablecoin settlement.' },
  { q: 'Which markets does the network cover?', a: 'Africa-first, with deep strength in Nigeria, plus international crypto KOLs for global reach and partner agencies for additional markets.' },
]

function JsonLd() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_JSONLD.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Creator marketing / influencer network',
    provider: { '@type': 'Organization', name: 'Chainfren' },
    areaServed: ['Africa', 'Global'],
    audience: [
      { '@type': 'Audience', audienceType: 'Onchain brands' },
      { '@type': 'Audience', audienceType: 'Creators' },
    ],
    name: 'Chainfren Creator Network',
    description: 'A curated network of African creators, international crypto KOLs, and partner marketing agencies, built exclusively for onchain brands.',
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Agency', item: 'https://chainfren.com/agency' },
      { '@type': 'ListItem', position: 2, name: 'Creator Network', item: 'https://chainfren.com/agency/creator-network' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  )
}

export default function Page() {
  return (
    <>
      <JsonLd />
      <CreatorNetworkPage />
    </>
  )
}
