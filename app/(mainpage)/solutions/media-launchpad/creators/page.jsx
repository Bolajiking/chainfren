import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { data } from '../../../products/TiVi/creators/page'

export const metadata = {
  title: { absolute: 'TiVi for Creators — You Are the Network | Chainfren Media Launchpad' },
  description: 'Direct monetization with no algorithm gatekeeping. Built for the 96% of creators platforms ignore — you are the network, your page is the channel.',
}

export default function Page() {
  return <VerticalLandingTemplate data={data} />
}
