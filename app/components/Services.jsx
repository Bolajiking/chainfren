import React from 'react'
import Image  from 'next/image'
import img1 from '../../public/S01.png'
import img2 from '../../public/S02.png'
import img3 from '../../public/S03.png'
import img4 from '../../public/S04.png'
const Services = () => {
  return (
    <div className='bg-primary flex justify-center items-center text-white h-[150vh]'>
        <div className="xl:w-[1120px] flex justify-center items-center flex-col gap-16">
        <button className='bg-[#0079D8] px-4 py-1 rounded-2xl text-white z-[1]'>Our Services</button>
        <div className="flex flex-wrap w-full justify-between gap-y-10 px-8">
            <div className=" w-[48%] bg-primary z-[1] h-[16rem] border-[1px] p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] card relative overflow-hidden rounded-md onex bg-[length:300px_300px] bg-no-repeat bg-right-top "> 
            <Image src={img1} width={55} height={55} alt='Onboarding and Strategy illustration' />
            <div className=" text-xl font-medium">Onboarding and Strategy</div>
            <div className="text-[#FFFFFF99] font-light text-sm">We navigate the path of web3 adoption alongside you, crafting customized strategies that align with your business objectives.</div>
            </div>
            <div className=" w-[48%] bg-primary z-[1] h-[16rem] border-[1px] p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] card relative overflow-hidden rounded-md twox bg-[length:300px_300px] bg-no-repeat bg-right-top"> 
            <Image src={img2} width={55} height={55} alt='Smart Contract and Tokenomics illustration' />
            <div className=" text-xl font-medium">Smart Contract and Tokenomics</div>
            <div className="text-[#FFFFFF99] font-light text-sm">Our experts help you create secure smart contracts and design robust tokenomics models for your projects.</div>
            </div>
            <div className=" w-[48%] bg-primary z-[1] h-[16rem] border-[1px] p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] card relative overflow-hidden rounded-md threex bg-[length:300px_300px] bg-no-repeat bg-right-top"> 
            <Image src={img3} width={55} height={55} alt='Community Building and Engagement illustration' />
            <div className=" text-xl font-medium">Community Building and Engagement</div>
            <div className="text-[#FFFFFF99] font-light text-sm">We help you build and nurture a thriving community around your project, leveraging the power of decentralized networks.</div>
            </div>
            <div className=" w-[48%] bg-primary z-[1] h-[16rem] border-[1px] p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] card relative overflow-hidden rounded-md fourx bg-[length:300px_300px] bg-no-repeat bg-right-top"> 
            <Image src={img4} width={55} height={55} alt='Learning Platform illustration' />
            <div className=" text-xl font-medium">Learning Platform</div>
            <div className="text-[#FFFFFF99] font-light text-sm">We provide a comprehensive learning platform, equipping you with the knowledge and skills needed to thrive in the web3 ecosystem.</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Services