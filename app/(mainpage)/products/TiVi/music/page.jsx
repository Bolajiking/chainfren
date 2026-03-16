'use client';

import VerticalLandingTemplate from '@/app/components/VerticalLandingTemplate'
import {
  Music, DollarSign, Users, Eye, Lock, Wallet,
  BarChart2, Play, Globe, Shield, Zap, Radio,
} from 'lucide-react'

const data = {
  icon: Music,
  badge: 'TiVi for Music',
  headline: 'YOUR OWN MTV.',
  headlineAccent: 'YOUR REVENUE.',
  subheadline:
    'Streaming platforms pay you fractions of a cent. TiVi pays you 100%. Your branded channel. Live shows, music videos, merch, fan subscriptions — all in one place. No middlemen. No algorithms.',
  heroImage: '/img7.jpg',
  heroImageAlt: 'TiVi music streaming platform interface',
  accentColor: '#8DAAFF',
  ctaText: 'Launch Your Channel',
  verticalName: 'music',

  stats: [
    { value: '$39B', label: 'Global digital music market (2026)' },
    { value: '120K', label: 'Tracks uploaded daily worldwide' },
    { value: '$0.003', label: 'Avg. per-stream payout globally' },
    { value: '95%', label: 'Artists earning almost nothing' },
  ],

  problemLabel: 'The Problem',
  problemHeadline: 'The streaming economy was built to exploit you.',
  problemSubheadline:
    'You make the music. They keep the money, the data, and your fans.',

  painPoints: [
    {
      icon: DollarSign,
      title: 'Poverty-Level Payouts',
      desc: 'You need 350,000 streams to earn minimum wage for one month. The top 5% take 90% of royalties. Everyone else gets table scraps.',
      stat: '$0.003 avg. per stream globally',
    },
    {
      icon: Eye,
      title: 'Algorithmic Burial',
      desc: '120,000 tracks drop daily. Without playlist placement controlled by label deals, your music is invisible the moment you release it.',
      stat: '120,000 new tracks per day',
    },
    {
      icon: Lock,
      title: 'Zero Fan Data',
      desc: 'You cannot export a single email from any major streaming platform. They own the relationship with your fans. You are a tenant.',
      stat: '0 fan emails exportable',
    },
    {
      icon: Users,
      title: 'No Direct Relationship',
      desc: 'When the algorithm changes, your reach vanishes overnight. Artists worldwide are walking away because platforms treat creators as disposable.',
      stat: 'Artists leaving platforms in waves',
    },
    {
      icon: BarChart2,
      title: 'Fragmented Revenue',
      desc: 'Music on one platform. Merch on another. Live shows on a third. You are duct-taping six tools together and losing a cut to every one.',
      stat: '4-6 platforms to manage revenue',
    },
    {
      icon: Shield,
      title: 'Platform Risk',
      desc: 'Your catalog is hostage to corporate decisions you have zero say in. One policy change and your income disappears.',
      stat: 'Zero artist leverage',
    },
  ],

  solutionLabel: 'The TiVi Solution',
  solutionHeadline: 'One channel. Everything you need. 100% yours.',

  features: [
    {
      icon: Play,
      title: 'Live Shows + On-Demand Library',
      desc: 'Stream live performances and Q&As alongside your full catalog. No embeds. No revenue split. One destination for everything.',
    },
    {
      icon: Wallet,
      title: 'Wallet-Native Payments',
      desc: 'Fans pay you directly. Subscriptions, tips, pay-what-you-want. Every dollar flows to you with zero platform take.',
    },
    {
      icon: Globe,
      title: 'Built-In Merch Storefront',
      desc: 'Sell vinyl, tees, and digital downloads inside your channel. No Shopify plugin. Your store lives where your fans already are.',
    },
    {
      icon: Users,
      title: 'Own Your Audience',
      desc: 'Every subscriber email and data point belongs to you. Export anytime. No algorithm can take your fan relationships away.',
    },
    {
      icon: Zap,
      title: 'Launch in Minutes',
      desc: 'No developers needed. Pick your branding, upload content, set pricing, go live. Ready before your next rehearsal ends.',
    },
    {
      icon: Radio,
      title: 'Community & Fan Engagement',
      desc: 'Live chat, exclusive drops, member-only content. Turn passive listeners into a devoted community that pays.',
    },
  ],

  useCasesLabel: 'Use Cases',
  useCasesHeadline: 'Built for every kind of music creator.',

  useCases: [
    {
      title: 'Independent Artists',
      desc: 'Replace streaming-platform income with direct fan subscriptions. Stream live, drop exclusives, sell merch. Own everything.',
      bg: '#8DAAFF',
    },
    {
      title: 'Indie Labels & Collectives',
      desc: 'Give your roster a branded home. Centralize releases, events, and fan communication under one channel.',
      bg: '#CBF0B8',
    },
    {
      title: 'Touring Artists',
      desc: 'Sell virtual tickets to live-streamed shows. Revenue from every city, not just the ones you visit.',
      bg: '#E6D9FF',
    },
    {
      title: 'Music Educators',
      desc: 'Teach masterclasses, build a lesson library, grow a paid subscriber base. No course platform fees.',
      bg: '#A6D234',
    },
    {
      title: 'Beat Producers & DJs',
      desc: 'Showcase catalogs, stream live sessions, license directly to fans. Cut out the middlemen.',
      bg: '#5ACDFF',
    },
    {
      title: 'Fan Communities',
      desc: 'Exclusive listening parties, early access drops, behind-the-scenes content. Give fans a reason to pay and stay.',
      bg: '#8DAAFF',
    },
  ],

  comparisonLabel: 'Compare',
  comparisonHeadline: 'See how TiVi stacks up.',
  comparisonPlatforms: ['TiVi', 'Spotify', 'Bandcamp', 'Patreon'],
  comparisonRows: [
    { feature: 'Revenue to Artist', values: ['100%', '$0.003/stream', '82%', '88-92%'] },
    { feature: 'Live Streaming', values: [true, false, false, false] },
    { feature: 'On-Demand Video', values: [true, false, false, true] },
    { feature: 'Built-In Merch Store', values: [true, false, true, false] },
    { feature: 'Fan Data Ownership', values: [true, false, false, true] },
    { feature: 'Branded Channel', values: [true, false, false, false] },
    { feature: 'Wallet-Native Payments', values: [true, false, false, false] },
  ],

  quote: {
    text: 'TiVi gave us our own channel. Now every fan relationship is ours. The economics finally make sense for independent artists.',
    author: 'Early Access Artist',
    role: 'Independent musician, 85K monthly listeners',
  },

  ctaHeadline: 'Stop streaming for pennies.',
  ctaSubheadline:
    'Your channel. Your fans. Your revenue. No middlemen, no algorithms, no excuses.',
  ctaBullets: [
    'Launch a branded channel in under 10 minutes',
    'Keep 100% of subscription and merch revenue',
    'Own every fan email and data point',
    'Live stream + on-demand + storefront in one place',
  ],
  formSubheadline: 'Be among the first artists to launch on TiVi.',
  orgPlaceholder: 'Artist / Label Name (optional)',
  formButtonText: 'Launch My Channel',
}

export default function TiViMusicPage() {
  return <VerticalLandingTemplate data={data} />
}
