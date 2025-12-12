'use client'
import React from 'react';

// Wavy/scalloped top edge component using wave.svg as mask
const WavyTop = ({ bgColor }) => {
  return (
    <div 
      className="relative w-full"
      style={{ 
        height: '30px',
        backgroundColor: bgColor,
        maskImage: 'url(/wave.svg)',
        WebkitMaskImage: 'url(/wave.svg)',
        maskSize: '100% 30px',
        WebkitMaskSize: '100% 30px',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'top center',
        WebkitMaskPosition: 'top center',
        clipPath: 'inset(0 0 calc(100% - 30px) 0)',
        WebkitClipPath: 'inset(0 0 calc(100% - 30px) 0)'
      }}
    />
  );
};

export default WavyTop;

