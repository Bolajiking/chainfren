import React from 'react'
import subpic from '../../public/subscribe-pic.png'
import Image from 'next/image'
const Subscribe = () => {
  return (
    <div className='bg-primary py-56 flex justify-center items-center text-white'>
        <div className="rounded-xl max-w-[1050px] w-full z[0] h-[27rem] subscribe-card relative  overflow-hidden border-[1px] bg-no-repeat bg-right-top bg-contain bg-[url('/subscribe-pic.png')] border-[#0E1435CC] flex flex-col justify-center items-center gap-10">
        <div className="absolute top-0 right-0 max-w-[70%] h-full"><Image src={subpic} height={432} width={500} className=' h-full w-full object-contain' /></div>
            <div className=" text-5xl text-center font-bold">Get the latest Chainfren articles <br /> 
                            delivered to your inbox</div>
            <div className="text-2xl text-[#FFFFFF99]">Join our Newsletter</div>
            <div className="w-[750px] z-[1] flex justify-center items-center pl-8 py-2 pr-2 bg-white h-16 rounded-[2rem] text-black"><input type="text" className=' outline-none  w-full h-[8]' placeholder='Enter your email address' /><button className="bg-primary px-6 py-3 rounded-3xl text-white">Subscribe</button></div>
        </div>
    </div>
  )
}

export default Subscribe