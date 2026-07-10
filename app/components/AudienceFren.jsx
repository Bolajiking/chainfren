'use client'
// Audience frens — the "two sides, one network" illustrations from the
// For Creators / For Brands card redesign (audience-cards-redesign-spec).
// Exact port of the designer's frenCreator / frenBrands rigs so the homepage
// card and the standalone /for-creators · /for-brands heroes share one figure.
//
//   creators → a single confident fren, arms up "owning", standing on its
//              owned-audience platform, audience dots orbiting (ambient).
//   brands   → two frens meeting in a handshake, a value token passing
//              between them (arrives from the right, then loops hand-to-hand).
//
// Plays its one-time arrival on mount, then rests in ambient micro-motion.
// Honors prefers-reduced-motion (static poses, no loops).
import React, { useEffect, useState } from 'react'

const NAVY = '#08153C', CY = '#5ACDFF', MINT = '#CBF0B8', TOK = '#EAF7FF'
const EO = 'cubic-bezier(0.22,1,0.36,1)'

// Round-cap rig with Q-curve limbs + spineSway (shared across all Chainfren frens).
function Stick({ head, r = 24, bodyTop, shoulder, hip, spineSway = 0,
  lHand, rHand, lFoot, rFoot, lElbow, rElbow, lKnee, rKnee, color = NAVY, sw = 18 }) {
  const S = { stroke: color, strokeWidth: sw, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }
  let torso
  if (spineSway) {
    const mx = (bodyTop[0] + hip[0]) / 2 + spineSway, my = (bodyTop[1] + hip[1]) / 2
    torso = `M${bodyTop[0]} ${bodyTop[1]} Q${mx} ${my} ${hip[0]} ${hip[1]}`
  } else torso = `M${bodyTop[0]} ${bodyTop[1]} L${hip[0]} ${hip[1]}`
  const limb = (a, j, b) => (j ? `M${a[0]} ${a[1]} Q${j[0]} ${j[1]} ${b[0]} ${b[1]}` : `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`)
  return (
    <>
      <path d={torso} {...S} />
      {lHand && <path d={limb(shoulder, lElbow, lHand)} {...S} />}
      {rHand && <path d={limb(shoulder, rElbow, rHand)} {...S} />}
      {lFoot && <path d={limb(hip, lKnee, lFoot)} {...S} />}
      {rFoot && <path d={limb(hip, rKnee, rFoot)} {...S} />}
      <circle cx={head[0]} cy={head[1]} r={r} fill={color} />
    </>
  )
}

const svgStyle = { width: '100%', height: '100%', display: 'block', overflow: 'visible' }

function Creator({ R, color }) {
  const body = color || CY
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" style={svgStyle} role="img" aria-label="Creator owning their audience">
      <g style={R ? {} : { animation: `cfAudFigIn 460ms ${EO} both` }}>
        <ellipse cx={200} cy={386} rx={96} ry={15} fill={MINT} opacity={0.5} />
        <g style={R ? {} : { transformBox: 'view-box', transformOrigin: '200px 214px', animation: 'cfAudOrbit 20000ms linear infinite' }}>
          {[[92, 150, 8, MINT], [318, 168, 7, CY], [302, 300, 6, MINT], [108, 296, 6, CY]].map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={p[2]} fill={p[3]} opacity={0.85} />
          ))}
        </g>
        <g style={R ? {} : { transformBox: 'view-box', transformOrigin: '200px 250px', animation: 'cfAudBreathe 4200ms ease-in-out 700ms infinite' }}>
          <Stick head={[200, 118]} r={22} bodyTop={[200, 142]} shoulder={[200, 202]} hip={[200, 300]} spineSway={2}
            lHand={[150, 72]} lElbow={[176, 126]} rHand={[250, 72]} rElbow={[224, 126]}
            lFoot={[170, 382]} lKnee={[184, 338]} rFoot={[230, 382]} rKnee={[216, 338]} color={body} />
        </g>
      </g>
    </svg>
  )
}

function Brands({ R, color }) {
  const fig = color || NAVY
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" style={svgStyle} role="img" aria-label="Brand and creator exchanging value">
      <g style={R ? {} : { animation: `cfAudFigIn 460ms ${EO} both` }}>
        <Stick head={[132, 124]} r={20} bodyTop={[132, 146]} shoulder={[130, 206]} hip={[128, 300]} spineSway={4}
          rHand={[196, 208]} rElbow={[168, 198]} lHand={[84, 252]} lElbow={[100, 226]}
          rFoot={[150, 382]} rKnee={[140, 340]} lFoot={[104, 382]} lKnee={[108, 340]} color={fig} />
      </g>
      <g style={R ? {} : { animation: `cfAudInR 560ms ${EO} 140ms both` }}>
        <Stick head={[268, 124]} r={20} bodyTop={[268, 146]} shoulder={[270, 206]} hip={[272, 300]} spineSway={-4}
          lHand={[204, 208]} lElbow={[232, 198]} rHand={[316, 252]} rElbow={[300, 226]}
          lFoot={[296, 382]} lKnee={[300, 340]} rFoot={[250, 382]} rKnee={[260, 340]} color={fig} />
      </g>
      <circle cx={200} cy={206} r={11} fill={TOK} stroke={fig} strokeWidth={3}
        style={R ? {} : { transformBox: 'view-box', transformOrigin: '200px 206px', animation: `cfAudPop 520ms ${EO} 540ms both, cfAudTokenPass 2400ms ease-in-out 1100ms infinite` }} />
    </svg>
  )
}

const KEYFRAMES = `
@keyframes cfAudFigIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cfAudInR { from { opacity: 0; transform: translateX(150px); } to { opacity: 1; transform: translateX(0); } }
@keyframes cfAudPop { 0% { transform: scale(0.6); opacity: 0; } 60% { opacity: 1; } 78% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
@keyframes cfAudTokenPass { 0%, 100% { transform: translateX(-14px); } 50% { transform: translateX(14px) translateY(-4px); } }
@keyframes cfAudBreathe { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes cfAudOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes cfAudProg { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.afren-fig[data-reduce="true"] * { animation: none !important; }
`

export default function AudienceFren({ variant = 'creators', color, reduce: reduceProp, className = '', style }) {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setReduce(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])
  const R = reduceProp ?? reduce
  return (
    <span className={'afren-fig ' + className} data-reduce={R ? 'true' : 'false'} style={{ display: 'block', ...style }}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      {variant === 'brands' ? <Brands R={R} color={color} /> : <Creator R={R} color={color} />}
    </span>
  )
}
