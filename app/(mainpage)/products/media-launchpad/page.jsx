import MediaLaunchpad from '../../../components/MediaLaunchpad'

const BASE = 'https://chainfren.com'

export const metadata = {
  title: { absolute: 'Media Launchpad (TiVi) — Own Your Streaming Channel & Audience | Chainfren' },
  description:
    'Launch a branded streaming channel you own. TiVi by Chainfren: live + on-demand video, direct payments, built-in storefront — keep 100% of revenue and own your audience data.',
  openGraph: {
    title: 'Media Launchpad (TiVi) — Own Your Streaming Channel & Audience | Chainfren',
    description: 'Launch a branded streaming channel you own. Live + on-demand video, direct payments, built-in storefront — keep 100% of revenue.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Media Launchpad (TiVi) | Chainfren', description: 'Launch a streaming channel you own. Keep 100% of revenue.' },
}

const FAQ = [
  { q: 'What’s the difference between TiVi and Media Launchpad?', a: 'TiVi is the platform — launch it yourself in minutes. Media Launchpad is the full solution: Chainfren designs, builds, and launches your entire media presence on TiVi, done with you.' },
  { q: 'How much does TiVi cost?', a: 'TiVi offers a free tier and flexible plans as you grow. All plans let you keep 100% of what you earn from your audience.' },
  { q: 'Do I need coding skills?', a: 'No. Launch your branded streaming channel in minutes with our no-code setup.' },
  { q: 'How is TiVi different from YouTube or Twitch?', a: 'YouTube takes 45–55% and owns your audience data. Twitch takes 50%. TiVi takes zero — you keep 100% of revenue, own your subscriber data, and control your channel.' },
]

function JsonLd() {
  const software = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'TiVi', applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'All-in-one streaming platform where creators and brands own their audience and keep 100% of revenue.',
    publisher: { '@type': 'Organization', name: 'Chainfren' },
  }
  const service = {
    '@context': 'https://schema.org', '@type': 'Service', name: 'Chainfren Media Launchpad',
    serviceType: 'Owned media platform launch (streaming, broadcasting, distribution)',
    description: 'For creators, churches, sports leagues, event organizers, filmmakers, and musicians — launch your fully branded streaming channel equipped with live and on-demand video, video shopping, and instant payments.',
    provider: { '@type': 'Organization', name: 'Chainfren', url: BASE }, areaServed: ['Africa', 'Global'], url: `${BASE}/products/media-launchpad`,
  }
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Products', item: `${BASE}/products` },
    { '@type': 'ListItem', position: 2, name: 'Media Launchpad', item: `${BASE}/products/media-launchpad` },
  ] }
  return [software, service, faq, breadcrumb].map((b, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />)
}

export default function Page() {
  return (
    <>
      <JsonLd />
      <MediaLaunchpad />
    </>
  )
}
