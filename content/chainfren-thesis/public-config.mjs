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
  { id: 'media-launchpad', label: 'TiVi', description: 'A media channel for live and on-demand programming, commerce, direct payments, and audience relationships.', maturity: 'live', href: '/products/media-launchpad' },
  { id: 'creator-growth-os', label: 'Creator Growth OS', description: 'Tools and support that help creators turn attention into an audience business they can keep.', maturity: 'live', href: '/products/creator-growth-os' },
  { id: 'community-engine', label: 'Community Engine', description: 'An owned community layer for membership, loyalty, and fan participation.', maturity: 'early-access', href: '/products/community-engine' },
  { id: 'ai-agent-studio', label: 'AI Agent Studio', description: 'Practical AI systems for content, distribution, acquisition, and operations.', maturity: 'early-access', href: '/products/ai-agent-studio' },
]

export const PUBLIC_INITIATIVE_MATURITY = [
  { id: 'creator-network', label: 'Creator Network', description: 'Trusted distribution that connects creators and brands through cultural fit.', maturity: 'live', href: '/creator-network' },
  { id: 'sabi', label: 'Sabi', description: "Chainfren's media and broadcasting product.", maturity: 'building', href: '/sabi' },
  { id: 'star-factor', label: 'Star Factor', description: 'A participatory entertainment product currently being built.', maturity: 'building', href: '/thesis/read/the-road-ahead' },
  { id: 'indy', label: 'Indy', description: 'A creator-focused AI business manager and roadmap direction.', maturity: 'directional', href: '/thesis/read/the-road-ahead' },
]

export const PUBLIC_PRODUCT_GROUPS = [
  { id: 'live', label: 'Live', itemIds: ['media-launchpad', 'creator-growth-os', 'creator-network'] },
  { id: 'early-access', label: 'Early access', itemIds: ['community-engine', 'ai-agent-studio'] },
  { id: 'building', label: 'Building', itemIds: ['star-factor', 'sabi'] },
  { id: 'roadmap', label: 'Roadmap', itemIds: ['indy'] },
]
