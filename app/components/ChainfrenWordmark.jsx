import React from 'react'

const NAVY = '#08153C'

// Wordmark = "c" + new pillar-leg H mark + "ainfren" set in Inter Display.
// Mark renders as inline SVG so the parent page's font is used for the
// surrounding letters (matches the design system spec).
export default function ChainfrenWordmark({
  color = NAVY,
  fontSize = 20,
  className,
  style,
  ariaLabel = 'Chainfren',
}) {
  const sw = 8

  const HM = {
    headR: 6, headY: 18,
    bodyTop: 26, barY: 52, hip: 86, footY: 132,
    lcx: 12, rcx: 56,
    vbW: 68, vbH: 140,
  }

  const lineStyle = {
    stroke: color, strokeWidth: sw, fill: 'none',
    strokeLinecap: 'round', strokeLinejoin: 'round',
  }

  // Spacer reserves only the H-mark's horizontal slot. Height is 0 so it
  // contributes nothing to the line-box — meaning the wordmark's vertical
  // extent matches plain text exactly, and parents (e.g. the nav pill) center
  // the LETTERS "c…ainfren" on the same line as adjacent uppercase labels.
  const hMarkAspect = HM.vbW / HM.vbH // ≈ 0.486
  const hMarkSlotW = `${hMarkAspect * 1.4}em`

  const hMark = (
    <span
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'inline-block',
        width: hMarkSlotW,
        height: 0,
        marginInline: '0.02em',
        verticalAlign: 'baseline',
      }}
    >
      <svg
        viewBox={`0 0 ${HM.vbW} ${HM.vbH}`}
        style={{
          position: 'absolute',
          left: 0,
          // SVG bottom sits 0.286em below baseline — i.e. at the descender
          // line — matching the canonical spec placement of the H mark.
          bottom: '-0.286em',
          height: '1.4em',
          width: `${hMarkAspect * 1.4}em`,
          overflow: 'visible',
        }}
      >
        <line x1={HM.lcx} y1={HM.bodyTop} x2={HM.lcx} y2={HM.hip} style={lineStyle}/>
        <line x1={HM.lcx} y1={HM.barY}   x2={HM.rcx} y2={HM.barY} style={lineStyle}/>
        <line x1={HM.lcx} y1={HM.hip}    x2={HM.lcx - 8} y2={HM.footY} style={lineStyle}/>
        <line x1={HM.lcx} y1={HM.hip}    x2={HM.lcx + 8} y2={HM.footY} style={lineStyle}/>
        <circle cx={HM.lcx} cy={HM.headY} r={HM.headR} fill={color}/>
        <line x1={HM.rcx} y1={HM.bodyTop} x2={HM.rcx} y2={HM.hip} style={lineStyle}/>
        <line x1={HM.rcx} y1={HM.hip}    x2={HM.rcx - 8} y2={HM.footY} style={lineStyle}/>
        <line x1={HM.rcx} y1={HM.hip}    x2={HM.rcx + 8} y2={HM.footY} style={lineStyle}/>
        <circle cx={HM.rcx} cy={HM.headY} r={HM.headR} fill={color}/>
      </svg>
    </span>
  )

  return (
    <span
      className={className}
      aria-label={ariaLabel}
      role="img"
      style={{
        fontFamily: '"Inter Display", Inter, system-ui, sans-serif',
        fontWeight: 500,
        fontSize,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        color,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <span aria-hidden="true">c</span>
      {hMark}
      <span aria-hidden="true">ainfren</span>
    </span>
  )
}
