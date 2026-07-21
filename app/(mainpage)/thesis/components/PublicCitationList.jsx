import { PUBLIC_CITATIONS } from '@/content/chainfren-thesis/citations.mjs'

const PUBLIC_CITATION_RECORDS = new Set(PUBLIC_CITATIONS)

const isPublicCitation = (citation) => {
  if (!PUBLIC_CITATION_RECORDS.has(citation)) return false
  if (typeof citation.title !== 'string' || typeof citation.publisher !== 'string') return false
  try {
    return new URL(citation.url).protocol === 'https:'
  } catch {
    return false
  }
}

export default function PublicCitationList({ citations = [] }) {
  const publicCitations = citations.filter(isPublicCitation)
  if (publicCitations.length === 0) return null

  return (
    <section aria-label="Public sources">
      <h2>Public sources</h2>
      <ul>
        {publicCitations.map((citation) => (
          <li key={citation.url}>
            <a href={citation.url} target="_blank" rel="noreferrer">{citation.title}</a>
            <span> ({citation.publisher})</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
