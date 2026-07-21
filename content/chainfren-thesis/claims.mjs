const baseline = [
  ['african-cultural-attention', 'African culture already commands attention', 'African creators shape what people watch, wear, quote, and copy. The attention already exists.', 'context', 'the-gap', 1],
  ['african-value-gap', "Africa's value gap", 'The culture travels further than the economic value that returns to the people who make it.', 'diagnosis', 'the-gap', 2],
  ['attract-then-extract', 'Attract, then extract', 'Platforms make creation and growth easy, then tighten control once creators and audiences depend on them.', 'diagnosis', 'the-trap', 3],
  ['rented-audience-relationship', 'Rented audience relationships', 'A following is fragile when another company controls reach, data, payments, and access.', 'diagnosis', 'the-trap', 4],
  ['open-economic-rails', 'Open economic rails', 'Open networks can make identity, payments, access, and commitments portable across products and borders.', 'mechanism', 'the-unlock', 5],
  ['attention-to-ownership', 'Attention must become ownership', 'Attention becomes durable value when people can own the audience relationship, participation, and upside.', 'mission', 'the-thesis', 6],
  ['chainfren-mission', "Chainfren's mission", 'We build the attention and ownership infrastructure that helps Africa\'s creator economy keep more of the value it creates.', 'mission', 'the-company', 7],
  ['sabi-attention', 'Sabi builds attention', 'Sabi gives Chainfren an owned media surface for ideas, stories, broadcasts, and cultural signal.', 'distribution', 'what-we-build', 8],
  ['creator-network-distribution', 'Creator Network turns reach into distribution', 'The network connects trusted creators, brands, and campaigns so attention can move with context and credibility.', 'distribution', 'what-we-build', 9],
  ['star-factor-proof', 'Star Factor proves the thesis', 'Star Factor is a later milestone designed to test staked entertainment and audience participation in an African context.', 'proof', 'the-road-ahead', 10],
  ['products-owned-infrastructure', 'Products make ownership usable', 'Chainfren\'s products turn lessons from the market into practical infrastructure for audience relationships, payments, media, community, and growth.', 'execution', 'what-we-build', 11],
  ['owned-value-outcome', 'Owned attention creates compounding value', 'When creators and audiences keep the relationship, each cycle can create more data, participation, trust, and value.', 'outcome', 'the-road-ahead', 12],
]

export const THESIS_CLAIMS = baseline.map(([id, title, summary, type, chapterSlug, order]) => ({ id, title, summary, type, chapterSlug, order, publicCitationIds: [] }))

const edgeId = (from, to, relation) => `${from}:${relation}:${to}`
const rows = [
  ['african-value-gap', 'owned-value-outcome', 'constrains'], ['attract-then-extract', 'rented-audience-relationship', 'causes'], ['rented-audience-relationship', 'attention-to-ownership', 'constrains'], ['open-economic-rails', 'attention-to-ownership', 'enables'], ['african-cultural-attention', 'attention-to-ownership', 'enables'], ['attention-to-ownership', 'chainfren-mission', 'enables'], ['chainfren-mission', 'sabi-attention', 'enables'], ['chainfren-mission', 'creator-network-distribution', 'enables'], ['chainfren-mission', 'products-owned-infrastructure', 'enables'], ['sabi-attention', 'creator-network-distribution', 'enables'], ['creator-network-distribution', 'star-factor-proof', 'enables'], ['star-factor-proof', 'attention-to-ownership', 'demonstrates'], ['products-owned-infrastructure', 'owned-value-outcome', 'enables'], ['creator-network-distribution', 'owned-value-outcome', 'enables'], ['attention-to-ownership', 'owned-value-outcome', 'enables'],
]
export const THESIS_EDGES = rows.map(([from, to, relation]) => ({ id: edgeId(from, to, relation), from, to, relation }))
