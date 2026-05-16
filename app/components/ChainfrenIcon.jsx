import React from 'react'

const NAVY = '#08153C'

// Standalone H mark in the pillar leg style. Mono color (defaults to navy).
export default function ChainfrenIcon({
  color = NAVY,
  size,
  className,
  style,
  ariaLabel = 'Chainfren mark',
}) {
  const sw = 18
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      fill="none"
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{ width: size, height: size, ...style }}
    >
      <g stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <line x1="138" y1="78"  x2="138" y2="268" />
        <line x1="262" y1="78"  x2="262" y2="268" />
        <line x1="138" y1="140" x2="262" y2="140" />
        <line x1="138" y1="268" x2="118" y2="380" />
        <line x1="138" y1="268" x2="158" y2="380" />
        <line x1="262" y1="268" x2="242" y2="380" />
        <line x1="262" y1="268" x2="282" y2="380" />
      </g>
      <circle cx="138" cy="50" r="24" fill={color} />
      <circle cx="262" cy="50" r="24" fill={color} />
    </svg>
  )
}
