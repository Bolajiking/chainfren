import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { verticalJsonLd, verticalMetadata } from '../../../../config/solutionSchema'
import { SchemaScript } from '../../../../config/siteSchema'
import { data } from './data'

const SEO = {
  slug: 'events',
  name: 'Events & Concerts',
  title: 'TiVi for Events & Concerts — Your Venue Never Closes | Chainfren Media Launchpad',
  description: 'Stream every show, sell virtual tickets, and build a content library that earns long after the lights go off. Your venue never closes — and you keep the revenue.',
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
