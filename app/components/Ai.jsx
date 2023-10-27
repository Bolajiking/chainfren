'use client'
import React from 'react'
import { useGlobalContext } from './utils/Provider'
const Ai = () => {
    const{ai,setAi} =useGlobalContext()
  return (
    <button onClick={()=>setAi(true)}  className={`${ai?'hidden':'flex'} fixed left-5 bottom-5 md:bottom-10 md:left-10 self-start  gap-3 items-center bg-[#40ABFF] py-2 px-6 rounded-3xl`}>
    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.1666 11.9821C20.1666 17.0447 16.0625 21.1488 10.9999 21.1488C8.26208 21.1488 1.83325 21.1488 1.83325 21.1488C1.83325 21.1488 1.83325 14.3069 1.83325 11.9821C1.83325 6.91949 5.93731 2.81543 10.9999 2.81543C16.0625 2.81543 20.1666 6.91949 20.1666 11.9821Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.41675 9.23242L14.6667 9.23242" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.41675 12.8994H14.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.41675 16.5654H11.0001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<div className="text-white text-sm font-serif">ASK AI</div>
</button>
  )
}

export default Ai