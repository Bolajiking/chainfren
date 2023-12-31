'use client'
import React,{useContext} from 'react'
import {useGlobalContext} from './utils/Provider'
import Search from './utils/Search'
import Ai from './Ai'


const Sidebar = () => {
  const {nav,setNav}=useGlobalContext()

  return (
    <>
    <div className=" h-full flex-col  px-6 hidden md:flex   pt-8  top-0 left-0 w-full text-[#6B6776]  dark:text-[#F1F5FA] dark:bg-primary bg-white
 gap-4 font-medium">
        <div className="border-[1px] dark:bg-transparent bg-[#F1F5FA] dark:border-[#262036] border-[#F1F5FA]
 rounded-3xl px-4 py-[9px] flex justify-center items-center"><Search /></div>
        <div className="">Blockchain</div>
        <div className="">NFT</div>
        <div className="">Cryptocurency</div>
        <div className="">DeFi</div>
        <div className="">Ethereum</div>
        <div className="">Polygon</div>
        <div className="">Solana</div>
        <div className="">Base</div>
        <div className="">Arbitrium</div>
        <Ai />
    </div>

    {
      <div className={`fixed top-20  h-screen ${nav?'left-0':'left-[-100%]'} transition-all duration-300 w-[75%] dark:bg-primary bg-white flex flex-col gap-4 md:hidden px-6 pt-10 dark:text-[#ffffff3c] text-[#606060]
      font-serif `}>
    <div className="flex flex-col gap-4">
    <div className="">Blockchain</div>
    <div className="">NFT</div>
    <div className="">Cryptocurency</div>
    <div className="">DeFi</div>
    <div className="">Ethereum</div>
    <div className="">Polygon</div>
    <div className="">Solana</div>
    <div className="">Base</div>
    <div className="">Arbitrium</div>
    {/* <Ai /> */}
    </div>
      </div>
      }
      </>
  )
}

export default Sidebar