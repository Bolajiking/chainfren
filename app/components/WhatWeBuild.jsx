'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

const NAVY = '#08153C';

// ── The four Solution slides. Source of truth for accents/outcomes mirrors
//    app/config/stack.js; kept inline so this client tile stays self-contained.
//    Community Engine / AI Agent Studio retain their Chainfren product names
//    while carrying the full slider design (poses, choreography, copy).
//    Each fren animates ONCE when its slide becomes active — a one-time
//    "arrival" moment, then rests with at most a subtle ambient beat.
const SLIDES = [
  {
    key: 'media-launchpad', label: 'Media Launchpad',
    pre: 'Launch the media presence you ', em: 'own', post: '.',
    body: 'Streaming, broadcasting, distribution — stood up end to end, on infrastructure no platform can take away.',
    href: '/products/media-launchpad', cta: 'Explore Media Launchpad', bg: '#5ACDFF',
  },
  {
    key: 'creator-growth-os', label: 'Creator Growth OS',
    pre: 'Turn influence into a business you ', em: 'keep', post: '.',
    body: 'Owned audience, direct payments, creator commerce — the operating system behind your audience.',
    href: '/products/creator-growth-os', cta: 'Explore Creator Growth OS', bg: '#8DAAFF',
  },
  {
    key: 'community-loyalty', label: 'Community Engine',
    pre: 'Turn your audience into ', em: 'owners', post: '.',
    body: 'Loyalty, fan economics, membership that compounds — followers become stakeholders.',
    href: '/products/community-engine', cta: 'Explore Community Engine', bg: '#CBF0B8',
  },
  {
    key: 'ai-agents', label: 'AI Agent Studio',
    pre: 'Scale your presence, not your ', em: 'overhead', post: '.',
    body: 'AI agents that create, engage, and run the work — always on, working as you.',
    href: '/products/ai-agent-studio', cta: 'Explore AI Agent Studio', bg: '#A6E1FA',
  },
];

// ── Chainfren rig — round-cap strokes, Q-curve limbs bowing toward a joint,
//    spineSway for weight shift. fill=false renders a hollow "ghost" head.
function Stick({
  head, r = 24, bodyTop, shoulder, hip, spineSway = 0,
  lHand, rHand, lFoot, rFoot, lElbow, rElbow, lKnee, rKnee,
  color = NAVY, sw = 18, fill = true,
}) {
  const S = { stroke: color, strokeWidth: sw, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  let torso;
  if (spineSway) {
    const mx = (bodyTop[0] + hip[0]) / 2 + spineSway, my = (bodyTop[1] + hip[1]) / 2;
    torso = `M${bodyTop[0]} ${bodyTop[1]} Q${mx} ${my} ${hip[0]} ${hip[1]}`;
  } else torso = `M${bodyTop[0]} ${bodyTop[1]} L${hip[0]} ${hip[1]}`;
  const limb = (a, j, b) => (j ? `M${a[0]} ${a[1]} Q${j[0]} ${j[1]} ${b[0]} ${b[1]}` : `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`);
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
  );
}

function Illo({ id, reduce }) {
  const wrap = (children) => (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" className="wwb-figure" aria-hidden="true">
      {children}
    </svg>
  );

  if (id === 'media-launchpad') {
    // Going live — the broadcast fren settles into its raised-arms antenna pose,
    // rings ripple outward from above the head, a dot pops at the instant of
    // going live, then one soft ring keeps a quiet ~5s heartbeat.
    const ORG = '200px 44px';
    const ring = (i, ambient) => (
      <circle key={'r' + i + (ambient ? 'a' : '')} cx={200} cy={44} r={46} fill="none" stroke={NAVY} strokeWidth={5}
        style={reduce ? { opacity: ambient ? 0 : 0.22 } : {
          transformBox: 'view-box', transformOrigin: ORG, opacity: 0,
          animation: ambient
            ? `cfRingAmb 5000ms var(--wwb-ease) ${1600 + i * 180}ms infinite`
            : `cfRing 1300ms var(--wwb-ease) ${i * 160}ms both`,
        }} />
    );
    return wrap(<>
      {ring(0, false)}{ring(1, false)}{ring(2, false)}
      {!reduce && ring(0, true)}
      <circle cx={200} cy={44} r={9} fill={NAVY}
        style={reduce ? {} : { transformBox: 'view-box', transformOrigin: ORG, animation: 'cfPop 700ms var(--wwb-ease) 240ms both' }} />
      <Stick head={[200, 86]} r={24} bodyTop={[200, 112]} shoulder={[200, 176]} hip={[200, 290]} spineSway={3}
        lHand={[150, 36]} lElbow={[176, 96]} rHand={[250, 36]} rElbow={[224, 96]}
        lFoot={[166, 388]} lKnee={[182, 338]} rFoot={[234, 388]} rKnee={[218, 338]} />
    </>);
  }

  if (id === 'creator-growth-os') {
    // The climb — steps draw L→R, a helper boosts from below, the climber rises
    // one clear step, a trend-line traces the ascent, the audience gathers.
    const STEP = '#5E77C9';
    const steps = (
      <path d="M52 356 L148 356 L148 308 L244 308 L244 260 L340 260" fill="none" stroke={STEP} strokeWidth={15}
        strokeLinecap="round" strokeLinejoin="round" pathLength={100}
        style={reduce ? {} : { strokeDasharray: 100, strokeDashoffset: 100, animation: 'cfDraw 680ms var(--wwb-ease) both' }} />
    );
    const grow = (
      <g style={{ opacity: 0.55 }}>
        <path d="M70 366 L330 176" fill="none" stroke={NAVY} strokeWidth={3} strokeLinecap="round" pathLength={100}
          style={reduce ? {} : { strokeDasharray: 100, strokeDashoffset: 100, animation: 'cfDraw 820ms var(--wwb-ease) 360ms both' }} />
        <path d="M312 172 L332 174 L322 192" fill="none" stroke={NAVY} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
          style={reduce ? {} : { opacity: 0, animation: 'cfFigIn 300ms var(--wwb-ease) 1080ms both' }} />
      </g>
    );
    const climber = (
      <g style={reduce ? {} : { animation: 'cfRise 760ms var(--wwb-ease) 560ms both' }}>
        <Stick head={[196, 146]} r={20} bodyTop={[194, 168]} shoulder={[188, 220]} hip={[178, 282]} spineSway={11}
          rHand={[244, 196]} rElbow={[222, 198]} lHand={[150, 236]} lElbow={[164, 214]}
          rFoot={[214, 308]} rKnee={[206, 284]} lFoot={[150, 356]} lKnee={[152, 320]} />
      </g>
    );
    const helper = (
      <g style={reduce ? {} : { animation: 'cfFigIn 540ms var(--wwb-ease) 220ms both' }}>
        <Stick head={[92, 230]} r={16} bodyTop={[92, 250]} shoulder={[94, 292]} hip={[96, 344]} spineSway={5}
          rHand={[146, 240]} rElbow={[120, 256]} lHand={[70, 300]} lElbow={[80, 278]}
          rFoot={[110, 392]} rKnee={[106, 368]} lFoot={[78, 392]} lKnee={[82, 368]} color={STEP} sw={15} />
      </g>
    );
    const dots = [[300, 116], [328, 100], [346, 128], [312, 80]].map((p, i) => (
      <circle key={'g' + i} cx={p[0]} cy={p[1]} r={i === 0 ? 9 : 7} fill={NAVY}
        style={reduce ? { opacity: 0.9 } : {
          transformBox: 'view-box', transformOrigin: `${p[0]}px ${p[1]}px`,
          opacity: 0, animation: `cfGather 440ms var(--wwb-ease) ${1000 + i * 130}ms both`,
        }} />
    ));
    return wrap(<>{grow}{steps}{helper}{climber}{dots}</>);
  }

  if (id === 'community-loyalty') {
    // The chain forms — chain + fren = chainfren. Center present at slide-in;
    // flanks slide in from the edges and link arms; a token passes along the line.
    const LIME = '#7FA83A';
    const token = (
      <circle cx={150} cy={166} r={10} fill={NAVY}
        style={reduce ? { opacity: 0 } : { transformBox: 'view-box', animation: 'cfToken 2600ms var(--wwb-ease) 760ms infinite' }} />
    );
    return wrap(<>
      <g style={reduce ? {} : { animation: 'cfSlideL 560ms var(--wwb-ease) 120ms both' }}>
        <Stick head={[104, 110]} r={20} bodyTop={[104, 132]} shoulder={[104, 186]} hip={[106, 278]} spineSway={4}
          rHand={[150, 166]} rElbow={[128, 158]} lHand={[74, 238]} lElbow={[86, 202]}
          rFoot={[128, 384]} rKnee={[120, 340]} lFoot={[84, 384]} lKnee={[90, 340]} color={LIME} sw={17} />
      </g>
      <g style={reduce ? {} : { animation: 'cfSlideR 560ms var(--wwb-ease) 120ms both' }}>
        <Stick head={[296, 110]} r={20} bodyTop={[296, 132]} shoulder={[296, 186]} hip={[294, 278]} spineSway={-4}
          lHand={[250, 166]} lElbow={[272, 158]} rHand={[326, 238]} rElbow={[314, 202]}
          lFoot={[272, 384]} lKnee={[280, 340]} rFoot={[316, 384]} rKnee={[310, 340]} color={LIME} sw={17} />
      </g>
      <g>
        <Stick head={[200, 92]} r={22} bodyTop={[200, 116]} shoulder={[200, 172]} hip={[200, 272]} spineSway={0}
          lHand={[150, 166]} lElbow={[176, 150]} rHand={[250, 166]} rElbow={[224, 150]}
          lFoot={[172, 384]} lKnee={[184, 336]} rFoot={[228, 384]} rKnee={[216, 336]} />
      </g>
      {token}
    </>);
  }

  if (id === 'ai-agents') {
    // The echo — one solid fren waves; two ghost echoes mirror it a beat later,
    // translucent + glowing. Hard cap: two echoes. Restraint is the point.
    const ELEC = '#1E8AE6';
    const armWave = (cx, color, sw) => (
      <g style={reduce ? {} : { transformBox: 'view-box', transformOrigin: `${cx}px 172px`, animation: 'cfWave 1500ms var(--wwb-ease) 260ms 1 both' }}>
        <path d={`M${cx} 172 Q${cx + 30} 120 ${cx + 40} 74`} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
    const body = (cx, color, sw, fill) => (
      <Stick head={[cx, 90]} r={22} bodyTop={[cx, 114]} shoulder={[cx, 172]} hip={[cx, 268]} spineSway={2}
        lHand={[cx - 42, 224]} lElbow={[cx - 30, 196]}
        lFoot={[cx - 28, 384]} lKnee={[cx - 16, 336]} rFoot={[cx + 28, 384]} rKnee={[cx + 16, 336]}
        color={color} sw={sw} fill={fill} />
    );
    const echo = (i, cx) => (
      <g key={'e' + i}
        style={reduce
          ? { opacity: 0.32, filter: 'drop-shadow(0 0 5px rgba(30,138,230,0.5))' }
          : { opacity: 0, filter: 'drop-shadow(0 0 6px rgba(30,138,230,0.55))', animation: `cfEcho 620ms var(--wwb-ease) ${420 + i * 260}ms both` }}>
        {body(cx, ELEC, 14, false)}{armWave(cx, ELEC, 14)}
      </g>
    );
    return wrap(<>
      <g>{body(150, NAVY, 18, true)}{armWave(150, NAVY, 18)}</g>
      {echo(0, 236)}{echo(1, 312)}
    </>);
  }
  return null;
}

function ArrowIcon({ dir = 'next' }) {
  const d = dir === 'next' ? 'M9 5 L16 12 L9 19' : 'M15 5 L8 12 L15 19';
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SliderHeader({ index, total, onPrev, onNext }) {
  return (
    <header className="flex flex-col gap-3 flex-none text-dark-blue">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full border-[1.5px] border-current leading-none">
          WHAT WE BUILD
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-bold tracking-[0.08em] tabular-nums" aria-live="polite">
            <strong className="font-bold">{String(index + 1).padStart(2, '0')}</strong>
            <em className="not-italic font-medium opacity-45">&thinsp;/&thinsp;{String(total).padStart(2, '0')}</em>
          </span>
          <nav className="flex gap-1" aria-label="Solution navigation">
            <button type="button" onClick={onPrev} aria-label="Previous solution" className="w-[36px] h-[36px] rounded-full grid place-items-center hover:bg-dark-blue/10 active:scale-90 transition">
              <ArrowIcon dir="prev" />
            </button>
            <button type="button" onClick={onNext} aria-label="Next solution" className="w-[36px] h-[36px] rounded-full grid place-items-center hover:bg-dark-blue/10 active:scale-90 transition">
              <ArrowIcon dir="next" />
            </button>
          </nav>
        </div>
      </div>
      <p className="m-0 text-[20px] md:text-[22px] leading-[1.05] tracking-[-0.025em] font-medium text-dark-blue">
        <em className="italic font-medium">Four solutions. One outcome: ownership.</em>
      </p>
    </header>
  );
}

function SlideBody({ slide, reduce, animKey }) {
  return (
    <>
      <div className="wwb-stage-spacer flex-none h-[6px] md:h-[14px]" aria-hidden="true" />
      <h2 className="m-0 text-[24px] md:text-[34px] leading-[0.98] tracking-[-0.036em] font-medium text-dark-blue">
        {slide.label}
      </h2>
      <p className="m-0 mt-1.5 text-[16px] md:text-[19px] leading-[1.1] tracking-[-0.018em] font-medium text-dark-blue max-w-[15em]">
        {slide.pre}<em className="italic font-medium">{slide.em}</em>{slide.post}
      </p>
      <p className="m-0 mt-2 text-[12.5px] md:text-[13.5px] leading-[1.45] tracking-[-0.003em] font-normal text-dark-blue/75 max-w-[24em]">
        {slide.body}
      </p>
      <div className="wwb-figwrap relative flex-1 min-h-0 w-full flex items-center justify-center pointer-events-none py-1" key={`fig-${slide.key}-${animKey}`}>
        <Illo id={slide.key} reduce={reduce} />
      </div>
      <Link href={slide.href} className="self-start flex-none">
        <button type="button" className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-transparent border-2 border-dark-blue text-dark-blue text-[11px] md:text-[12px] font-bold uppercase tracking-[0.13em] whitespace-nowrap cursor-pointer transition-colors duration-200 hover:bg-dark-blue hover:text-white active:scale-[0.97] group">
          <span>{slide.cta}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
            <path d="M5 12 L19 12 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Link>
    </>
  );
}

export default function WhatWeBuild({ className = '', autoplay = true, autoplayMs = 6000 }) {
  const total = SLIDES.length;
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [tick, setTick] = useState(0);
  const [pause, setPause] = useState(false);
  const [reduce, setReduce] = useState(false);
  const cardRef = useRef(null);
  const touchX = useRef(null);

  const go = useCallback((d) => {
    setDir(d);
    setActive((a) => (a + d + total) % total);
    setTick((t) => t + 1);
  }, [total]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReduce(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    if (!autoplay || pause || reduce) return;
    const t = setInterval(() => go(1), autoplayMs);
    return () => clearInterval(t);
  }, [autoplay, autoplayMs, go, pause, reduce]);

  // Arrow-key nav only while the card is hovered/focused, so it never hijacks
  // page scrolling elsewhere.
  useEffect(() => {
    if (!pause) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [pause, go]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; setPause(true); };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 44) go(dx < 0 ? 1 : -1);
    setPause(false);
  };

  const current = SLIDES[active];
  const railRun = autoplay && !pause && !reduce;

  return (
    <article
      ref={cardRef}
      tabIndex={-1}
      className={'wwb-card relative w-full border-[2px] border-dark-blue rounded-[26px] px-6 py-6 md:px-7 md:py-7 flex flex-col gap-4 text-dark-blue overflow-hidden md:h-[600px] ' + className}
      style={{ background: current.bg }}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <SliderHeader index={active} total={total} onPrev={() => go(-1)} onNext={() => go(1)} />

      <div className="wwb-stage-wrap">
        <div
          className={reduce ? 'wwb-stage' : 'wwb-stage wwb-stage--enter'}
          key={`stage-${tick}`}
          style={{ ['--wwb-ex']: dir >= 0 ? '28px' : '-28px' }}
        >
          <SlideBody slide={current} reduce={reduce} animKey={tick} />
        </div>
      </div>

      <div className="relative flex gap-1.5 flex-none" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <span key={s.key} className={'wwb-rail-seg relative flex-1 h-[3.5px] rounded-[2px] overflow-hidden ' + (i < active ? 'wwb-rail-done' : '')}>
            {i === active && (
              <span
                key={`fill-${tick}`}
                className={'wwb-rail-fill block h-full w-full ' + (railRun ? 'wwb-rail-run' : '')}
                style={{ ['--wwb-rail-dur']: `${autoplayMs}ms` }}
              />
            )}
          </span>
        ))}
      </div>

      <style jsx global>{`
        .wwb-stage--enter { animation: cfStageEnter 340ms var(--wwb-ease) both; }
        @keyframes cfStageEnter {
          from { opacity: 0; transform: translateX(var(--wwb-ex, 28px)); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .wwb-rail-seg { background: rgba(8,21,60,0.2); }
        .wwb-rail-done { background: rgba(8,21,60,0.5); }
        .wwb-rail-fill { background: ${NAVY}; border-radius: 2px; transform-origin: left center; transform: scaleX(0); }
        .wwb-rail-fill.wwb-rail-run { animation: cfRail var(--wwb-rail-dur, 6000ms) linear both; }
        @keyframes cfRail { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        @keyframes cfRing { 0% { transform: scale(0.22); opacity: 0; } 14% { opacity: 0.9; } 100% { transform: scale(1); opacity: 0; } }
        @keyframes cfRingAmb { 0% { transform: scale(0.22); opacity: 0; } 5% { opacity: 0.55; } 30% { opacity: 0; } 100% { transform: scale(1); opacity: 0; } }
        @keyframes cfPop { 0% { transform: scale(0); opacity: 0; } 55% { opacity: 1; } 72% { transform: scale(1.35); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes cfFigIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cfDraw { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
        @keyframes cfRise { 0% { opacity: 0.25; transform: translate(-26px,44px); } 60% { opacity: 1; } 100% { opacity: 1; transform: translate(0,0); } }
        @keyframes cfGather { from { opacity: 0; transform: translateY(7px) scale(0.4); } to { opacity: 0.9; transform: translateY(0) scale(1); } }
        @keyframes cfSlideL { from { opacity: 0; transform: translateX(-160px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes cfSlideR { from { opacity: 0; transform: translateX(160px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes cfToken {
          0% { opacity: 0; transform: translateX(0) translateY(0); }
          10% { opacity: 1; }
          50% { transform: translateX(88px) translateY(-3px); }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateX(176px) translateY(0); }
        }
        @keyframes cfEcho { from { opacity: 0; transform: translateX(-14px); } to { opacity: 0.34; transform: translateX(0); } }
        @keyframes cfWave { 0% { transform: rotate(6deg); } 22% { transform: rotate(-14deg); } 46% { transform: rotate(4deg); } 68% { transform: rotate(-8deg); } 100% { transform: rotate(0deg); } }

        @media (prefers-reduced-motion: reduce) {
          .wwb-stage--enter { animation: none; }
          .wwb-rail-fill.wwb-rail-run { animation: none; transform: scaleX(1); }
        }
      `}</style>
    </article>
  );
}
