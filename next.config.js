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
      // Solutions → Products restructure (the 4 offers are now Products; Solutions
      // is re-scoped to the For Creators / For Brands persona pages). Verticals
      // before the parent so the more specific rule still resolves cleanly.
      { source: '/solutions/media-launchpad/:vertical*', destination: '/products/media-launchpad/:vertical*', permanent: true },
      { source: '/solutions/media-launchpad', destination: '/products/media-launchpad', permanent: true },
      { source: '/solutions/creator-growth-os', destination: '/products/creator-growth-os', permanent: true },
      { source: '/solutions/community-loyalty', destination: '/products/community-engine', permanent: true },
      { source: '/solutions/ai-agents', destination: '/products/ai-agent-studio', permanent: true },
      // TiVi → Media Launchpad consolidation (contact before :vertical so it wins)
      { source: '/products/TiVi', destination: '/products/media-launchpad', permanent: true },
      { source: '/products/TiVi/contact', destination: '/products/media-launchpad/demo', permanent: true },
      { source: '/products/TiVi/:vertical', destination: '/products/media-launchpad/:vertical', permanent: true },
      { source: '/products/product2', destination: '/products/community-engine', permanent: true },
      // Media → Sabi: the media hub is now canonical at /sabi; /media still resolves.
      { source: '/media', destination: '/sabi', permanent: true },
      // Learn (Web3 explainer section) — RETIRED FOR NOW (temporary redirect, not
      // permanent). The /(learning) route group stays in the codebase; revive it
      // by deleting these two rules. Ran an older template + stale branding.
      { source: '/learn', destination: '/', permanent: false },
      { source: '/learn/:slug*', destination: '/', permanent: false },
    ]
  },
}

module.exports = nextConfig
