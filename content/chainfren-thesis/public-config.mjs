export const THESIS_CONTENT_VERSION = '2026.2'

export const PUBLIC_CTAS = {
  creators: { label: 'Explore for creators', href: '/for-creators' },
  brands: { label: 'Explore for brands', href: '/for-brands' },
  partners: { label: 'Partner with Chainfren', href: '/contact' },
  talent: { label: 'Join the team', href: '/contact' },
  executives: { label: 'Build Chainfren with us', href: '/contact' },
  supporters: { label: 'Follow the work', href: '/sabi' },
}

export const PUBLIC_PRODUCT_MATURITY = [
  { id: 'media-launchpad', label: 'TiVi / Media Launchpad', maturity: 'early-access', href: '/products/media-launchpad' },
  { id: 'creator-growth-os', label: 'Creator Growth OS', maturity: 'live-core', href: '/products/creator-growth-os' },
  { id: 'community-engine', label: 'Community Engine', maturity: 'early-access', href: '/products/community-engine' },
  { id: 'ai-agent-studio', label: 'AI Agent Studio', maturity: 'early-access', href: '/products/ai-agent-studio' },
]

export const PUBLIC_INITIATIVE_MATURITY = [
  { id: 'creator-network', label: 'Creator Network', maturity: 'live', href: '/creator-network' },
  { id: 'sabi', label: 'Sabi', maturity: 'building', href: '/sabi' },
  { id: 'star-factor', label: 'Star Factor', maturity: 'building', href: '/thesis/read/the-road-ahead' },
  { id: 'indy', label: 'Indy', maturity: 'directional', href: '/thesis/read/the-road-ahead' },
]

export const PUBLIC_PRODUCT_GROUPS = [
  { id: 'flagship', label: 'Flagship product', itemIds: ['media-launchpad'] },
  { id: 'in-development', label: 'In development', itemIds: ['star-factor'] },
  { id: 'distribution', label: 'Supporting distribution products', itemIds: ['sabi', 'creator-network'] },
  { id: 'capabilities', label: 'Additional capabilities', itemIds: ['creator-growth-os', 'community-engine', 'ai-agent-studio'] },
  { id: 'roadmap', label: 'Roadmap', itemIds: ['indy'] },
]
