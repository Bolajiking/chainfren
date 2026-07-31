import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { verticalJsonLd, verticalMetadata } from '../../../../config/solutionSchema'
import { SchemaScript } from '../../../../config/siteSchema'
import { data } from './data'

const SEO = {
  slug: 'churches',
  name: 'Churches & Ministries',
  title: 'TiVi for Churches — Stream on a Platform Your Ministry Owns | Chainfren Media Launchpad',
  description: 'Stream services on a platform your ministry owns — built-in giving, sermon archives, and zero ads. Reach your congregation anywhere, and own the relationship.',
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
