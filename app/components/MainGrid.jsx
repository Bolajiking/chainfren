'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WeatherWidget from './WeatherWidget';
import ChainfrenWordmark from './ChainfrenWordmark';
import ChainfrenIcon from './ChainfrenIcon';
import AnimatedLogoCard from './AnimatedLogoCard';
import AnimatedWordmarkCard from './AnimatedWordmarkCard';
import WhatWeBuild from './WhatWeBuild';
import MobileHero from './MobileHero';
import AudienceCard from './AudienceCard';

const MainGrid = () => {
  // Tab data for sections
  const playbookTabs = [
    { title: '1000 TRUE FANS - How Creators and Brands can use web3 for growth', buttonText: 'READ', buttonLink: '/blog/1000-true-fans-how-creators-and-brands-can-use-web3-for-growth', backgroundImage: '/bgChain.png' },
    { title: '', buttonText: 'VIEW ALL ARTICLES', buttonLink: '/blog', backgroundImage: '' },
  ];

  const [currentPlaybookTab, setCurrentPlaybookTab] = useState(0);

  const nextPlaybookTab = () => setCurrentPlaybookTab((prev) => (prev + 1) % playbookTabs.length);
  const prevPlaybookTab = () => setCurrentPlaybookTab((prev) => (prev - 1 + playbookTabs.length) % playbookTabs.length);

  // --- REUSABLE SECTIONS ---

  const HeroSection = () => (
    <div className="bg-white border-[2px] border-dark-blue rounded-[26px] p-5 md:p-7 h-auto md:h-[263px] relative">
      <h1
        className="text-[40px] md:text-[46px] font-black text-dark-blue leading-none"
        style={{
          width: '658px',
          maxWidth: '100%'
        }}
      >
        <em className="italic">Ownership</em> infrastructure<br />for the African creator economy.
      </h1>
      <p
        className="text-[18px] font-medium text-dark-blue/80 leading-[1.2]"
        style={{
          width: '698px',
          maxWidth: '100%',
          marginTop: '20px'
        }}
      >
        The platforms control your audience, your data, and your revenue. Chainfren is the infrastructure for the ones ambitious enough to take it back.
      </p>
      <Link href="/contact" className="md:absolute md:top-[210px] md:left-[20px]">
        <button className="mt-4 md:mt-0 px-5 py-2.5 md:px-[12px] md:py-[8px] border-2 md:border border-dark-blue text-dark-blue text-[15px] md:text-[13px] font-semibold rounded-full hover:bg-dark-blue hover:text-white transition-colors overflow-hidden relative group">
          <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">GET STARTED</span>
          <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">GET STARTED</span>
        </button>
      </Link>
    </div>
  );

  const MissionSection = () => (
    <div className="bg-[#CBF0B8] border-[2px] border-dark-blue rounded-[26px] px-4 py-5 md:p-6 md:pt-8 pb-24 md:pb-8 relative overflow-hidden h-[671px]">
      <div className="relative z-10 w-full max-w-[370px] md:max-w-none md:w-auto" style={{ letterSpacing: '0%' }}>
        <p className="text-dark-blue text-[18px] md:text-[15px] lg:text-[17px] leading-snug mb-2 md:mb-2" style={{ letterSpacing: '0%' }}>African creators have already won the attention war.</p>
        <p className="text-dark-blue text-[18px] md:text-[15px] lg:text-[17px] leading-snug mb-2 md:mb-2" style={{ letterSpacing: '0%' }}><span className="font-bold text-[24px] md:text-[17px] lg:text-[19px]" style={{ letterSpacing: '0%' }}>But attention without ownership is fragile.</span></p>
        <p className="text-dark-blue text-[18px] md:text-[15px] lg:text-[17px] leading-snug mb-2 md:mb-2" style={{ letterSpacing: '0%' }}>The platforms still control the audience, the data, the reach, and the revenue. They change the rules whenever they want, while creators and brands are left building on rented land.</p>
        <p className="text-dark-blue text-[18px] md:text-[15px] lg:text-[17px] leading-snug mb-2 md:mb-2" style={{ letterSpacing: '0%' }}>Chainfren builds the infrastructure that gives the power back.</p>
        <p className="text-dark-blue font-bold text-[24px] md:text-[17px] lg:text-[19px] leading-snug mb-2 md:mb-2" style={{ letterSpacing: '0%' }}>Owned audience. Direct payments. Real ownership.</p>
        <p className="text-dark-blue text-[18px] md:text-[15px] lg:text-[17px] leading-snug" style={{ letterSpacing: '0%' }}>We help Africa's most ambitious creators and brands own their audience, monetize directly, and turn cultural influence into businesses they keep.</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 overflow-hidden"><div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/3d2.png)' }}></div></div>
      <Link href="/contact" className="absolute bottom-6 md:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] md:w-[80%] max-w-md">
        <button className="w-full px-6 py-3 bg-white text-dark-blue font-semibold rounded-full hover:opacity-90 transition-opacity uppercase overflow-hidden relative group">
          <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">Tell us what you&apos;re building</span>
          <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">Tell us what you&apos;re building</span>
        </button>
      </Link>
    </div>
  );

  const SocialLink = ({ isDark }) => (
    <div className="absolute bottom-4 right-4 flex gap-4">
      <a
        href="https://x.com/chainfren"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-70 transition-opacity"
        style={{ color: isDark ? '#FFFFFF' : '#08153C' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
    </div>
  );

  const LogoSocialsSection = () => (
    <>
      {/* Mobile: animated wordmark card (the colour transition lives here on phones) */}
      {/* Desktop: static wordmark card. Mobile masthead lives at top of page. */}
      <div className="hidden md:flex bg-white border-[2px] border-dark-blue rounded-[26px] p-8 h-[263px] items-center justify-center relative">
        <ChainfrenWordmark fontSize={64} />
        <SocialLink isDark={false} />
      </div>
    </>
  );

  const WhatWeDoSection = () => {
    const items = [
      'OWNED AUDIENCE', 'DIRECT PAYMENTS', 'ONCHAIN IDENTITY',
      'LIVE BROADCASTING', 'SMART CONTRACTS', 'CULTURAL DISTRIBUTION',
      'CREATOR COMMERCE', 'FAN ECONOMICS', 'BRAND OWNERSHIP',
      'MEDIA INFRASTRUCTURE',
    ];
    return (
      <div className="bg-[#A6D234] border-[2px] border-dark-blue rounded-[26px] px-4 py-6 md:px-6 md:py-8 h-[518px] flex flex-col overflow-hidden">
        <h3 className="text-[14px] font-bold text-dark-blue mb-4">WHAT WE DO</h3>
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          <div className="animate-scroll-up flex flex-col">
            {[...items, ...items].map((item, i) => (
              <span
                key={i}
                className="block py-[6px] md:py-[5px] text-dark-blue font-bold leading-tight text-[5vw] md:text-[20px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const ForCreatorsSection = () => <AudienceCard />;

  const AbstractIconSection = () => (
    <AnimatedLogoCard className="rounded-[26px] h-[509px] relative overflow-hidden flex items-center justify-center" />
  );

  const PlaybookSection = () => (
    <div className="bg-[#5ACDFF] border-[2px] border-dark-blue border-solid rounded-[26px] p-6 md:p-8 h-[542px] md:h-[532px] relative overflow-hidden">
      {/* Header with arrows */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-dark-blue">THE PLAYBOOK</span>
        <div className="flex gap-2">
          <button onClick={prevPlaybookTab} className="text-dark-blue hover:opacity-70 transition-opacity"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="15" y2="12"/><path d="M9 6l-6 6 6 6"/></svg></button>
          <button onClick={nextPlaybookTab} className="text-dark-blue hover:opacity-70 transition-opacity"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="12" x2="21" y2="12"/><path d="M15 6l6 6-6 6"/></svg></button>
        </div>
      </div>
      
      {/* "Get the latest insights..." text - 32px on mobile, tight line spacing, 3 lines */}
      <div className="relative">
        <p 
          className="text-black text-[32px] md:text-2xl font-semibold pb-4 leading-none text-left"
          style={{ width: '100%' }}
        >
          The work, documented in public.
        </p>
      </div>
      
      {/* Line division - aligned with white block */}
      <div 
        className="absolute border-b-2 border-black w-[calc(100%-40px)] md:w-[323px]"
        style={{ top: '192px', left: '20px' }}
      />
      
      {/* White title block with wavy top - Mobile: responsive width, Desktop: 323x292 */}
      <div 
        className="absolute bg-white overflow-hidden w-[calc(100%-40px)] h-[302px] md:w-[323px] md:h-[292px] top-[200px] left-[20px]"
        style={{ 
          opacity: 1,
          maskImage: 'url(/wave.svg)',
          WebkitMaskImage: 'url(/wave.svg)',
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          maskPosition: 'top center'
        }}
      >
        {/* Article title inside white block - only shown when there's a title */}
        {playbookTabs[currentPlaybookTab].title ? (
          <>
            <h4 
              className="absolute text-dark-blue font-bold text-[25px] leading-tight"
              style={{ 
                width: 'calc(100% - 28px)', 
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              {playbookTabs[currentPlaybookTab].title.includes(' - ') 
                ? <>{playbookTabs[currentPlaybookTab].title.split(' - ')[0]} <span className='relative font-serif'>-</span> {playbookTabs[currentPlaybookTab].title.split(' - ')[1]}</> 
                : playbookTabs[currentPlaybookTab].title}
            </h4>
            
            {/* Read button - bottom positioned */}
            <Link 
              href={playbookTabs[currentPlaybookTab].buttonLink}
              className="absolute"
              style={{ 
                top: '235px', 
                left: '14px'
              }}
            >
              <button 
                className="px-8 py-3 border border-dark-blue text-black font-semibold bg-white transition-colors flex items-center justify-center whitespace-nowrap rounded-full hover:bg-dark-blue hover:text-white"
              >
                {playbookTabs[currentPlaybookTab].buttonText}
              </button>
            </Link>
          </>
        ) : (
          /* View All Articles - centered button when no title */
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Link href={playbookTabs[currentPlaybookTab].buttonLink}>
              <button 
                className="px-8 py-4 border-2 border-dark-blue text-dark-blue font-bold bg-white transition-colors flex items-center justify-center whitespace-nowrap rounded-full hover:bg-dark-blue hover:text-white text-lg"
              >
                {playbookTabs[currentPlaybookTab].buttonText}
              </button>
            </Link>
          </div>
        )}
      </div>
      
    </div>
  );

  const ThreeDIconSection = () => (
    <Link
      href="/creator-network"
      className="group bg-dark-blue border-[2px] border-dark-blue rounded-[26px] p-6 md:p-8 flex items-center justify-center h-[300px] md:h-[390px] relative overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <img
          src="/randz1.png"
          alt=""
          className="w-[80%] h-[80%] -rotate-12 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-35"
        />
      </div>
      {/* Base state (touch devices, no real hover) keeps the copy visible.
          The [@media(hover:hover)] arbitrary variant only hides it by default
          on devices with a real pointer, revealing on :hover — so mobile
          visitors never lose the CTA, matching the design capture's reveal
          treatment on desktop. Plain Tailwind group-hover (not styled-jsx)
          because styled-jsx doesn't scope the hash class onto next/link's
          <Link> root, so a scoped :hover selector here never matches. */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/80 via-transparent to-transparent transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100" />
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/90">Creator Network</span>
        <div>
          <p className="text-white text-[19px] md:text-[20px] font-semibold leading-tight max-w-[220px]">
            Where crypto brands meet the creators who move culture.
          </p>
          <span className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-semibold text-white/90 group-hover:text-white transition-colors">
            Explore the network
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-[3px]"><path d="M5 12 L19 12 M13 6 L19 12 L13 18" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );

  const WeatherSection = () => <WeatherWidget />;

  const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | submitting | sent | error

    const subscribe = async () => {
      if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        setStatus('error');
        return;
      }
      setStatus('submitting');
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formType: 'newsletter', email, source: 'homepage-sabi' }),
        });
        if (!res.ok) throw new Error('failed');
        setStatus('sent');
      } catch (e) {
        setStatus('error');
      }
    };

    return (
      <div className="border-[2px] border-dark-blue border-solid rounded-[26px] p-6 md:p-8 h-auto md:h-[297px] relative overflow-hidden flex flex-col md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-[11px] font-bold tracking-[0.18em] uppercase text-dark-blue/55">Sabi</h3>
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-dark-blue/45 border border-dark-blue/20 rounded-full px-2 py-0.5">Launching 2026</span>
          </div>
          <p className="text-dark-blue text-[24px] md:text-[26px] leading-[1.1] tracking-tight font-bold mb-3">
            Africa&apos;s onchain broadcast signal.
          </p>
          <p className="text-dark-blue/65 text-[14px] md:text-[15px] leading-[1.5] max-w-[34ch]">
            Writings and broadcasts on blockchains, AI, and the technologies unlocking the African creator economy.
          </p>
        </div>
        {status === 'sent' ? (
          <p className="mt-8 md:mt-0 text-dark-blue text-sm font-semibold">You&apos;re on the list — first to know when Sabi goes live.</p>
        ) : (
          <div className="mt-8 md:mt-0">
            <div className="relative">
              <input
                type="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                onKeyDown={(e) => { if (e.key === 'Enter') subscribe(); }}
                placeholder="your@email.com"
                className="w-full h-12 pl-5 pr-28 font-mono text-sm border border-dark-blue/25 rounded-full text-dark-blue focus:outline-none focus:border-dark-blue transition-colors"
              />
              <button
                onClick={subscribe}
                disabled={status === 'submitting'}
                className="absolute right-1 top-1 bottom-1 px-5 bg-dark-blue text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity overflow-hidden group flex items-center justify-center disabled:opacity-70"
              >
                <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                  {status === 'submitting' ? 'Sending…' : 'Subscribe'}
                </span>
                <span className="inline-block absolute transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                  {status === 'submitting' ? 'Sending…' : 'Subscribe'}
                </span>
              </button>
            </div>
            {status === 'error' && <p className="mt-2 text-xs text-red-500">That email doesn&apos;t look right.</p>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="top" className="min-h-screen bg-white p-2 md:mb-16 md:mt-2 pb-24 md:pb-0">

      {/* --- MOBILE LAYOUT (HIDDEN ON MD) --- */}
      {/* Order optimised for mobile engagement: audience fit before the
          solution catalogue, then argument, proof, and supporting utilities. */}
      <div className="flex md:hidden flex-col gap-2">
        <MobileHero />
        <ForCreatorsSection />
        <WhatWeBuild />
        <MissionSection />
        <WhatWeDoSection />
        <PlaybookSection />
        <AbstractIconSection />
        <WeatherSection />
        <ThreeDIconSection />
        <NewsletterSection />
        <div className="flex justify-center py-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-dark-blue font-bold flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            RETURN BACK TO TOP
          </button>
        </div>
      </div>

      {/* --- DESKTOP LAYOUT (HIDDEN ON SM) --- */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-[738px_363px_363px] gap-2 max-w-[1500px] mx-auto items-start justify-center">
        {/* LEFT BLOCK: Columns 1 & 2 Wrapper */}
        <div className="flex flex-col gap-2 md:col-span-1">
          <HeroSection />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <WhatWeBuild />
              <WeatherSection />
            </div>
            <div className="flex flex-col gap-2">
              <ThreeDIconSection />
              <MissionSection />
            </div>
          </div>
        </div>

        {/* MIDDLE BLOCK: Column 3 */}
        <div className="flex flex-col gap-2">
          <AbstractIconSection />
          <WhatWeDoSection />
          <NewsletterSection />
        </div>

        {/* RIGHT BLOCK: Column 4 */}
        <div className="flex flex-col gap-2">
          <LogoSocialsSection />
          <ForCreatorsSection />
          <PlaybookSection />
        </div>
      </div>

    </div>
  );
}

export default MainGrid;
