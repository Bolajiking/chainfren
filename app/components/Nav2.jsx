'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import logodark from '../../public/logodark.svg';
import { useGlobalContext } from './utils/Provider';
import Darkmode from './Darkmode';

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

  <Darkmode />


      </div>
    </div>
  );
}

export default Nav2;
