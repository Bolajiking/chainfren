'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import WeatherWidget from './WeatherWidget';

const MainGrid = () => {
  // Tab data for "For Creators" section
  const creatorTabs = [
    {
      title: 'For Creators',
      heading: 'Own your audience. Build your economy.',
      buttonText: 'TALK TO CHAINFREN',
      buttonLink: '/contact',
      backgroundImage: '/3d.png',
      backgroundColor: '#08153C', // dark-blue
      textColor: 'text-white'
    },
    {
      title: 'For Brands',
      heading: 'Engage your community. Unlock new revenue.',
      buttonText: 'TALK TO CHAINFREN',
      buttonLink: '/contact',
      backgroundImage: '/3d4.png',
      backgroundColor: '#1DA6E2', // light-blue
      textColor: 'text-black'
    },
  
  ];

  const [currentCreatorTab, setCurrentCreatorTab] = useState(0);

  const nextCreatorTab = () => {
    setCurrentCreatorTab((prev) => (prev + 1) % creatorTabs.length);
  };

  const prevCreatorTab = () => {
    setCurrentCreatorTab((prev) => (prev - 1 + creatorTabs.length) % creatorTabs.length);
  };

  // Tab data for "Services" section
  const servicesTabs = [
    {
      title: 'Agency',
      description: 'Your onchain strategy partner. We provide expert consulting and execution for brands and creators entering Web3.',
      buttonText: 'LEARN MORE',
      buttonLink: '/agency',
      backgroundImage: '/3d3.png',
      backgroundColor: '#5ACDFF', // light-blue
      textColor: 'text-black'
    },
    {
      title: 'Product',
      description: 'Tools, platforms, and bootcamps built for the creator economy. Own your audience and build your wealth.',
      buttonText: 'LEARN MORE',
      buttonLink: '/products',
      backgroundImage: '/3d5.png',
      backgroundColor: '#8DAAFF', // lime-green
      textColor: 'text-black'
    },
    {
      title: 'Media',
      description: 'The playbook for what is next. Get essential Web3 insights, market analysis, and growth strategies.',
      buttonText: 'LEARN MORE',
      buttonLink: '/contact',
      backgroundImage: '/3d6.png',
      backgroundColor: '#CBF0B8', // light-green
      textColor: 'text-black'
    }
  ];

  const [currentServiceTab, setCurrentServiceTab] = useState(0);

  const nextServiceTab = () => {
    setCurrentServiceTab((prev) => (prev + 1) % servicesTabs.length);
  };

  const prevServiceTab = () => {
    setCurrentServiceTab((prev) => (prev - 1 + servicesTabs.length) % servicesTabs.length);
  };

  // Tab data for "The Playbook" section
  const playbookTabs = [
    {
      title: '1000 TRUE FANS - How Creators and Brands can use web3 for growth',
      buttonText: 'READ',
      buttonLink: '/blog/1000-true-fans-how-creators-and-brands-can-use-web3-for-growth',
      backgroundImage: '/bgChain.png',
    
    },
    {
      title: '',
      buttonText: 'VIEW ALL ARTICLES',
      buttonLink: '/blog',
      backgroundImage: ''
    },
   
  ];

  const [currentPlaybookTab, setCurrentPlaybookTab] = useState(0);

  const nextPlaybookTab = () => {
    setCurrentPlaybookTab((prev) => (prev + 1) % playbookTabs.length);
  };

  const prevPlaybookTab = () => {
    setCurrentPlaybookTab((prev) => (prev - 1 + playbookTabs.length) % playbookTabs.length);
  };

  return (
    <div className="min-h-screen bg-white p-2 md:mb-16 md:mt-2">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-2 auto-rows-min">
        
        {/* 1. Hero Section - Top Left (spans 2 columns on large screens) */}
        <div className="md:col-span-2 lg:col-span-2 bg-white border-[2px] border-dark-blue rounded-3xl p-6 md:p-8 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-4 leading-tight">
            Unlocking Digital Wealth for Creators and Brands
          </h1>
          <p className="text-base md:text-lg text-dark-blue/80 mb-6 leading-relaxed">
            We are a web3 company enabling the power of crypto and digital assets to build products and experiences that drive valuable growth in the digital age.
          </p>
          <Link href="/contact">
            <button className="px-6 py-3 border-2 border-dark-blue text-dark-blue font-semibold rounded-full hover:bg-dark-blue hover:text-white transition-colors overflow-hidden relative group">
              <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                GET STARTED
              </span>
              <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                GET STARTED
              </span>
            </button>
          </Link>
        </div>

        {/* 2. Abstract Icon - Top Middle */}
        <div className="bg-white border-[2px] border-dark-blue rounded-3xl p-6 row-span-2 md:p-8 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
           <Image src={'/cfnlogg.svg'} alt="chainfren logo" width={200} height={200} className=" " />
          </div>
        </div>

        {/* 3. Brand Logo & Social Links - Top Right */}
        <div className="bg-white border-[2px] border-dark-blue rounded-3xl p-6 md:p-8 flex items-center justify-center relative">
          <Image src={'/chainn.svg'} alt="Chainfren Logo" width={100} height={40} className="h-auto w-full" />
          <div className="absolute bottom-4 right-4 flex gap-4">
            <a href="#" className="text-dark-blue hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="text-dark-blue hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 4. Services: Agency - Middle Left (Tabbed Component) */}
        <div 
          className="border-[2px] border-dark-blue rounded-3xl md:row-span-2 px-4 py-5 md:px-8 md:pt-8 md:pb-0 pb-6 relative overflow-hidden transition-colors duration-500 min-h-[340px] md:min-h-0"
          style={{ backgroundColor: servicesTabs[currentServiceTab].backgroundColor }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-4">
            <span className={`text-xs md:text-sm font-semibold ${servicesTabs[currentServiceTab].textColor} transition-colors duration-300`}>
              SERVICES
            </span>
            <div className="flex gap-2">
              <button 
                onClick={prevServiceTab}
                className={`${servicesTabs[currentServiceTab].textColor} hover:opacity-70 transition-opacity p-1`}
                aria-label="Previous service"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="15" y2="12"/>
                  <path d="M9 6l-6 6 6 6"/>
                </svg>
              </button>
              <button 
                onClick={nextServiceTab}
                className={`${servicesTabs[currentServiceTab].textColor} hover:opacity-70 transition-opacity p-1`}
                aria-label="Next service"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="9" y1="12" x2="21" y2="12"/>
                  <path d="M15 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </div>
          <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold ${servicesTabs[currentServiceTab].textColor} mb-3 md:mb-3 transition-all duration-300 leading-tight`}>
            {servicesTabs[currentServiceTab].title}
          </h2>
          <p className={`text-sm md:text-base ${servicesTabs[currentServiceTab].textColor}/80 mb-4 md:mb-6 leading-relaxed transition-colors duration-300`}>
            {servicesTabs[currentServiceTab].description}
          </p>
          <Link href={servicesTabs[currentServiceTab].buttonLink}>
            <button className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base border-2 ${servicesTabs[currentServiceTab].textColor} font-semibold rounded-full transition-colors overflow-hidden relative group ${
              servicesTabs[currentServiceTab].backgroundColor === '#5ACDFF' || 
              servicesTabs[currentServiceTab].backgroundColor === '#8DAAFF' ||
              servicesTabs[currentServiceTab].backgroundColor === '#CBF0B8'
                ? 'border-dark-blue hover:bg-dark-blue hover:text-white' 
                : 'border-white hover:bg-white hover:text-dark-blue'
            }`}>
              <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                {servicesTabs[currentServiceTab].buttonText}
              </span>
              <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                {servicesTabs[currentServiceTab].buttonText}
              </span>
            </button>
          </Link>
          {/* Background image */}
          <div className="absolute bottom-0 -right-3 opacity-50 md:opacity-100">
            <img 
              src={servicesTabs[currentServiceTab].backgroundImage} 
              alt="" 
              className="transition-opacity duration-300 w-40 h-40 md:w-auto md:h-auto" 
            />
          </div>
        </div>

        {/* 5. Abstract 3D Image - Middle Center */}
        <div className="bg-dark-blue border-[2px] border-dark-blue rounded-3xl p-6 md:p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/randz1.png" alt="3d image" className="w-[80%] h-[80%] -rotate-12" />
          </div>
        </div>

        {/* 6. For Creators - Middle Right (Tabbed Component) */}
        <div 
          className="border-[2px] border-dark-blue md:row-span-2 rounded-3xl px-4 py-5 md:p-8 pb-20 md:pb-8 relative overflow-hidden transition-colors duration-500 min-h-[380px] md:min-h-0"
          style={{ backgroundColor: creatorTabs[currentCreatorTab].backgroundColor }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-4 relative z-20">
            <span className={`text-xs md:text-sm font-semibold ${creatorTabs[currentCreatorTab].textColor} transition-colors duration-300`}>
              {creatorTabs[currentCreatorTab].title}
            </span>
            <div className="flex gap-2 relative z-20">
              <button 
                onClick={prevCreatorTab}
                className={`${creatorTabs[currentCreatorTab].textColor} hover:opacity-70 transition-opacity p-1 relative z-20`}
                aria-label="Previous tab"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="15" y2="12"/>
                  <path d="M9 6l-6 6 6 6"/>
                </svg>
              </button>
              <button 
                onClick={nextCreatorTab}
                className={`${creatorTabs[currentCreatorTab].textColor} hover:opacity-70 transition-opacity p-1 relative z-20`}
                aria-label="Next tab"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="9" y1="12" x2="21" y2="12"/>
                  <path d="M15 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </div>
          <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold ${creatorTabs[currentCreatorTab].textColor} mb-4 md:mb-6 leading-tight transition-all duration-300 relative z-10`}>
            {creatorTabs[currentCreatorTab].heading}
          </h2>
          <Link 
            href={creatorTabs[currentCreatorTab].buttonLink} 
            className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-[90%] md:max-w-[80%]"
          >
            <button className={`w-full px-4 py-2 md:px-6 md:py-3 text-sm md:text-base border-2 font-semibold rounded-full transition-colors overflow-hidden relative group ${
              creatorTabs[currentCreatorTab].backgroundColor === '#08153C' 
                ? 'border-white text-black bg-white hover:text-dark-blue' 
                : 'border-dark-blue text-dark-blue bg-white hover:bg-dark-blue hover:text-white'
            }`}>
              <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                {creatorTabs[currentCreatorTab].buttonText}
              </span>
              <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                {creatorTabs[currentCreatorTab].buttonText}
              </span>
            </button>
          </Link>
          {/* Background pattern - moved further down on mobile */}
          <div className="absolute -bottom-1 md:bottom-0 right-0 opacity-30 md:opacity-100 z-0">
            <img 
              src={creatorTabs[currentCreatorTab].backgroundImage} 
              alt="" 
              className="w-64 h-64 md:w-full md:h-full transition-opacity duration-300 object-contain" 
            />
          </div>
        </div>


          {/* 8. Mission & Web3 - Bottom Center*/}
          <div className="bg-[#CBF0B8] border-[2px] md:row-span-2 border-dark-blue rounded-3xl px-4 py-5 md:p-8 md:pt-12 pb-24 md:pb-8 relative overflow-hidden min-h-[420px] md:min-h-0">
            <div className="relative z-10">
              <p className="text-dark-blue text-sm md:text-base lg:text-xl leading-relaxed mb-3 md:mb-4">
                Creators and brands drive the value, but big tech exploits it.
              </p>
              <p className="text-dark-blue text-sm md:text-base lg:text-xl leading-relaxed mb-3 md:mb-4">
                <span className="font-bold text-base md:text-lg lg:text-2xl">Web3 is the chance to build a fair, open internet</span> where economic value is shared, not centralized.
              </p>
              <p className="text-dark-blue text-sm md:text-base lg:text-xl leading-relaxed mb-3 md:mb-4">
                At Chainfren, <span className="font-bold text-base md:text-lg lg:text-2xl">our mission is to onboard the next wave of stakeholders.</span>
              </p>
              <p className="text-dark-blue text-sm md:text-base lg:text-xl leading-relaxed mb-6 md:mb-6">
                We equip forward<span className='relative font-serif'>-</span>thinking creators and brands with the tools and resources to thrive in the onchain economy.
              </p>
            </div>
            
            {/* Wavy background graphic at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: 'url(/3d2.png)'
                }}
              ></div>
            </div>
            
            {/* Button positioned at bottom, centered, on top of background */}
            <Link href="/contact" className="absolute bottom-6 md:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] md:w-[80%] max-w-md">
              <button className="w-full px-6 py-3 bg-white text-dark-blue font-semibold rounded-full hover:opacity-90 transition-opacity uppercase overflow-hidden relative group">
                <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                  GET IN TOUCH
                </span>
                <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                  GET IN TOUCH
                </span>
              </button>
            </Link>
          </div>

       

            {/* 9. What We Do - Bottom Middle-Right */}
        <div className="bg-[#A6D234] border-[2px] border-dark-blue rounded-3xl p-6 md:p-8">
          <h3 className="text-sm font-bold text-dark-blue mb-4">WHAT WE DO</h3>
          <ul className="space-y-2 text-dark-blue font-extrabold text-sm md:text-3xl">
            <li>MEDIA PRODUCTION</li>
            <li>DEVELOPMENT</li>
            <li>MARKETING</li>
            <li>TOKENS</li>
            <li>COMMUNITIES</li>
            <li>PARTNERSHIP</li>
            <li>GROWTH</li>
            <li>BD</li>
          </ul>
        </div>

         {/* 7. Weather Widget - Bottom Left */}
         <WeatherWidget />

       



        

        {/* Join Newsletter */}
        <div className=" border-[2px] border-dark-blue border-solid rounded-3xl p-6 md:p-8">
            <h3 className="text-sm font-semibold text-dark-blue mb-2">JOIN NEWSLETTER</h3>
            <p className="text-black text-base md:text-2xl font-bold mb-12">Get the latest insights and strategies from our team.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="john@email.com" 
                className="w-full px-4 py-3 font-mono pr-24 border border-dark-blue/30 rounded-full text-dark-blue placeholder-dark-blue/50 focus:outline-none focus:border-dark-blue"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-dark-blue text-white  rounded-full hover:opacity-90 transition-opacity overflow-hidden group flex items-center justify-center">
                <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                  Subscribe
                </span>
                <span className="inline-block absolute transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                  Subscribe
                </span>
              </button>
            </div>
          </div>

          {/* 10. The Playbook/Newsletter/Article - Bottom Right */}
        <div className="bg-[#5ACDFF] border-[2px] border-dark-blue border-solid rounded-3xl p-6 md:p-8 flex flex-col gap-6">
          {/* The Playbook Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-dark-blue">THE PLAYBOOK</span>
              <div className="flex gap-2">
                <button 
                  onClick={prevPlaybookTab}
                  className="text-dark-blue hover:opacity-70 transition-opacity"
                  aria-label="Previous tab"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="15" y2="12"/>
                    <path d="M9 6l-6 6 6 6"/>
                  </svg>
                </button>
                <button 
                  onClick={nextPlaybookTab}
                  className="text-dark-blue hover:opacity-70 transition-opacity"
                  aria-label="Next tab"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="9" y1="12" x2="21" y2="12"/>
                    <path d="M15 6l6 6-6 6"/>
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-black text-sm md:text-2xl font-extrabold border-b-2 border-black pb-3">Get the latest insights and strategies from our team.</p>
          </div>

          {/* Article Tab Content */}
          <div 
            className="relative p-6 rounded-lg bg-contain transition-opacity duration-300 min-h-[200px] flex items-center justify-center"
            style={{ 
              backgroundImage: playbookTabs[currentPlaybookTab].backgroundImage ? `url(${playbookTabs[currentPlaybookTab].backgroundImage})` : 'none'
            }}
          >
            <div className="relative z-10 space-y-6 w-full">
              {playbookTabs[currentPlaybookTab].title && (
                <h4 className="text-dark-blue font-bold mb-12 text-sm md:text-base">
                  {playbookTabs[currentPlaybookTab].title.includes(' - ') ? (
                    <>
                      {playbookTabs[currentPlaybookTab].title.split(' - ')[0]} <span className='relative font-serif'>-</span> {playbookTabs[currentPlaybookTab].title.split(' - ')[1]}
                    </>
                  ) : (
                    playbookTabs[currentPlaybookTab].title
                  )}
                </h4>
              )}
              <div className="flex justify-center">
                <Link href={playbookTabs[currentPlaybookTab].buttonLink}>
                  <button className="px-6 py-2 border-2 border-dark-blue text-black font-semibold rounded-full bg-white transition-colors overflow-hidden relative group">
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                      {playbookTabs[currentPlaybookTab].buttonText}
                    </span>
                    <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                      {playbookTabs[currentPlaybookTab].buttonText}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MainGrid;

