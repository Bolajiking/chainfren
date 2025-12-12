import React from 'react'
import Link from 'next/link';
import Nav from '../../components/Nav';
import { client } from '@/app/contentful/contentful';
import WavyTop from './WavyTop';

const getBlogEntries = async () => {
  const entries = await client.getEntries({ content_type: "blog" });
  return entries;
};

const page = async () => {
  const blogEntries = await getBlogEntries();
  
  // Define the color scheme for the blocks
  const blockColors = [
    { bg: '#5ACDFF', text: 'black', button: 'black' }, // Light blue
    { bg: '#08153C', text: 'white', button: 'white' }, // Dark blue
    { bg: '#E6D9FF', text: 'black', button: 'black' }, // Light purple
    { bg: '#000000', text: 'white', button: 'white' }, // Black
    { bg: '#0091FF', text: 'black', button: 'black' }, // Bright blue
    { bg: '#A6D234', text: 'black', button: 'black' }, // Lime green
    { bg: '#CBF0B8', text: 'black', button: 'black' }, // Light green
  ];

  // Use blog entries if available, otherwise use placeholder
  const articles = blogEntries.items.length > 0 
    ? blogEntries.items.slice(0, 7).map(item => ({
        title: item.fields.title || '1000 TRUE FANS - How Creators and Brands can use web3 for growth',
        slug: item.fields.slug || 'article'
      }))
    : Array(7).fill(null).map((_, i) => ({
        title: '1000 TRUE FANS - How Creators and Brands can use web3 for growth',
        slug: `article-${i + 1}`
      }));

  return (
    <div className="min-h-screen bg-white font-fontspring">
     
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-12 max-w-7xl">
          Get the latest insights and strategies from our team.
        </h1>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article, index) => {
            const colors = blockColors[index % blockColors.length];
            const textColor = colors.text === 'white' ? 'text-white' : 'text-black';
            const buttonBorderColor = colors.button === 'white' ? 'border-white' : 'border-black';
            const buttonTextColor = colors.button === 'white' ? 'text-white' : 'text-black';
            
            return (
              <div
                key={index}
                className="relative rounded-lg border-2 border-black"
                style={{ backgroundColor: colors.bg, overflow: 'hidden' }}
              >
                {/* Wavy Top Edge */}
                <WavyTop bgColor={colors.bg} />
                
                {/* Content */}
                <div className={`p-6 pt-4 ${textColor} flex flex-col justify-between min-h-[200px]`}>
                  <h2 className="text-lg md:text-xl font-bold mb-6 leading-tight">
                    {article.title}
                  </h2>
                  
                  <div className="mt-auto">
                    <Link href={`/blog/${article.slug}`}>
                      <button className={`px-4 py-2 border-2 ${buttonBorderColor} ${buttonTextColor} font-semibold rounded-full hover:opacity-80 transition-opacity uppercase text-sm`}>
                        READ
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* GO HOME Button - Bottom Right */}
        <div className="flex justify-end mb-8 border-t-2 border-black py-12 mt-32">
          <Link href="/">
            <button className="px-6 py-3 border-2 border-black text-black font-semibold rounded-lg hover:opacity-80 transition-opacity uppercase">
              GO HOME
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
