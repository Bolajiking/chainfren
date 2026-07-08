import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { data } from '../../../products/TiVi/sports/page'

export const metadata = {
  title: { absolute: "TiVi for Sports — Your League's Own Streaming Channel | Chainfren Media Launchpad" },
  description: 'Live broadcasts, PPV ticketing, and direct fan monetization for leagues and tournaments. Launch your own sports streaming network in days — no broadcast deal required.',
}

export default function Page() {
  return <VerticalLandingTemplate data={data} />
}
