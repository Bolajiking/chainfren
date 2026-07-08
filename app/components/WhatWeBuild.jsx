'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { POSES } from './Frens';

const NAVY = '#08153C';

// ── The four Solution slides (replaces the retired three engines). Source of
//    truth for accents/outcomes mirrors app/config/stack.js; kept inline here
//    so this client tile stays self-contained. Each slide performs its
//    solution's core idea as motion — the fren animates once when its slide
//    becomes active (strokes draw in + dots pop via the shared .wwb-illust
//    rules), then rests with a subtle ambient beat.
const SLIDES = [
  {
    key: 'media-launchpad', label: 'Media Launchpad', accent: '#5ACDFF', accentB: '#8DAAFF',
    pre: 'Launch the media presence you ', em: 'own', post: '.', pose: 'reach',
    href: '/solutions/media-launchpad', cta: 'Explore Media Launchpad',
  },
  {
    key: 'creator-growth-os', label: 'Creator Growth OS', accent: '#8DAAFF', accentB: '#5ACDFF',
    pre: 'Turn influence into a business you ', em: 'keep', post: '.', pose: 'stride',
    href: '/solutions/creator-growth-os', cta: 'Explore Creator Growth OS',
  },
  {
    key: 'community-loyalty', label: 'Community Engine', accent: '#CBF0B8', accentB: '#C8EB6D',
    pre: 'Turn your audience into ', em: 'owners', post: '.', pose: 'squad',
    href: '/solutions/community-loyalty', cta: 'Explore Community Engine',
  },
  {
    key: 'ai-agents', label: 'AI Agent Studio', accent: '#A6E1FA', accentB: '#40ACFF',
    pre: 'Scale your presence, not your ', em: 'overhead', post: '.', pose: 'echo',
    href: '/solutions/ai-agents', cta: 'Explore AI Agent Studio',
  },
];

// Per-slide accent motif drawn in the pose's 400×400 space. Uses only
// stroke paths / fill circles so the shared slider rules draw them in.
function Motif({ slide }) {
  const a = slide.accent;
  switch (slide.key) {
    case 'media-launchpad': // "going live" — broadcast rings above the head
      return (
        <g className="wwb-live">
          {[46, 78, 112].map((r, i) => (
            <path key={r} d={`M${200 - r} 44 A ${r} ${r * 0.72} 0 0 1 ${200 + r} 44`} fill="none" stroke={a} strokeWidth={7} strokeLinecap="round" opacity={0.9 - i * 0.26} />
          ))}
          <circle cx={200} cy={44} r={6} fill={a} />
        </g>
      );
    case 'creator-growth-os': // "the climb" — steps + rising trace + gathered dots
      return (
        <g>
          <polyline points="56,344 128,344 128,304 200,304 200,264 272,264 272,224 344,224" fill="none" stroke={a} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="56,344 128,304 200,264 272,224 344,184" fill="none" stroke={NAVY} strokeWidth={3} strokeLinecap="round" strokeDasharray="2,8" opacity={0.5} />
          {[[344, 172], [360, 180], [352, 160]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill={a} />)}
        </g>
      );
    case 'community-loyalty': // "the chain forms" — a token passes along linked arms
      return (
        <g>
          <circle className="wwb-token" cx={0} cy={0} r={9} fill={NAVY} />
          {[138, 200, 262].map((x) => <circle key={x} cx={x} cy={96} r={4} fill={a} />)}
        </g>
      );
    case 'ai-agents': // "the echo" — faint mirrored ghosts of the wave
      return (
        <g className="wwb-echoes" opacity={0.34}>
          <g transform="translate(26 6) scale(0.94)">{POSES.mark(a, a, 12)}</g>
          <g transform="translate(52 12) scale(0.88)" opacity={0.6}>{POSES.mark(a, a, 10)}</g>
        </g>
      );
    default:
      return null;
  }
}

function SolutionArt({ slide }) {
  const poseFn = POSES[slide.pose];
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet" className={`wwb-sol wwb-sol--${slide.key}`}>
      {slide.key === 'ai-agents' && <Motif slide={slide} />}
      {poseFn(NAVY, slide.accentB, 18)}
      {slide.key !== 'ai-agents' && <Motif slide={slide} />}
    </svg>
  );
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
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full border-[1.5px] border-current">
          WHAT WE BUILD
        </span>
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] font-bold tracking-[0.08em] tabular-nums" aria-live="polite">
            <strong className="font-bold">{String(index + 1).padStart(2, '0')}</strong>
            <em className="not-italic font-medium opacity-50">&thinsp;/&thinsp;{String(total).padStart(2, '0')}</em>
          </span>
          <nav className="flex gap-0.5" aria-label="Solution navigation">
            <button type="button" onClick={onPrev} aria-label="Previous solution" className="w-[34px] h-[34px] rounded-full grid place-items-center hover:bg-dark-blue/10 active:scale-90 transition">
              <ArrowIcon dir="prev" />
            </button>
            <button type="button" onClick={onNext} aria-label="Next solution" className="w-[34px] h-[34px] rounded-full grid place-items-center hover:bg-dark-blue/10 active:scale-90 transition">
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

function SlideBody({ slide, animKey }) {
  return (
    <div className="flex flex-col gap-3 md:gap-3.5 h-full text-dark-blue">
      <div className="wwb-stage-spacer flex-1 min-h-[12px] md:min-h-[20px]" aria-hidden="true" />
      <h2 className="m-0 text-[30px] md:text-[40px] leading-[0.98] tracking-[-0.03em] font-bold text-dark-blue">
        {slide.label}
      </h2>
      <p className="m-0 text-[19px] md:text-[22px] leading-[1.15] tracking-[-0.015em] font-medium text-dark-blue max-w-[16em]">
        {slide.pre}<em className="italic font-semibold">{slide.em}</em>{slide.post}
      </p>
      <div className="wwb-illust relative w-full flex justify-center pointer-events-none flex-none" key={`${slide.key}-${animKey}`} data-animate="true">
        <SolutionArt slide={slide} />
      </div>
      <Link href={slide.href} className="self-start mt-1">
        <button type="button" className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-transparent border-2 border-dark-blue text-dark-blue text-[11px] md:text-[12px] font-bold uppercase tracking-[0.12em] whitespace-nowrap cursor-pointer transition-colors duration-200 hover:bg-dark-blue hover:text-white active:scale-[0.97] group">
          <span>{slide.cta}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
            <path d="M5 12 L19 12 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default function WhatWeBuild({ className = '', duration = 760, autoplay = true, autoplayMs = 6000 }) {
  const total = SLIDES.length;
  const [active, setActive] = useState(0);
  const [outgoing, setOutgoing] = useState(null);
  const [pause, setPause] = useState(false);
  const touchX = useRef(null);

  const go = useCallback((dir) => {
    setActive((a) => { setOutgoing(a); return (a + dir + total) % total; });
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

  const current = SLIDES[active];

  return (
    <article
      className={'wwb-card relative w-full border-[2px] border-dark-blue rounded-[26px] px-6 py-6 md:px-7 md:py-7 flex flex-col gap-4 text-dark-blue overflow-hidden md:h-[600px] ' + className}
      style={{ background: current.accent, ['--wwb-dur']: `${duration}ms` }}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <SliderHeader index={active} total={total} onPrev={() => go(-1)} onNext={() => go(1)} />

      <div className="wwb-stage-wrap">
        {outgoing !== null && outgoing !== active && (
          <div className="wwb-stage is-out" key={`out-${outgoing}-${active}`} aria-hidden="true">
            <SlideBody slide={SLIDES[outgoing]} animKey={outgoing} />
          </div>
        )}
        <div className="wwb-stage is-in" key={`in-${active}`}>
          <SlideBody slide={current} animKey={active} />
        </div>
      </div>

      <div className="relative flex gap-1.5 flex-none pointer-events-none" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <span key={s.key} className={'flex-1 h-[3px] rounded-[2px] bg-dark-blue transition-opacity duration-700 ' + (i === active ? 'opacity-90' : 'opacity-20')} />
        ))}
      </div>

      <style jsx global>{`
        /* Ambient beat: a soft broadcast ring pulses while the launchpad slide rests. */
        .wwb-live { transform-origin: 200px 44px; }
        .wwb-live::after { content: ''; }
        .wwb-illust[data-animate="true"] .wwb-live > path:first-of-type {
          animation: wwb-stroke-draw 900ms var(--wwb-ease) both, wwb-live-pulse 5s ease-in-out 1.4s infinite;
        }
        @keyframes wwb-live-pulse { 0%, 82%, 100% { opacity: 0.9; } 90% { opacity: 0.35; } }
        /* Token travels hand-to-hand along the linked arms of the community slide. */
        .wwb-token { animation: wwb-token-move 3.6s var(--wwb-ease) 0.6s infinite; }
        @keyframes wwb-token-move {
          0%   { transform: translate(138px, 140px); opacity: 0; }
          12%  { opacity: 1; }
          50%  { transform: translate(200px, 96px); opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translate(262px, 140px); opacity: 0; }
        }
        /* Echoes fade up a beat after the solid fren draws in. */
        .wwb-illust[data-animate="true"] .wwb-echoes { animation: wwb-echo-in 900ms var(--wwb-ease) 0.5s both; }
        @keyframes wwb-echo-in { from { opacity: 0; } to { opacity: 0.34; } }
        @media (prefers-reduced-motion: reduce) {
          .wwb-token, .wwb-illust[data-animate="true"] .wwb-live > path:first-of-type, .wwb-illust[data-animate="true"] .wwb-echoes { animation: none !important; }
        }
      `}</style>
    </article>
  );
}
