import SolutionPage from '../../../components/SolutionPage'
import { solutionJsonLd, JsonLd } from '../../../config/solutionSchema'
import { SOLUTION_CONTENT } from '../../../config/solutionsContent'

const c = SOLUTION_CONTENT['creator-growth-os']
export const metadata = {
  title: { absolute: `${c.meta.title} | Chainfren` },
  description: c.meta.description,
  openGraph: { title: `${c.meta.title} | Chainfren`, description: c.meta.description, type: 'website' },
  twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description },
}

export default function Page() {
  return (
    <>
      <JsonLd blocks={solutionJsonLd('creator-growth-os')} />
      <SolutionPage solutionKey="creator-growth-os" />
    </>
  )
}
