'use client'
import React from 'react'
import { useGlobalContext } from './utils/Provider';
const Darkmode = () => {
    const {dark,setDark}=useGlobalContext()
  return (
    <div className=''>
    <button onClick={()=>setDark(!dark)} className="border-[1px] rounded-full  bg-transparent
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
  )
}

export default Darkmode