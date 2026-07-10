// Metadata for the /products overview route. Child product pages export their
// own metadata, which overrides this per-route.
export const metadata = {
  title: { absolute: 'Solutions — Four Ways to Own What You Build | Chainfren' },
  description:
    'Chainfren’s solutions: Media Launchpad, Creator Growth OS, Community Engine, and AI Agent Studio — the four ways creators and brands own their audience, revenue, and community.',
  openGraph: {
    title: 'Chainfren Solutions — Four Ways to Own What You Build',
    description: 'Media Launchpad, Creator Growth OS, Community Engine, and AI Agent Studio — ownership infrastructure for Africa’s creator economy.',
    type: 'website',
  },
}

export default function ProductsLayout({ children }) {
  return children
}
