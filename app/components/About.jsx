import React from 'react'
import Image from 'next/image'
import pic1 from '../../public/Asset1.png'
import pic2 from '../../public/Asset2.png'
import pic3 from '../../public/Asset3.png'
const About = () => {

  return (
    <div id='about' className=' py-4  relative flex flex-col text-white justify-center items-center test bg-primary w-full 2xl:max-w-[1170px] mx-auto'>
        <div className="flex py-8 pb-0  flex-col items-center justify-center md:w-[700px]  lg:w-[1100px] px-5 md:px-0 text-center gap-8 lg:gap-0 z-[1]">
            <button className='bg-[#0079D8] px-4 py-1 rounded-2xl'>About Chainfren</button>
            <div className="flex w-full gap-32 justify-center items-center">
            <Image src={pic2} className='hidden lg:block' width={150} height={150} />
            <div className=" text-xl">Web3 provides society with a  last chance for building a fair, open and decentralized internet where economic value is widespread and not in the hands of a few. 
At Chainfren, Our mission is to onboard new stakeholders to harness the limitless potential of web3 and blockchain technologies and thrive in the evolving digital age.
Our team of industry experts is passionate about helping forward thinking creators, brands, and businesses who want to lead the charge in this new paradigm</div>
            <Image src={pic3} className='hidden lg:block' width={200} height={200} />
        </div>
        <Image src={pic1} className='z-[1] px-4 md2:px-0' width={700} height={600} />
        </div>


    </div>
  )
}

export default About
