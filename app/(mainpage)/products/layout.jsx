// Metadata for the /products overview route. Child product pages export their
// own metadata, which overrides this per-route.
export const metadata = {
  title: { absolute: 'Products — Four Ways to Own What You Build | Chainfren' },
  description:
    'Chainfren’s products: Media Launchpad, Creator Growth OS, Community Engine, and AI Agent Studio — the building blocks creators and brands use to own their audience, revenue, and community.',
  openGraph: {
    title: 'Chainfren Products — Four Ways to Own What You Build',
    description: 'Media Launchpad, Creator Growth OS, Community Engine, and AI Agent Studio — ownership infrastructure for Africa’s creator economy.',
    type: 'website',
  },
}

export default function ProductsLayout({ children }) {
  return children
}
