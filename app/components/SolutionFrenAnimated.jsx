'use client'
// Animated solution fren — the choreographed "arrival" illustrations from the
// homepage What We Build slider (see WhatWeBuild.jsx), lifted into a reusable
// component so every standalone solution hero shows the same living figure
// instead of a static pose. Colours are parametrized (`color` main, `sub`
// secondary) so each illo reads on its hero background (navy or white).
//
// The figure plays its one-time arrival choreography on mount, then rests with
// at most a subtle ambient beat. Honors prefers-reduced-motion (static rest).
import React, { useState, useEffect } from 'react'

const NAVY = '#08153C'

// Round-cap rig — Q-curve limbs bowing toward a joint, spineSway for weight
// shift. fill=false renders a hollow "ghost" head. (Verbatim from WhatWeBuild.)
function Stick({
  head, r = 24, bodyTop, shoulder, hip, spineSway = 0,
  lHand, rHand, lFoot, rFoot, lElbow, rElbow, lKnee, rKnee,
  color = NAVY, sw = 18, fill = true,
}) {
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
      <circle cx={head[0]} cy={head[1]} r={r}
        fill={fill ? color : 'none'} stroke={fill ? 'none' : color} strokeWidth={fill ? 0 : sw} />
    </>
  )
}

const glowOf = (c) => (typeof c === 'string' && /^#[0-9a-fA-F]{6}$/.test(c) ? c + '88' : c)

function Illo({ id, color = NAVY, sub = color, reduce }) {
  if (id === 'media-launchpad') {
    // Going live — raised-arms antenna pose, rings ripple from above the head,
    // a dot pops at the instant of going live, then one soft ring keeps a beat.
    const ORG = '200px 44px'
    const ring = (i, ambient) => (
      <circle key={'r' + i + (ambient ? 'a' : '')} cx={200} cy={44} r={46} fill="none" stroke={color} strokeWidth={5}
        style={reduce ? { opacity: ambient ? 0 : 0.22 } : {
          transformBox: 'view-box', transformOrigin: ORG, opacity: 0,
          animation: ambient
            ? `cfRingAmb 5000ms var(--wwb-ease) ${1600 + i * 180}ms infinite`
            : `cfRing 1300ms var(--wwb-ease) ${i * 160}ms both`,
        }} />
    )
    return (<>
      {ring(0, false)}{ring(1, false)}{ring(2, false)}
      {!reduce && ring(0, true)}
      <circle cx={200} cy={44} r={9} fill={color}
        style={reduce ? {} : { transformBox: 'view-box', transformOrigin: ORG, animation: 'cfPop 700ms var(--wwb-ease) 240ms both' }} />
      <Stick head={[200, 86]} r={24} bodyTop={[200, 112]} shoulder={[200, 176]} hip={[200, 290]} spineSway={3}
        lHand={[150, 36]} lElbow={[176, 96]} rHand={[250, 36]} rElbow={[224, 96]}
        lFoot={[166, 388]} lKnee={[182, 338]} rFoot={[234, 388]} rKnee={[218, 338]} color={color} />
    </>)
  }

  if (id === 'creator-growth-os') {
    // The climb — steps draw L→R, a helper boosts from below, the climber rises
    // one clear step, a trend-line traces the ascent, the audience gathers.
    const steps = (
      <path d="M52 356 L148 356 L148 308 L244 308 L244 260 L340 260" fill="none" stroke={sub} strokeWidth={15}
        strokeLinecap="round" strokeLinejoin="round" pathLength={100}
        style={reduce ? {} : { strokeDasharray: 100, strokeDashoffset: 100, animation: 'cfDraw 680ms var(--wwb-ease) both' }} />
    )
    const grow = (
      <g style={{ opacity: 0.55 }}>
        <path d="M70 366 L330 176" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" pathLength={100}
          style={reduce ? {} : { strokeDasharray: 100, strokeDashoffset: 100, animation: 'cfDraw 820ms var(--wwb-ease) 360ms both' }} />
        <path d="M312 172 L332 174 L322 192" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
          style={reduce ? {} : { opacity: 0, animation: 'cfFigIn 300ms var(--wwb-ease) 1080ms both' }} />
      </g>
    )
    const climber = (
      <g style={reduce ? {} : { animation: 'cfRise 760ms var(--wwb-ease) 560ms both' }}>
        <Stick head={[196, 146]} r={20} bodyTop={[194, 168]} shoulder={[188, 220]} hip={[178, 282]} spineSway={11}
          rHand={[244, 196]} rElbow={[222, 198]} lHand={[150, 236]} lElbow={[164, 214]}
          rFoot={[214, 308]} rKnee={[206, 284]} lFoot={[150, 356]} lKnee={[152, 320]} color={color} />
      </g>
    )
    const helper = (
      <g style={reduce ? {} : { animation: 'cfFigIn 540ms var(--wwb-ease) 220ms both' }}>
        <Stick head={[92, 230]} r={16} bodyTop={[92, 250]} shoulder={[94, 292]} hip={[96, 344]} spineSway={5}
          rHand={[146, 240]} rElbow={[120, 256]} lHand={[70, 300]} lElbow={[80, 278]}
          rFoot={[110, 392]} rKnee={[106, 368]} lFoot={[78, 392]} lKnee={[82, 368]} color={sub} sw={15} />
      </g>
    )
    const dots = [[300, 116], [328, 100], [346, 128], [312, 80]].map((p, i) => (
      <circle key={'g' + i} cx={p[0]} cy={p[1]} r={i === 0 ? 9 : 7} fill={color}
        style={reduce ? { opacity: 0.9 } : {
          transformBox: 'view-box', transformOrigin: `${p[0]}px ${p[1]}px`,
          opacity: 0, animation: `cfGather 440ms var(--wwb-ease) ${1000 + i * 130}ms both`,
        }} />
    ))
    return (<>{grow}{steps}{helper}{climber}{dots}</>)
  }

  if (id === 'community-loyalty') {
    // The chain forms — chain + fren = chainfren. Center present at slide-in;
    // flanks slide in from the edges and link arms; a token passes along the line.
    const token = (
      <circle cx={150} cy={166} r={10} fill={color}
        style={reduce ? { opacity: 0 } : { transformBox: 'view-box', animation: 'cfToken 2600ms var(--wwb-ease) 760ms infinite' }} />
    )
    return (<>
      <g style={reduce ? {} : { animation: 'cfSlideL 560ms var(--wwb-ease) 120ms both' }}>
        <Stick head={[104, 110]} r={20} bodyTop={[104, 132]} shoulder={[104, 186]} hip={[106, 278]} spineSway={4}
          rHand={[150, 166]} rElbow={[128, 158]} lHand={[74, 238]} lElbow={[86, 202]}
          rFoot={[128, 384]} rKnee={[120, 340]} lFoot={[84, 384]} lKnee={[90, 340]} color={sub} sw={17} />
      </g>
      <g style={reduce ? {} : { animation: 'cfSlideR 560ms var(--wwb-ease) 120ms both' }}>
        <Stick head={[296, 110]} r={20} bodyTop={[296, 132]} shoulder={[296, 186]} hip={[294, 278]} spineSway={-4}
          lHand={[250, 166]} lElbow={[272, 158]} rHand={[326, 238]} rElbow={[314, 202]}
          lFoot={[272, 384]} lKnee={[280, 340]} rFoot={[316, 384]} rKnee={[310, 340]} color={sub} sw={17} />
      </g>
      <g>
        <Stick head={[200, 92]} r={22} bodyTop={[200, 116]} shoulder={[200, 172]} hip={[200, 272]} spineSway={0}
          lHand={[150, 166]} lElbow={[176, 150]} rHand={[250, 166]} rElbow={[224, 150]}
          lFoot={[172, 384]} lKnee={[184, 336]} rFoot={[228, 384]} rKnee={[216, 336]} color={color} />
      </g>
      {token}
    </>)
  }

  if (id === 'ai-agents') {
    // The echo — one solid fren waves; two ghost echoes mirror it a beat later,
    // translucent + glowing. Hard cap: two echoes. Restraint is the point.
    const glow = glowOf(sub)
    const armWave = (cx, c, sw) => (
      <g style={reduce ? {} : { transformBox: 'view-box', transformOrigin: `${cx}px 172px`, animation: 'cfWave 1500ms var(--wwb-ease) 260ms 1 both' }}>
        <path d={`M${cx} 172 Q${cx + 30} 120 ${cx + 40} 74`} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
    const body = (cx, c, sw, fill) => (
      <Stick head={[cx, 90]} r={22} bodyTop={[cx, 114]} shoulder={[cx, 172]} hip={[cx, 268]} spineSway={2}
        lHand={[cx - 42, 224]} lElbow={[cx - 30, 196]}
        lFoot={[cx - 28, 384]} lKnee={[cx - 16, 336]} rFoot={[cx + 28, 384]} rKnee={[cx + 16, 336]}
        color={c} sw={sw} fill={fill} />
    )
    const echo = (i, cx) => (
      <g key={'e' + i}
        style={reduce
          ? { opacity: 0.32, filter: `drop-shadow(0 0 5px ${glow})` }
          : { opacity: 0, filter: `drop-shadow(0 0 6px ${glow})`, animation: `cfEcho 620ms var(--wwb-ease) ${420 + i * 260}ms both` }}>
        {body(cx, sub, 14, false)}{armWave(cx, sub, 14)}
      </g>
    )
    return (<>
      <g>{body(150, color, 18, true)}{armWave(150, color, 18)}</g>
      {echo(0, 236)}{echo(1, 312)}
    </>)
  }
  return null
}

// One-shot keyframes + easing var, injected so the illos animate on any page
// (the homepage defines these inside WhatWeBuild's styled-jsx; solution pages
// don't render that component). Duplicate injection is harmless.
const KEYFRAMES = `
@keyframes cfRing { 0% { transform: scale(0.22); opacity: 0; } 14% { opacity: 0.9; } 100% { transform: scale(1); opacity: 0; } }
@keyframes cfRingAmb { 0% { transform: scale(0.22); opacity: 0; } 5% { opacity: 0.55; } 30% { opacity: 0; } 100% { transform: scale(1); opacity: 0; } }
@keyframes cfPop { 0% { transform: scale(0); opacity: 0; } 55% { opacity: 1; } 72% { transform: scale(1.35); } 100% { transform: scale(1); opacity: 1; } }
@keyframes cfFigIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cfDraw { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
@keyframes cfRise { 0% { opacity: 0.25; transform: translate(-26px,44px); } 60% { opacity: 1; } 100% { opacity: 1; transform: translate(0,0); } }
@keyframes cfGather { from { opacity: 0; transform: translateY(7px) scale(0.4); } to { opacity: 0.9; transform: translateY(0) scale(1); } }
@keyframes cfSlideL { from { opacity: 0; transform: translateX(-160px); } to { opacity: 1; transform: translateX(0); } }
@keyframes cfSlideR { from { opacity: 0; transform: translateX(160px); } to { opacity: 1; transform: translateX(0); } }
@keyframes cfToken { 0% { opacity: 0; transform: translateX(0) translateY(0); } 10% { opacity: 1; } 50% { transform: translateX(88px) translateY(-3px); } 90% { opacity: 1; } 100% { opacity: 0; transform: translateX(176px) translateY(0); } }
@keyframes cfEcho { from { opacity: 0; transform: translateX(-14px); } to { opacity: 0.34; transform: translateX(0); } }
@keyframes cfWave { 0% { transform: rotate(6deg); } 22% { transform: rotate(-14deg); } 46% { transform: rotate(4deg); } 68% { transform: rotate(-8deg); } 100% { transform: rotate(0deg); } }
@media (prefers-reduced-motion: reduce) { .sfa-fig * { animation: none !important; } }
`

export default function SolutionFrenAnimated({ id, color = NAVY, sub, className = '', style, label = 'Chainfren figure' }) {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setReduce(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])
  return (
    <span className={'sfa ' + className} style={{ ['--wwb-ease']: 'cubic-bezier(0.22,1,0.36,1)', display: 'block', ...style }}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <svg className="sfa-fig" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label}
        style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}>
        <Illo id={id} color={color} sub={sub || color} reduce={reduce} />
      </svg>
    </span>
  )
}
