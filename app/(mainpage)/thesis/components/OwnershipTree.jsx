import Link from 'next/link'
import styles from '../thesis.module.css'

const labels = { context: 'Context', diagnosis: 'Diagnosis', mechanism: 'Mechanism', mission: 'Mission', distribution: 'Distribution', execution: 'Execution', proof: 'Proof', outcome: 'Outcome' }

export default function OwnershipTree({ claims, edges }) {
  const groups = Object.keys(labels).map((type) => ({ type, claims: claims.filter((claim) => claim.type === type) })).filter((group) => group.claims.length)
  const claimsById = new Map(claims.map((claim) => [claim.id, claim]))
  return (
    <section className={styles.ownershipTree} aria-labelledby="ownership-outline-title">
      <h2 id="ownership-outline-title">The argument, in order</h2>
      <p>Every claim links to its chapter in the publication.</p>
      {groups.map(({ type, claims: group }) => (
        <details key={type} open={type === 'mission'}>
          <summary>{labels[type]}</summary>
          <ol>
            {group.map((claim) => (
              <li key={claim.id} id={`claim-${claim.id}`}>
                <article>
                  <h3><Link href={`/thesis/read/${claim.chapterSlug}`}>{claim.title}</Link></h3>
                  <p>{claim.summary}</p>
                  <Link href={`/thesis/read/${claim.chapterSlug}`}>Read {claim.chapterSlug.replaceAll('-', ' ')}</Link>
                </article>
              </li>
            ))}
          </ol>
        </details>
      ))}
      <section aria-label="Exact ordered claim relationships">
        <h2>How the claims connect</h2>
        <ol className={styles.ownershipRelationships}>
          {edges.map((edge) => {
            const sourceClaim = claimsById.get(edge.from)
            const targetClaim = claimsById.get(edge.to)
            return (
              <li key={edge.id}>
                <Link href={`/thesis/read/${sourceClaim.chapterSlug}`}>{sourceClaim.title}</Link>
                <span>{edge.relation}</span>
                <Link href={`/thesis/read/${targetClaim.chapterSlug}`}>{targetClaim.title}</Link>
              </li>
            )
          })}
        </ol>
      </section>
    </section>
  )
}
