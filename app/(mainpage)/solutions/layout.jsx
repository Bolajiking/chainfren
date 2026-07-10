// Metadata for the /solutions overview route (the persona chooser). Child
// persona pages (/for-creators, /for-brands) export their own metadata.
export const metadata = {
  title: { absolute: 'Solutions — Built for Who You Are | Chainfren' },
  description:
    'Chainfren’s full product stack, packaged for who you are. For Creators: own your audience and revenue. For Brands: build community, scale with AI, and reach the creators who move culture.',
  openGraph: {
    title: 'Chainfren Solutions — Built for Who You Are',
    description: 'The whole Chainfren stack, packaged per audience — For Creators and For Brands.',
    type: 'website',
  },
}

export default function SolutionsLayout({ children }) {
  return children
}
