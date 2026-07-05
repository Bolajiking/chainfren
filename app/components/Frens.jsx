'use client'
import React from 'react'

// Faithful port of the Chainfren design system's frens/Frens.jsx pose library
// (from the "Chainfren Creator Network" design capture). Two-figure stick-man
// compositions, 400x400 viewBox. Humanity comes from quadratic-bezier limbs
// that bow toward an elbow/knee control point instead of snapping at sharp
// angles, plus spineSway for weight shift — real human movement mechanics,
// not rigid geometric figures.

const NAVY = '#08153C'

function Stickman({
  head, r = 24, bodyTop, shoulder, hip, spineSway = 0,
  lHand = null, rHand = null, lFoot = null, rFoot = null,
  lElbow = null, rElbow = null, lKnee = null, rKnee = null,
  color = NAVY, sw = 18, rotate = 0, hideHead = false,
}) {
  const stroke = { stroke: color, strokeWidth: sw, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }

  let torsoD
  if (spineSway) {
    const mx = (bodyTop[0] + hip[0]) / 2 + spineSway
    const my = (bodyTop[1] + hip[1]) / 2
    torsoD = `M${bodyTop[0]} ${bodyTop[1]} Q${mx} ${my} ${hip[0]} ${hip[1]}`
  } else {
    torsoD = `M${bodyTop[0]} ${bodyTop[1]} L${hip[0]} ${hip[1]}`
  }

  const limbD = (a, j, b) => (j ? `M${a[0]} ${a[1]} Q${j[0]} ${j[1]} ${b[0]} ${b[1]}` : `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`)

  const content = (
    <g>
      <path d={torsoD} {...stroke} />
      {lHand && <path d={limbD(shoulder, lElbow, lHand)} {...stroke} />}
      {rHand && <path d={limbD(shoulder, rElbow, rHand)} {...stroke} />}
      {lFoot && <path d={limbD(hip, lKnee, lFoot)} {...stroke} />}
      {rFoot && <path d={limbD(hip, rKnee, rFoot)} {...stroke} />}
      {!hideHead && <circle cx={head[0]} cy={head[1]} r={r} fill={color} />}
    </g>
  )
  if (rotate) return <g transform={`rotate(${rotate} ${head[0]} ${head[1]})`}>{content}</g>
  return content
}

function upright(cx, color, opts = {}) {
  return {
    head: [cx, 50], r: 24, bodyTop: [cx, 78], shoulder: [cx, 140], hip: [cx, 268],
    lFoot: [cx - 34, 380], rFoot: [cx + 34, 380], color, sw: 18, ...opts,
  }
}

const BAR_Y = 140

function PoseMark(a, b, sw = 18) {
  const lx = 138, rx = 262
  return (
    <g>
      <Stickman {...upright(lx, a, { sw, rHand: [200, BAR_Y] })} />
      <Stickman {...upright(rx, b, { sw, lHand: [200, BAR_Y] })} />
    </g>
  )
}

function PoseStride(a, b, sw = 18) {
  const lx = 138, rx = 262
  return (
    <g>
      <Stickman {...upright(lx, a, { sw, rHand: [200, BAR_Y], lFoot: [lx - 56, 378], lKnee: [lx - 36, 326], rFoot: [lx + 14, 380], rKnee: [lx + 2, 330] })} />
      <Stickman {...upright(rx, b, { sw, lHand: [200, BAR_Y], lFoot: [rx - 56, 378], lKnee: [rx - 36, 326], rFoot: [rx + 14, 380], rKnee: [rx + 2, 330] })} />
    </g>
  )
}

function PoseHandshake(a, b, sw = 18) {
  const lx = 120, rx = 280
  const meet = [200, 218]
  return (
    <g>
      <Stickman {...upright(lx, a, { sw, rHand: meet, rElbow: [165, 175], lHand: [lx - 22, 244], lElbow: [lx - 14, 200] })} />
      <Stickman {...upright(rx, b, { sw, lHand: meet, lElbow: [235, 175], rHand: [rx + 22, 244], rElbow: [rx + 14, 200] })} />
      <circle cx={meet[0]} cy={meet[1]} r={sw * 0.5} fill={a} />
    </g>
  )
}

function PoseHighFive(a, b, sw = 18) {
  const lx = 124, rx = 276
  const apex = [200, 22]
  return (
    <g>
      <Stickman {...upright(lx, a, { sw, rHand: apex, rElbow: [170, 70], lHand: [lx - 28, 248], lElbow: [lx - 18, 200] })} head={[lx - 14, 60]} />
      <Stickman {...upright(rx, b, { sw, lHand: apex, lElbow: [230, 70], rHand: [rx + 28, 248], rElbow: [rx + 18, 200] })} head={[rx + 14, 60]} />
    </g>
  )
}

function PoseReach(a, b, sw = 18) {
  const lx = 138, rx = 262
  return (
    <g>
      <Stickman {...upright(lx, a, { sw, rHand: [lx + 46, 22], rElbow: [lx + 36, 80], lHand: [lx - 46, 22], lElbow: [lx - 36, 80] })} />
      <Stickman {...upright(rx, b, { sw, lHand: [rx - 46, 22], lElbow: [rx - 36, 80], rHand: [rx + 46, 22], rElbow: [rx + 36, 80] })} />
    </g>
  )
}

function PoseRun(a, b, sw = 18) {
  const f = (cx, color) => ({
    head: [cx + 28, 50], r: 22, bodyTop: [cx + 18, 80], shoulder: [cx + 2, 150], hip: [cx - 16, 252], spineSway: 8,
    lHand: [cx - 60, 192], lElbow: [cx - 38, 170], rHand: [cx + 82, 108], rElbow: [cx + 48, 110],
    lFoot: [cx - 70, 378], lKnee: [cx - 52, 320], rFoot: [cx + 50, 360], rKnee: [cx + 28, 308], color, sw,
  })
  return <g><Stickman {...f(126, a)} /><Stickman {...f(278, b)} /></g>
}

function PoseLeap(a, b, sw = 18) {
  const f = (cx, color, flip = 1) => ({
    head: [cx, 64], r: 22, bodyTop: [cx, 92], shoulder: [cx, 148], hip: [cx, 236], spineSway: -6 * flip,
    lHand: [cx - 66 * flip, 58], lElbow: [cx - 36 * flip, 100], rHand: [cx + 58 * flip, 112], rElbow: [cx + 38 * flip, 120],
    lFoot: [cx - 46, 320], lKnee: [cx - 24, 280], rFoot: [cx + 38, 304], rKnee: [cx + 20, 268], color, sw,
  })
  return <g><Stickman {...f(132, a, 1)} /><Stickman {...f(268, b, -1)} /></g>
}

function PoseDance(a, b, sw = 18) {
  const left = { head: [120, 86], r: 22, bodyTop: [128, 114], shoulder: [140, 172], hip: [152, 258], spineSway: 14, lHand: [70, 222], lElbow: [88, 196], rHand: [202, 198], rElbow: [178, 178], lFoot: [110, 380], lKnee: [128, 326], rFoot: [188, 368], rKnee: [172, 322], color: a, sw }
  const right = { head: [286, 40], r: 22, bodyTop: [276, 70], shoulder: [262, 128], hip: [252, 234], spineSway: -14, lHand: [206, 196], lElbow: [232, 168], rHand: [354, 30], rElbow: [318, 70], lFoot: [238, 380], lKnee: [254, 322], rFoot: [294, 360], rKnee: [276, 312], color: b, sw }
  return <g><Stickman {...left} /><Stickman {...right} /></g>
}

function PoseSquad(a, b, sw = 18) {
  const lx = 138, rx = 262
  return (
    <g>
      <Stickman {...upright(lx, a, { sw, rHand: [rx, 96], rElbow: [200, 88], lHand: [lx - 30, 246], lElbow: [lx - 20, 200] })} />
      <Stickman {...upright(rx, b, { sw, lHand: [lx, 96], lElbow: [200, 88], rHand: [rx + 30, 246], rElbow: [rx + 20, 200] })} />
    </g>
  )
}

function PoseLift(a, b, sw = 18) {
  const cx = 200
  const bottom = { head: [cx, 200], r: 22, bodyTop: [cx, 226], shoulder: [cx, 256], hip: [cx, 318], lHand: [cx - 56, 192], lElbow: [cx - 38, 222], rHand: [cx + 56, 192], rElbow: [cx + 38, 222], lFoot: [cx - 48, 380], lKnee: [cx - 38, 350], rFoot: [cx + 48, 380], rKnee: [cx + 38, 350], color: a, sw }
  const top = { head: [cx, 34], r: 20, bodyTop: [cx, 56], shoulder: [cx, 96], hip: [cx, 154], lHand: [cx - 56, 50], lElbow: [cx - 36, 64], rHand: [cx + 56, 50], rElbow: [cx + 36, 64], lFoot: [cx - 48, 184], lKnee: [cx - 28, 174], rFoot: [cx + 48, 184], rKnee: [cx + 28, 174], color: b, sw: sw * 0.9 }
  return <g><Stickman {...bottom} /><Stickman {...top} /></g>
}

function PoseBridge(a, b, sw = 18) {
  const lx = 88, rx = 312
  return (
    <g>
      <Stickman head={[lx + 8, 98]} r={22} bodyTop={[lx + 22, 126]} shoulder={[lx + 46, 190]} hip={[lx + 70, 268]} spineSway={28} rHand={[200, 134]} rElbow={[140, 158]} lFoot={[lx + 30, 380]} lKnee={[lx + 42, 326]} rFoot={[lx + 100, 380]} rKnee={[lx + 92, 326]} color={a} sw={sw} />
      <Stickman head={[rx - 8, 98]} r={22} bodyTop={[rx - 22, 126]} shoulder={[rx - 46, 190]} hip={[rx - 70, 268]} spineSway={-28} lHand={[200, 134]} lElbow={[260, 158]} lFoot={[rx - 100, 380]} lKnee={[rx - 92, 326]} rFoot={[rx - 30, 380]} rKnee={[rx - 42, 326]} color={b} sw={sw} />
    </g>
  )
}

function PoseEcho(a, b, sw = 18) {
  return (
    <g>
      <Stickman {...upright(138, a, { sw, rHand: [200, BAR_Y] })} />
      <g transform="rotate(180 262 200)">
        <Stickman {...upright(262, b, { sw, lHand: [200, BAR_Y] })} />
      </g>
    </g>
  )
}

function PoseArrow(a, b, sw = 18) {
  const f = (cx, color) => ({
    head: [cx + 34, 58], r: 22, bodyTop: [cx + 22, 86], shoulder: [cx + 4, 150], hip: [cx - 18, 256], spineSway: 6,
    lHand: [cx - 46, 196], lElbow: [cx - 30, 174], rHand: [cx + 96, 92], rElbow: [cx + 56, 110],
    lFoot: [cx - 56, 380], lKnee: [cx - 40, 322], rFoot: [cx + 26, 380], rKnee: [cx + 8, 324], color, sw,
  })
  return <g><Stickman {...f(108, a)} /><Stickman {...f(253, b)} /></g>
}

function PoseSit(a, b, sw = 18) {
  const f = (cx, color, faceIn = 1) => ({
    head: [cx, 114], r: 22, bodyTop: [cx, 142], shoulder: [cx, 188], hip: [cx, 256], spineSway: 4 * faceIn,
    lHand: [cx - 36 * faceIn, 232], lElbow: [cx - 26 * faceIn, 210], rHand: [cx + 36 * faceIn, 232], rElbow: [cx + 26 * faceIn, 210],
    lFoot: [cx - 56 * faceIn, 308], lKnee: [cx - 18 * faceIn, 264], rFoot: [cx + 56 * faceIn, 308], rKnee: [cx + 18 * faceIn, 264], color, sw,
  })
  return (
    <g>
      <Stickman {...f(138, a, 1)} />
      <Stickman {...f(262, b, -1)} />
      <line x1={174} y1={232} x2={226} y2={232} stroke={a} strokeWidth={sw} strokeLinecap="round" />
    </g>
  )
}

export const POSES = {
  mark: PoseMark, stride: PoseStride, handshake: PoseHandshake, highfive: PoseHighFive,
  reach: PoseReach, run: PoseRun, leap: PoseLeap, dance: PoseDance, squad: PoseSquad,
  lift: PoseLift, bridge: PoseBridge, echo: PoseEcho, arrow: PoseArrow, sit: PoseSit,
}

// Generic renderer — <Fren pose="handshake" colorA={..} colorB={..} sw={20} size={320} />
export function Fren({ pose, colorA = NAVY, colorB = NAVY, sw = 18, size = 200, className, style, label = 'Chainfren figures' }) {
  const fn = POSES[pose]
  if (!fn) return null
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={className}
      style={{ display: 'block', overflow: 'visible', flexShrink: 0, ...style }}
      role="img"
      aria-label={label}
    >
      {fn(colorA, colorB, sw)}
    </svg>
  )
}

export {
  Stickman, upright,
  PoseMark, PoseStride, PoseHandshake, PoseHighFive, PoseReach, PoseRun,
  PoseLeap, PoseDance, PoseSquad, PoseLift, PoseBridge, PoseEcho, PoseArrow, PoseSit,
}
