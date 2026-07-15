export default function manifest() {
  return {
    name: 'Chainfren',
    short_name: 'Chainfren',
    description: 'Ownership infrastructure for Africa\'s creator economy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#08153C',
    theme_color: '#08153C',
    icons: [
      {
        src: '/icons/chainfren-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/chainfren-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/chainfren-maskable-1024.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
