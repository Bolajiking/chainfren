import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { data } from './data'

export const metadata = {
  title: { absolute: 'TiVi for Music & Artists — Your Own MTV | Chainfren Media Launchpad' },
  description: 'Listening parties, live sessions, and a music video library where fans pay you directly. Your own MTV — your music, your fans, your revenue.',
}

export default function Page() {
  return <VerticalLandingTemplate data={data} />
}
