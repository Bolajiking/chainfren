import React from 'react'
import Image from 'next/image'
import img1 from '../../public/S01.png'
import img2 from '../../public/S02.png'
import img3 from '../../public/S03.png'
import img1i from '../../public/s01-.png'
import img2i from '../../public/s02-.png'
import img3i from '../../public/s03-.png'

const Services = () => {
  return (
    <div id='services' className='bg-primary flex justify-center items-center text-white'>
        <div className="xl:w-[1120px] flex justify-center items-center flex-col gap-16 py-20 md:pt-20 md:pb-40">
        <button className='bg-[#0079D8] px-4 py-1 rounded-2xl text-white z-[1]'>Our Services</button>
        <div className="flex flex-wrap flex-col md:flex-row w-full justify-between gap-y-6 px-4 md:px-8">
            <div className="w-full mx-auto group/card sm:w-[90%] md:w-[31%] bg-primary z-[1] h-[22rem] border-[1px] p-4 lg:p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] relative overflow-hidden rounded-[10px] bg-[length:200px_200px] md:bg-[length:300px_300px] bg-no-repeat bg-right-top"> 
            <div className="relative">
            <Image src={img1} width={55} height={55} alt='Crypto & Digital Assets Consulting illustration' />
            <Image src={img1i} width={55} className='absolute top-0 left-0 opacity-0 group-hover/card:opacity-[1] transition-all' height={55} alt='Crypto & Digital Assets Consulting illustration' />
            </div>
          
            <div className="text-xl font-normal">Crypto and Digital Assets Consulting</div>
            <div className="text-[#FFFFFF99] font-light text-sm">We offer expert consulting services to help creators and brands unlock the potential of crypto and digital assets. From tokenization and blockchain development to strategic marketing, we guide you through every step to harness new opportunities for growth in the onchain digital economy.</div>
            </div>
            <div className="w-full mx-auto group/card sm:w-[90%] md:w-[31%] bg-primary z-[1] h-[22rem] border-[1px] p-4 lg:p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] relative overflow-hidden rounded-[10px] bg-[length:200px_200px] md:bg-[length:300px_300px] bg-no-repeat bg-right-top"> 
            <div className="relative">
            <Image src={img2} width={55} height={55} alt='Onchain Digital Media Services illustration' />
            <Image src={img2i} width={55} height={55} className='absolute top-0 left-0 opacity-0 group-hover/card:opacity-[1] transition-all' alt='Onchain Digital Media Services illustration' />
            </div>
           
            <div className="text-xl font-normal">Onchain Media Services</div>
            <div className="text-[#FFFFFF99] font-light text-sm">Our Onchain Digital Media Services empower you to leverage decentralized platforms for content sharing, distribution, and monetization. We help you utilize blockchain technology to expand your reach, protect your content, distribute it on-chain, and open new revenue streams in the evolving digital landscape.</div>
            </div>
            <div className="w-full mx-auto group/card sm:w-[90%] md:w-[31%] bg-primary z-[1] h-[22rem] border-[1px] p-4 lg:p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] relative overflow-hidden rounded-[10px] bg-[length:200px_200px] md:bg-[length:300px_300px] bg-no-repeat bg-right-top"> 
            <div className="relative">
            <Image src={img3} width={55} height={55} alt='Education and Training illustration' />
            <Image src={img3i} width={55} height={55} className='absolute top-0 left-0 opacity-0 group-hover/card:opacity-[1] transition-all' alt='Education and Training illustration' />
            </div>
           
            <div className="text-xl font-normal">Education and Training</div>
            <div className="text-[#FFFFFF99] font-light text-sm">Stay ahead in the digital age with our comprehensive Education and Training resources. Through our learning platform, blog, newsletter, and Creator Bootcamps, we provide valuable insights and hands on support to help you succeed onchain.</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Services
