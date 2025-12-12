'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import WavyTop from '../WavyTop';

const ReadMoreSection = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define the color scheme for the cards
  const blockColors = [
    { bg: '#5ACDFF', text: 'black', button: 'black' }, // Bright light blue
    { bg: '#08153C', text: 'white', button: 'white' }, // Dark navy blue
    { bg: '#E6D9FF', text: 'black', button: 'black' }, // Light periwinkle/lavender
  ];

  const nextPost = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevPost = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  // Get current post to display
  const currentPost = posts[currentIndex];
  const colors = blockColors[currentIndex % blockColors.length];
  const textColor = colors.text === 'white' ? 'text-white' : 'text-black';
  const buttonBorderColor = colors.button === 'white' ? 'border-white' : 'border-black';
  const buttonBgColor = colors.button === 'white' ? 'bg-white' : 'bg-transparent';
  const buttonTextColor = colors.button === 'white' ? 'text-white' : 'text-black';

  // Split title at the dash if it exists
  const titleParts = currentPost.fields.title.split(' - ');
  const titleLine1 = titleParts[0] || currentPost.fields.title;
  const titleLine2 = titleParts.length > 1 ? titleParts.slice(1).join(' - ') : '';

  return (
    <div className="mt-16 mb-12 border-t-2 border-black pt-12">
      {/* Header with READ MORE and arrows */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black uppercase">
          READ MORE
        </h2>
        <div className="flex gap-4">
          <button
            onClick={prevPost}
            className="text-black hover:opacity-80 transition-opacity"
            aria-label="Previous article"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="9" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={nextPost}
            className="text-black hover:opacity-80 transition-opacity"
            aria-label="Next article"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Article Cards - Show all three in a row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => {
          const postColors = blockColors[index % blockColors.length];
          const postTextColor = postColors.text === 'white' ? 'text-white' : 'text-black';
          const postButtonBorderColor = postColors.button === 'white' ? 'border-white' : 'border-black';
          // For white buttons on dark backgrounds: transparent bg with white text
          // For black buttons on light backgrounds: transparent bg with black text
          const postButtonBgColor = 'bg-transparent';
          const postButtonTextColor = postColors.button === 'white' ? 'text-white' : 'text-black';

          // Split title at the dash if it exists
          const postTitleParts = post.fields.title.split(' - ');
          const postTitleLine1 = postTitleParts[0] || post.fields.title;
          const postTitleLine2 = postTitleParts.length > 1 ? postTitleParts.slice(1).join(' - ') : '';

          return (
            <div
              key={post.fields.slug}
              className="relative rounded-lg border-2 border-black overflow-hidden"
              style={{ backgroundColor: postColors.bg }}
            >
              {/* Wavy Top Edge */}
              <WavyTop bgColor={postColors.bg} />
              
              {/* Content */}
              <div className={`p-6 pt-4 ${postTextColor} flex flex-col justify-between min-h-[200px]`}>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight">
                    {postTitleLine1}
                    {postTitleLine2 && (
                      <>
                        <br />
                        {postTitleLine2}
                      </>
                    )}
                  </h3>
                </div>
                
                <div className="mt-auto pt-4">
                  <Link href={`/blog/${post.fields.slug}`}>
                    <button className={`px-4 py-2 border-2 ${postButtonBorderColor} ${postButtonBgColor} ${postButtonTextColor} font-semibold rounded-full hover:opacity-80 transition-opacity uppercase text-sm w-full`}>
                      READ
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadMoreSection;

