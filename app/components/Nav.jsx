'use client'
import React, { useEffect,useState } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.svg'
const Nav = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(()=>{
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible = prevScrollPos > currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[prevScrollPos])
  return (
    <div className={`bg-[#09011bce]  ${visible?'top-0':'top-[-100%]'} text-white sticky transition-[top] duration-[700ms] ease-in-out  z-20 backdrop-blur-xl `}>
    <div className='flex justify-between items-center xl:max-w-[1150px] sm:px-8 py-4    mx-auto'>
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