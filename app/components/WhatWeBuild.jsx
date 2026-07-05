'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

const NAVY = '#08153C';

function Figure({
  cx, headY = 30, r = 9, bodyTop = 42, shoulder = 64, hip = 110,
  lHand, rHand, lFoot, rFoot,
  lElbow, rElbow, lKnee, rKnee,
  spineSway = 0, color = NAVY, sw = 8.5,
}) {
  const S = { stroke: color, strokeWidth: sw, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  let torsoD;
  if (spineSway) {
    const my = (bodyTop + hip) / 2;
    torsoD = `M${cx} ${bodyTop} Q${cx + spineSway} ${my} ${cx} ${hip}`;
  } else {
    torsoD = `M${cx} ${bodyTop} L${cx} ${hip}`;
  }
  const limb = (ax, ay, jx, jy, bx, by) =>
    jx != null ? `M${ax} ${ay} Q${jx} ${jy} ${bx} ${by}` : `M${ax} ${ay} L${bx} ${by}`;
  return (
    <g>
      <path d={torsoD} {...S} />
      {lHand && <path d={limb(cx, shoulder, lElbow?.[0], lElbow?.[1], lHand[0], lHand[1])} {...S} />}
      {rHand && <path d={limb(cx, shoulder, rElbow?.[0], rElbow?.[1], rHand[0], rHand[1])} {...S} />}
      {lFoot && <path d={limb(cx, hip, lKnee?.[0], lKnee?.[1], lFoot[0], lFoot[1])} {...S} />}
      {rFoot && <path d={limb(cx, hip, rKnee?.[0], rKnee?.[1], rFoot[0], rFoot[1])} {...S} />}
      <circle cx={cx} cy={headY} r={r} fill={color} />
    </g>
  );
}

function AgencyArt() {
  const HOLD = [248, 116];
  return (
    <svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
      <path
        d="M 40 232 L 110 232 L 110 200 L 180 200 L 180 168 L 250 168 L 250 136 L 320 136 L 320 232"
        fill="#FFFFFF" stroke={NAVY} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round"
      />
      <line x1="40" y1="232" x2="110" y2="232" stroke={NAVY} strokeWidth={3.5} strokeLinecap="round" />
      <line x1="110" y1="200" x2="180" y2="200" stroke={NAVY} strokeWidth={3.5} strokeLinecap="round" />
      <line x1="180" y1="168" x2="250" y2="168" stroke={NAVY} strokeWidth={3.5} strokeLinecap="round" />
      <line x1="250" y1="136" x2="320" y2="136" stroke={NAVY} strokeWidth={3.5} strokeLinecap="round" />
      <g opacity="0.6">
        <polyline
          points="40,232 110,200 180,168 250,136 326,98"
          fill="none" stroke={NAVY} strokeWidth={2.25}
          strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2,6"
        />
        <circle cx="110" cy="200" r="2.6" fill={NAVY} />
        <circle cx="180" cy="168" r="2.6" fill={NAVY} />
        <circle cx="250" cy="136" r="2.6" fill={NAVY} />
        <path d="M 314 102 L 328 96 L 322 110" fill="none" stroke={NAVY} strokeWidth={2.75}
              strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Figure
        cx={285} headY={70} r={8}
        bodyTop={80} shoulder={98} hip={122}
        sw={7.5} spineSway={-2} color="#08153C"
        rHand={HOLD} rElbow={[270, 108]}
        lHand={[306, 100]} lElbow={[300, 102]}
        lFoot={[276, 135]} lKnee={[280, 130]}
        rFoot={[294, 135]} rKnee={[290, 130]}
      />
      <Figure
        cx={215} headY={102} r={8}
        bodyTop={112} shoulder={130} hip={152}
        sw={7.5} spineSway={2} color="#2A6FA8"
        lHand={HOLD} lElbow={[232, 118]}
        rHand={[200, 162]} rElbow={[208, 158]}
        lFoot={[206, 167]} lKnee={[208, 162]}
        rFoot={[224, 167]} rKnee={[222, 162]}
      />
      <circle cx={HOLD[0]} cy={HOLD[1]} r={4.5} fill={NAVY} />
    </svg>
  );
}

function ProductArt() {
  return (
    <svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
      <rect x="38" y="158" width="78" height="92" rx="14" ry="14" fill="#FFFFFF" stroke={NAVY} strokeWidth={3.5} />
      <rect x="138" y="118" width="84" height="132" rx="14" ry="14" fill="#FFFFFF" stroke={NAVY} strokeWidth={3.5} />
      <rect x="244" y="158" width="78" height="92" rx="14" ry="14" fill="#FFFFFF" stroke={NAVY} strokeWidth={3.5} />
      <circle cx="77" cy="172" r="2.5" fill={NAVY} />
      <circle cx="180" cy="132" r="2.5" fill={NAVY} />
      <circle cx="283" cy="172" r="2.5" fill={NAVY} />
      <Figure
        cx={180} headY={58} r={9}
        bodyTop={70} shoulder={90} hip={112}
        sw={7.5}
        lHand={[148, 56]} lElbow={[158, 70]}
        rHand={[212, 56]} rElbow={[202, 70]}
        lFoot={[164, 118]} lKnee={[168, 116]}
        rFoot={[196, 118]} rKnee={[192, 116]}
      />
      <g opacity="0.45">
        <line x1="116" y1="172" x2="138" y2="132" stroke={NAVY} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="0,7" />
        <line x1="222" y1="132" x2="244" y2="172" stroke={NAVY} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="0,7" />
      </g>
      <line x1="20" y1="252" x2="340" y2="252" stroke={NAVY} strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

function MediaArt() {
  const cx = 180, waveCy = 150;
  const waves = [
    { rx: 56, ry: 44, opacity: 0.85 },
    { rx: 96, ry: 76, opacity: 0.55 },
    { rx: 138, ry: 108, opacity: 0.28 },
  ];
  return (
    <svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
      <line x1="30" y1="248" x2="330" y2="248" stroke={NAVY} strokeWidth={3} strokeLinecap="round" />
      <circle cx="60" cy="248" r="3.5" fill={NAVY} />
      <circle cx="100" cy="248" r="3.5" fill={NAVY} />
      <circle cx="260" cy="248" r="3.5" fill={NAVY} />
      <circle cx="300" cy="248" r="3.5" fill={NAVY} />
      {waves.map((w, i) => (
        <path key={i}
          d={`M ${cx - w.rx} ${waveCy} A ${w.rx} ${w.ry} 0 0 1 ${cx + w.rx} ${waveCy}`}
          fill="none" stroke={NAVY} strokeWidth={4} strokeLinecap="round" opacity={w.opacity}
        />
      ))}
      <Figure
        cx={cx} headY={106} r={10}
        bodyTop={120} shoulder={142} hip={196}
        sw={8.5}
        lHand={[148, 130]} lElbow={[160, 128]}
        rHand={[212, 130]} rElbow={[200, 128]}
        lFoot={[164, 246]} lKnee={[168, 226]}
        rFoot={[196, 246]} rKnee={[192, 226]}
      />
    </svg>
  );
}

const CARDS = [
  {
    id: 'agency',
    label: 'Agency',
    body: 'Done-with-you growth for creators and brands serious about ownership. Strategy, infrastructure, and execution — from the team that lives the work.',
    cta: 'LEARN MORE',
    href: '/agency',
    bg: '#5ACDFF',
    Art: AgencyArt,
  },
  {
    id: 'product',
    label: 'Product',
    body: "Owned infrastructure for the African creator economy. The tools we build so creators don’t have to keep renting.",
    cta: 'SEE PRODUCTS',
    href: '/products',
    bg: '#8DAAFF',
    Art: ProductArt,
  },
  {
    id: 'media',
    label: 'Media',
    body: "Music, fashion, sports, entertainment — curated, published, and broadcast on infrastructure owned by Africans.",
    cta: 'VISIT SABI',
    href: '/contact',
    bg: '#CBF0B8',
    Art: MediaArt,
  },
];

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
        <span
          className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full border-[1.5px] border-current"
        >
          WHAT WE BUILD
        </span>
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] font-bold tracking-[0.08em] tabular-nums" aria-live="polite">
            <strong className="font-bold">{String(index + 1).padStart(2, '0')}</strong>
            <em className="not-italic font-medium opacity-50">&thinsp;/&thinsp;{String(total).padStart(2, '0')}</em>
          </span>
          <nav className="flex gap-0.5" aria-label="Engine navigation">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous engine"
              className="w-[34px] h-[34px] rounded-full grid place-items-center hover:bg-dark-blue/10 active:scale-90 transition"
            >
              <ArrowIcon dir="prev" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next engine"
              className="w-[34px] h-[34px] rounded-full grid place-items-center hover:bg-dark-blue/10 active:scale-90 transition"
            >
              <ArrowIcon dir="next" />
            </button>
          </nav>
        </div>
      </div>
      <p className="m-0 text-[20px] md:text-[22px] leading-[1.05] tracking-[-0.025em] font-medium text-dark-blue">
        <em className="italic font-medium">Three engines, one mission.</em>
      </p>
    </header>
  );
}

function EngineCardBody({ card, animKey }) {
  const { label, body, cta, href, Art } = card;
  return (
    <div className="flex flex-col gap-3 md:gap-3.5 h-full text-dark-blue">
      <div className="wwb-stage-spacer flex-1 min-h-[12px] md:min-h-[20px]" aria-hidden="true" />
      <h2 className="m-0 text-[44px] md:text-[56px] leading-[0.95] tracking-[-0.04em] font-bold text-dark-blue">
        {label}
      </h2>
      <p className="m-0 text-[15px] md:text-[16px] leading-[1.45] tracking-[-0.005em] font-normal text-dark-blue/90 max-w-[30em]">
        {body}
      </p>
      <div
        className="wwb-illust relative w-full flex justify-center pointer-events-none flex-none"
        key={`${card.id}-${animKey}`}
        data-animate="true"
      >
        <Art />
      </div>
      <Link href={href} className="self-start mt-1">
        <button
          type="button"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-transparent border-2 border-dark-blue text-dark-blue text-[12px] font-bold uppercase tracking-[0.14em] whitespace-nowrap cursor-pointer transition-colors duration-200 hover:bg-dark-blue hover:text-white active:scale-[0.97] group"
        >
          <span>{cta}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
            <path d="M5 12 L19 12 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default function WhatWeBuild({
  className = '',
  duration = 760,
  autoplay = true,
  autoplayMs = 5400,
}) {
  const total = CARDS.length;
  const [active, setActive] = useState(0);
  const [outgoing, setOutgoing] = useState(null);
  const [pause, setPause] = useState(false);
  const touchX = useRef(null);

  const go = useCallback((dir) => {
    setActive((a) => {
      setOutgoing(a);
      return (a + dir + total) % total;
    });
  }, [total]);

  useEffect(() => {
    if (outgoing === null) return;
    const t = setTimeout(() => setOutgoing(null), duration + 80);
    return () => clearTimeout(t);
  }, [outgoing, duration]);

  useEffect(() => {
    if (!autoplay || pause) return;
    const t = setInterval(() => go(1), autoplayMs);
    return () => clearInterval(t);
  }, [autoplay, autoplayMs, go, pause]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const current = CARDS[active];

  return (
    <article
      className={
        'wwb-card relative w-full border-[2px] border-dark-blue rounded-[26px] ' +
        'px-6 py-6 md:px-7 md:py-7 flex flex-col gap-4 text-dark-blue overflow-hidden md:h-[600px] ' +
        className
      }
      style={{ background: current.bg, ['--wwb-dur']: `${duration}ms` }}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <SliderHeader
        index={active}
        total={total}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />

      <div className="wwb-stage-wrap">
        {outgoing !== null && outgoing !== active && (
          <div className="wwb-stage is-out" key={`out-${outgoing}-${active}`} aria-hidden="true">
            <EngineCardBody card={CARDS[outgoing]} animKey={outgoing} />
          </div>
        )}
        <div className="wwb-stage is-in" key={`in-${active}`}>
          <EngineCardBody card={current} animKey={active} />
        </div>
      </div>

      <div className="relative flex gap-1.5 flex-none pointer-events-none" aria-hidden="true">
        {CARDS.map((c, i) => (
          <span
            key={c.id}
            className={
              'flex-1 h-[3px] rounded-[2px] bg-dark-blue transition-opacity duration-700 ' +
              (i === active ? 'opacity-90' : 'opacity-20')
            }
          />
        ))}
      </div>
    </article>
  );
}
