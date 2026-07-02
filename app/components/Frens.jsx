'use client'
import React from 'react'

// Shared stick-figure primitive — same construction as the WhatWeBuild engine
// icons (torso line/curve, two limbs per side via quadratic joints, round head).
// Kept local (not imported) so each consumer can scale/stroke independently.
export function Figure({
  cx, headY = 30, r = 11, bodyTop = 42, shoulder = 64, hip = 110,
  lHand, rHand, lFoot, rFoot,
  lElbow, rElbow, lKnee, rKnee,
  spineSway = 0, color = '#08153C', sw = 15,
}) {
  const S = { stroke: color, strokeWidth: sw, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }
  let torsoD
  if (spineSway) {
    const my = (bodyTop + hip) / 2
    torsoD = `M${cx} ${bodyTop} Q${cx + spineSway} ${my} ${cx} ${hip}`
  } else {
    torsoD = `M${cx} ${bodyTop} L${cx} ${hip}`
  }
  const limb = (ax, ay, jx, jy, bx, by) =>
    jx != null ? `M${ax} ${ay} Q${jx} ${jy} ${bx} ${by}` : `M${ax} ${ay} L${bx} ${by}`
  return (
    <g>
      <path d={torsoD} {...S} />
      {lHand && <path d={limb(cx, shoulder, lElbow?.[0], lElbow?.[1], lHand[0], lHand[1])} {...S} />}
      {rHand && <path d={limb(cx, shoulder, rElbow?.[0], rElbow?.[1], rHand[0], rHand[1])} {...S} />}
      {lFoot && <path d={limb(cx, hip, lKnee?.[0], lKnee?.[1], lFoot[0], lFoot[1])} {...S} />}
      {rFoot && <path d={limb(cx, hip, rKnee?.[0], rKnee?.[1], rFoot[0], rFoot[1])} {...S} />}
      <circle cx={cx} cy={headY} r={r} fill={color} />
    </g>
  )
}

// Two figures walking in and meeting — hero pose.
export function HandshakeFrens({ colorA = '#5ACDFF', colorB = '#CBF0B8', sw = 15, className, style }) {
  const HOLD = [200, 176]
  return (
    <svg viewBox="0 0 400 320" className={className} style={style} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
      <Figure cx={140} headY={110} r={13} bodyTop={124} shoulder={148} hip={210} sw={sw} color={colorA}
        spineSway={-4}
        rHand={HOLD} rElbow={[172, 150]}
        lHand={[100, 158]} lElbow={[118, 152]}
        lFoot={[112, 288]} lKnee={[118, 250]}
        rFoot={[148, 288]} rKnee={[142, 250]} />
      <Figure cx={260} headY={110} r={13} bodyTop={124} shoulder={148} hip={210} sw={sw} color={colorB}
        spineSway={4}
        lHand={HOLD} lElbow={[228, 150]}
        rHand={[300, 158]} rElbow={[282, 152]}
        rFoot={[288, 288]} rKnee={[282, 250]}
        lFoot={[252, 288]} lKnee={[258, 250]} />
      <circle cx={HOLD[0]} cy={HOLD[1]} r={7} fill="#08153C" />
    </svg>
  )
}

// Two figures standing together, at ease — "the network."
export function SquadFrens({ colorA = '#5ACDFF', colorB = '#8DAAFF', sw = 14, className, style }) {
  return (
    <svg viewBox="0 0 400 320" className={className} style={style} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
      <Figure cx={160} headY={110} r={13} bodyTop={124} shoulder={148} hip={210} sw={sw} color={colorA}
        rHand={[196, 232]} rElbow={[186, 190]}
        lHand={[122, 250]} lElbow={[130, 190]}
        lFoot={[132, 288]} lKnee={[138, 250]}
        rFoot={[168, 288]} rKnee={[162, 250]} />
      <Figure cx={240} headY={110} r={13} bodyTop={124} shoulder={148} hip={210} sw={sw} color={colorB}
        lHand={[204, 232]} lElbow={[214, 190]}
        rHand={[278, 250]} rElbow={[270, 190]}
        rFoot={[268, 288]} rKnee={[262, 250]}
        lFoot={[232, 288]} lKnee={[238, 250]} />
    </svg>
  )
}

// Arms-up celebration — final CTA callback.
export function CheerFrens({ colorA = '#CCFF00', colorB = '#5ACDFF', sw = 15, className, style }) {
  return (
    <svg viewBox="0 0 400 320" className={className} style={style} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
      <Figure cx={160} headY={116} r={13} bodyTop={130} shoulder={154} hip={210} sw={sw} color={colorA}
        spineSway={-3}
        rHand={[96, 84]} rElbow={[110, 118]}
        lHand={[196, 90]} lElbow={[176, 120]}
        lFoot={[130, 288]} lKnee={[136, 250]}
        rFoot={[172, 288]} rKnee={[164, 250]} />
      <Figure cx={240} headY={116} r={13} bodyTop={130} shoulder={154} hip={210} sw={sw} color={colorB}
        spineSway={3}
        lHand={[304, 84]} lElbow={[290, 118]}
        rHand={[204, 90]} rElbow={[224, 120]}
        rFoot={[270, 288]} rKnee={[264, 250]}
        lFoot={[228, 288]} lKnee={[236, 250]} />
    </svg>
  )
}

// Single figure reaching toward one edge — used in the fork's two halves.
// facing: 'right' reaches with its right arm toward the seam, 'left' mirrors.
export function FrenSolo({ facing = 'right', color = '#08153C', sw = 15, className, style }) {
  const mirrored = facing === 'left'
  return (
    <svg viewBox="0 0 260 320" className={className} style={style} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio={mirrored ? 'xMaxYMax meet' : 'xMinYMax meet'}>
      <g transform={mirrored ? 'translate(260,0) scale(-1,1)' : undefined}>
        <Figure cx={90} headY={110} r={14} bodyTop={126} shoulder={150} hip={214} sw={sw} color={color}
          spineSway={-3}
          rHand={[210, 168]} rElbow={[160, 150]}
          lHand={[46, 210]} lElbow={[62, 190]}
          lFoot={[66, 292]} lKnee={[74, 254]}
          rFoot={[112, 292]} rKnee={[104, 254]} />
      </g>
    </svg>
  )
}

// Compact four-step progression — "how it works" mini icons.
// Returns just a Figure at a given micro-pose index (0..3): meet, match, activate, lift.
export function StepFren({ step = 0, color = '#08153C', sw = 13, className, style }) {
  const poses = [
    // 0 · meet — walking, arms swinging
    { rHand: [148, 150], rElbow: [168, 140], lHand: [92, 168], lElbow: [108, 150], lFoot: [88, 240], lKnee: [96, 210], rFoot: [140, 240], rKnee: [132, 210], spineSway: -2 },
    // 1 · match — arm extended offering
    { rHand: [186, 128], rElbow: [168, 138], lHand: [88, 176], lElbow: [104, 156], lFoot: [96, 240], lKnee: [102, 210], rFoot: [140, 240], rKnee: [132, 210], spineSway: 0 },
    // 2 · activate — dynamic, both arms out
    { rHand: [196, 118], rElbow: [172, 132], lHand: [64, 118], lElbow: [88, 132], lFoot: [92, 240], lKnee: [102, 208], rFoot: [148, 240], rKnee: [138, 208], spineSway: 3 },
    // 3 · lift — arm raised, celebratory
    { rHand: [176, 66], rElbow: [162, 108], lHand: [90, 168], lElbow: [104, 150], lFoot: [96, 240], lKnee: [102, 210], rFoot: [140, 240], rKnee: [132, 210], spineSway: -2 },
  ]
  const p = poses[step % poses.length]
  return (
    <svg viewBox="0 0 260 280" className={className} style={style} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
      <Figure cx={120} headY={92} r={12} bodyTop={106} shoulder={128} hip={190} sw={sw} color={color} {...p} />
    </svg>
  )
}
