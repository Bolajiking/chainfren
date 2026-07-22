import ThesisHub from './components/ThesisHub'

const title = 'The Chainfren thesis'
const description = 'A public argument for a better internet from Lagos.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/thesis' },
  openGraph: { title, description, url: '/thesis', type: 'website', images: ['/thesis/opengraph-image'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/thesis/opengraph-image'] },
}

export default function ThesisPage() {
  return <ThesisHub />
}
