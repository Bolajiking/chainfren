'use client';
import VerticalLandingTemplate from '@/app/components/VerticalLandingTemplate'
import { Film, DollarSign, Users, Eye, Lock, Wallet, BarChart2, Play, Globe, Shield, Camera, ShoppingBag } from 'lucide-react'

const data = {
  icon: Film,
  badge: 'TiVi for Film',
  headline: 'OWN YOUR OWN CINEMA.',
  headlineAccent: 'KEEP EVERY DOLLAR.',
  subheadline:
    'Why hand your masterpiece to an algorithm that decides if it finds an audience — and then pockets 45% when it does? TiVi is your personal digital cinema. You are the studio head, the distributor, and the box office. All in one.',
  heroImage: '/moviiii.png',
  heroImageAlt: 'TiVi film streaming platform — your own digital cinema',
  accentColor: '#A6D234',
  ctaText: 'Launch Your Cinema',
  verticalName: 'film',

  stats: [
    { value: '$381B', label: 'Global VOD market by 2032' },
    { value: '0%', label: 'TiVi platform cut on ticket sales' },
    { value: '70-80%', label: 'Lost to middlemen on other platforms' },
    { value: '10x', label: 'More earnings vs. ad-based models' },
  ],

  problemLabel: 'The Distribution Trap',
  problemHeadline: 'YOU MADE THE FILM. THEY KEEP THE MONEY.',
  problemSubheadline:
    'Chase viral trends for pennies, or sign away distribution rights for a fraction of their value. That is the deal you have been given.',

  painPoints: [
    {
      icon: DollarSign,
      title: 'Pennies Per Thousand Views',
      desc: 'YouTube pays ~$2.89 per 1,000 views then takes 45%. One million views earns you $1,589 before taxes. You made the film. They take nearly half.',
      stat: '$2.89 CPM, 45% taken by YouTube',
    },
    {
      icon: Lock,
      title: 'Locked Out of Your Own Data',
      desc: 'You hand over your film and never learn how it performs. No viewer data, no engagement metrics, no audience relationship.',
      stat: 'Most filmmakers never see performance data',
    },
    {
      icon: Eye,
      title: 'Buried in an Endless Catalog',
      desc: 'Major AVOD platforms host 50,000+ titles. Without a trending moment, your indie feature is dead on arrival.',
      stat: '50,000+ titles on major AVOD platforms',
    },
    {
      icon: Users,
      title: 'Revenue Vanishes in the Chain',
      desc: 'Distributors, aggregators, and platforms each take a cut. By the time revenue reaches you, 70-80% has evaporated.',
      stat: '70-80% taken by middlemen',
    },
    {
      icon: Wallet,
      title: 'Release Windows You Do Not Control',
      desc: '45-90 day theatrical windows dictated by distributors. Your release strategy is someone else\'s business decision.',
      stat: '45-90 day windows set by distributors',
    },
    {
      icon: Shield,
      title: 'No Path from Viewer to Fan',
      desc: 'Audiences find your work on a streamer but there is zero way to convert them into subscribers or community members.',
      stat: '0% viewer relationships retained',
    },
  ],

  solutionLabel: 'Enter TiVi',
  solutionHeadline: 'YOUR BOX OFFICE. YOUR RULES. YOUR REVENUE.',

  features: [
    {
      icon: Camera,
      title: 'Your Box Office, Your Rules',
      desc: 'Ditch CPM. Charge what your work is worth. Even at modest pricing, you earn 10x more than ad-based models.',
      bg: '#A6D23420',
    },
    {
      icon: DollarSign,
      title: 'Zero Revenue Sharing',
      desc: 'Keep 100% of ticket sales, subscriptions, and donations. Every dollar, naira, pound, or peso goes directly to you.',
      bg: '#8DAAFF20',
    },
    {
      icon: Users,
      title: 'Turn Followers into Viewers',
      desc: 'TiVi lives in your social bio. Direct your Instagram, X, and TikTok audience straight to your premium content.',
      bg: '#CBF0B820',
    },
    {
      icon: Film,
      title: 'Total Brand Immersion',
      desc: 'No YouTube logos, no algorithm recommendations luring viewers away. Your audience stays on your platform.',
      bg: '#E6D9FF20',
    },
    {
      icon: ShoppingBag,
      title: 'Built-In Digital Store',
      desc: 'Sell merch, soundtracks, and behind-the-scenes content directly in your channel. Viewers become buyers without leaving.',
      bg: '#5ACDFF20',
    },
    {
      icon: Globe,
      title: 'Global Reach, Instant Payment',
      desc: 'Lagos, London, Mumbai, or Mexico City — fans pay instantly and you access funds immediately. No waiting 90 days for a distributor check.',
      bg: '#A6D23420',
    },
  ],

  useCasesLabel: 'Built For Filmmakers',
  useCasesHeadline: 'FROM FIRST FEATURE TO FESTIVAL EMPIRE.',

  useCases: [
    {
      title: 'Independent Filmmakers',
      desc: 'Launch your own streaming cinema. Premiere directly to a paying audience, set your own prices, keep every cut.',
      bg: '#A6D234',
    },
    {
      title: 'Documentary Producers',
      desc: 'Build a channel around your subject matter. Fund investigative work through direct subscriptions from a global audience.',
      bg: '#8DAAFF',
    },
    {
      title: 'Film Festivals & Collectives',
      desc: 'Run a year-round virtual cinema. Sell passes, host panels, extend reach far beyond the physical venue.',
      bg: '#CBF0B8',
    },
    {
      title: 'Nollywood, Bollywood & World Cinema',
      desc: 'Reach diaspora communities globally. No territorial licensing. Instant payments in any currency.',
      bg: '#E6D9FF',
    },
    {
      title: 'Film Schools & Education',
      desc: 'Showcase student work and host thesis screenings. A professional distribution platform from day one.',
      bg: '#5ACDFF',
    },
    {
      title: 'Production Studios',
      desc: 'Direct-to-consumer channel for your catalog. Bypass traditional windows. Build a global subscriber base.',
      bg: '#A6D234',
    },
  ],

  comparisonLabel: 'The Numbers Do Not Lie',
  comparisonHeadline: 'WHAT 1 MILLION VIEWS ACTUALLY EARNS YOU.',
  comparisonPlatforms: ['TiVi', 'YouTube', 'Vimeo OTT', 'Tubi'],
  comparisonRows: [
    { feature: 'Platform revenue cut', values: ['0%', '45%', '10-15%', 'Ad-only'] },
    { feature: '1M views earnings', values: ['$3,100+', '$1,589', 'Varies', '~$2,000'] },
    { feature: 'You set ticket pricing', values: [true, false, true, false] },
    { feature: 'Fully branded channel', values: [true, false, true, false] },
    { feature: 'Built-in merch store', values: [true, false, false, false] },
    { feature: 'Own your audience data', values: [true, false, true, false] },
    { feature: 'Instant global payments', values: [true, false, false, false] },
  ],

  quote: {
    text: 'We premiered it ourselves, sold 4,000 tickets opening weekend, and earned more in one weekend than a year of YouTube ad revenue. This is what indie distribution should have been.',
    author: 'Early Access Filmmaker',
    role: 'Independent Filmmaker & Documentary Producer',
  },

  ctaHeadline: 'STOP RENTING YOUR AUDIENCE.',
  ctaSubheadline:
    'Your personal digital cinema. Virtual premieres, episodic series, curated festivals. No gatekeepers. No middlemen.',
  ctaBullets: [
    'Launch a screening room in minutes — no developers needed',
    'Keep 100% of ticket sales, subscriptions, and donations',
    'Earn 10x more than YouTube, even at modest pricing',
    'Sell merch and digital products directly inside your channel',
  ],
  orgPlaceholder: 'Studio / Production House Name (optional)',
  formSubheadline: 'Be among the first filmmakers to own your own cinema.',
  formButtonText: 'Launch My Cinema',
}

export default function FilmVerticalPage() {
  return <VerticalLandingTemplate data={data} />
}
