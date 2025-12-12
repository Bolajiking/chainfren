'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#fdfdfd] backdrop-blur-sm sticky top-0 z-50">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 pl-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/CFN011.png"
                alt="Chainfren Studio logo"
                width={120}
                height={40}
                className="h-10 w-auto scale-150"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="#features"
                className="text-gray-800 hover:text-[#4357F6] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-gray-800 hover:text-[#4357F6] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="text-gray-800 hover:text-[#4357F6] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Contact
              </Link>
              <Button 
            size="lg" 
            className="bg-[#4357F6] bg-gradient-to-r from-[#4357F6] to-[#665DE9] hover:bg-[#3090DD] text-white"
            onClick={() => window.Calendly?.initPopupWidget({url: 'https://calendly.com/chainfren'})}
          >
            Request Demo
          </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-[#4357F6] focus:outline-none focus:text-[#4357F6]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                href="#features"
                className="text-gray-800 hover:text-[#4357F6] block px-3 py-2 text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-gray-800 hover:text-[#4357F6] block px-3 py-2 text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="text-gray-800 hover:text-[#4357F6] block px-3 py-2 text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
