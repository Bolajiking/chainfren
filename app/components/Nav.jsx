'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/chainlogo.png';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white w-full md:w-[60%] px-4 md:px-6 py-4 flex items-center justify-between z-50 border-0 md:border border-black rounded-none md:rounded-full mx-auto mt-0 md:mt-4 relative">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href={'/'} onClick={closeMobileMenu}>
            <Image src={logo} alt="Chainfren Logo" width={120} height={40} className="h-auto" />
          </Link>
        </div>

        {/* Navigation Links in the center - Desktop */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href='/agency' className="text-black font-medium hover:opacity-80 transition-opacity uppercase">
            AGENCY
          </Link>
          <Link href='/products' className="text-black font-medium hover:opacity-80 transition-opacity uppercase">
            PRODUCT
          </Link>
          <Link href='/media' className="text-black font-medium hover:opacity-80 transition-opacity uppercase">
            MEDIA
          </Link>
        </div>

        {/* JOIN CHAINFREN button on the right - Desktop */}
        <div className="hidden md:flex items-center ml-auto">
          <Link href='/contact'>
            <button className="px-6 py-2 border border-black text-black font-semibold rounded-full hover:opacity-80 transition-opacity uppercase bg-white">
              JOIN CHAINFREN
            </button>
          </Link>
        </div>

        {/* Mobile menu - hamburger for small screens */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-black p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              // Close icon (X)
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              // Hamburger icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3.59998H24V5.99998H0V3.59998ZM0 10.8H24V13.2H0V10.8ZM0 18H24V20.4H0V18Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ paddingTop: '80px' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <Link
              href="/agency"
              onClick={closeMobileMenu}
              className="text-black font-medium hover:opacity-80 transition-opacity uppercase text-lg py-2"
            >
              AGENCY
            </Link>
            <Link
              href="/products"
              onClick={closeMobileMenu}
              className="text-black font-medium hover:opacity-80 transition-opacity uppercase text-lg py-2"
            >
              PRODUCT
            </Link>
            <Link
              href="/media"
              onClick={closeMobileMenu}
              className="text-black font-medium hover:opacity-80 transition-opacity uppercase text-lg py-2"
            >
              MEDIA
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="text-black font-medium hover:opacity-80 transition-opacity uppercase text-lg py-2"
            >
              JOIN CHAINFREN
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

export default Nav;
