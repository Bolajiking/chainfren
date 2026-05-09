'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Mail, Send, Calendar, Briefcase, Box, Newspaper, ArrowUpRight } from 'lucide-react'
import CalendlyWidget from '@/app/components/CalendlyWidget'

const C = {
  dark:       '#08153C',
  blue:       '#4357F6',
  periwinkle: '#8DAAFF',
  cyan:       '#5ACDFF',
  mint:       '#CBF0B8',
  lime:       '#A6D234',
  lavender:   '#E6D9FF',
  coral:      '#FF6B6B',
  muted:      '#4A5568',
  dim:        '#8896AB',
}

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const services = [
  { icon: Briefcase, label: 'Agency', desc: 'Web3 strategy & execution', href: '/agency', color: C.cyan },
  { icon: Box, label: 'Products', desc: 'Tools for the creator economy', href: '/products', color: C.periwinkle },
  { icon: Newspaper, label: 'Media', desc: 'Insights & growth strategies', href: '/media', color: C.mint },
]

const interests = [
  'Agency — Strategy & Done-for-You Growth Work',
  'Products — TiVi Streaming Platform',
  'Products — TVinBio (Owned Audience Hub)',
  'Products — Comeownity / Star Factor',
  'Sabi — Editorial / Press / Network Inquiry',
  'Partnership / Collaboration',
  'Investment / Business Development',
  'Other',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    interest: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      setSubmitting(true)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'chainfren' }),
      })
      if (!response.ok) throw new Error('Failed to submit')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Inline nav matching homepage style */}
      <nav className="bg-white w-full md:w-[600px] h-auto md:h-[50px] px-4 md:px-6 py-4 md:py-0 flex items-center justify-between z-50 border-0 md:border md:border-black rounded-none md:rounded-[47.42px] mx-auto mt-0 md:mt-[28px] relative">
        <div className="flex items-center md:absolute md:top-[50%] md:left-[16px] md:transform md:-translate-y-1/2">
          <Link href="/">
            <Image
              src="/chainlogo.png"
              alt="Chainfren Logo"
              width={111}
              height={24}
              className="h-auto w-auto md:w-[111px] md:h-[24px] object-contain"
            />
          </Link>
        </div>
        <div
          className="hidden md:flex items-center md:absolute"
          style={{ gap: '23.71px', top: '50%', left: '193px', transform: 'translateY(-50%)' }}
        >
          <Link href="/agency" className="text-[14px] text-black font-medium hover:opacity-80 transition-opacity uppercase">Agency</Link>
          <Link href="/products" className="text-[14px] text-black font-medium hover:opacity-80 transition-opacity uppercase">Product</Link>
          <Link href="/media" className="text-[14px] text-black font-medium hover:opacity-80 transition-opacity uppercase">Media</Link>
        </div>
        <div className="hidden md:flex items-center" style={{ position: 'absolute', top: '8px', left: '448px' }}>
          <span
            className="text-[14px] text-black font-semibold uppercase bg-white border border-black whitespace-nowrap flex items-center justify-center"
            style={{ width: '142px', height: '34px', borderRadius: '47.42px', opacity: 0.5, cursor: 'default' }}
          >
            Contact
          </span>
        </div>
      </nav>

      <CalendlyWidget />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(${C.cyan} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }} />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full" style={{
          background: `radial-gradient(circle at 30% 30%, ${C.cyan}25, ${C.mint}10, transparent 70%)`,
        }} />
        <motion.div
          className="absolute bottom-12 right-16 w-20 h-20 rounded-2xl hidden lg:block"
          style={{ background: C.lime, opacity: 0.12 }}
          animate={{ rotate: [0, 8, -4, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-28 right-1/3 w-3 h-3 rounded-full hidden lg:block"
          style={{ background: C.cyan }}
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28 relative">
          <FadeUp>
            <span
              className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border mb-8"
              style={{ color: C.cyan, borderColor: C.cyan + '40' }}
            >
              Get in Touch
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight text-white uppercase">
              Join<br />
              <span className="relative inline-block">
                <span style={{ color: C.cyan }}>Chainfren</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                  style={{ background: C.cyan }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              <span style={{ color: C.cyan }}>.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-6 text-base sm:text-lg max-w-lg leading-relaxed" style={{ color: C.dim }}>
              Africa&apos;s growth engine for creators and brands. Whether you&apos;re launching, scaling, or rebuilding — agency, products, or the Sabi network — start here.
            </p>
          </FadeUp>

          {/* Services pills */}
          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-3">
              {services.map((s) => {
                const Icon = s.icon
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase px-5 py-2.5 rounded-full border transition-all duration-300 hover:scale-105"
                    style={{ borderColor: s.color + '50', color: s.color }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {s.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                )
              })}
            </div>
          </FadeUp>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 30C1440 30 1200 0 720 0C240 0 0 30 0 30L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

          {/* LEFT: Contact methods */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <FadeUp>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ color: C.dim }}>
                Other ways to reach us
              </p>
            </FadeUp>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  detail: 'hello@chainfren.com',
                  href: 'mailto:hello@chainfren.com',
                  accent: C.mint,
                },
                {
                  icon: Calendar,
                  title: 'Book a Call',
                  detail: 'Free 15-minute strategy call with the Chainfren team',
                  onClick: () => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/chainfren' }),
                  accent: C.lavender,
                },
              ].map((item, i) => (
                <StaggerItem key={item.title} index={i}>
                  {item.href ? (
                    <a href={item.href} className="group block">
                      <ContactCard item={item} />
                    </a>
                  ) : (
                    <button onClick={item.onClick} className="group block w-full text-left cursor-pointer">
                      <ContactCard item={item} />
                    </button>
                  )}
                </StaggerItem>
              ))}
            </div>

            {/* TiVi callout */}
            <FadeUp delay={0.15}>
              <Link href="/products/TiVi/contact" className="group block mt-6">
                <div className="p-5 rounded-2xl border-2 transition-all duration-300 group-hover:shadow-lg" style={{ borderColor: C.periwinkle + '30', background: C.periwinkle + '08' }}>
                  <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: C.periwinkle }}>
                    Looking for TiVi?
                  </p>
                  <p className="text-sm" style={{ color: C.muted }}>
                    Talk directly to the streaming product team
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-bold uppercase tracking-wider transition-all group-hover:gap-2.5" style={{ color: C.periwinkle }}>
                    Go to TiVi Contact
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </FadeUp>

            {/* Response time badge */}
            <FadeUp delay={0.2}>
              <div className="mt-6 p-5 rounded-2xl" style={{ background: C.dark + '06' }}>
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <span className="block w-2.5 h-2.5 rounded-full" style={{ background: C.lime }} />
                    <span className="absolute inset-0 w-2.5 h-2.5 rounded-full animate-ping opacity-40" style={{ background: C.lime }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: C.dark }}>Avg. response time</p>
                    <p className="text-[11px]" style={{ color: C.dim }}>Under 24 hours, usually same-day</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <FadeUp delay={0.05}>
              <div
                className="rounded-[28px] border-2 overflow-hidden"
                style={{ borderColor: C.dark }}
              >
                <div className="px-8 sm:px-10 pt-8 sm:pt-10 pb-6" style={{ background: C.cyan + '12' }}>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: C.dark }}>
                    Tell us what you&apos;re building.
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: C.muted }}>
                    The more specific, the better we can help. Brand-new project, ongoing campaign, working idea — all welcome. We respond to everything.
                  </p>
                </div>

                <div className="px-8 sm:px-10 pb-10 pt-6">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.92, opacity: 0 }}
                        className="text-center py-16"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                          className="w-20 h-20 rounded-full border-[3px] flex items-center justify-center mx-auto mb-6"
                          style={{ background: C.mint, borderColor: C.dark }}
                        >
                          <Check className="w-10 h-10" style={{ color: C.dark }} strokeWidth={3} />
                        </motion.div>
                        <h3 className="text-3xl font-black uppercase tracking-tight" style={{ color: C.dark }}>
                          Message Sent
                          <span style={{ color: C.cyan }}>.</span>
                        </h3>
                        <p className="mt-3 text-sm max-w-xs mx-auto leading-relaxed" style={{ color: C.muted }}>
                          Our team will review your message and get back to you within 24 hours.
                        </p>
                        <button
                          onClick={() => {
                            setSubmitted(false)
                            setFormData({ firstName: '', lastName: '', email: '', company: '', interest: '', message: '' })
                          }}
                          className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] hover:opacity-60 transition-opacity cursor-pointer"
                          style={{ color: C.dark }}
                        >
                          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            label="First Name" id="firstName" required
                            value={formData.firstName} onChange={handleChange}
                            placeholder="Jane"
                          />
                          <FormField
                            label="Last Name" id="lastName" required
                            value={formData.lastName} onChange={handleChange}
                            placeholder="Doe"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            label="Email" id="email" type="email" required
                            value={formData.email} onChange={handleChange}
                            placeholder="jane@company.com"
                          />
                          <FormField
                            label="Company / Brand" id="company"
                            value={formData.company} onChange={handleChange}
                            placeholder="Optional"
                          />
                        </div>

                        <div>
                          <label htmlFor="interest" className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-2" style={{ color: C.dark }}>
                            I&apos;m interested in
                          </label>
                          <div className="relative">
                            <select
                              id="interest"
                              name="interest"
                              value={formData.interest}
                              onChange={handleChange}
                              className="w-full px-4 py-3.5 rounded-xl border-2 text-sm focus:outline-none transition-all appearance-none bg-white cursor-pointer"
                              style={{ borderColor: C.dark + '15', color: formData.interest ? C.dark : C.dim }}
                            >
                              <option value="">Select a topic</option>
                              {interests.map((item) => (
                                <option key={item} value={item}>{item}</option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke={C.dim} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-2" style={{ color: C.dark }}>
                            Message <span style={{ color: C.coral }}>*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3.5 rounded-xl border-2 text-sm focus:outline-none transition-all resize-none"
                            style={{ borderColor: C.dark + '15', color: C.dark }}
                            placeholder="Tell us about your project, goals, or how we can help..."
                          />
                        </div>

                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm font-semibold px-4 py-3 rounded-xl"
                            style={{ color: C.coral, background: C.coral + '10' }}
                          >
                            {error}
                          </motion.p>
                        )}

                        <motion.button
                          type="submit"
                          disabled={submitting}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full mt-3 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-[0.12em] border-2 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
                          style={{ background: C.dark, color: 'white', borderColor: C.dark }}
                        >
                          {submitting ? (
                            <motion.span
                              animate={{ opacity: [1, 0.4, 1] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            >
                              Sending...
                            </motion.span>
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  )
}

function FormField({ label, id, type = 'text', required, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-2" style={{ color: '#08153C' }}>
        {label} {required && <span style={{ color: '#FF6B6B' }}>*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3.5 rounded-xl border-2 text-sm focus:outline-none transition-all"
        style={{ borderColor: '#08153C15', color: '#08153C' }}
        placeholder={placeholder}
      />
    </div>
  )
}

function ContactCard({ item }) {
  const Icon = item.icon
  return (
    <div
      className="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 group-hover:border-opacity-100 group-hover:shadow-lg"
      style={{ borderColor: '#08153C12' }}
    >
      <div
        className="w-12 h-12 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
        style={{ borderColor: '#08153C', background: item.accent + '25' }}
      >
        <Icon className="w-5 h-5" style={{ color: '#08153C' }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-wider uppercase" style={{ color: '#08153C' }}>
          {item.title}
        </p>
        <p className="text-sm mt-0.5 truncate" style={{ color: '#4A5568' }}>
          {item.detail}
        </p>
      </div>
      <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0" style={{ color: '#08153C' }} />
    </div>
  )
}
