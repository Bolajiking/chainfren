'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.svg';

const Nav = () => {
  // State to track the previous scroll position
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // State to control the visibility of the navigation bar
  const [visible, setVisible] = useState(true);
  // State to control the mobile navigation menu
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible = prevScrollPos > currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    // Add a scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={`bg-[#09011bce] border-b-[1px] border-[#40ACFF0F] relative ${visible ? 'top-0' : 'top-[-100%]'} text-white sticky transition-[top] duration-[700ms] ease-in-out z-20 backdrop-blur-xl`}>
      <div className='flex justify-between items-center xl:max-w-[1150px] px-4 sm:px-8 py-5 mx-auto'>
        <div>
          {/* Logo with a link to the home page */}
          <Link href={'/'}>
            <Image src={logo} alt="chainfrens Logo" />
          </Link>
        </div>
        <div onClick={e => setNavOpen(!navOpen)} className="md:hidden">
          {navOpen ? (
            // Close icon for mobile menu
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 20L19.9706 3.02944L21.6676 4.72649L4.69706 21.6971L3 20Z" fill="white" />
              <path d="M22 20L5.02944 3.02944L3.33238 4.72649L20.3029 21.6971L22 20Z" fill="white" />
            </svg>
          ) : (
            // Hamburger icon for mobile menu
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3.59998H24V5.99998H0V3.59998ZM7.38462 10.8H24V13.2H7.38462V10.8ZM0 18H24V20.4H0V18Z" fill="white" />
            </svg>
          )}
          {
            // Mobile navigation menu
            <div className={`md:hidden absolute top-20 ${navOpen ? 'h-auto py-8' : 'h-0 py-0'} transition-all ease-in-out overflow-hidden left-[50%] translate-x-[-50%] w-[90%] bg-[#09021D] px-6 flex flex-col gap-6 rounded-lg`}>
              <Link href={'/#about'} className="text-lg">About</Link>
              <Link href={'/#services'} className="text-lg">Services</Link>
              <Link href={'/blog'} className="text-lg">Blog</Link>
              <Link href={'/contact'} className="text-lg">Contact Us</Link>
              <Link href={'/learn'}>
                <button className="py-2 w-full rounded-3xl px-6 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold">Learn web3</button>
              </Link>
            </div>
          }
        </div>
        <div className='hidden items-center gap-9 md:flex font-normal'>
          {/* Desktop navigation links */}
          <Link href='/#about'>About</Link>
          <Link href='/#services'>Services</Link>
          <Link href='/blog'>Blog</Link>
          <Link href='/contact'>Contact Us</Link>
          <Link href={'/learn'}>
            <button className='py-[9px] rounded-3xl w-full px-6 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>
              Learn Web 3
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
