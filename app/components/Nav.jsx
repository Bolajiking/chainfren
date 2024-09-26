'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.svg';

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Logo */}
      <div className="fixed top-0 left-0 z-20 p-5">
        <Link href={'/'}>
          <Image src={logo} alt="chainfrens Logo" />
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="fixed top-0 right-0 z-20">
        <div className="bg-[#09011bce] border-l-[1px] border-[#40ACFF0F] text-white backdrop-blur-xl py-5 px-4">
          <div onClick={() => setNavOpen(!navOpen)} className="cursor-pointer mb-4">
            {navOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 20L19.9706 3.02944L21.6676 4.72649L4.69706 21.6971L3 20Z" fill="white" />
                <path d="M22 20L5.02944 3.02944L3.33238 4.72649L20.3029 21.6971L22 20Z" fill="white" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3.59998H24V5.99998H0V3.59998ZM7.38462 10.8H24V13.2H7.38462V10.8ZM0 18H24V20.4H0V18Z" fill="white" />
              </svg>
            )}
          </div>
          <div className={`${navOpen ? 'block' : 'hidden'} flex flex-col gap-6`}>
            <Link href='/#about'>About</Link>
            <Link href='/#services'>Services</Link>
            <div 
              ref={productsRef}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
              className="relative group"
            >
              <span className="font-semibold cursor-pointer">Products</span>
              <div className="absolute right-full top-0 mr-2 py-2 w-48 bg-[#09011bce] rounded-md shadow-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div className="absolute right-0 top-0 w-4 h-full"></div>
                <Link href='/products/chainfren-studio' className="block px-4 py-2 text-sm hover:bg-gray-700">
                  Chainfren Studio
                </Link>
                <Link href='/products/product2' className="block px-4 py-2 text-sm hover:bg-gray-700">
                  Product 2
                </Link>
              </div>
            </div>
            <Link href='/blog'>Blog</Link>
            <Link href='/contact'>Contact Us</Link>
            <Link href={'/learn'}>
              <button className='py-[9px] rounded-3xl w-full px-6 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>
                Learn Web3
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
