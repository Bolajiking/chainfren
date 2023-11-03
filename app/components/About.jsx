import React from 'react'
import Image from 'next/image'
import pic1 from '../../public/Asset1.png'
import pic2 from '../../public/Asset2.png'
import pic3 from '../../public/Asset3.png'
const About = () => {

  return (
    <div id='about' className=' py-4  relative flex flex-col text-white justify-center items-center test bg-primary w-full 2xl:max-w-[1170px] mx-auto'>
        <div className="flex py-8 pb-72 lg:pb-56 flex-col items-center justify-center md:w-[700px]  lg:w-[950px] px-5 md:px-0 text-center gap-8 lg:gap-0 z-[1]">
            <button className='bg-[#0079D8] px-4 py-1 rounded-2xl'>About Chainfren</button>
            <div className="flex w-full gap-8 justify-center items-center">
            <Image src={pic2} className='hidden lg:block' width={650} height={500} />
            <div className=" text-xl">Chainfren is a dedicated web3 consulting company with a mission to onboard new stakeholders in the decentralized space. 
            Our team of experts is passionate about helping brands and businesses navigate the rapidly evolving world of crypto and blockchain technologies</div>
            <Image src={pic3} className='hidden lg:block' width={900} height={600} />
        </div>
        <Image src={pic1} className='z-[1] absolute bottom-[-50px]' width={250} height={250} />
        </div>


    </div>
  )
}

export default About