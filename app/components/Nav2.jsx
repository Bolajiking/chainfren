'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import logodark from '../../public/logodark.svg';
import { useGlobalContext } from './utils/Provider';

const Nav2 = () => {
  const {nav,setNav,dark,setDark}=useGlobalContext()




  return (
    <div className={`dark:bg-[#09011bce]  border-b-[1px] dark:border-[#40ACFF0F] sticky top-0 dark:text-white bg-white transition-[top] duration-[700ms] ease-in-out z-20 backdrop-blur-xl`}>
      <div className='flex justify-between relative  items-center xl:max-w-[1350px] px-4 sm:px-8 py-5 mx-auto'>

      <div onClick={e=>setNav(!nav)} className="md:hidden">
     {nav? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 20L19.9706 3.02944L21.6676 4.72649L4.69706 21.6971L3 20Z" fill={`${dark?'white':'black'}`}/>
        <path d="M22 20L5.02944 3.02944L3.33238 4.72649L20.3029 21.6971L22 20Z" fill={`${dark?'white':'black'}`}/>
        </svg>
        :   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 3.59998H24V5.99998H0V3.59998ZM7.38462 10.8H24V13.2H7.38462V10.8ZM0 18H24V20.4H0V18Z" fill={`${dark?'white':'black'}`}/>
        </svg>}
        </div>




        <div className=' flex  gap-1 items-center'>
         <Link href={'/'}> {dark?<Image src={logo} alt="chainfrens Logo" className='mt-2'  width={120} height={60} />:<Image src={logodark} className='mt-2'  alt="chainfrens Logo"  width={120} height={60} /> }</Link>
         <button className='py-[4px] rounded-md px-6 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>Learn</button>
        </div>

        <div className=''>
            <button onClick={()=>setDark(!dark)} className="border-[1px] rounded-full  bg-[#FBFAFA]
 dark:border-[#ffffff18] border-[#F1F5FA] dark:bg-transparent h-10 w-10 flex items-center justify-center">
           { dark?<svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.81274 3.8125L4.74082 4.74058" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.25 10H2.5625" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.81274 16.1869L4.74082 15.2588" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.1874 16.1869L15.2593 15.2588" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.7498 10H17.4373" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.1874 3.8125L15.2593 4.74058" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 1.25V2.5625" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" stroke="#6B6776" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M10 18.75V17.4375" stroke="#6B6776" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>:<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_504_3598)">
<path d="M11.689 1.83818C9.40981 2.43239 7.7276 4.50475 7.7276 6.97002C7.7276 9.89881 10.1018 12.2731 13.0306 12.2731C15.4959 12.2731 17.5683 10.5908 18.1625 8.31168C18.2747 8.85701 18.3337 9.42178 18.3337 10.0003C18.3337 14.6027 14.6027 18.3337 10.0003 18.3337C5.39795 18.3337 1.66699 14.6027 1.66699 10.0003C1.66699 5.39795 5.39795 1.66699 10.0003 1.66699C10.5789 1.66699 11.1436 1.72595 11.689 1.83818Z" stroke="#6B6776" stroke-width="1.6" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_504_3598">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
}
            </button>
        </div>


      </div>
    </div>
  );
}

export default Nav2;
