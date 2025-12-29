'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WeatherWidget from './WeatherWidget';

const MainGrid = () => {
  // Tab data for sections
  const creatorTabs = [
    { title: 'For Creators', heading: 'Own your audience. Build your economy.', buttonText: 'TALK TO CHAINFREN', buttonLink: '/contact', backgroundImage: '/3d.png', backgroundColor: '#08153C', textColor: 'text-white' },
    { title: 'For Brands', heading: 'Engage your community. Unlock new revenue.', buttonText: 'TALK TO CHAINFREN', buttonLink: '/contact', backgroundImage: '/3d4.png', backgroundColor: '#1DA6E2', textColor: 'text-black' },
  ];
  const servicesTabs = [
    { title: 'Agency', description: 'Your onchain strategy partner. We provide expert consulting and execution for brands and creators entering Web3.', buttonText: 'LEARN MORE', buttonLink: '/agency', backgroundImage: '/3d3.png', backgroundColor: '#5ACDFF', textColor: 'text-black' },
    { title: 'Product', description: 'Tools, platforms, and bootcamps built for the creator economy. Own your audience and build your wealth.', buttonText: 'LEARN MORE', buttonLink: '/products', backgroundImage: '/3d5.png', backgroundColor: '#8DAAFF', textColor: 'text-black' },
    { title: 'Media', description: 'The playbook for what is next. Get essential Web3 insights, market analysis, and growth strategies.', buttonText: 'LEARN MORE', buttonLink: '/contact', backgroundImage: '/3d6.png', backgroundColor: '#CBF0B8', textColor: 'text-black' }
  ];
  const playbookTabs = [
    { title: '1000 TRUE FANS - How Creators and Brands can use web3 for growth', buttonText: 'READ', buttonLink: '/blog/1000-true-fans-how-creators-and-brands-can-use-web3-for-growth', backgroundImage: '/bgChain.png' },
    { title: '', buttonText: 'VIEW ALL ARTICLES', buttonLink: '/blog', backgroundImage: '' },
  ];

  const [currentCreatorTab, setCurrentCreatorTab] = useState(0);
  const [currentServiceTab, setCurrentServiceTab] = useState(0);
  const [currentPlaybookTab, setCurrentPlaybookTab] = useState(0);

  const nextCreatorTab = () => setCurrentCreatorTab((prev) => (prev + 1) % creatorTabs.length);
  const prevCreatorTab = () => setCurrentCreatorTab((prev) => (prev - 1 + creatorTabs.length) % creatorTabs.length);
  const nextServiceTab = () => setCurrentServiceTab((prev) => (prev + 1) % servicesTabs.length);
  const prevServiceTab = () => setCurrentServiceTab((prev) => (prev - 1 + servicesTabs.length) % servicesTabs.length);
  const nextPlaybookTab = () => setCurrentPlaybookTab((prev) => (prev + 1) % playbookTabs.length);
  const prevPlaybookTab = () => setCurrentPlaybookTab((prev) => (prev - 1 + playbookTabs.length) % playbookTabs.length);

  // --- REUSABLE SECTIONS ---

  const HeroSection = () => (
    <div className="bg-white border-[2px] border-dark-blue rounded-[26px] p-5 md:p-7 h-auto md:h-[263px] relative">
      <h1 
        className="text-[50px] font-bold text-dark-blue leading-none"
        style={{ 
          width: '658px',
          maxWidth: '100%'
        }}
      >
        Unlocking Digital Wealth for Creators and Brands
      </h1>
      <p 
        className="text-[18px] font-medium text-dark-blue/80 leading-snug"
        style={{ 
          width: '698px',
          maxWidth: '100%',
          marginTop: '20px'
        }}
      >
        We are a web3 company enabling the power of crypto and digital assets to build products and experiences that drive valuable growth in the digital age.
      </p>
      <Link href="/contact" className="md:absolute md:top-[206px] md:left-[20px]">
        <button className="mt-4 md:mt-0 px-6 py-3 md:px-[14px] md:py-[10px] border-2 md:border border-dark-blue text-dark-blue text-base md:text-[14px] font-semibold rounded-full hover:bg-dark-blue hover:text-white transition-colors overflow-hidden relative group">
          <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">GET STARTED</span>
          <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">GET STARTED</span>
        </button>
      </Link>
    </div>
  );

  const ServicesSection = () => (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .services-title-mobile {
            position: relative !important;
            width: auto !important;
            height: auto !important;
            top: auto !important;
            left: auto !important;
          }
          .services-desc-mobile {
            position: relative !important;
            width: auto !important;
            height: auto !important;
            top: auto !important;
            left: auto !important;
          }
          .services-button-mobile {
            position: static !important;
            top: auto !important;
            left: auto !important;
          }
          .services-button-mobile-inner {
            width: auto !important;
            height: auto !important;
            padding: 0.5rem 1.5rem !important;
            border-radius: 9999px !important;
            border-width: 2px !important;
          }
          .services-button-text-mobile {
            width: auto !important;
            height: auto !important;
          }
        }
      `}} />
      <div className="border-[2px] border-dark-blue rounded-[26px] px-4 py-5 md:px-7 md:py-7 relative overflow-hidden transition-colors duration-500 h-[600px]" style={{ backgroundColor: servicesTabs[currentServiceTab].backgroundColor }}>
        <div className="flex items-center justify-between mb-4 md:mb-4">
          <span className={`text-xs md:text-sm font-semibold ${servicesTabs[currentServiceTab].textColor} transition-colors duration-300`}>SERVICES</span>
          <div className="flex gap-2">
            <button onClick={prevServiceTab} className={`${servicesTabs[currentServiceTab].textColor} hover:opacity-70 transition-opacity p-1`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="15" y2="12"/><path d="M9 6l-6 6 6 6"/></svg></button>
            <button onClick={nextServiceTab} className={`${servicesTabs[currentServiceTab].textColor} hover:opacity-70 transition-opacity p-1`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="12" x2="21" y2="12"/><path d="M15 6l6 6-6 6"/></svg></button>
          </div>
        </div>
        {/* Title - Mobile: absolute positioned, Desktop: normal flow */}
        <h2 
          className={`services-title-mobile text-[32px] md:text-2xl lg:text-3xl font-semibold md:font-bold ${servicesTabs[currentServiceTab].textColor} transition-all duration-300 leading-tight md:mb-3`}
          style={{
            position: 'absolute',
            width: '323px',
            height: '32px',
            top: '60px',
            left: '20px'
          }}
        >
          {servicesTabs[currentServiceTab].title}
        </h2>
        {/* Description - Mobile: absolute positioned, Desktop: normal flow */}
        <p 
          className={`services-desc-mobile text-[22px] md:text-base font-medium md:font-normal ${servicesTabs[currentServiceTab].textColor}/80 leading-relaxed transition-colors duration-300 md:mb-4 md:mb-6`}
          style={{
            position: 'absolute',
            width: '370px',
            height: '124px',
            top: '112px',
            left: '20px'
          }}
        >
          {servicesTabs[currentServiceTab].description}
        </p>
        {/* Button - Mobile: absolute positioned, Desktop: normal flow */}
        <Link 
          href={servicesTabs[currentServiceTab].buttonLink}
          className="services-button-mobile absolute md:static"
          style={{
            top: '266px',
            left: '20px'
          }}
        >
          <button 
            className={`services-button-mobile-inner border ${servicesTabs[currentServiceTab].textColor} font-semibold rounded-full transition-colors overflow-hidden relative group md:px-6 md:py-3 md:text-sm md:text-base md:border-2 flex items-center justify-center ${servicesTabs[currentServiceTab].backgroundColor === '#5ACDFF' || servicesTabs[currentServiceTab].backgroundColor === '#8DAAFF' || servicesTabs[currentServiceTab].backgroundColor === '#CBF0B8' ? 'border-dark-blue hover:bg-dark-blue hover:text-white' : 'border-white hover:bg-white hover:text-dark-blue'}`}
            style={{
              width: '141px',
              height: '47px',
              paddingTop: '14px',
              paddingRight: '20px',
              paddingBottom: '14px',
              paddingLeft: '20px',
              borderRadius: '50px',
              borderWidth: '1px'
            }}
          >
            <span 
              className="services-button-text-mobile inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0 whitespace-nowrap text-[16px] font-semibold md:text-sm md:font-semibold"
              style={{
                width: '101px',
                height: '19px'
              }}
            >
              {servicesTabs[currentServiceTab].buttonText}
            </span>
            <span 
              className="services-button-text-mobile inline-block absolute left-1/2 -translate-x-1/2 transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap text-[16px] font-semibold md:text-sm md:font-semibold"
              style={{
                width: '101px',
                height: '19px'
              }}
            >
              {servicesTabs[currentServiceTab].buttonText}
            </span>
          </button>
        </Link>
        <div className="absolute bottom-0 -right-3 opacity-80 md:opacity-100"><img src={servicesTabs[currentServiceTab].backgroundImage} alt="" className="transition-opacity duration-300 w-[330px] h-[330px] md:w-auto md:h-auto object-contain" /></div>
      </div>
    </>
  );

  const MissionSection = () => (
    <div className="bg-[#CBF0B8] border-[2px] border-dark-blue rounded-[26px] px-4 py-5 md:p-8 md:pt-12 pb-24 md:pb-8 relative overflow-hidden h-[671px]">
      <div className="relative z-10 w-[370px] h-[433px] md:w-auto md:h-auto" style={{ letterSpacing: '0%' }}>
        <p className="text-dark-blue text-[22px] md:text-base lg:text-xl leading-snug mb-2 md:mb-4" style={{ letterSpacing: '0%' }}>Creators and brands drive the value, but big tech exploits it.</p>
        <p className="text-dark-blue text-[22px] md:text-base lg:text-xl leading-snug mb-2 md:mb-4" style={{ letterSpacing: '0%' }}><span className="font-bold text-[30px] md:text-lg lg:text-2xl" style={{ letterSpacing: '0%' }}>Web3 is the chance to build a fair, open internet</span> where economic value is shared, not centralized.</p>
        <p className="text-dark-blue text-[22px] md:text-base lg:text-xl leading-snug mb-2 md:mb-4" style={{ letterSpacing: '0%' }}>At Chainfren, <span className="font-bold text-[30px] md:text-lg lg:text-2xl" style={{ letterSpacing: '0%' }}>our mission is to onboard the next wave of stakeholders.</span></p>
        <p className="text-dark-blue text-[22px] md:text-base lg:text-xl leading-snug mb-4 md:mb-6" style={{ letterSpacing: '0%' }}>We equip forward<span className='relative font-serif'>-</span>thinking creators and brands with the tools and resources to thrive in the onchain economy.</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 overflow-hidden"><div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/3d2.png)' }}></div></div>
      <Link href="/contact" className="absolute bottom-6 md:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] md:w-[80%] max-w-md">
        <button className="w-full px-6 py-3 bg-white text-dark-blue font-semibold rounded-full hover:opacity-90 transition-opacity uppercase overflow-hidden relative group">
          <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">GET IN TOUCH</span>
          <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">GET IN TOUCH</span>
        </button>
      </Link>
    </div>
  );

  const LogoSocialsSection = () => (
    <div className="bg-white border-[2px] border-dark-blue rounded-[26px] p-6 md:p-8 h-auto md:h-[263px] min-h-[200px] flex items-center justify-center relative">
      <Image src={'/chainn.svg'} alt="Chainfren Logo" width={100} height={40} className="h-auto w-full" />
      <div className="absolute bottom-4 right-4 flex gap-4">
        <a href="https://x.com/chainfren" target="_blank" rel="noopener noreferrer" className="text-dark-blue hover:opacity-70 transition-opacity"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      </div>
    </div>
  );

  const WhatWeDoSection = () => (
    <div className="bg-[#A6D234] border-[2px] border-dark-blue rounded-[26px] p-6 md:p-8 h-[518px]">
      <h3 className="text-[14px] font-bold text-dark-blue mb-4">WHAT WE DO</h3>
      <ul className="space-y-2 text-dark-blue font-bold text-[32px] md:text-3xl">
        <li>MEDIA PRODUCTION</li><li>DEVELOPMENT</li><li>MARKETING</li><li>TOKENS</li><li>COMMUNITIES</li><li>PARTNERSHIP</li><li>GROWTH</li><li>BD</li>
      </ul>
    </div>
  );

  const ForCreatorsSection = () => (
    <div className="border-[2px] border-dark-blue rounded-[26px] px-4 py-5 md:px-7 md:py-7 relative overflow-hidden transition-colors duration-500 h-[529px]" style={{ backgroundColor: creatorTabs[currentCreatorTab].backgroundColor }}>
      {/* Navigation arrows - top right on mobile */}
      <div className="flex items-center justify-end mb-4 md:justify-between md:mb-4 relative z-20">
        <span className={`hidden md:block text-sm font-semibold ${creatorTabs[currentCreatorTab].textColor} transition-colors duration-300`}>{creatorTabs[currentCreatorTab].title}</span>
        <div className="flex gap-2 relative z-20">
          <button onClick={prevCreatorTab} className={`${creatorTabs[currentCreatorTab].textColor} hover:opacity-70 transition-opacity p-1 relative z-20`} type="button"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="15" y2="12"/><path d="M9 6l-6 6 6 6"/></svg></button>
          <button onClick={nextCreatorTab} className={`${creatorTabs[currentCreatorTab].textColor} hover:opacity-70 transition-opacity p-1 relative z-20`} type="button"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="12" x2="21" y2="12"/><path d="M15 6l6 6-6 6"/></svg></button>
        </div>
      </div>
      {/* Title - 32px on mobile */}
      <h2 className={`text-[32px] md:text-2xl lg:text-3xl font-bold ${creatorTabs[currentCreatorTab].textColor} mb-2 md:mb-3 leading-tight transition-all duration-300 relative z-10`}>{creatorTabs[currentCreatorTab].title}</h2>
      {/* Heading - 28px on mobile */}
      <p className={`text-[28px] md:text-xl ${creatorTabs[currentCreatorTab].textColor} mb-4 md:mb-6 leading-tight transition-all duration-300 relative z-10`}>{creatorTabs[currentCreatorTab].heading}</p>
      {/* Button - positioned absolutely with specific dimensions on mobile */}
      <Link 
        href={creatorTabs[currentCreatorTab].buttonLink} 
        className="absolute z-20 left-[71px] top-[407px] md:bottom-6 md:top-auto md:left-1/2 md:-translate-x-1/2 md:w-[calc(100%-3rem)] md:max-w-[80%]"
        style={{ width: '269px' }}
      >
        <button 
          className={`w-full text-[18px] md:text-base border-2 font-semibold rounded-[50px] transition-colors overflow-hidden relative group flex items-center justify-center whitespace-nowrap ${creatorTabs[currentCreatorTab].backgroundColor === '#08153C' ? 'border-white text-black bg-white hover:text-dark-blue' : 'border-dark-blue text-dark-blue bg-white hover:bg-dark-blue hover:text-white'}`}
          style={{ height: '62px' }}
        >
          <span className="whitespace-nowrap">{creatorTabs[currentCreatorTab].buttonText}</span>
        </button>
      </Link>
      {/* 3D Image - positioned with specific dimensions on mobile */}
      <div 
        className="absolute z-0 md:bottom-0 md:right-0 md:opacity-100"
        style={{ 
          top: '203px', 
          left: '-18.05px', 
          opacity: 0.3,
          transform: 'rotate(-6.58deg)'
        }}
      >
        <img 
          src={creatorTabs[currentCreatorTab].backgroundImage} 
          alt="" 
          className="transition-opacity duration-300 object-contain"
          style={{ width: '402px', height: '402px' }}
        />
      </div>
    </div>
  );

  const AbstractIconSection = () => (
    <div className="bg-white border-[2px] border-dark-blue rounded-[26px] h-[509px] relative overflow-hidden flex items-center justify-center">
      <Image 
        src={'/cfnlogg.svg'} 
        alt="chainfren logo" 
        width={202} 
        height={263}
        className="object-contain"
        style={{ opacity: 1 }}
      />
    </div>
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
          Get the latest insights<br />and strategies from<br />our team.
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
    <div className="bg-dark-blue border-[2px] border-dark-blue rounded-[26px] p-6 md:p-8 flex items-center justify-center h-[300px] md:h-[390px] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center"><img src="/randz1.png" alt="3d image" className="w-[80%] h-[80%] -rotate-12" /></div>
    </div>
  );

  const WeatherSection = () => <WeatherWidget />;

  const NewsletterSection = () => (
    <div className="border-[2px] border-dark-blue border-solid rounded-[26px] p-6 md:p-8 h-auto md:h-[297px]">
      <h3 className="text-sm font-semibold text-dark-blue mb-2">JOIN NEWSLETTER</h3>
      <p className="text-black text-base md:text-2xl font-bold mb-12">Get the latest insights and strategies from our team.</p>
      <div className="relative">
        <input type="email" placeholder="john@email.com" className="w-full px-4 py-3 font-mono pr-24 border border-dark-blue/30 rounded-full text-dark-blue placeholder-dark-blue/50 focus:outline-none focus:border-dark-blue" />
        <button className="absolute right-1 top-1 bottom-1 px-4 bg-dark-blue text-white rounded-full hover:opacity-90 transition-opacity overflow-hidden group flex items-center justify-center">
          <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">Subscribe</span>
          <span className="inline-block absolute transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">Subscribe</span>
        </button>
      </div>
    </div>
  );

  return (
    <div id="top" className="min-h-screen bg-white p-2 md:mb-16 md:mt-2">
      
      {/* --- MOBILE LAYOUT (HIDDEN ON MD) --- */}
      <div className="flex md:hidden flex-col gap-2">
        <HeroSection />
        <LogoSocialsSection />
        <MissionSection />
        <ServicesSection />
        <WhatWeDoSection />
        <ForCreatorsSection />
        <AbstractIconSection />
        <PlaybookSection />
        <ThreeDIconSection />
        <WeatherSection />
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
      <div className="hidden md:grid grid-cols-1 md:grid-cols-[738px_363px_363px] gap-2 max-w-[1500px] mx-auto items-start">
        {/* LEFT BLOCK: Columns 1 & 2 Wrapper */}
        <div className="flex flex-col gap-2 md:col-span-1">
          <HeroSection />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <ServicesSection />
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
