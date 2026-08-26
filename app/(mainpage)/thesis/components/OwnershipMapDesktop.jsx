'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import styles from '../thesis.module.css'
import { resolveMapClaim } from '@/lib/thesis/ownership-map.mjs'
import { THESIS_CLAIMS, THESIS_EDGES } from '@/content/chainfren-thesis/claims.mjs'
import { THESIS_MAP_LAYOUT } from '@/content/chainfren-thesis/map-layout.mjs'

const CANVAS = { width: 1280, height: 540 }
const NODE = { width: 240, height: 60 }
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const center = (position) => ({ x: position.x + NODE.width / 2, y: position.y + NODE.height / 2 })
const nodeBoundaryPoint = (from, to) => {
  const delta = { x: to.x - from.x, y: to.y - from.y }
  const scale = 1 / Math.max(Math.abs(delta.x) / (NODE.width / 2), Math.abs(delta.y) / (NODE.height / 2))
  return { x: from.x + delta.x * scale, y: from.y + delta.y * scale }
}

export default function OwnershipMapDesktop() {
  const claims = THESIS_CLAIMS
  const edges = THESIS_EDGES
  const layout = THESIS_MAP_LAYOUT
  const validIds = useMemo(() => new Set(claims.map((claim) => claim.id)), [claims])
  const claimsById = useMemo(() => new Map(claims.map((claim) => [claim.id, claim])), [claims])
  const start = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('claim')
  const [selected, setSelected] = useState(resolveMapClaim(claims, start))
  const [view, setView] = useState({ x: 0, y: 0, scale: 0.9 })
  const drag = useRef(null)
  const selectedClaim = claims.find((claim) => claim.id === selected) || claims[0]

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('claim')
    if (requested !== selected) {
      window.history.replaceState(null, '', `${window.location.pathname}?claim=${encodeURIComponent(selected)}${window.location.hash}`)
    }
  }, [selected])

  const select = (id) => setSelected(validIds.has(id) ? id : resolveMapClaim(claims, null))
  const zoom = (amount) => setView((current) => ({ ...current, scale: clamp(current.scale + amount, 0.55, 1.45) }))
  const fit = () => setView({ x: 0, y: 0, scale: 0.9 })
  const point = (event) => ({ x: event.clientX, y: event.clientY })

  return (
    <section className={styles.ownershipMap} aria-labelledby="ownership-map-title">
      <div className={styles.mapToolbar}>
        <div><h2 id="ownership-map-title">Explore the ownership map</h2><p id="map-help">Select a claim, drag the canvas, or use the zoom controls.</p></div>
        <div className={styles.mapControls} aria-label="Map controls">
          <button type="button" onClick={() => zoom(-0.15)} aria-label="Zoom out">−</button>
          <button type="button" onClick={() => zoom(0.15)} aria-label="Zoom in">+</button>
          <button type="button" onClick={fit}>Fit map</button>
        </div>
      </div>
      <div className={styles.mapViewport} role="region" aria-label="Ownership claim map" aria-describedby="map-help" onPointerDown={(event) => { drag.current = point(event); event.currentTarget.setPointerCapture(event.pointerId) }} onPointerMove={(event) => { if (!drag.current) return; const next = point(event); setView((current) => ({ ...current, x: current.x + next.x - drag.current.x, y: current.y + next.y - drag.current.y })); drag.current = next }} onPointerUp={() => { drag.current = null }}>
        <svg viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}>
          <defs>
            <marker id="ownership-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
              <path d="M 0 0 L 8 4 L 0 8 z" />
            </marker>
          </defs>
          <g transform={`translate(${view.x} ${view.y}) scale(${view.scale})`}>
            {edges.map((edge) => {
              const sourceClaim = claimsById.get(edge.from)
              const targetClaim = claimsById.get(edge.to)
              const sourceCenter = center(layout[edge.from])
              const targetCenter = center(layout[edge.to])
              const start = nodeBoundaryPoint(sourceCenter, targetCenter)
              const finish = nodeBoundaryPoint(targetCenter, sourceCenter)
              const label = { x: (start.x + finish.x) / 2, y: (start.y + finish.y) / 2 - 6 }
              return (
                <g key={edge.id} role="img" aria-label={`${sourceClaim.title} ${edge.relation} ${targetClaim.title}`}>
                  <title>{`${sourceClaim.title} ${edge.relation} ${targetClaim.title}`}</title>
                  <line className={styles.mapEdge} x1={start.x} y1={start.y} x2={finish.x} y2={finish.y} markerEnd="url(#ownership-arrow)" />
                  <text className={styles.mapEdgeLabel} x={label.x} y={label.y} textAnchor="middle">{edge.relation}</text>
                </g>
              )
            })}
            {claims.map((claim) => { const position = layout[claim.id]; const active = claim.id === selected; return <g key={claim.id} className={`${styles.mapNode} ${active ? styles.mapNodeActive : ''}`} transform={`translate(${position.x} ${position.y})`} tabIndex="0" role="button" aria-pressed={active} aria-label={`Select ${claim.title}`} onClick={() => select(claim.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(claim.id) } }}><rect width="240" height="60" rx="12" /><text x="16" y="26">{claim.title}</text><text x="16" y="45">{claim.type}</text></g> })}
          </g>
        </svg>
      </div>
      <aside className={styles.mapDetails} aria-live="polite">
        <p className={styles.kicker}>{selectedClaim.type}</p><h3>{selectedClaim.title}</h3><p>{selectedClaim.summary}</p>
        <Link href={`/thesis/read/${selectedClaim.chapterSlug}`}>Read the chapter</Link>
      </aside>
    </section>
  )
}
