import { normalizePublicCitations } from '@/lib/thesis/public-presentation.mjs'

export default function PublicCitationList({ citations = [] }) {
  const publicCitations = normalizePublicCitations(citations)
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
