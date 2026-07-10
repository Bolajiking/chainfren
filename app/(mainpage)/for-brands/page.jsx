import PersonaLanding from '../../components/PersonaLanding'
import { PERSONA_CONTENT } from '../../config/personaContent'

const c = PERSONA_CONTENT.brands
export const metadata = {
  title: c.meta.title,
  description: c.meta.description,
  openGraph: { title: `${c.meta.title} | Chainfren`, description: c.meta.description, type: 'website' },
  twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description },
}

export default function ForBrandsPage() {
  return <PersonaLanding personaKey="brands" />
}
