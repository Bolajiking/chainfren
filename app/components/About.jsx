import React from 'react'
import Image from 'next/image'
import pic1 from '../../public/img2-1.png'
import pic2 from '../../public/img2.png'
const About = () => {

  return (
    <div className=' py-4  relative flex flex-col text-white justify-center items-center test bg-primary w-full 2xl:max-w-[1170px] mx-auto'>
        <div className="flex py-16 flex-col items-center justify-center md:w-[550px] px-5 md:px-0 text-center gap-12 z-[1]">
            <button className='bg-[#0079D8] px-4 py-1 rounded-2xl'>About Chainfren</button>
            <div className=" text-xl">Chainfren is a dedicated web3 consulting company with a mission to onboard new stakeholders in the decentralized space. 
Our team of experts is passionate about helping brands and businesses navigate the rapidly evolving world of crypto and blockchain technologies</div>
        </div>
        <div className="lg:absolute right-0 bottom-0 z-[1] w-full lg:w-auto flex lg:block justify-end "><Image src={pic1} width={300} height={300} /></div>
        <div className="hidden md:absolute md:block left-0 bottom-0 z-[1]"><Image src={pic2} width={350} height={350} /></div>
    </div>
  )
}

export default About