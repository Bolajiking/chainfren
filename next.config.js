/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/3e17eg8a93v6/**',
      },
    ],
  },
  async redirects() {
    return [
      // Agency → Solutions restructure
      { source: '/agency', destination: '/solutions', permanent: true },
      { source: '/agency/creator-network', destination: '/creator-network', permanent: true },
      { source: '/agency/creator-network/apply', destination: '/creator-network/apply', permanent: true },
      // TiVi → Media Launchpad consolidation (contact before :vertical so it wins)
      { source: '/products/TiVi', destination: '/solutions/media-launchpad', permanent: true },
      { source: '/products/TiVi/contact', destination: '/solutions/media-launchpad/demo', permanent: true },
      { source: '/products/TiVi/:vertical', destination: '/solutions/media-launchpad/:vertical', permanent: true },
    ]
  },
}

module.exports = nextConfig
