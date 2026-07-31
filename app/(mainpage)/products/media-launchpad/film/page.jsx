import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { verticalJsonLd, verticalMetadata } from '../../../../config/solutionSchema'
import { SchemaScript } from '../../../../config/siteSchema'
import { data } from './data'

const SEO = {
  slug: 'film',
  name: 'Film & Cinema',
  title: 'TiVi for Film & Cinema — Your Own Cinema, Your Audience | Chainfren Media Launchpad',
  description: 'Premiere films, host Q&As, and sell tickets to virtual screenings on a cinema you own. Build a subscriber base and keep 100% of the box office.',
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
