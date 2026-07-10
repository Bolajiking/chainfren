import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { data } from './data'

export const metadata = {
  title: { absolute: 'TiVi for Film & Cinema — Your Own Cinema, Your Audience | Chainfren Media Launchpad' },
  description: 'Premiere films, host Q&As, and sell tickets to virtual screenings on a cinema you own. Build a subscriber base and keep 100% of the box office.',
}

export default function Page() {
  return <VerticalLandingTemplate data={data} />
}
