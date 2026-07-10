import VerticalLandingTemplate from '../../../../components/VerticalLandingTemplate'
import { data } from './data'

export const metadata = {
  title: { absolute: 'TiVi for Churches — Stream on a Platform Your Ministry Owns | Chainfren Media Launchpad' },
  description: 'Stream services on a platform your ministry owns — built-in giving, sermon archives, and zero ads. Reach your congregation anywhere, and own the relationship.',
}

export default function Page() {
  return <VerticalLandingTemplate data={data} />
}
