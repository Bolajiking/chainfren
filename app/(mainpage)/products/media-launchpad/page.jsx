import MediaLaunchpad from '../../../components/MediaLaunchpad'
import { solutionJsonLd, solutionMetadata, JsonLd } from '../../../config/solutionSchema'

export const metadata = solutionMetadata('media-launchpad')

// TiVi is a real product surface of its own, so this route carries one extra
// node beyond the standard Service + FAQPage + Breadcrumb set.
const TIVI = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TiVi',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'All-in-one streaming platform where creators and brands own their audience and keep 100% of revenue.',
  publisher: { '@type': 'Organization', name: 'Chainfren' },
}

export default function Page() {
  return (
    <>
      <JsonLd blocks={solutionJsonLd('media-launchpad', { extra: [TIVI] })} />
      <MediaLaunchpad />
    </>
  )
}
