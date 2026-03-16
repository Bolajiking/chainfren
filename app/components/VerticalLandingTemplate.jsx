'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Check, ArrowRight, ChevronDown, Star, Zap, ArrowUpRight, X
} from 'lucide-react'
import CalendlyWidget from '@/app/components/CalendlyWidget'
import Navbar from '@/app/components/Navbar'

// --- Brand Color Tokens (matching TiVi main page) ---
const C = {
  bg:         '#FFFFFF',
  dark:       '#08153C',
  blue:       '#4357F6',
  periwinkle: '#8DAAFF',
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

// --- Animation Helpers ---
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

function BrandButton({ href, onClick, children, variant = 'dark', className = '' }) {
  const base = 'group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-200 border-2'
  const styles = {
    dark:  'bg-dark-blue text-white border-dark-blue hover:bg-white hover:text-dark-blue',
    light: 'bg-white text-dark-blue border-dark-blue hover:bg-dark-blue hover:text-white',
  }
  const cls = `${base} ${styles[variant] || styles.dark} ${className}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button onClick={onClick} className={cls}>{children}</button>
}

// --- Counter Animation ---
function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value}{suffix}
        </motion.span>
      ) : '0'}
    </span>
  )
}

// =============================================================================
// HERO SECTION
// =============================================================================
function HeroSection({ data }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const Icon = data.icon

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-white">
      <CalendlyWidget />

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[60%] h-[80%] rounded-bl-[80px] opacity-15" style={{ background: data.accentColor }} />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10" style={{ background: C.cyan }} />
      <div className="absolute top-[30%] left-[5%] w-20 h-20 rounded-full opacity-8" style={{ background: C.lime }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 lg:pt-28 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left copy */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase border-2 mb-6"
                style={{ background: data.accentColor, color: C.dark, borderColor: C.dark }}
              >
                <Icon className="w-3.5 h-3.5" />
                {data.badge}
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight"
              style={{ color: C.dark }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {data.headline}
              <br />
              <span className="relative inline-block">
                {data.headlineAccent}
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C60 2 180 2 298 8" stroke={data.accentColor} strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{ color: C.muted }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {data.subheadline}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrandButton href="#get-started">
                {data.ctaText || 'Get Early Access'} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </BrandButton>
              <BrandButton
                variant="light"
                onClick={() => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/chainfren' })}
              >
                Book a Demo
              </BrandButton>
            </motion.div>
          </div>

          {/* Right image */}
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
              <div className="absolute -inset-2 rounded-[26px] border-2 opacity-20 translate-x-2 translate-y-2" style={{ borderColor: C.dark }} />
              <div className="absolute -inset-1 rounded-[26px] blur-2xl opacity-30" style={{ background: data.accentColor }} />
              <div className="relative rounded-[26px] overflow-hidden border-2 shadow-[0_8px_40px_rgba(8,21,60,0.12)]" style={{ borderColor: C.dark }}>
                <Image
                  src={data.heroImage}
                  alt={data.heroImageAlt}
                  width={1473}
                  height={704}
                  className="relative z-10 w-full h-auto object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// STATS BAR
// =============================================================================
function StatsBar({ stats, accentColor }) {
  return (
    <section className="bg-white border-y-2" style={{ borderColor: C.dark }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-0 lg:divide-x-2" style={{ '--tw-divide-opacity': 1, '--tw-divide-color': C.dark + '15' }}>
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.08}>
              <div className="py-8 px-4 text-center">
                <p className="text-3xl sm:text-4xl font-bold" style={{ color: C.dark }}>{stat.value}</p>
                <p className="mt-1 text-sm font-medium" style={{ color: C.muted }}>{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// PROBLEM SECTION
// =============================================================================
function ProblemSection({ data }) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <FadeUp className="text-center mb-16">
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: data.accentColor === C.periwinkle ? C.teal : C.blue }}>
            {data.problemLabel || 'The Problem'}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight uppercase max-w-4xl mx-auto" style={{ color: C.dark }}>
            {data.problemHeadline}
          </h2>
          {data.problemSubheadline && (
            <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: C.muted }}>
              {data.problemSubheadline}
            </p>
          )}
        </FadeUp>

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {data.painPoints.map((point, i) => {
            const Icon = point.icon
            return (
              <FadeUp key={point.title} delay={i * 0.08}>
                <div
                  className="relative h-full rounded-3xl border-2 p-7 flex flex-col"
                  style={{ background: i % 2 === 0 ? '#FAFAFA' : 'white', borderColor: C.dark }}
                >
                  <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-4" style={{ borderColor: C.dark, background: data.accentColor + '30' }}>
                    <Icon className="w-5 h-5" style={{ color: C.dark }} />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: C.dark }}>{point.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: C.muted }}>{point.desc}</p>
                  {point.stat && (
                    <div className="mt-4 pt-3 border-t" style={{ borderColor: C.dark + '10' }}>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.dark }}>{point.stat}</span>
                    </div>
                  )}
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SOLUTION / FEATURES SECTION
// =============================================================================
function SolutionSection({ data }) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <FadeUp className="text-center mb-16">
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.teal }}>
            {data.solutionLabel || 'The TiVi Solution'}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight uppercase max-w-4xl mx-auto" style={{ color: C.dark }}>
            {data.solutionHeadline}
          </h2>
        </FadeUp>

        <div className="grid gap-2 md:grid-cols-2">
          {data.features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <FadeUp key={feature.title} delay={i * 0.08}>
                <div
                  className="relative h-full rounded-3xl border-2 p-8 flex flex-col"
                  style={{ background: feature.bg || data.accentColor + '15', borderColor: C.dark }}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-2xl border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: C.dark, background: 'white' }}>
                      <Icon className="w-6 h-6" style={{ color: C.dark }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: C.dark }}>{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: C.muted }}>{feature.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// USE CASES SECTION
// =============================================================================
function UseCasesSection({ data }) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <FadeUp className="text-center mb-16">
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.blue }}>
            {data.useCasesLabel || 'Use Cases'}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight uppercase max-w-3xl mx-auto" style={{ color: C.dark }}>
            {data.useCasesHeadline}
          </h2>
        </FadeUp>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.useCases.map((uc, i) => (
            <ScaleIn key={uc.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border-2 overflow-hidden" style={{ background: uc.bg || data.accentColor, borderColor: C.dark }}>
                <div className="p-7">
                  <div className="w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center mb-4" style={{ borderColor: C.dark }}>
                    <span className="text-sm font-bold" style={{ color: C.dark }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: C.dark }}>{uc.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.dark + 'CC' }}>{uc.desc}</p>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// COMPARISON TABLE
// =============================================================================
function ComparisonSection({ data }) {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <FadeUp className="text-center mb-14">
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.teal }}>
            {data.comparisonLabel || 'Compare'}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight uppercase" style={{ color: C.dark }}>
            {data.comparisonHeadline}
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="rounded-3xl border-2 overflow-hidden" style={{ borderColor: C.dark }}>
            {/* Header */}
            <div className="grid grid-cols-[1fr_repeat(var(--cols),80px)] sm:grid-cols-[1fr_repeat(var(--cols),100px)] border-b-2" style={{ borderColor: C.dark, background: data.accentColor, '--cols': data.comparisonPlatforms.length }}>
              <div className="px-5 py-4">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.dark }}>Feature</span>
              </div>
              {data.comparisonPlatforms.map((platform) => (
                <div key={platform} className="px-2 py-4 text-center border-l-2" style={{ borderColor: C.dark + '20' }}>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.dark }}>{platform}</span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {data.comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className="grid border-b last:border-b-0"
                style={{
                  gridTemplateColumns: `1fr repeat(${data.comparisonPlatforms.length}, minmax(80px, 100px))`,
                  borderColor: C.dark + '15',
                  background: i % 2 === 0 ? 'white' : '#FAFAFA',
                }}
              >
                <div className="px-5 py-3.5 flex items-center">
                  <span className="text-sm font-medium" style={{ color: C.dark }}>{row.feature}</span>
                </div>
                {row.values.map((val, j) => (
                  <div key={j} className="px-2 py-3.5 flex items-center justify-center border-l" style={{ borderColor: C.dark + '10' }}>
                    {typeof val === 'boolean' ? (
                      val ? (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: C.mint }}>
                          <Check className="w-3.5 h-3.5" style={{ color: C.dark }} />
                        </div>
                      ) : (
                        <X className="w-4 h-4" style={{ color: C.dim }} />
                      )
                    ) : (
                      <span className={`text-xs font-bold ${j === 0 ? '' : ''}`} style={{ color: j === 0 ? C.dark : C.muted }}>{val}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// =============================================================================
// QUOTE / PULL QUOTE SECTION
// =============================================================================
function QuoteSection({ data }) {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <FadeUp>
          <div className="rounded-3xl border-2 p-10 sm:p-14 text-center" style={{ background: data.accentColor, borderColor: C.dark }}>
            <div className="flex justify-center mb-6">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-5 h-5" style={{ fill: C.dark, color: C.dark }} />
              ))}
            </div>
            <blockquote className="text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed max-w-3xl mx-auto" style={{ color: C.dark }}>
              &ldquo;{data.quote.text}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-bold" style={{ color: C.dark }}>{data.quote.author}</p>
              <p className="text-sm" style={{ color: C.muted }}>{data.quote.role}</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// =============================================================================
// LEAD FORM / CTA
// =============================================================================
function LeadForm({ data }) {
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
          vertical: data.verticalName,
        }),
      })
      if (!response.ok) throw new Error('Failed')
      setSubmitting(false)
      setSubmitted(true)
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <section id="get-started" className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 pb-20 sm:pb-28">
        <div className="rounded-3xl border-2 overflow-hidden" style={{ background: data.accentColor, borderColor: C.dark }}>
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left */}
            <div className="p-8 sm:p-12 lg:p-14">
              <FadeUp>
                <span className="text-xs font-bold tracking-wider uppercase" style={{ color: C.dark }}>Get Started</span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight uppercase" style={{ color: C.dark }}>
                  {data.ctaHeadline}
                </h2>
                <p className="mt-4 text-base leading-relaxed" style={{ color: C.muted }}>
                  {data.ctaSubheadline}
                </p>
                <div className="mt-8 space-y-3">
                  {data.ctaBullets.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white border-2 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: C.dark }}>
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
                  Or book a free demo call instead <ArrowRight className="w-4 h-4" />
                </button>
              </FadeUp>
            </div>

            {/* Right form */}
            <div className="p-8 sm:p-12 lg:p-14">
              <FadeUp delay={0.15}>
                <div className="rounded-3xl bg-white border-2 p-8" style={{ borderColor: C.dark }}>
                  {submitted ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
                      <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center mx-auto mb-4" style={{ background: C.mint, borderColor: C.dark }}>
                        <Check className="w-7 h-7" style={{ color: C.dark }} />
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: C.dark }}>You&apos;re on the list!</h3>
                      <p className="mt-2 text-sm" style={{ color: C.muted }}>We&apos;ll reach out shortly with your early access invite.</p>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold mb-1" style={{ color: C.dark }}>Request Early Access</h3>
                      <p className="text-sm mb-6" style={{ color: C.dim }}>{data.formSubheadline || 'Be among the first to launch your own channel.'}</p>
                      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input required placeholder="Your Name" name="name" className="w-full px-4 py-3 rounded-2xl border-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all" style={{ borderColor: C.dark + '20', color: C.dark }} />
                        <input required type="email" placeholder="Email Address" name="email" className="w-full px-4 py-3 rounded-2xl border-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all" style={{ borderColor: C.dark + '20', color: C.dark }} />
                        <input placeholder={data.orgPlaceholder || 'Organization (optional)'} name="org" className="w-full px-4 py-3 rounded-2xl border-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all" style={{ borderColor: C.dark + '20', color: C.dark }} />
                        <button type="submit" disabled={submitting} className="w-full mt-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wide border-2 transition-all duration-200 disabled:opacity-50" style={{ background: C.dark, color: 'white', borderColor: C.dark }}>
                          {submitting ? 'Submitting...' : (data.formButtonText || 'Request Early Access')}
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

// =============================================================================
// BACK TO TIVI LINK
// =============================================================================
function BackLink() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <Link href="/products/TiVi" className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70" style={{ color: C.muted }}>
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to TiVi
      </Link>
    </div>
  )
}

// =============================================================================
// MAIN TEMPLATE EXPORT
// =============================================================================
export default function VerticalLandingTemplate({ data }) {
  return (
    <div className="bg-white min-h-screen">
      <Navbar contactHref="/products/TiVi/contact" />
      <BackLink />
      <HeroSection data={data} />
      <StatsBar stats={data.stats} accentColor={data.accentColor} />
      <ProblemSection data={data} />
      <SolutionSection data={data} />
      <UseCasesSection data={data} />
      <ComparisonSection data={data} />
      <QuoteSection data={data} />
      <LeadForm data={data} />
    </div>
  )
}

export { C, FadeUp, ScaleIn, BrandButton }
