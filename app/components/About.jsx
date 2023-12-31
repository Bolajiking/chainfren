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
            <div className=" text-xl">Chainfren is a dedicated web3 ideation and consulting company with a mission to onboard new stakeholders in the decentralized space. 
At Chainfren, Our mission is to empower creators, brands, and businesses to harness the limitless potential of blockchain technology and thrive in the web3 ecosystem.
Our team of industry leading experts is passionate about helping brands and businesses navigate the rapidly evolving world of web3 and blockchain technologies</div>
            <Image src={pic3} className='hidden lg:block' width={200} height={200} />
        </div>
        <Image src={pic1} className='z-[1] px-4 md2:px-0' width={700} height={600} />
        </div>


    </div>
  )
}

export default About