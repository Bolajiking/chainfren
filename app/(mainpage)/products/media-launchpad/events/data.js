'use client'

import {
  Ticket, DollarSign, Users, Eye, Lock, Wallet,
  BarChart2, Play, Globe, Shield, Calendar, Video
} from 'lucide-react'

export const data = {
  icon: Ticket,
  badge: 'TiVi for Events',
  headline: 'Your venue',
  headlineAccent: 'never closes.',
  subheadline:
    'The show ends, the lights go dark, and every dollar you could have made from that content disappears. TiVi gives you a permanent streaming channel — one night of magic becomes months of revenue.',
  heroImage: '/img7.jpg',
  heroImageAlt: 'TiVi event streaming platform',
  accentColor: '#E6D9FF',
  ctaText: 'Request access',
  verticalName: 'events',

  stats: [
    { value: '$1.5T', label: 'Global Events Industry (2026)' },
    { value: '11.7%', label: 'Industry CAGR (2021-2026)' },
    { value: '$12.5B', label: 'Virtual Concert Market by 2032' },
    { value: '45%', label: 'Revenue from Ticket Sales Alone' },
  ],
  statsSource: 'Market figures from Verified Market Research (virtual concerts) and IBISWorld (event promotion).',

  problemLabel: 'The Revenue Black Hole',
  problemHeadline: 'Your best nights make money exactly once.',
  problemSubheadline:
    'Weeks of promotion, thousands on production, one unforgettable night — then it is over. The revenue stops. It does not have to.',

  painPoints: [
    {
      icon: Calendar,
      title: 'One Night, One Paycheck',
      desc: 'You deliver an incredible experience and earn for a single evening. Content worth thousands collects dust on a camera roll.',
      stat: 'Zero post-event revenue for most promoters',
    },
    {
      icon: DollarSign,
      title: 'No Recurring Revenue',
      desc: 'Every month starts at zero. No subscriptions, no replay sales. One cancellation can sink a quarter.',
      stat: 'Events = feast-or-famine cashflow',
    },
    {
      icon: Users,
      title: 'Capacity Locks You In',
      desc: 'Your venue holds 500. Your artist draws 50,000 fans. You are leaving 98% of potential revenue on the table.',
      stat: 'Physical venues cap at 2-5% of demand',
    },
    {
      icon: Eye,
      title: 'No Audience Data',
      desc: 'Ticketing platforms own the relationship. You have no emails, no demographics. Sponsors ask for insights and you have nothing.',
      stat: 'Sponsorship value drops without data',
    },
    {
      icon: Lock,
      title: 'Platform Fragmentation',
      desc: 'Ticketing on one platform. Streaming on another. Payments somewhere else. Three dashboards, zero integration.',
      stat: 'Avg. promoter uses 4+ disconnected tools',
    },
    {
      icon: Video,
      title: 'No Way to Monetize Content',
      desc: 'The footage is valuable but building a paywall, managing access, and handling global payments requires engineering you cannot afford.',
      stat: 'Post-event monetization is now mainstream',
    },
  ],

  solutionLabel: 'Your Permanent Stage',
  solutionHeadline: 'One channel. Every show. Revenue that never stops.',

  features: [
    {
      icon: Play,
      title: 'Your Own Streaming Channel',
      desc: 'A fully branded, permanent channel where every show lives, earns, and builds your catalog. Your brand, your rules.',
      bg: '#E6D9FF20',
    },
    {
      icon: Ticket,
      title: 'Built-In PPV Ticketing',
      desc: 'Sell pay-per-view access to live streams and replays. No third-party fees. No integrations to break.',
      bg: '#8DAAFF20',
    },
    {
      icon: Wallet,
      title: 'Global Payments, Instant Settlement',
      desc: 'Accept payments from 190+ countries. Your money hits your wallet when the ticket sells — not 30 days later.',
      bg: '#CBF0B820',
    },
    {
      icon: BarChart2,
      title: 'Audience Intelligence',
      desc: 'Know who watched, for how long, and what they paid. Hand sponsors a data deck that makes your events unmissable.',
      bg: '#A6D23420',
    },
    {
      icon: Globe,
      title: 'Hybrid Event Infrastructure',
      desc: 'Sell 500 in-person tickets and 50,000 virtual tickets to the same show. Your venue just became unlimited.',
      bg: '#5ACDFF20',
    },
    {
      icon: Shield,
      title: 'Replay Library That Earns Forever',
      desc: 'Every show becomes a permanent asset. Fans who missed it buy the replay. Your catalog compounds while you sleep.',
      bg: '#E6D9FF20',
    },
  ],

  useCasesLabel: 'Built For Your World',
  useCasesHeadline: 'From dive bars to festival grounds.',

  useCases: [
    {
      title: 'Independent Venues',
      desc: 'Turn every open mic and headliner into a streaming event. Build a digital audience that shows up rain or shine.',
      bg: '#E6D9FF',
    },
    {
      title: 'Festival Organizers',
      desc: 'Sell virtual passes alongside GA and VIP. Multi-stage switching, backstage streams, year-round replay access.',
      bg: '#8DAAFF',
    },
    {
      title: 'Concert Promoters',
      desc: 'Add a virtual tier to every show. Turn your track record into a streaming catalog worth more than any single night.',
      bg: '#CBF0B8',
    },
    {
      title: 'Comedy Clubs',
      desc: 'Stream showcases and specials. Let comedians sell sets as PPV clips. Your venue\'s own streaming home for comedy.',
      bg: '#A6D234',
    },
    {
      title: 'DJ Collectives & Nightlife',
      desc: 'Broadcast sets, warehouse parties, rooftop sessions. Monetize the vibe to a global audience.',
      bg: '#5ACDFF',
    },
    {
      title: 'Conferences & Corporate',
      desc: 'Premium virtual access to keynotes. Gate exclusive sessions behind PPV. Build a sponsor-worthy archive.',
      bg: '#E6D9FF',
    },
  ],

  comparisonLabel: 'See The Difference',
  comparisonHeadline: 'TiVi vs. the old way.',
  comparisonPlatforms: ['TiVi', 'Veeps', 'Eventbrite', 'Moment'],
  comparisonRows: [
    { feature: 'Permanent branded channel', values: [true, false, false, false] },
    { feature: 'Built-in PPV ticketing', values: [true, true, false, true] },
    { feature: 'Replay library monetization', values: [true, false, false, false] },
    { feature: 'Global crypto + fiat payments', values: [true, false, false, false] },
    { feature: 'Audience analytics', values: [true, 'Limited', 'Limited', 'Limited'] },
    { feature: 'Hybrid event support', values: [true, true, false, true] },
    { feature: 'Revenue share', values: ['0%', '70/30', 'Fees', '80/20'] },
  ],

  ctaHeadline: 'The show must go on. And on.',
  ctaSubheadline:
    'Turn every event into a revenue engine — not a one-night stand.',
  ctaBullets: [
    'Launch your branded channel in under 24 hours',
    'Keep 100% of every dollar — PPV, replays, subscriptions',
    'Sell to a global audience with zero capacity limits',
    'Build a content library that earns while you sleep',
  ],
  orgPlaceholder: 'Venue / Promoter Name (optional)',
  formButtonText: 'Request access',
  formSubheadline: 'Get early access — free to set up, no commitments.',
}