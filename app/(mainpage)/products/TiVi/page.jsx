'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Check, Play, DollarSign, Shield, Users, BarChart2,
  ArrowRight, ChevronDown, Star, Zap, X, Tv, Music,
  Church, Trophy, Ticket, Film, Globe, Lock, Wallet,
  Eye, ArrowUpRight
} from 'lucide-react'
import CalendlyWidget from '@/app/components/CalendlyWidget'
import Navbar from '@/app/components/Navbar'

// --- Brand Color Tokens (matching main site) ---
const C = {
  bg:         '#FFFFFF',
  dark:       '#08153C',
  blue:       '#4357F6',
  periwinkle: '#8DAAFF',  // TiVi signature
  cyan:       '#5ACDFF',
  mint:       '#CBF0B8',
  lime:       '#A6D234',
  teal:       '#1DA6E2',
  lavender:   '#E6D9FF',
  coral:      '#FF6B6B',
  text:       '#08153C',
  muted:      '#4A5568',
  dim:        '#8896AB',
}

// --- Animation Helpers -------------------------------------------------------

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ScaleIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --- Branded pill-shaped button (matches site) ---
function BrandButton({ href, onClick, children, variant = 'dark', className = '' }) {
  const base = 'group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-200 border-2'
  const styles = {
    dark:  'bg-dark-blue text-white border-dark-blue hover:bg-white hover:text-dark-blue',
    light: 'bg-white text-dark-blue border-dark-blue hover:bg-dark-blue hover:text-white',
    color: `bg-[${C.periwinkle}] text-dark-blue border-dark-blue hover:opacity-80`,
  }

  const cls = `${base} ${styles[variant]} ${className}`

  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button onClick={onClick} className={cls}>{children}</button>
}

// --- Data --------------------------------------------------------------------

const FEATURES = [
  {
    icon: Play,
    title: 'Livestream & On-Demand',
    desc: 'Go live in HD on any device or build a VOD library your audience can access anytime. Your content, your rules — no surprise takedowns.',
    bg: C.periwinkle,
  },
  {
    icon: Lock,
    title: 'Gate & Monetize Access',
    desc: 'Subscriptions, pay-per-view, or VIP tiers. Set your own prices with direct wallet-to-wallet payments. No middlemen.',
    bg: C.cyan,
  },
  {
    icon: DollarSign,
    title: 'Built-In Storefront',
    desc: 'Sell merch, digital downloads, tickets, or bundles directly from your channel page. Replace five tools with one.',
    bg: C.mint,
  },
  {
    icon: Users,
    title: 'Own Your Audience',
    desc: 'Unlike YouTube or Twitch, you own your subscriber data. Export it anytime. No algorithm decides who sees your content.',
    bg: C.lavender,
  },
  {
    icon: Wallet,
    title: 'Keep 100% of Revenue',
    desc: 'YouTube takes 45%. Twitch takes 50%. TiVi takes zero. Direct payments mean every dollar your audience spends goes to you.',
    bg: C.lime,
  },
  {
    icon: BarChart2,
    title: 'Actionable Analytics',
    desc: 'Understand viewer behavior, track revenue in real time, and grow faster with first-party data you actually own.',
    bg: '#A6E1FA',
  },
]

const VERTICALS = [
  {
    icon: Music,
    title: 'Music & Artists',
    tagline: 'Your own MTV. Your music. Your fans.',
    desc: 'Album release listening parties, live sessions, music video libraries, and merch — all in one channel. Artists leaving Spotify over $0.003/stream payouts now have a home where fans pay them directly.',
    img: '/img7.jpg',
    stats: '$39B digital music market',
    bg: C.periwinkle,
  },
  {
    icon: Trophy,
    title: 'Sports & Leagues',
    tagline: 'Every game. Every fan. Your league\'s streaming home.',
    desc: 'Minor leagues, niche sports, and combat promotions locked out of broadcast deals can now stream every event with PPV ticketing and fan engagement tools.',
    img: '/img9.jpg',
    stats: '$37.7B sports streaming market',
    bg: C.cyan,
  },
  {
    icon: Church,
    title: 'Churches & Ministries',
    tagline: 'Your ministry. Your platform. Your congregation.',
    desc: '87% of churches still stream post-pandemic, but YouTube shows ads before your sermon. TiVi gives every church a branded channel with built-in giving, sermon archives, and zero ads.',
    img: '/img11.jpg',
    stats: '87% of churches streaming',
    bg: C.mint,
  },
  {
    icon: Ticket,
    title: 'Events & Concerts',
    tagline: 'Your venue never closes.',
    desc: 'Stream every show, sell virtual tickets, and build a content library that generates revenue long after the lights go off.',
    img: '/img7.jpg',
    stats: '$60.2B event promotion industry',
    bg: C.lavender,
  },
  {
    icon: Film,
    title: 'Film & Cinema',
    tagline: 'Your own cinema. Screen your work. Own your audience.',
    desc: 'Independent filmmakers and festivals can premiere films, host Q&As, sell tickets to virtual screenings, and build a subscriber base.',
    img: '/moviiii.png',
    stats: '$381B VOD market by 2032',
    bg: C.lime,
  },
  {
    icon: Tv,
    title: 'Content Creators',
    tagline: 'You are the network. Your page is the channel.',
    desc: '96% of creators earn under $100K/year because platforms optimize for the top 1%. TiVi is built for the other 96% — direct monetization, no algorithm gatekeeping.',
    img: '/img8.jpg',
    stats: '$214B creator economy',
    bg: '#A6E1FA',
  },
]

const COMPARISON = [
  { feature: 'Revenue to creator', tivi: '100%', youtube: '45-50%', twitch: '50%', kick: '95%' },
  { feature: 'Audience data ownership', tivi: true, youtube: false, twitch: false, kick: false },
  { feature: 'Built-in storefront', tivi: true, youtube: false, twitch: false, kick: false },
  { feature: 'No algorithm dependency', tivi: true, youtube: false, twitch: false, kick: false },
  { feature: 'Export subscriber list', tivi: true, youtube: false, twitch: false, kick: false },
  { feature: 'Custom branded channel', tivi: true, youtube: false, twitch: false, kick: false },
  { feature: 'Direct wallet payments', tivi: true, youtube: false, twitch: false, kick: false },
  { feature: 'Link-in-bio storefront', tivi: true, youtube: false, twitch: false, kick: false },
]

const TESTIMONIALS = [
  {
    quote: 'TiVi let us launch our own pay-per-view sports streams in a weekend. Revenue tripled compared to what we made on Twitch.',
    author: 'Mark R.',
    role: 'Event Organizer',
    stars: 5,
    bg: C.periwinkle,
  },
  {
    quote: 'We moved from YouTube to our own platform, kept 100% of donations, and finally own our congregation data. No more ads before sermons.',
    author: 'Pastor Samuel',
    role: 'Faith Community Leader',
    stars: 5,
    bg: C.mint,
  },
  {
    quote: 'As an indie creator, I was tired of algorithms deciding my income. TiVi gave me full control and direct sales in one place. It just works.',
    author: 'Jane D.',
    role: 'Content Creator',
    stars: 5,
    bg: C.cyan,
  },
]

const FAQS = [
  {
    q: 'How much does TiVi cost?',
    a: 'TiVi offers a free tier to get started and flexible plans as you grow. Unlike platforms that take 30-50% of your revenue, all TiVi plans let you keep 100% of what you earn from your audience.',
  },
  {
    q: 'Do I need coding skills?',
    a: 'No. Launch your branded streaming channel in minutes with our no-code setup. If you can set up a social media profile, you can launch on TiVi.',
  },
  {
    q: 'Can I import my existing videos?',
    a: 'Absolutely. Upload directly or migrate your content from YouTube, Vimeo, or other platforms. Your content library transfers seamlessly.',
  },
  {
    q: 'How is TiVi different from YouTube or Twitch?',
    a: 'YouTube takes up to 45% of your revenue and owns your audience data. Twitch takes 50%. TiVi takes zero — you keep 100% of revenue through direct payments, own your subscriber data, and control your channel without algorithm interference.',
  },
  {
    q: 'What about discoverability?',
    a: 'TiVi is your home base, not a discovery platform. You bring your audience from social media through your link-in-bio, then own that relationship directly. Think of it as the Shopify for live creators.',
  },
  {
    q: 'Can organizations and brands use TiVi?',
    a: 'Yes. TiVi serves individual creators, churches, sports leagues, music labels, event promoters, and film studios. Any organization that needs a branded streaming channel with direct monetization.',
  },
]

const STATS = [
  { value: '100%', label: 'Revenue to you' },
  { value: '0%', label: 'Platform cut' },
  { value: '<1min', label: 'To launch' },
  { value: '5+', label: 'Tools replaced' },
]

// --- Hero Section ------------------------------------------------------------

function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-white">
      <CalendlyWidget />

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[60%] h-[80%] rounded-bl-[80px] opacity-20" style={{ background: C.periwinkle }} />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10" style={{ background: C.cyan }} />
      <div className="absolute top-[30%] left-[5%] w-20 h-20 rounded-full opacity-10" style={{ background: C.lime }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 lg:pt-28 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left copy */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase border-2 border-dark-blue mb-6"
                style={{ background: C.periwinkle, color: C.dark }}
              >
                <Zap className="w-3.5 h-3.5" />
                Now in Early Access
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-tight"
              style={{ color: C.dark }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              YOUR CHANNEL.
              <br />
              <span className="relative inline-block">
                YOUR AUDIENCE.
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C60 2 180 2 298 8" stroke={C.periwinkle} strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              YOUR REVENUE.
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{ color: C.muted }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              TiVi is the all-in-one streaming platform where creators and brands own their audience and keep{' '}
              <strong style={{ color: C.dark }}>100% of their earnings</strong>.
              <br />
              <span className="font-medium" style={{ color: C.muted }}>Stream live or on-demand, sell directly, and never depend on an algorithm again.</span>
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrandButton href="#get-started" variant="dark">
                Request Early Access
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </BrandButton>
              <BrandButton
                onClick={() => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/chainfren' })}
                variant="light"
              >
                <Play className="w-4 h-4" />
                Book a Free Demo
              </BrandButton>
            </motion.div>

            {/* Social proof */}
            <motion.p
              className="mt-8 text-sm text-center lg:text-left"
              style={{ color: C.dim }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Joining the <strong style={{ color: C.dark }}>$214B creator economy</strong> — built for the 96% of creators platforms ignore.
            </motion.p>
          </div>

          {/* Right hero image */}
          <motion.div
            className="flex-1 w-full max-w-xl lg:max-w-none"
            style={{ y: heroImageY, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Offset decorative frame */}
              <div className="absolute -inset-2 rounded-[26px] border-2 border-dark-blue/8 translate-x-2 translate-y-2" />
              {/* Subtle colored shadow */}
              <div
                className="absolute -inset-1 rounded-[26px] blur-2xl opacity-30"
                style={{ background: C.periwinkle }}
              />
              {/* Main image container */}
              <div className="relative rounded-[26px] overflow-hidden border-2 border-dark-blue shadow-[0_8px_40px_rgba(8,21,60,0.12)]">
                <Image
                  src="/larging.png"
                  alt="TiVi streaming platform — branded video player with live payment notifications from fans"
                  width={1473}
                  height={704}
                  className="relative z-10 w-full h-auto object-cover"
                  priority
                />
              </div>
              {/* Live indicator dot */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-dark-blue/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: C.dark }}>Live</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hidden lg:flex justify-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6" style={{ color: C.dim }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// --- Stats Bar ---------------------------------------------------------------

function StatsBar() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="rounded-3xl border-2 border-dark-blue p-8 sm:p-12" style={{ background: C.dark }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {STATS.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs tracking-wider uppercase font-semibold" style={{ color: C.periwinkle }}>
                  {stat.label}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Problem Section ---------------------------------------------------------

function ProblemSection() {
  const problems = [
    {
      stat: '45-50%',
      label: 'Revenue taken by YouTube & Twitch',
      detail: 'Major platforms pocket nearly half of what your audience pays to support you.',
      icon: DollarSign,
      bg: '#FFDFDF',
    },
    {
      stat: '0%',
      label: 'Audience data you own on Twitch',
      detail: 'You cannot export a single subscriber email. Get banned and you lose everything.',
      icon: Eye,
      bg: '#FFE8CF',
    },
    {
      stat: '96%',
      label: 'Of creators earn under $100K/year',
      detail: 'Platforms optimize for the top 1%. The algorithm decides who gets paid, not your talent.',
      icon: Users,
      bg: '#E6D9FF',
    },
  ]

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.coral }}>
            The Problem
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight uppercase" style={{ color: C.dark }}>
            Stop Renting Your Audience{' '}
            <span style={{ color: C.coral }}>From Algorithms</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed" style={{ color: C.muted }}>
            Creators and brands pour years into building audiences on platforms that don&apos;t belong to them. One algorithm change, one policy shift, and everything disappears.
          </p>
        </FadeUp>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.1}>
              <div
                className="relative h-full rounded-3xl border-2 border-dark-blue p-7 sm:p-8 transition-all duration-300 hover:scale-[1.02]"
                style={{ background: item.bg }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-dark-blue flex items-center justify-center">
                    <item.icon className="w-5 h-5" style={{ color: C.dark }} />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: C.dark }}>{item.stat}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: C.dark }}>{item.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{item.detail}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-12 text-center">
          <p className="text-xl font-bold" style={{ color: C.dark }}>
            There has to be a better way.{' '}
            <span style={{ color: C.blue }}>There is.</span>
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

// --- Features ----------------------------------------------------------------

function FeatureGrid() {
  return (
    <section id="features" className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.blue }}>
            The Solution
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight uppercase" style={{ color: C.dark }}>
            Everything You Need to Own Your Channel
          </h2>
          <p className="mt-4 text-base sm:text-lg" style={{ color: C.muted }}>
            Streaming, storefront, audience data, and direct payments — consolidated into one link-in-bio experience.
          </p>
        </FadeUp>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <ScaleIn key={f.title} delay={i * 0.08}>
                <div
                  className="group relative h-full rounded-3xl border-2 border-dark-blue p-7 transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: f.bg }}
                >
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-dark-blue flex items-center justify-center mb-5 transition-transform duration-300 group-hover:rotate-6">
                    <Icon className="w-5 h-5" style={{ color: C.dark }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: C.dark }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{f.desc}</p>
                </div>
              </ScaleIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// --- Comparison Table --------------------------------------------------------

function ComparisonTable() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="rounded-3xl border-2 border-dark-blue overflow-hidden" style={{ background: C.dark }}>
          <div className="px-6 sm:px-10 pt-12 pb-6">
            <FadeUp className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.periwinkle }}>
                Compare
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-white uppercase">
                See Why Creators Switch to TiVi
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="overflow-x-auto -mx-2">
                <table className="w-full min-w-[580px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-white/40 pb-4 pr-4 w-[36%]" />
                      <th className="text-center pb-4 px-3 w-[16%]">
                        <span
                          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold border-2 border-white/20"
                          style={{ background: C.periwinkle, color: C.dark }}
                        >
                          TiVi
                        </span>
                      </th>
                      <th className="text-center text-xs font-semibold uppercase tracking-wider text-white/40 pb-4 px-3 w-[16%]">YouTube</th>
                      <th className="text-center text-xs font-semibold uppercase tracking-wider text-white/40 pb-4 px-3 w-[16%]">Twitch</th>
                      <th className="text-center text-xs font-semibold uppercase tracking-wider text-white/40 pb-4 px-3 w-[16%]">Kick</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.feature} className="border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors">
                        <td className="py-4 pr-4 text-[15px] text-white/80">{row.feature}</td>
                        {['tivi', 'youtube', 'twitch', 'kick'].map((platform) => {
                          const val = row[platform]
                          return (
                            <td key={platform} className="py-4 px-3 text-center">
                              {typeof val === 'boolean' ? (
                                val ? (
                                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: `${C.mint}30` }}>
                                    <Check className="w-4 h-4" style={{ color: C.mint }} />
                                  </div>
                                ) : (
                                  <X className="w-4 h-4 mx-auto text-white/20" />
                                )
                              ) : (
                                <span className={`text-sm font-bold ${platform === 'tivi' ? 'text-white' : 'text-white/40'}`}>
                                  {val}
                                </span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeUp>

            <FadeUp delay={0.2} className="mt-8 text-center pb-4">
              <Link
                href="#get-started"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wide border-2 transition-all duration-200"
                style={{ background: C.periwinkle, color: C.dark, borderColor: C.periwinkle }}
              >
                Switch to TiVi
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Verticals / Use Cases ---------------------------------------------------

function Verticals() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.blue }}>
            Built For Every Industry
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight uppercase" style={{ color: C.dark }}>
            One Platform. Every Vertical.
          </h2>
          <p className="mt-4 text-base sm:text-lg" style={{ color: C.muted }}>
            From solo creators to sports leagues to megachurches — TiVi gives any organization a branded streaming channel without the enterprise price tag.
          </p>
        </FadeUp>

        {/* Desktop interactive layout */}
        <div className="hidden lg:grid grid-cols-[1fr_1.2fr] gap-2 items-start">
          {/* Left selectors */}
          <FadeUp className="flex flex-col gap-2">
            {VERTICALS.map((v, i) => {
              const Icon = v.icon
              const isActive = activeIdx === i
              return (
                <button
                  key={v.title}
                  onClick={() => setActiveIdx(i)}
                  className="group relative text-left px-5 py-4 rounded-3xl border-2 transition-all duration-300"
                  style={{
                    background: isActive ? v.bg : 'white',
                    borderColor: isActive ? C.dark : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: C.dark }}
                    />
                    <div>
                      <h3 className="text-[15px] font-bold" style={{ color: C.dark }}>
                        {v.title}
                      </h3>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs mt-0.5"
                          style={{ color: C.muted }}
                        >
                          {v.stats}
                        </motion.p>
                      )}
                    </div>
                    {isActive && (
                      <ArrowRight className="w-4 h-4 ml-auto" style={{ color: C.dark }} />
                    )}
                  </div>
                </button>
              )
            })}
          </FadeUp>

          {/* Right content card */}
          <FadeUp delay={0.15}>
            <div
              className="relative rounded-3xl overflow-hidden border-2 border-dark-blue"
              style={{ background: VERTICALS[activeIdx].bg }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10]">
                {VERTICALS.map((v, i) => (
                  <motion.div
                    key={v.title}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: activeIdx === i ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image src={v.img} alt={v.title} fill className="object-cover" />
                  </motion.div>
                ))}
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(to top, ${VERTICALS[activeIdx].bg} 5%, transparent 60%)`,
                }} />
              </div>

              {/* Text overlay */}
              <div className="relative px-8 pb-8 -mt-16 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-dark-blue mb-3"
                      style={{ background: 'white', color: C.dark }}
                    >
                      {VERTICALS[activeIdx].stats}
                    </span>
                    <p className="text-sm font-bold mb-2" style={{ color: C.dark }}>{VERTICALS[activeIdx].tagline}</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{VERTICALS[activeIdx].desc}</p>
                    <Link href="/contact" className="group/link inline-flex items-center gap-1.5 mt-4 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-70" style={{ color: C.dark }}>
                      Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden grid gap-2 sm:grid-cols-2">
          {VERTICALS.map((v, i) => {
            const Icon = v.icon
            return (
              <ScaleIn key={v.title} delay={i * 0.06}>
                <div className="group relative rounded-3xl overflow-hidden border-2 border-dark-blue aspect-[3/2]">
                  <Image src={v.img} alt={v.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold text-white/80">{v.stats}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg">{v.title}</h3>
                    <p className="text-white/60 text-sm mt-1">{v.tagline}</p>
                  </div>
                </div>
              </ScaleIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// --- Testimonials ------------------------------------------------------------

function Testimonials() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <FadeUp className="text-center mb-16">
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.teal }}>
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight uppercase" style={{ color: C.dark }}>
            Creators Love TiVi
          </h2>
        </FadeUp>

        <div className="grid gap-2 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.author} delay={i * 0.12}>
              <div
                className="relative h-full rounded-3xl border-2 border-dark-blue p-8 flex flex-col"
                style={{ background: t.bg }}
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4" style={{ fill: C.dark, color: C.dark }} />
                  ))}
                </div>
                <blockquote className="flex-1 text-[15px] leading-relaxed" style={{ color: C.dark }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-5 border-t-2 border-dark-blue/10">
                  <p className="font-bold" style={{ color: C.dark }}>{t.author}</p>
                  <p className="text-sm" style={{ color: C.muted }}>{t.role}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- FAQ ---------------------------------------------------------------------

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="faq" className="bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <FadeUp className="text-center mb-14">
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.blue }}>FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold uppercase" style={{ color: C.dark }}>
            Frequently Asked Questions
          </h2>
        </FadeUp>

        <div className="space-y-2">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <FadeUp key={faq.q} delay={i * 0.06}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left rounded-3xl border-2 border-dark-blue transition-all duration-300"
                  style={{ background: isOpen ? C.periwinkle : 'white' }}
                >
                  <div className="flex items-center justify-between px-6 py-5">
                    <span className="text-[15px] font-bold pr-4" style={{ color: C.dark }}>{faq.q}</span>
                    <div
                      className="w-8 h-8 rounded-full border-2 border-dark-blue flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isOpen ? 'white' : C.periwinkle,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <ChevronDown className="w-4 h-4" style={{ color: C.dark }} />
                    </div>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: C.muted }}>{faq.a}</p>
                  </motion.div>
                </button>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// --- Lead Form / CTA ---------------------------------------------------------

function LeadForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const response = await fetch('https://chaintv.onrender.com/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          organization: e.target.org.value,
        }),
      })
      if (!response.ok) throw new Error('Failed to submit form')
      setSubmitting(false)
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitting(false)
    }
  }

  return (
    <section id="get-started" className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 pb-20 sm:pb-28">
        <div
          className="rounded-3xl border-2 border-dark-blue overflow-hidden"
          style={{ background: C.periwinkle }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left copy */}
            <div className="p-8 sm:p-12 lg:p-14">
              <FadeUp>
                <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.dark }}>
                  Get Started
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight uppercase" style={{ color: C.dark }}>
                  Ready to Own Your Audience?
                </h2>
                <p className="mt-4 text-base leading-relaxed" style={{ color: C.muted }}>
                  Join the next generation of creators, churches, sports leagues, and brands building their own streaming channels. No credit card required.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    'Launch your branded channel in under a minute',
                    'Keep 100% of every dollar your audience pays',
                    'Own your subscriber data — export it anytime',
                    'Replace 5+ tools with one platform',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white border-2 border-dark-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" style={{ color: C.dark }} />
                      </div>
                      <span className="text-sm" style={{ color: C.dark }}>{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/chainfren' })}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-70 cursor-pointer"
                  style={{ color: C.dark }}
                >
                  Or book a free demo call instead
                  <ArrowRight className="w-4 h-4" />
                </button>
              </FadeUp>
            </div>

            {/* Right form */}
            <div className="p-8 sm:p-12 lg:p-14">
              <FadeUp delay={0.15}>
                <div className="rounded-3xl bg-white border-2 border-dark-blue p-8">
                  {submitted ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-14 h-14 rounded-full border-2 border-dark-blue flex items-center justify-center mx-auto mb-4" style={{ background: C.mint }}>
                        <Check className="w-7 h-7" style={{ color: C.dark }} />
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: C.dark }}>You&apos;re on the list!</h3>
                      <p className="mt-2 text-sm" style={{ color: C.muted }}>We&apos;ll reach out shortly with your early access invite.</p>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold mb-1" style={{ color: C.dark }}>Request Early Access</h3>
                      <p className="text-sm mb-6" style={{ color: C.dim }}>Be among the first to launch your own channel.</p>
                      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                          required
                          placeholder="Your Name"
                          name="name"
                          className="w-full h-12 px-4 rounded-full bg-white border-2 border-dark-blue placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dark-blue/20 transition-all text-sm"
                          style={{ color: C.dark }}
                        />
                        <input
                          required
                          type="email"
                          placeholder="Your Email"
                          name="email"
                          className="w-full h-12 px-4 rounded-full bg-white border-2 border-dark-blue placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dark-blue/20 transition-all text-sm"
                          style={{ color: C.dark }}
                        />
                        <input
                          placeholder="Organization (optional)"
                          name="org"
                          className="w-full h-12 px-4 rounded-full bg-white border-2 border-dark-blue placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dark-blue/20 transition-all text-sm"
                          style={{ color: C.dark }}
                        />
                        <button
                          type="submit"
                          disabled={submitting}
                          className="group w-full h-12 rounded-full text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1 border-2"
                          style={{ background: C.dark, borderColor: C.dark }}
                        >
                          {submitting ? 'Submitting...' : 'Request Early Access →'}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Main Page ---------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <main className="min-h-screen w-full overflow-x-hidden bg-white">
        <Navbar />
        <Hero />
        <StatsBar />
        <ProblemSection />
        <FeatureGrid />
        <ComparisonTable />
        <Verticals />
        <Testimonials />
        <FAQ />
        <LeadForm />
      </main>

      <footer className="bg-white border-t-2 border-dark-blue py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm" style={{ color: C.dim }}>
            &copy; {new Date().getFullYear()} TiVi by Chainfren. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-sm font-semibold" style={{ color: C.dark }}>
            <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
