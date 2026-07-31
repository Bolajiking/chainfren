import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { verticalJsonLd, verticalMetadata } from '../../../../config/solutionSchema'
import { SchemaScript } from '../../../../config/siteSchema'
import { data } from './data'

const SEO = {
  slug: 'sports',
  name: 'Sports & Leagues',
  title: 'TiVi for Sports — Your League\'s Own Streaming Channel | Chainfren Media Launchpad',
  description: 'Live broadcasts, PPV ticketing, and direct fan monetization for leagues and tournaments. Launch your own sports streaming network in days — no broadcast deal required.',
}

export const metadata = verticalMetadata(SEO)

export default function Page() {
  return (
    <>
      <SchemaScript schema={verticalJsonLd(SEO)} />
      <VerticalLandingTemplate data={data} />
    </>
  )
}
