import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { verticalJsonLd, verticalMetadata } from '../../../../config/solutionSchema'
import { SchemaScript } from '../../../../config/siteSchema'
import { data } from './data'

const SEO = {
  slug: 'creators',
  name: 'Content Creators',
  title: 'TiVi for Creators — You Are the Network | Chainfren Media Launchpad',
  description: 'Direct monetization with no algorithm gatekeeping. Built for the 96% of creators platforms ignore — you are the network, your page is the channel.',
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
