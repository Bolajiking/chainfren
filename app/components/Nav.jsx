'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.svg';

const Nav = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible = prevScrollPos > currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);
  


  return (
    <div className={`bg-[#09011bce] ${visible ? 'top-0' : 'top-[-100%]'} text-white sticky transition-[top] duration-[700ms] ease-in-out z-20 backdrop-blur-xl`}>
      <div className='flex justify-between items-center xl:max-w-[1150px] px-4 sm:px-8 py-5 mx-auto'>
        <div className=''>
          <Image src={logo} alt="chainfrens Logo" /> {/* You should specify an alt attribute for accessibility */}
        </div>
        <div className="md:hidden">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 3.59998H24V5.99998H0V3.59998ZM7.38462 10.8H24V13.2H7.38462V10.8ZM0 18H24V20.4H0V18Z" fill="white"/>
</svg>

        </div>
        <div className='hidden items-center gap-9 md:flex font-normal'>
          <Link href='#'>About</Link>
          <Link href='#'>Services</Link>
          <Link href='/blog'>Blog</Link>
          <Link href='/contact'>Contact Us</Link>
          <button className='py-[9px] rounded-3xl px-6 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>
            Learn Web 3
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
