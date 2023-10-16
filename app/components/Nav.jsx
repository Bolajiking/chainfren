import React from 'react'
import Image from 'next/image'
import logo from '../../public/logo.svg'
const Nav = () => {
  return (
    <div className="bg-[#09011B] text-white sticky top-0 z-20 ">
    <div className='flex justify-between items-center xl:max-w-[1150px] sm:px-8 py-6    mx-auto'>
        <div className=""><Image src={logo} /></div>
        <div className="hidden items-center gap-9 md:flex font-normal">
            <div className="">About</div>
            <div className="">Services</div>
            <div className="">Blog</div>
            <div className="">Contact Us</div>
            <button className='py-2 rounded-3xl px-4 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>Learn Web 3</button>
        </div>
    </div>
    </div>
  )
}

export default Nav