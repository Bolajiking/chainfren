import SiteHeader, { DEFAULT_LINKS, DEFAULT_CTA } from "./components/SiteHeader"
import MainGrid from "./components/MainGrid"

export default function Home() {
  return (
    <div className="font-fontspring">
      <SiteHeader links={DEFAULT_LINKS} cta={DEFAULT_CTA} />
      <MainGrid />
    </div>
  )
}
