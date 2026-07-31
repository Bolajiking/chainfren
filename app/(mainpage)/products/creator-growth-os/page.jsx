import CreatorGrowthOS from '../../../components/CreatorGrowthOS'
import { solutionJsonLd, solutionMetadata, JsonLd } from '../../../config/solutionSchema'

export const metadata = solutionMetadata('creator-growth-os')

export default function Page() {
  return (
    <>
      <JsonLd blocks={solutionJsonLd('creator-growth-os')} />
      <CreatorGrowthOS />
    </>
  )
}
