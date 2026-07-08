// Metadata for the /solutions overview route. Child solution pages export
// their own metadata, which overrides this per-route.
export const metadata = {
  title: { absolute: 'Solutions — Four Ways to Own What You Build | Chainfren' },
  description:
    'Chainfren’s productized solutions for creators and brands: Media Launchpad, Creator Growth OS, Community Engine, and AI Agent Studio — done with you, on infrastructure you own.',
  openGraph: {
    title: 'Chainfren Solutions — Four Ways to Own What You Build',
    description: 'Media Launchpad, Creator Growth OS, Community Engine, and AI Agent Studio — ownership infrastructure for Africa’s creator economy.',
    type: 'website',
  },
}

export default function SolutionsLayout({ children }) {
  return children
}
