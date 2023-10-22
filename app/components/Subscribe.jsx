import React from 'react'
import subpic from '../../public/subscribe-pic.png'
import Image from 'next/image'
const Subscribe = () => {
  return (
    <div className='bg-primary md:py-56 py-32 flex justify-center items-center text-white px-8'>
        <div className="rounded-xl max-w-[1050px] w-full z[0] py-[2rem] lg:py-[5rem] px-4   md:px-8  relative  overflow-hidden border-[1px]  border-[#0E1435CC] flex flex-col justify-center items-center gap-2 md:gap-8">
        <div className="sub-gradient-one z-[0] "></div>
            <div className="sub-gradient-two z-[0]"></div>
            <div className="sub-gradient-three z-[0]"></div>
        <div className="absolute top-0 right-0 max-w-[70%] h-full"><Image src={subpic} height={432} width={500} className=' h-full w-full object-contain' /></div>
            <div className=" lg:text-mdClamp sm:text-3xl md:text-4xl lg:leading-[3.5rem] text-center  text-2xl font-bold z-[1] md:w-[700px] lg:w-[800px] xl:w-[900px]">Get the latest Chainfren articles 
                            delivered to your inbox</div>
           

        
          <div className="text-base sm:text-xl lg:text-2xl text-[#FFFFFF99] z-[1] mb-6">Join our Newsletter</div>
                     <div className="lg:w-[750px] w-full z-[1] flex justify-center items-center text-xs sm:text-base md:text-base pl-4 md:pl-8 py-2 pr-1 md:pr-2 bg-white h-12 md:h-16 rounded-[2rem] text-black"><input type="text" className=' outline-none  w-full h-[8]' placeholder='Enter your email address' /><button className="bg-primary md:px-6 md:py-3 px-5 py-3 text-xs md:text-base rounded-3xl text-white">Subscribe</button></div>
         </div>
    </div>
  )
}

export default Subscribe