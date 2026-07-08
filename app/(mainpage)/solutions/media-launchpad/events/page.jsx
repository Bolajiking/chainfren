import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { data } from '../../../products/TiVi/events/page'

export const metadata = {
  title: { absolute: 'TiVi for Events & Concerts — Your Venue Never Closes | Chainfren Media Launchpad' },
  description: 'Stream every show, sell virtual tickets, and build a content library that earns long after the lights go off. Your venue never closes — and you keep the revenue.',
}

export default function Page() {
  return <VerticalLandingTemplate data={data} />
}
