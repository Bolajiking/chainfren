export const CHAPTER_REGISTRY_SLUGS = Object.freeze([
  'the-gap',
  'the-trap',
  'the-unlock',
  'the-thesis',
  'the-company',
  'what-we-build',
  'how-we-work',
  'the-road-ahead',
  'build-with-us',
])

export function createChapterRegistry(components) {
  const entries = new Map()
  for (const slug of CHAPTER_REGISTRY_SLUGS) {
    const component = components[slug]
    if (typeof component !== 'function') throw new Error(`Chapter registry requires a component for ${slug}`)
    entries.set(slug, component)
  }
  for (const slug of Object.keys(components)) {
    if (!entries.has(slug)) throw new Error(`Chapter registry contains an unknown chapter: ${slug}`)
  }

  return Object.freeze({
    get: (slug) => entries.get(slug) ?? null,
    has: (slug) => entries.has(slug),
    getPublished: (manifest) => manifest.filter((chapter) => entries.has(chapter.slug)),
  })
}
