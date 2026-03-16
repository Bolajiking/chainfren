'use client';

import VerticalLandingTemplate from '@/app/components/VerticalLandingTemplate'
import { Trophy, DollarSign, Users, Eye, Lock, Wallet, BarChart2, Play, Globe, Shield, Zap, Tv } from 'lucide-react'

const data = {
  icon: Trophy,
  badge: 'TiVi for Sports',
  headline: 'EVERY GAME.',
  headlineAccent: 'EVERY FAN.',
  subheadline:
    'Your league deserves more than a scoreboard update. TiVi gives you your own streaming channel with live broadcasts, PPV ticketing, and direct fan monetization — no six-figure platform deals required.',
  heroImage: '/img9.jpg',
  heroImageAlt: 'TiVi sports streaming platform',
  accentColor: '#5ACDFF',
  ctaText: 'Launch Your Channel',
  verticalName: 'sports',

  stats: [
    { value: '$37.7B', label: 'Global Sports OTT Market (2025)' },
    { value: '2B+', label: 'Fans streaming sports worldwide' },
    { value: '57%', label: 'Fans struggle to watch live games' },
    { value: '12.6%', label: 'Annual Market Growth (CAGR)' },
  ],

  problemLabel: 'The Problem',
  problemHeadline: 'The broadcast model is broken. Your fans are stranded.',
  problemSubheadline:
    'Traditional broadcasters ignore your league. Enterprise platforms charge a fortune. Your fans are scattered across a dozen apps — if they can find you at all.',

  painPoints: [
    {
      icon: Tv,
      title: 'Broadcast Deals Do Not Exist for You',
      desc: 'Traditional TV only covers elite leagues. Everyone else — grassroots, semi-pro, niche sports — is invisible. The old broadcast model was never built for you.',
      stat: '90%+ of sports leagues have zero broadcast coverage',
    },
    {
      icon: DollarSign,
      title: 'Enterprise Platforms Are Predatory',
      desc: 'Streaming platforms built for top-tier leagues charge $50K-$500K/year. For independent leagues and amateur organizations, that is a non-starter.',
      stat: '$50K–$500K/yr for enterprise OTT',
    },
    {
      icon: Eye,
      title: 'Your Fans Cannot Find You',
      desc: 'Even well-funded leagues lose viewership when they move to unfamiliar platforms. If they struggle, what chance does your league have?',
      stat: 'Leagues lose fans in every platform migration',
    },
    {
      icon: Lock,
      title: 'You Do Not Own Your Data',
      desc: 'When you broadcast through a third party, fan data sits with them. You are building their audience, not yours.',
      stat: 'Fan data locked behind broadcaster walls',
    },
    {
      icon: Wallet,
      title: 'Niche Sports Pay to Play',
      desc: 'Smaller organizations historically had to buy airtime just to be on television. The economics are completely upside down.',
      stat: 'Smaller orgs forced to buy broadcast time',
    },
    {
      icon: Users,
      title: '57% of Fans Struggle to Watch',
      desc: 'Fragmented apps, geo-restrictions, and poor UX mean your most loyal fans give up before the game starts.',
      stat: '57% report live streaming difficulties',
    },
  ],

  solutionLabel: 'The TiVi Solution',
  solutionHeadline: 'Your own streaming network. Live in days.',

  features: [
    {
      icon: Play,
      title: 'Broadcast-Grade Live Streaming',
      desc: 'Multi-camera production, real-time overlays, adaptive bitrate. Your games look and feel professional — because they are.',
      bg: '#5ACDFF25',
    },
    {
      icon: DollarSign,
      title: 'Built-In PPV Ticketing',
      desc: 'Sell digital tickets to games, tournament passes, or season subscriptions. Every dollar goes to your organization.',
      bg: '#CBF0B825',
    },
    {
      icon: BarChart2,
      title: 'Fan Analytics You Own',
      desc: 'Know who watches, when they tune in, what they replay. First-party data powers smarter sponsorships.',
      bg: '#8DAAFF25',
    },
    {
      icon: Globe,
      title: 'Reach Fans Everywhere',
      desc: 'No geo-restrictions. No cable required. Parents, alumni, and diaspora fans anywhere in the world finally get a front-row seat.',
      bg: '#A6D23425',
    },
    {
      icon: Shield,
      title: 'Your Brand, Your Channel',
      desc: 'Your logo, your colors, your domain. This is not a page on someone else\'s app. It is your network.',
      bg: '#E6D9FF25',
    },
    {
      icon: Zap,
      title: 'Launch in Days, Not Quarters',
      desc: 'No six-month integrations. No dev teams. No $500K invoices. Go from zero to streaming in under a week.',
      bg: '#5ACDFF25',
    },
  ],

  useCasesLabel: 'Use Cases',
  useCasesHeadline: 'Built for every level of competition.',

  useCases: [
    {
      title: 'Independent & Semi-Pro Leagues',
      desc: 'Own your distribution and monetize every game night. From indoor football to regional basketball leagues — if you play, you can stream.',
      bg: '#5ACDFF',
    },
    {
      title: 'University & College Athletics',
      desc: 'Stream every sport your athletics department plays. Give every athlete a platform and every parent a way to watch — anywhere in the world.',
      bg: '#CBF0B8',
    },
    {
      title: 'Youth Sports Organizations',
      desc: 'Deliver a professional viewing experience for travel teams and club leagues that families will actually pay for.',
      bg: '#8DAAFF',
    },
    {
      title: 'Niche & Emerging Sports',
      desc: 'Lacrosse, rugby, pickleball, cricket, esports. Passionate niche audiences will pay for dedicated coverage. Your sport deserves its own network.',
      bg: '#A6D234',
    },
    {
      title: 'International Federations',
      desc: 'Bypass legacy broadcasters and go direct to your global fanbase. The biggest leagues are launching DTC channels. Your federation should too.',
      bg: '#E6D9FF',
    },
    {
      title: 'Tournament Organizers',
      desc: 'Multi-day tournaments with dozens of matches. Sell event passes, offer multi-court viewing, capture highlights.',
      bg: '#5ACDFF',
    },
  ],

  comparisonLabel: 'Compare',
  comparisonHeadline: 'Why TiVi wins for sports.',
  comparisonPlatforms: ['TiVi', 'YouTube', 'FloSports', 'ViewLift'],
  comparisonRows: [
    { feature: 'Built-in PPV ticketing', values: [true, false, false, true] },
    { feature: 'Own your subscriber data', values: [true, false, false, true] },
    { feature: 'Custom-branded channel', values: [true, false, false, true] },
    { feature: 'No revenue share on tickets', values: [true, false, false, false] },
    { feature: 'Launch in under a week', values: [true, true, false, false] },
    { feature: 'No annual contract required', values: [true, true, false, false] },
    { feature: 'Affordable for small orgs', values: [true, true, false, false] },
  ],

  quote: {
    text: 'We spent two years chasing a broadcast deal. With TiVi, we launched our own channel in four days. Our fans finally have a real way to watch — and we keep the revenue.',
    author: 'Early Access Commissioner',
    role: 'Independent Indoor Soccer League',
  },

  ctaHeadline: 'Your fans are waiting.',
  ctaSubheadline:
    'No enterprise contracts. No broadcast middlemen. Just your games, your fans, your revenue.',
  ctaBullets: [
    'Go live with your first broadcast in under a week',
    'Sell PPV tickets and season passes from day one',
    'Own every subscriber relationship and data point',
    'No setup fees, no annual minimums, no revenue share',
  ],
  orgPlaceholder: 'Team / League Name (optional)',
  formButtonText: 'Launch My Channel',
}

export default function SportsPage() {
  return <VerticalLandingTemplate data={data} />
}
