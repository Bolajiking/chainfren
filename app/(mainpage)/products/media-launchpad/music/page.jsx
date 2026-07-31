import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { verticalJsonLd, verticalMetadata } from '../../../../config/solutionSchema'
import { SchemaScript } from '../../../../config/siteSchema'
import { data } from './data'

const SEO = {
  slug: 'music',
  name: 'Music & Artists',
  title: 'TiVi for Music & Artists — Your Own MTV | Chainfren Media Launchpad',
  description: 'Listening parties, live sessions, and a music video library where fans pay you directly. Your own MTV — your music, your fans, your revenue.',
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
