import CommunityEngine from '../../../components/CommunityEngine'
import { solutionJsonLd, solutionMetadata, JsonLd } from '../../../config/solutionSchema'

export const metadata = solutionMetadata('community-loyalty')

export default function Page() {
  return (
    <>
      <JsonLd blocks={solutionJsonLd('community-loyalty')} />
      <CommunityEngine />
    </>
  )
}
