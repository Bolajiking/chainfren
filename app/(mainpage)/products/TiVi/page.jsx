'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Check, Play, DollarSign, Shield, Users, BarChart2,
  ArrowRight, ChevronDown, Star, Zap, X, Tv, Music,
  Church, Trophy, Ticket, Film, Globe, Lock, Wallet
} from 'lucide-react'
import CalendlyWidget from '@/app/components/CalendlyWidget'
import Navbar from '@/app/components/Navbar'

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
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --- Data --------------------------------------------------------------------

const FEATURES = [
  {
    icon: Play,
    title: 'Livestream & On-Demand',
    desc: 'Go live in HD on any device or build a VOD library your audience can access anytime. Your content, your rules — no surprise takedowns.',
    accent: '#4357F6',
  },
  {
    icon: Lock,
    title: 'Gate & Monetize Access',
    desc: 'Subscriptions, pay-per-view, or VIP tiers. Set your own prices with direct wallet-to-wallet payments. No middlemen.',
    accent: '#665DE9',
  },
  {
    icon: DollarSign,
    title: 'Built-In Storefront',
    desc: 'Sell merch, digital downloads, tickets, or bundles directly from your channel page. Replace five tools with one.',
    accent: '#40ACFF',
  },
  {
    icon: Users,
    title: 'Own Your Audience',
    desc: 'Unlike YouTube or Twitch, you own your subscriber data. Export it anytime. No algorithm decides who sees your content.',
    accent: '#4357F6',
  },
  {
    icon: Wallet,
    title: 'Keep 100% of Revenue',
    desc: 'YouTube takes 45%. Twitch takes 50%. TiVi takes zero. Direct payments mean every dollar your audience spends goes to you.',
    accent: '#665DE9',
  },
  {
    icon: BarChart2,
    title: 'Actionable Analytics',
    desc: 'Understand viewer behavior, track revenue in real time, and grow faster with first-party data you actually own.',
    accent: '#40ACFF',
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
  },
  {
    icon: Trophy,
    title: 'Sports & Leagues',
    tagline: 'Every game. Every fan. Your league\'s streaming home.',
    desc: 'Minor leagues, niche sports, and combat promotions locked out of broadcast deals can now stream every event with PPV ticketing and fan engagement tools. The $37.7B sports OTT market is moving direct-to-consumer.',
    img: '/img9.jpg',
    stats: '$37.7B sports streaming market',
  },
  {
    icon: Church,
    title: 'Churches & Ministries',
    tagline: 'Your ministry. Your platform. Your congregation.',
    desc: '87% of churches still stream post-pandemic, but YouTube shows ads before your sermon. TiVi gives every church a branded channel with built-in giving, sermon archives, and zero ads — at a fraction of the cost of a custom app.',
    img: '/img11.jpg',
    stats: '87% of churches streaming',
  },
  {
    icon: Ticket,
    title: 'Events & Concerts',
    tagline: 'Your venue never closes.',
    desc: 'Stream every show, sell virtual tickets, and build a content library that generates revenue long after the lights go off. Tomorrowland proved fans will pay for digital access — now any promoter can do the same.',
    img: '/img8.jpg',
    stats: '$60.2B event promotion industry',
  },
  {
    icon: Film,
    title: 'Film & Cinema',
    tagline: 'Your own cinema. Screen your work. Own your audience.',
    desc: 'Independent filmmakers and festivals can premiere films, host Q&As, sell tickets to virtual screenings, and build a subscriber base — without licensing content to platforms that bury it.',
    img: '/img3.jpg',
    stats: '$381B VOD market by 2032',
  },
  {
    icon: Tv,
    title: 'Content Creators',
    tagline: 'You are the network. Your page is the channel.',
    desc: '96% of creators earn under $100K/year because platforms optimize for the top 1%. TiVi is built for the other 96% — direct monetization means no algorithm gatekeeping your income.',
    img: '/img5.jpg',
    stats: '$214B creator economy',
  },
]

const COMPARISON = [
  { feature: 'Revenue to creator', tivi: '100%', youtube: '55-70%', twitch: '50%', kick: '95%' },
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
  },
  {
    quote: 'We moved from YouTube to our own platform, kept 100% of donations, and finally own our congregation data. No more ads before sermons.',
    author: 'Pastor Samuel',
    role: 'Faith Community Leader',
    stars: 5,
  },
  {
    quote: 'As an indie creator, I was tired of algorithms deciding my income. TiVi gave me full control and direct sales in one place. It just works.',
    author: 'Jane D.',
    role: 'Content Creator',
    stars: 5,
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
    a: 'TiVi is your home base, not a discovery platform. You bring your audience from social media through your link-in-bio, then own that relationship directly. Think of it as the Shopify for live creators — your audience comes to your channel.',
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
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% -10%, rgba(67, 87, 246, 0.15), transparent), #fafafa',
      }}
    >
      <CalendlyWidget />

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#4357F6 1px, transparent 1px), linear-gradient(90deg, #4357F6 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left copy */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#4357F6]/10 text-[#4357F6] mb-6">
                <Zap className="w-3.5 h-3.5" />
                Now in Early Access
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Your Channel.{' '}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#4357F6] to-[#665DE9] bg-clip-text text-transparent">
                Your Audience.
              </span>
              <br />
              Your Revenue.
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              TiVi is the all-in-one streaming platform where creators and brands own their audience and keep <strong className="text-gray-900">100% of their earnings</strong>. Stream live or on-demand, sell directly, and never depend on an algorithm again.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="#get-started"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white bg-gradient-to-r from-[#4357F6] to-[#665DE9] shadow-[0_2px_24px_rgba(67,87,246,0.35)] hover:shadow-[0_4px_32px_rgba(67,87,246,0.5)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Request Early Access
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                onClick={() => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/chainfren' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-gray-700 bg-white border border-gray-200 shadow-sm hover:border-[#4357F6]/30 hover:text-[#4357F6] transition-all duration-300 hover:-translate-y-0.5"
              >
                Book a Free Demo
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.p
              className="mt-10 text-sm text-gray-400 text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Joining the <strong className="text-gray-600">$214B creator economy</strong> — built for the 96% of creators platforms ignore.
            </motion.p>
          </div>

          {/* Right hero image */}
          <motion.div
            className="flex-1 w-full max-w-xl lg:max-w-none"
            style={{ y: heroImageY, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 blur-[80px] opacity-30 bg-gradient-to-tr from-[#4357F6] to-[#40ACFF] rounded-3xl scale-90" />
              <Image
                src="/img1.png"
                alt="TiVi streaming platform preview"
                width={700}
                height={700}
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hidden lg:flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-gray-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// --- Stats Bar ---------------------------------------------------------------

function StatsBar() {
  return (
    <section className="relative bg-gray-900 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#40ACFF] to-[#665DE9] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm text-gray-400 tracking-wide uppercase font-medium">
                {stat.label}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Problem Section ---------------------------------------------------------

function ProblemSection() {
  return (
    <section className="relative bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#FF6B6B] text-sm font-semibold tracking-widest uppercase">The Problem</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Stop Renting Your Audience From Algorithms
          </h2>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed">
            Creators and brands pour years into building audiences on platforms that don&apos;t belong to them. One algorithm change, one policy shift, and everything disappears.
          </p>
        </FadeUp>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              stat: '45-50%',
              label: 'Revenue taken by YouTube and Twitch',
              detail: 'Major platforms pocket nearly half of what your audience pays to support you.',
            },
            {
              stat: '0%',
              label: 'Audience data you own on Twitch',
              detail: 'You cannot export a single subscriber email. Get banned and you lose everything.',
            },
            {
              stat: '96%',
              label: 'Of creators earn under $100K/year',
              detail: 'Platforms optimize for the top 1%. The algorithm decides who gets paid, not your talent.',
            },
          ].map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.1}>
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-7">
                <div className="text-3xl font-bold text-[#FF6B6B] mb-2">{item.stat}</div>
                <h3 className="text-white font-semibold mb-2">{item.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-12 text-center">
          <p className="text-xl text-white font-semibold">
            There has to be a better way.{' '}
            <span className="bg-gradient-to-r from-[#40ACFF] to-[#665DE9] bg-clip-text text-transparent">There is.</span>
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

// --- Features ----------------------------------------------------------------

function FeatureGrid() {
  return (
    <section id="features" className="relative bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#4357F6] text-sm font-semibold tracking-widest uppercase">The Solution</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Everything You Need to Own Your Channel
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Streaming, storefront, audience data, and direct payments — consolidated into one link-in-bio experience.
          </p>
        </FadeUp>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <ScaleIn key={f.title} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl bg-gray-50 border border-gray-100 p-7 transition-all duration-500 hover:bg-white hover:border-[#4357F6]/20 hover:shadow-[0_4px_40px_rgba(67,87,246,0.08)]">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${f.accent}18, ${f.accent}08)` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: f.accent }} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">{f.desc}</p>
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
    <section className="relative bg-gray-950 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4357F6]/5 rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <FadeUp className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#40ACFF] text-sm font-semibold tracking-widest uppercase">Compare</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            See Why Creators Switch to TiVi
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-gray-500 pb-4 pr-4 w-[35%]" />
                  <th className="text-center pb-4 px-3 w-[16.25%]">
                    <div className="inline-flex flex-col items-center gap-1.5">
                      <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#4357F6] to-[#665DE9] text-white text-sm font-bold">TiVi</div>
                    </div>
                  </th>
                  <th className="text-center text-sm font-medium text-gray-500 pb-4 px-3 w-[16.25%]">YouTube</th>
                  <th className="text-center text-sm font-medium text-gray-500 pb-4 px-3 w-[16.25%]">Twitch</th>
                  <th className="text-center text-sm font-medium text-gray-500 pb-4 px-3 w-[16.25%]">Kick</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} className="border-t border-white/[0.06]">
                    <td className="py-4 pr-4 text-[15px] text-gray-300">{row.feature}</td>
                    {['tivi', 'youtube', 'twitch', 'kick'].map((platform) => {
                      const val = row[platform]
                      return (
                        <td key={platform} className="py-4 px-3 text-center">
                          {typeof val === 'boolean' ? (
                            val ? (
                              <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-600 mx-auto" />
                            )
                          ) : (
                            <span className={`text-sm font-semibold ${platform === 'tivi' ? 'text-emerald-400' : 'text-gray-400'}`}>
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

        <FadeUp delay={0.2} className="mt-10 text-center">
          <Link
            href="#get-started"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white bg-gradient-to-r from-[#4357F6] to-[#665DE9] shadow-[0_2px_24px_rgba(67,87,246,0.35)] hover:shadow-[0_4px_32px_rgba(67,87,246,0.5)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Switch to TiVi
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}

// --- Verticals / Use Cases ---------------------------------------------------

function Verticals() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#4357F6] text-sm font-semibold tracking-widest uppercase">Built For Every Industry</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            One Platform. Every Vertical.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            From solo creators to sports leagues to megachurches — TiVi gives any organization a branded streaming channel without the enterprise price tag.
          </p>
        </FadeUp>

        {/* Desktop interactive layout */}
        <div className="hidden lg:grid grid-cols-[1fr_1.1fr] gap-14 items-start">
          {/* Left selectors */}
          <FadeUp className="flex flex-col gap-1.5">
            {VERTICALS.map((v, i) => {
              const Icon = v.icon
              return (
                <button
                  key={v.title}
                  onClick={() => setActiveIdx(i)}
                  className={`group relative text-left px-5 py-4 rounded-xl transition-all duration-300 ${
                    activeIdx === i
                      ? 'bg-[#4357F6]/[0.06] border border-[#4357F6]/20'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${activeIdx === i ? 'text-[#4357F6]' : 'text-gray-400'}`} />
                    <div>
                      <h3 className={`text-[16px] font-semibold transition-colors ${activeIdx === i ? 'text-[#4357F6]' : 'text-gray-700'}`}>
                        {v.title}
                      </h3>
                      {activeIdx === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-gray-500 mt-0.5"
                        >
                          {v.stats}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </FadeUp>

          {/* Right content card */}
          <FadeUp delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden bg-gray-900">
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
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
              </div>

              {/* Text overlay */}
              <div className="relative px-8 pb-8 -mt-20 z-10">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[#40ACFF] text-sm font-semibold mb-2">{VERTICALS[activeIdx].tagline}</p>
                  <p className="text-gray-300 text-[15px] leading-relaxed">{VERTICALS[activeIdx].desc}</p>
                  <Link href="/contact" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-white hover:text-[#40ACFF] transition-colors">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden grid gap-5 sm:grid-cols-2">
          {VERTICALS.map((v, i) => {
            const Icon = v.icon
            return (
              <ScaleIn key={v.title} delay={i * 0.06}>
                <div className="group relative rounded-2xl overflow-hidden aspect-[3/2]">
                  <Image src={v.img} alt={v.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-[#40ACFF]" />
                      <span className="text-[#40ACFF] text-xs font-semibold">{v.stats}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg">{v.title}</h3>
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
    <section className="relative bg-gray-950 overflow-hidden">
      <div className="absolute -top-px left-0 right-0 h-24 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 100%)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-20 sm:pb-28">
        <FadeUp className="text-center mb-16">
          <span className="text-[#40ACFF] text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Creators Love TiVi
          </h2>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.author} delay={i * 0.12}>
              <div className="relative h-full rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-8 flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#FFC857] text-[#FFC857]" />
                  ))}
                </div>
                <blockquote className="flex-1 text-[17px] text-gray-300 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-sm text-[#40ACFF]">{t.role}</p>
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
    <section id="faq" className="relative bg-gray-950">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <FadeUp className="text-center mb-14">
          <span className="text-[#40ACFF] text-sm font-semibold tracking-widest uppercase">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Frequently Asked Questions</h2>
        </FadeUp>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FadeUp key={faq.q} delay={i * 0.06}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center justify-between px-6 py-5">
                  <span className="text-[16px] font-medium text-white pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}
                  />
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIdx === i ? 'auto' : 0,
                    opacity: openIdx === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-[15px] text-gray-400 leading-relaxed">{faq.a}</p>
                </motion.div>
              </button>
            </FadeUp>
          ))}
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
    <section id="get-started" className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(#4357F6 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <FadeUp>
            <span className="text-[#4357F6] text-sm font-semibold tracking-widest uppercase">Get Started</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Ready to Own Your Audience?
            </h2>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              Join the next generation of creators, churches, sports leagues, and brands building their own streaming channels. No credit card required.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Launch your branded channel in under a minute',
                'Keep 100% of every dollar your audience pays',
                'Own your subscriber data — export it anytime',
                'Replace 5+ tools with one platform',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#4357F6]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#4357F6]" />
                  </div>
                  <span className="text-[15px] text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/chainfren' })}
              className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#4357F6] hover:text-[#665DE9] transition-colors cursor-pointer"
            >
              Or book a free demo call instead
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeUp>

          {/* Right form */}
          <FadeUp delay={0.15}>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-8 sm:p-10">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">You&apos;re on the list!</h3>
                  <p className="mt-2 text-gray-500">We&apos;ll reach out shortly with your early access invite.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Request Early Access</h3>
                  <p className="text-sm text-gray-500 mb-6">Be among the first to launch your own channel.</p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      required
                      placeholder="Your Name"
                      name="name"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4357F6]/30 focus:border-[#4357F6]/40 transition-all text-[15px]"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4357F6]/30 focus:border-[#4357F6]/40 transition-all text-[15px]"
                    />
                    <input
                      placeholder="Organization (optional)"
                      name="org"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4357F6]/30 focus:border-[#4357F6]/40 transition-all text-[15px]"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-[#4357F6] to-[#665DE9] text-white font-semibold text-[15px] hover:shadow-[0_2px_24px_rgba(67,87,246,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                    >
                      {submitting ? 'Submitting...' : 'Request Early Access'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// --- Main Page ---------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <main className="min-h-screen w-full overflow-x-hidden">
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

      <footer className="bg-gray-950 border-t border-white/[0.06] py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TiVi by Chainfren. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
