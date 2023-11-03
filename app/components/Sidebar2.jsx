'use client'
import React from 'react'
import Ai from './Ai'
import { useGlobalContext } from './utils/Provider'
import Link from 'next/link'

const Sidebar2 = ({title,slug}) => {

    const {nav,setNav,heading}=useGlobalContext()

  return (
    <>
    <div className=" h-full flex-col mb-16 md:flex px-6  pt-8 hidden  top-0 left-0 w-full dark:text-[#6B6776] text-[#000000b9] dark:bg-primary bg-white
 gap-4 justify-start font-medium">
        <div className="dark:text-white text-black text-lg">{title}</div>
        <div className="flex flex-col gap-4 h-[55%] overflow-auto">
          {heading?.map((h4)=>{
            return <Link href={`./${slug}/#${h4}`} className="">{h4}</Link>
          })}
        </div>





</div>

{
          <div className={`fixed top-20  h-screen ${nav?'left-0':'left-[-100%]'} transition-all duration-300 w-[75%] dark:bg-primary bg-white flex flex-col gap-4 md:hidden px-6 pt-10 dark:text-[#ffffff3c] font-serif text-[#606060]
          `}>
        <div className="dark:text-white text-black text-lg">Introduction</div>
        <div className="flex flex-col gap-4 ">
        {heading?.map((h4)=>{
            return <Link onClick={()=>setNav(false)} href={`./${slug}/#${h4}`} className="">{h4}</Link>
          })}
        </div>
          </div>
          }
</>
  )
}

export default Sidebar2






