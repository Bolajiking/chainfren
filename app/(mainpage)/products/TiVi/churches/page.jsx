'use client';

import VerticalLandingTemplate from '@/app/components/VerticalLandingTemplate'
import { Church, Heart, Users, Eye, Lock, Wallet, BarChart2, Play, Globe, Shield, BookOpen, Video } from 'lucide-react'

const data = {
  icon: Church,
  badge: 'TiVi for Churches',
  headline: 'YOUR MINISTRY.',
  headlineAccent: 'YOUR PLATFORM.',
  subheadline:
    'YouTube runs ads before your sermons. Facebook decides who sees your service. TiVi gives your church a branded streaming channel with built-in giving, sermon archives, and zero ads.',
  heroImage: '/img11.jpg',
  heroImageAlt: 'TiVi church streaming platform',
  accentColor: '#CBF0B8',
  ctaText: 'Launch Your Channel',
  verticalName: 'churches',

  stats: [
    { value: '87%', label: 'Churches still stream post-pandemic' },
    { value: '4.5M+', label: 'Churches & ministries worldwide' },
    { value: '48%', label: 'Prefer giving right after livestreams' },
    { value: '70%', label: 'Want better streaming tools' },
  ],

  problemLabel: 'The Problem',
  problemHeadline: 'YOU BUILT THE MINISTRY. BIG TECH PROFITS FROM IT.',
  problemSubheadline:
    'Your congregation deserves better than gambling ads before the altar call.',

  painPoints: [
    {
      icon: Eye,
      title: 'Ads Before Your Altar Call',
      desc: 'YouTube places gambling, alcohol, and competitor ads before your sermons. Zero control over what your congregation sees first.',
      stat: 'Zero control over pre-roll ads',
    },
    {
      icon: Users,
      title: 'The Algorithm Gatekeeps Your Flock',
      desc: 'Facebook shows your livestream to 2-6% of followers organically. Your members miss services because an algorithm chose a meme over your message.',
      stat: '2-6% organic reach on Facebook',
    },
    {
      icon: BarChart2,
      title: 'No Data. No Ownership.',
      desc: 'You cannot see who watched, how long they stayed, or who is new vs. returning. You are blind to your own community.',
      stat: 'Zero audience data returned to churches',
    },
    {
      icon: Wallet,
      title: 'Giving Moments Get Lost',
      desc: '48% of attendees want to give right after watching — but YouTube has no giving integration. By the time they find another app, the moment passes.',
      stat: '48% prefer giving after livestreams',
    },
    {
      icon: Lock,
      title: 'Custom Apps Cost a Fortune',
      desc: 'Building a custom church streaming app costs $100K-$500K+. You should not need a mega-church budget to own your digital presence.',
      stat: '$100K-$500K+ for custom church apps',
    },
    {
      icon: Globe,
      title: 'Fragmented Tools',
      desc: 'One tool for streaming, another for giving, another for email. Multiple platforms doing what one should handle — costing more and delivering less.',
      stat: '70% want better live-streaming tools',
    },
  ],

  solutionLabel: 'The TiVi Solution',
  solutionHeadline: 'ONE CHANNEL. EVERYTHING YOUR MINISTRY NEEDS.',

  features: [
    {
      icon: Play,
      title: 'Ad-Free Streaming. Always.',
      desc: 'No pre-rolls, no mid-rolls, no competitor ads. Just your message, delivered the way it was intended.',
      bg: '#CBF0B815',
    },
    {
      icon: Wallet,
      title: 'Built-In Digital Giving',
      desc: 'Tithes and offerings integrated directly into your stream. Members give in the moment of inspiration without leaving the platform.',
      bg: '#8DAAFF15',
    },
    {
      icon: BookOpen,
      title: 'Sermon Archive & On-Demand Library',
      desc: 'Every sermon auto-archived and searchable. New members explore your teaching history. Small groups revisit last Sunday.',
      bg: '#E6D9FF15',
    },
    {
      icon: BarChart2,
      title: 'Congregation Analytics You Own',
      desc: 'See who watches, when they tune in, who is new vs. returning. Identify members dropping off before they fall through the cracks.',
      bg: '#A6D23415',
    },
    {
      icon: Shield,
      title: 'Your Brand. Your Domain.',
      desc: 'A fully branded channel under your church\'s name — not youtube.com/yourchannel. Your logo, your colors, your URL.',
      bg: '#5ACDFF15',
    },
    {
      icon: Heart,
      title: 'Community & Member Engagement',
      desc: 'Prayer requests, live chat, event announcements, member directories — all in one place.',
      bg: '#CBF0B815',
    },
  ],

  useCasesLabel: 'Use Cases',
  useCasesHeadline: 'BUILT FOR EVERY WAY YOUR CHURCH CONNECTS.',

  useCases: [
    {
      title: 'Sunday Services & Livestreams',
      desc: 'Broadcast worship in HD. No ads. Built-in giving. Full analytics after every service.',
      bg: '#CBF0B8',
    },
    {
      title: 'Sermon Series & Archives',
      desc: 'Organize series into seasons. New members start from the beginning. Small groups study together.',
      bg: '#8DAAFF',
    },
    {
      title: 'Multi-Campus Broadcasting',
      desc: 'Consistent teaching across every campus without flying your lead pastor to each location.',
      bg: '#E6D9FF',
    },
    {
      title: 'Online-Only Ministry',
      desc: 'Reach the millions who prefer hybrid attendance. Build an online campus that extends beyond your city walls.',
      bg: '#A6D234',
    },
    {
      title: 'Special Events & Conferences',
      desc: 'Easter, Christmas, revivals, guest speakers — stream with registration, donations, and follow-up in one place.',
      bg: '#5ACDFF',
    },
    {
      title: 'Missions & Global Outreach',
      desc: 'Share missionary updates and partner church services. Connect your congregation to worldwide impact.',
      bg: '#CBF0B8',
    },
  ],

  comparisonLabel: 'Compare',
  comparisonHeadline: 'SEE HOW TIVI STACKS UP.',
  comparisonPlatforms: ['TiVi', 'YouTube', 'Subsplash', 'Resi'],
  comparisonRows: [
    { feature: 'Ad-Free Streaming', values: [true, false, true, true] },
    { feature: 'Built-In Digital Giving', values: [true, false, true, false] },
    { feature: 'Full Audience Data Ownership', values: [true, false, 'Partial', false] },
    { feature: 'Branded Channel & Domain', values: [true, false, true, false] },
    { feature: 'On-Demand Sermon Archive', values: [true, true, true, false] },
    { feature: 'Community & Engagement', values: [true, false, 'Partial', false] },
    { feature: 'Affordable for Any Size', values: [true, true, false, false] },
  ],

  quote: {
    text: 'YouTube was profiting from our sermons with ads we did not approve. TiVi gave us our own platform. No more ads before the altar call.',
    author: 'Pastor David Mitchell',
    role: 'Lead Pastor, Grace Community Church',
  },

  ctaHeadline: 'YOUR CONGREGATION DESERVES A HOME.',
  ctaSubheadline:
    'Launch your own branded streaming channel in days — no six-figure budget required.',
  ctaBullets: [
    'Ad-free streaming with built-in giving from day one',
    'Full ownership of your audience data and content',
    'Launch in days — no developers needed',
    'Pricing built for churches, not mega-church budgets',
  ],
  orgPlaceholder: 'Church / Ministry Name (optional)',
  formSubheadline: 'Be among the first churches to launch on TiVi.',
  formButtonText: 'Launch My Channel',
}

export default function ChurchesPage() {
  return <VerticalLandingTemplate data={data} />
}
