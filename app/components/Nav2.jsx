'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.svg';

const Nav2 = () => {

  const [navOpen,setNavOpen]=useState(false)



  return (
    <div className={`bg-[#09011bce]  border-b-[1px] border-[#40ACFF0F] sticky top-0 text-white transition-[top] duration-[700ms] ease-in-out z-20 backdrop-blur-xl`}>
      <div className='flex justify-between relative  items-center xl:max-w-[1350px] px-4 sm:px-8 py-5 mx-auto'>

      <div onClick={e=>setNavOpen(!navOpen)} className="md:hidden">
     {navOpen? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 20L19.9706 3.02944L21.6676 4.72649L4.69706 21.6971L3 20Z" fill="white"/>
<path d="M22 20L5.02944 3.02944L3.33238 4.72649L20.3029 21.6971L22 20Z" fill="white"/>
</svg>
:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 3.59998H24V5.99998H0V3.59998ZM7.38462 10.8H24V13.2H7.38462V10.8ZM0 18H24V20.4H0V18Z" fill="white"/>
</svg>}
        </div>




        <div className=' flex  gap-1 items-center'>
         <Link href={'/'}> <Image src={logo} alt="chainfrens Logo" width={120} height={60} /> </Link>
         <button className='py-[4px] rounded-md px-6 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>Learn</button>
        </div>

        <div className=''>
            <div className="border-[1px] rounded-full border-[#ffffff18] h-10 w-10 flex items-center justify-center">
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.81274 3.8125L4.74082 4.74058" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.25 10H2.5625" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.81274 16.1869L4.74082 15.2588" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.1874 16.1869L15.2593 15.2588" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.7498 10H17.4373" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.1874 3.8125L15.2593 4.74058" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 1.25V2.5625" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" stroke="#6B6776" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M10 18.75V17.4375" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
        </div>

        {
          <div className={`fixed top-20  h-screen ${ navOpen?'left-0':'left-[-100%]'} transition-all duration-300 w-[75%] bg-primary flex flex-col gap-4 md:hidden px-6 pt-10 text-[#ffffff3c] font-serif `}>
        <div className="text-white text-lg">Web 3 for Beginners</div>
        <div className="flex flex-col gap-4">
        <div className="">Introduction</div>
        <div className="">What is blockchain technology</div>
        <div className="">how does blockchain work</div>
        <div className="">Use cases</div>
        <div className="">Advantages and challenges</div>
        <div className="">How blockchain is changing industries</div>
        </div>
          </div>
          }
      </div>
    </div>
  );
}

export default Nav2;
