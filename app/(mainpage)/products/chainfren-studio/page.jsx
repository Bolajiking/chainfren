'use client';

/*
  LandingPage.tsx – Chainfren Studio marketing page
  Place inside your Next.js /app directory (e.g. /app/(marketing)/page.tsx).
  Uses shadcn/ui components and TailwindCSS utility classes.
*/

import Head from 'next/head'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { useState } from 'react'
import { Check, Play, DollarSign, Shield, Users, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import CalendlyWidget from '@/app/components/CalendlyWidget'

// --- Data ------------------------------------------------------------------

const FEATURES = [
  {
    icon: Play,
    title: `Livestream & On‑Demand`,
    desc: 'Broadcast in HD, buffer‑free, on any device. You decide the rules—no surprise takedowns.'
  },
  {
    icon: Shield,
    title: 'Gate & Monetize Access',
    desc: 'Subscriptions, pay‑per‑view, or VIP tiers. Total control over who watches and at what price.'
  },
  {
    icon: DollarSign,
    title: 'Built‑In Store',
    desc: 'Sell merch, digital downloads, or bundles without sending fans off‑site.'
  },
  {
    icon: Users,
    title: 'Community Tools',
    desc: 'Live chat, exclusive forums, and direct messaging keep fans engaged between streams.'
  },
  {
    icon: Check,
    title: 'Keep 95%+ Revenue',
    desc: 'Ultra‑low fees mean you keep what you earn—finally, a platform that pays creators first.'
  },
  {
    icon: BarChart2,
    title: 'Actionable Analytics',
    desc: 'Understand viewer behavior, optimize content, and grow faster with data‑driven insights.'
  }
]

const TESTIMONIALS = [
  {
    quote:
      '“Chainfren Studio let us launch our own pay‑per‑view sports streams in a weekend. Revenue tripled.”',
    author: 'Mark R. – Event Organizer'
  },
  {
    quote:
      `“We moved from social media to our own platform, kept ${95+"%"} of donations, and finally own our audience.”`,
    author: 'Pastor Samuel – Faith Community Leader'
  },
  {
    quote:
      '“As an indie creator, I love having full control and direct sales in one place. Chainfren just works.”',
    author: 'Jane D. – Content Creator'
  }
]

// --- Components ------------------------------------------------------------

function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-6 py-24 text-center">
      <CalendlyWidget />
      <Image
        src="/CTV.png"
        alt="Chainfren Studio logo"
        width={200}
        height={50}
        className="mx-auto h-auto w-auto"
        priority
      />
      <h1 className="max-w-4xl text-4xl font-bold sm:text-5xl md:text-6xl text-white">
        Stream. Monetize. <span className="text-[#40ACFF]">Own&nbsp;It.</span>
      </h1>
      <p className="max-w-2xl text-lg text-gray-200 md:text-xl">
        Chainfren Studio gives creators and brands everything they need to deliver video content on their own
        terms—live or on<span className='relative font-serif'>-</span>demand while keeping up to 95<span className='relative font-serif'>%</span> of revenue.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button 
          size="lg" 
          className="bg-[#40ACFF] hover:bg-[#3090DD] text-white"
          onClick={() => window.Calendly?.initPopupWidget({url: 'https://calendly.com/chainfren'})}
        >
          Book a Free Demo
        </Button>
        <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
          <Link href="#get-started">Subscribe to join waitlist</Link>
        </Button>
      </div>
    </section>
  )
}

function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl py-20">
      <h2 className="mb-12 text-center text-3xl font-semibold sm:text-4xl text-white">Everything You Need—Nothing You Don<span className='relative font-serif'>'t</span></h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Livestream & On-Demand Feature */}
        <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="flex flex-col gap-4 p-6">
            <Play className="h-10 w-10 text-[#40ACFF]" />
            <h3 className="text-xl font-semibold text-white">Livestream <span className='relative font-serif'>&</span> On<span className='relative font-serif'>-</span>Demand</h3>
            <p className="text-gray-300">Broadcast in HD, buffer<span className='relative font-serif'>-</span>free, on any device. You decide the rules<span className='relative font-serif'>-</span>no surprise takedowns.</p>
          </CardContent>
        </Card>

        {/* Gate & Monetize Access Feature */}
        <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="flex flex-col gap-4 p-6">
            <Shield className="h-10 w-10 text-[#40ACFF]" />
            <h3 className="text-xl font-semibold text-white">Gate <span className='relative font-serif'>&</span> Monetize Access</h3>
            <p className="text-gray-300">Subscriptions, pay<span className='relative font-serif'>-</span>per<span className='relative font-serif'>-</span>view, or VIP tiers. Total control over who watches and at what price.</p>
          </CardContent>
        </Card>

        {/* Built-In Store Feature */}
        <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="flex flex-col gap-4 p-6">
            <DollarSign className="h-10 w-10 text-[#40ACFF]" />
            <h3 className="text-xl font-semibold text-white">Built<span className='relative font-serif'>-</span>In Store</h3>
            <p className="text-gray-300">Sell merch, digital downloads, or bundles without sending fans off<span className='relative font-serif'>-</span>site.</p>
          </CardContent>
        </Card>

        {/* Community Tools Feature */}
        <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="flex flex-col gap-4 p-6">
            <Users className="h-10 w-10 text-[#40ACFF]" />
            <h3 className="text-xl font-semibold text-white">Community Tools</h3>
            <p className="text-gray-300">Live chat, exclusive forums, and direct messaging keep fans engaged between streams.</p>
          </CardContent>
        </Card>

        {/* Keep 95%+ Revenue Feature */}
        <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="flex flex-col gap-4 p-6">
            <Check className="h-10 w-10 text-[#40ACFF]" />
            <h3 className="text-xl font-semibold text-white">Keep 95<span className='relative font-serif'>%+</span> Revenue</h3>
            <p className="text-gray-300">Ultra<span className='relative font-serif'>-</span>low fees mean you keep what you earn<span className='relative font-serif'>-</span>finally, a platform that pays creators first.</p>
          </CardContent>
        </Card>

        {/* Actionable Analytics Feature */}
        <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="flex flex-col gap-4 p-6">
            <BarChart2 className="h-10 w-10 text-[#40ACFF]" />
            <h3 className="text-xl font-semibold text-white">Actionable Analytics</h3>
            <p className="text-gray-300">Understand viewer behavior, optimize content, and grow faster with data<span className='relative font-serif'>-</span>driven insights.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function TestimonialSection() {
  return (
    <section className="bg-white/5 backdrop-blur-sm py-20">
      <h2 className="mb-12 text-center text-3xl font-semibold sm:text-4xl text-white">Creators Love Chainfren</h2>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {/* Event Organizer Testimonial */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
            <p className="text-lg italic text-gray-200"><span className='relative font-serif'>"</span>Chainfren Studio let us launch our own pay<span className='relative font-serif'>-</span>per<span className='relative font-serif'>-</span>view sports streams in a weekend. Revenue tripled.<span className='relative font-serif'>"</span></p>
            <span className="font-medium text-[#40ACFF]">Mark R. <span className='relative font-serif'>-</span> Event Organizer</span>
          </CardContent>
        </Card>

        {/* Faith Community Leader Testimonial */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
            <p className="text-lg italic text-gray-200"><span className='relative font-serif'>"</span>We moved from social media to our own platform, kept 95<span className='relative font-serif'>%</span> of donations, and finally own our audience.<span className='relative font-serif'>"</span></p>
            <span className="font-medium text-[#40ACFF]">Pastor Samuel <span className='relative font-serif'>-</span>  Faith Community Leader</span>
          </CardContent>
        </Card>

        {/* Content Creator Testimonial */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
            <p className="text-lg italic text-gray-200"><span className='relative font-serif'>"</span>As an indie creator, I love having full control and direct sales in one place. Chainfren just works.<span className='relative font-serif'>"</span></p>
            <span className="font-medium text-[#40ACFF]">Jane D. <span className='relative font-serif'>-</span>  Content Creator</span>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function LeadForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{setSubmitting(true)
    // TODO: connect to backend endpoint or CRM
    const response = await fetch("https://chaintv.onrender.com/api/waitlist",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        organization: e.target.org.value,
      }),
    })
    if(!response.ok){
      throw new Error("Failed to submit form")
    }
    const data = await response.json()
    console.log("Form submitted successfully:", data) 
    // await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)}
    catch(error){
      console.error("Error submitting form:", error)
      setSubmitting(false)
    }
  }

  return (
    <section id="get-started" className="mx-auto max-w-xl py-20 text-center">
      <h2 className="mb-6 text-3xl font-semibold sm:text-4xl text-white">Ready to Own Your Audience?</h2>
      <p className="mb-8 text-gray-300">
        Book a live demo or create a free account—no credit card required.
      </p>
      {submitted ? (
        <div className="rounded-2xl bg-[#40ACFF]/20 backdrop-blur-sm border border-[#40ACFF]/30 p-8 text-center text-lg text-white">
          ✅ Thank you<span className='font-serif'>!</span> We<span className='font-serif'>'</span>ll reach out shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-serif">
          <Input required placeholder="Your Name" name="name" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
          <Input required type="email" placeholder="Your Email" name="email" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
          <Input placeholder="Organization (optional)" name="org" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
          <Button type="submit" size="lg" disabled={submitting} className="bg-[#40ACFF] hover:bg-[#3090DD] text-white disabled:bg-[#40ACFF]/50">
            {submitting ? 'Submitting…' : 'Request Demo'}
          </Button>
        </form>
      )}
    </section>
  )
}

function FAQ() {
  return (
    <section className="mx-auto max-w-3xl space-y-8 py-20">
      <h2 className="text-center text-3xl font-semibold sm:text-4xl text-white">Frequently Asked Questions</h2>
      <details className="rounded-lg border border-white/20 p-4 open:bg-white/10 backdrop-blur-sm">
        <summary className="cursor-pointer font-medium text-white">How much does Chainfren Studio cost?</summary>
        <p className="mt-2 text-gray-300">We offer a free tier to get started and flexible plans as you grow. All plans let you keep up to 95<span className='relative font-serif'>%</span> of revenue.</p>
      </details>
      <details className="rounded-lg border border-white/20 p-4 open:bg-white/10 backdrop-blur-sm">
        <summary className="cursor-pointer font-medium text-white">Do I need coding skills?</summary>
        <p className="mt-2 text-gray-300">No. Launch your branded streaming site in minutes with our no‑code setup.</p>
      </details>
      <details className="rounded-lg border border-white/20 p-4 open:bg-white/10 backdrop-blur-sm">
        <summary className="cursor-pointer font-medium text-white">Can I import my existing videos?</summary>
        <p className="mt-2 text-gray-300">Absolutely. Upload directly or migrate from YouTube, Vimeo, or other platforms.</p>
      </details>
    </section>
  )
}

// --- Main Page -------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Chainfren Studio | Video Streaming for Creators & Brands</title>
        <meta
          name="description"
          content="Stream, monetize, and own your audience with Chainfren Studio—an all‑in‑one video platform for creators, media brands, and event organizers."
        />
        <meta property="og:title" content="Chainfren Studio | Video Streaming for Creators & Brands" />
        <meta property="og:description" content="Stream, monetize, and own your audience with Chainfren Studio." />
        <meta property="og:image" content="/images/og-cover.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="min-h-screen w-full flex-col overflow-x-hidden">
        <Hero />
        <FeatureGrid />
        <TestimonialSection />
        <LeadForm />
        <FAQ />
      </main>

      <footer className="border-t border-white/20 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Chainfren Studio. All rights reserved.
      </footer>
    </>
  )
}
