const baseline = [
  ['african-attention-value', 'African attention should create African value', 'Africans create attention across culture, commerce, and community. More of the value should stay with the people and relationships that create it.', 'context', 'the-gap', 1],
  ['african-value-gap', 'The African value gap', 'African attention travels widely, but control of the relationships and value around it often sits elsewhere.', 'diagnosis', 'the-gap', 2],
  ['extractive-systems', 'Extraction is a system', 'A system can attract people with reach, then keep control of discovery, identity, data, relationships, distribution, and payment.', 'diagnosis', 'the-trap', 3],
  ['rented-relationships', 'Rented relationships', 'A relationship is fragile when another company can change access, reach, data, or payment without the community choosing it.', 'diagnosis', 'the-trap', 4],
  ['open-rails', 'Open rails enabled by blockchain', 'Open rails can support portable identity, direct payments, transparent settlement, participation, and credible commitments without leaving one company with every key.', 'mechanism', 'the-unlock', 5],
  ['distribution-first', 'Distribution comes first', 'Chainfren starts where attention and trust already move, then uses that route to build products into people\'s lives.', 'execution', 'the-company', 6],
  ['attention-to-participation', 'Attention can become participation', 'Attention gains meaning when people can take a clear and voluntary role in what they support.', 'mechanism', 'the-thesis', 7],
  ['participation-to-ownership', 'Participation can become ownership', 'Participation should lead toward portable relationships, customer control, and the right to leave.', 'mission', 'the-thesis', 8],
  ['ownership-to-value', 'Ownership can create durable value', 'When people can keep a relationship, the value created through it can stay closer and grow through continued participation.', 'outcome', 'the-thesis', 9],
  ['chainfren-mission', "Chainfren's mission", 'Chainfren exists to enable Africans to own the full value their attention generates on the internet.', 'mission', 'the-company', 10],
  ['tivi-product', 'TiVi gives participation a product home', 'TiVi gives creators and organisations a media channel they can control and a place where audience relationships can continue after attention.', 'execution', 'what-we-build', 11],
  ['african-built-ecosystem', 'An African-built open ecosystem', 'The ambition is an open ecosystem built by Africans where people can distribute, participate, own, and earn on practical rails.', 'outcome', 'the-road-ahead', 12],
]

export const THESIS_CLAIMS = baseline.map(([id, title, summary, type, chapterSlug, order]) => ({ id, title, summary, type, chapterSlug, order, publicCitationIds: [] }))

const edgeId = (from, to, relation) => `${from}:${relation}:${to}`
const rows = [
  ['extractive-systems', 'african-value-gap', 'causes'],
  ['extractive-systems', 'rented-relationships', 'causes'],
  ['rented-relationships', 'african-attention-value', 'constrains'],
  ['african-attention-value', 'attention-to-participation', 'enables'],
  ['open-rails', 'participation-to-ownership', 'enables'],
  ['distribution-first', 'attention-to-participation', 'enables'],
  ['attention-to-participation', 'participation-to-ownership', 'enables'],
  ['participation-to-ownership', 'ownership-to-value', 'enables'],
  ['ownership-to-value', 'african-built-ecosystem', 'enables'],
  ['chainfren-mission', 'distribution-first', 'enables'],
  ['chainfren-mission', 'tivi-product', 'enables'],
  ['tivi-product', 'participation-to-ownership', 'enables'],
  ['open-rails', 'tivi-product', 'enables'],
  ['distribution-first', 'tivi-product', 'enables'],
  ['tivi-product', 'ownership-to-value', 'enables'],
]
export const THESIS_EDGES = rows.map(([from, to, relation]) => ({ id: edgeId(from, to, relation), from, to, relation }))
