import React from 'react'

const Sidebar = () => {
  return (
    <div className=" h-full flex-col flex px-6   pt-8  top-0 left-0 w-full text-[#6B6776] gap-4 font-medium">
        <div className="border-[1px] border-[#262036] rounded-3xl px-4 py-[9px] flex justify-center items-center"><input type="text" placeholder='Search Courses or lessons' className='w-full bg-transparent text-sm outline-none p-0 leading-none text-[#6B6776]' /></div>
        <div className="">Blockchain</div>
        <div className="">NFT</div>
        <div className="">Cryptocurency</div>
        <div className="">DeFi</div>
        <div className="">Ethereum</div>
        <div className="">Polygon</div>
        <div className="">Solana</div>
        <div className="">Base</div>
        <div className="">Arbitrium</div>
    </div>
  )
}

export default Sidebar