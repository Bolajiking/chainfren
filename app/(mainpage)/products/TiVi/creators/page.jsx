'use client';

import VerticalLandingTemplate from '@/app/components/VerticalLandingTemplate'
import {
  Tv, DollarSign, Users, Eye, Lock, Wallet,
  BarChart2, Play, Globe, Shield, Zap, ShoppingBag,
} from 'lucide-react'

const data = {
  icon: Tv,
  badge: 'TiVi for Creators',
  headline: 'YOU ARE THE NETWORK.',
  headlineAccent: 'YOUR PAGE IS THE CHANNEL.',
  subheadline:
    'YouTube takes 45-55%. Twitch takes 50%. Your link-in-bio sends fans to five different apps. TiVi gives you one channel — streaming, storefront, audience ownership — and you keep every dollar.',
  heroImage: '/img8.jpg',
  heroImageAlt: 'TiVi creator streaming platform',
  accentColor: '#A6E1FA',
  ctaText: 'Launch Your Channel',
  verticalName: 'creators',

  stats: [
    { value: '$214B', label: 'Global creator economy (2026)' },
    { value: '200M+', label: 'Creators worldwide' },
    { value: '96%', label: 'Creators earning under $100K' },
    { value: '5-10', label: 'Tools juggled simultaneously' },
  ],

  problemLabel: 'The Problem',
  problemHeadline: 'You built the audience. They built the cage.',
  problemSubheadline:
    'Two hundred million creators worldwide. The platforms that promised to set you free are the ones extracting the most.',

  painPoints: [
    {
      icon: DollarSign,
      title: 'Revenue Splits That Insult You',
      desc: 'YouTube takes 45-55%. Twitch takes 50%. You create 100% of the value and keep a fraction. The majority of creators worldwide earn less than a living wage.',
      stat: 'Most creators earn below a living wage',
    },
    {
      icon: Eye,
      title: 'The Algorithm Giveth, Then Destroyeth',
      desc: 'One update and your reach drops 70% overnight. Over half of creators say discovery is their top challenge. You are building on borrowed land.',
      stat: '54% say discovery is #1 challenge',
    },
    {
      icon: Lock,
      title: 'Your Audience Is Not Yours',
      desc: 'Zero subscriber emails exportable from YouTube or Twitch. Years of community-building, and you own none of it. Deplatformed tomorrow = starting from zero.',
      stat: '0 subscriber emails exportable',
    },
    {
      icon: Users,
      title: 'Fragmented Everything',
      desc: 'One platform for streaming. Another for highlights. Another for courses. Another for merch. 5-10 tools, hundreds per month in fees, scattered audience.',
      stat: '5-10 platforms and rising costs',
    },
    {
      icon: BarChart2,
      title: '33% of Creators Are Furious',
      desc: 'One in three reports extreme frustration. Policies change without notice. Payouts delayed. Support tickets vanish.',
      stat: '33% report extreme frustration',
    },
    {
      icon: Shield,
      title: 'Platform Risk Is Career Risk',
      desc: 'A policy change, a copyright strike, a shadowban — any can erase years of work. Your career sits on infrastructure someone else controls.',
      stat: 'One strike can end your income',
    },
  ],

  solutionLabel: 'The TiVi Solution',
  solutionHeadline: 'One channel. Every revenue stream. Nothing in between.',

  features: [
    {
      icon: Play,
      title: 'Live + On-Demand Streaming',
      desc: 'Go live and build an on-demand library in your own branded channel. No embeds, no revenue split, no third-party players.',
    },
    {
      icon: ShoppingBag,
      title: 'Built-In Storefront',
      desc: 'Sell courses, merch, downloads, and exclusive content inside your channel. No third-party plugins or extra subscriptions.',
    },
    {
      icon: Wallet,
      title: 'Wallet-Native Payments',
      desc: 'Subscriptions, tips, pay-what-you-want. Every transaction flows directly to you. Zero platform take.',
    },
    {
      icon: Users,
      title: 'Own Your Audience — For Real',
      desc: 'Every email, every data point is yours. Export anytime. No algorithm can sever your fan relationships.',
    },
    {
      icon: Zap,
      title: 'Launch in Minutes',
      desc: 'No developers. Pick branding, upload content, set pricing, go live. Replace ten tools with one.',
    },
    {
      icon: Globe,
      title: 'Global Reach, Local Control',
      desc: 'Stream to fans anywhere. Region-specific pricing. Any currency. Your channel is borderless.',
    },
  ],

  useCasesLabel: 'Use Cases',
  useCasesHeadline: 'Built for the creators platforms forgot.',

  useCases: [
    {
      title: 'Mid-Tier Creators (10K-100K)',
      desc: 'Too big for hobby, too small for brand deals. TiVi turns your existing audience into direct revenue with no middleman and no minimum threshold.',
      bg: '#A6E1FA',
    },
    {
      title: 'Live Streamers',
      desc: 'Stop splitting subs 50/50 with platforms. Own your stream, your VODs, your community, and every dollar your audience spends.',
      bg: '#CBF0B8',
    },
    {
      title: 'Course Creators & Educators',
      desc: 'Teach live classes, build a course library, sell digital downloads. No platform fees or markup. Your students, your pricing.',
      bg: '#E6D9FF',
    },
    {
      title: 'Podcasters & Talk Shows',
      desc: 'Stream live episodes, gate premium content behind subscriptions, sell merch. Turn your show into a self-sustaining business.',
      bg: '#A6D234',
    },
    {
      title: 'Community Builders & Coaches',
      desc: 'Host live sessions, build members-only content, sell group programs. Replace Discord, Zoom, Patreon, and Gumroad with one platform.',
      bg: '#8DAAFF',
    },
    {
      title: 'Multi-Platform Creators',
      desc: 'One link. One storefront. One subscriber list. Consolidate your scattered empire into a single channel where everything earns.',
      bg: '#A6E1FA',
    },
  ],

  comparisonLabel: 'Compare',
  comparisonHeadline: 'See why creators are switching.',
  comparisonPlatforms: ['TiVi', 'YouTube', 'Twitch', 'Stan Store'],
  comparisonRows: [
    { feature: 'Revenue to Creator', values: ['100%', '45-55%', '50%', '95%'] },
    { feature: 'Live Streaming', values: [true, true, true, false] },
    { feature: 'On-Demand Video Library', values: [true, true, true, false] },
    { feature: 'Built-In Storefront', values: [true, false, false, true] },
    { feature: 'Audience Data Ownership', values: [true, false, false, true] },
    { feature: 'Branded Channel', values: [true, false, false, true] },
    { feature: 'Wallet-Native Payments', values: [true, false, false, false] },
  ],

  quote: {
    text: 'Seven tools, two platforms taking cuts, and I still could not tell you who my top 100 fans were. TiVi gave me one channel and everything clicked.',
    author: 'Early Access Creator',
    role: 'Full-time content creator, 72K subscribers',
  },

  ctaHeadline: 'Stop renting your audience.',
  ctaSubheadline:
    'Your channel. Your audience. Your money. Finally.',
  ctaBullets: [
    'Launch a branded channel in under 10 minutes',
    'Keep 100% of every subscription, sale, and tip',
    'Own every subscriber email and data point forever',
    'Replace your entire tool stack with one platform',
  ],
  formSubheadline: 'Join the waitlist and be among the first creators to launch.',
  orgPlaceholder: 'Channel / Brand Name (optional)',
  formButtonText: 'Launch My Channel',
}

export default function TiViCreatorsPage() {
  return <VerticalLandingTemplate data={data} />
}
