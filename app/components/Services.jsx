import React from 'react'
import Image  from 'next/image'
import img1 from '../../public/S01.png'
import img2 from '../../public/S02.png'
import img3 from '../../public/S03.png'
import img4 from '../../public/S04.png'
import img1i from '../../public/s01-.png'
import img2i from '../../public/s02-.png'
import img3i from '../../public/s03-.png'
import img4i from '../../public/s04-.png'

const Services = () => {
  return (
    <div id='services' className='bg-primary flex justify-center items-center text-white '>
        <div className="xl:w-[1120px] flex justify-center items-center flex-col gap-16 py-20 md:pt-20 md:pb-40 ">
        <button className='bg-[#0079D8] px-4 py-1 rounded-2xl text-white z-[1]'>Our Services</button>
        <div className="flex flex-wrap  flex-col md:flex-row w-full justify-between gap-y-6 px-4 md:px-8">
            <div className="w-full mx-auto group/card sm:w-[90%] md:w-[48%] bg-primary z-[1] h-[17rem] sm2:h-[16rem] border-[1px] p-4 lg:p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] relative overflow-hidden rounded-[10px]  bg-[length:200px_200px] md:bg-[length:300px_300px] bg-no-repeat bg-right-top "> 
            <div className="relative">
            <Image src={img3} width={55} height={55} alt='Community Building and Engagement illustration' />
            <Image src={img3i} width={55} className='absolute top-0 left-0 opacity-0 group-hover/card:opacity-[1] transition-all' height={55} alt='Community Building and Engagement illustration' />
            </div>
          
            <div className=" text-xl font-normal">Onboarding and Strategy</div>
            <div className="text-[#FFFFFF99] font-light text-sm">Customized strategies and ideation that align with business objectives.
Recognizing the unique needs of artists, creators, brands, we offer bespoke solutions for leveraging web3 technology and tools to enhance digital presence and business goals.
</div>
            </div>
            <div className="w-full mx-auto group/card sm:w-[90%] md:w-[48%] bg-primary z-[1] h-[17rem] sm2:h-[16rem] border-[1px] p-4 lg:p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] relative overflow-hidden rounded-[10px]  bg-[length:200px_200px] md:bg-[length:300px_300px] bg-no-repeat bg-right-top"> 
            <div className="relative">
            <Image src={img2} width={55} height={55} alt='Smart Contract and Tokenomics illustration' />
            <Image src={img2i} width={55} height={55} className='absolute top-0 left-0 opacity-0 group-hover/card:opacity-[1] transition-all' alt='Smart Contract and Tokenomics illustration' />
            </div>
           
            <div className=" text-xl font-normal">Blockchain development</div>
            <div className="text-[#FFFFFF99] font-light text-sm">We provide end to end solutions from blockchain protocol development, smart contract creation and auditing, to the integration of blockchain technology into existing business models. Our focus is on creating secure, scalable, and efficient blockchain systems tailored to the unique needs of each client.</div>
            </div>
            <div className="w-full mx-auto group/card sm:w-[90%] md:w-[48%] bg-primary z-[1] h-[17rem] sm2:h-[16rem] border-[1px] p-4 lg:p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] relative overflow-hidden rounded-[10px]  bg-[length:200px_200px] md:bg-[length:300px_300px] bg-no-repeat bg-right-top"> 
            <div className="relative">
            <Image src={img4} width={55} height={55} alt='Learning Platform illustration' />
            <Image src={img4i} width={55} height={55} className='absolute top-0 left-0 opacity-0 group-hover/card:opacity-[1] transition-all' alt='Learning Platform illustration' />
            </div>
           
            <div className=" text-xl font-normal">Web3 Marketing </div>
            <div className="text-[#FFFFFF99] font-light text-sm">By combining AI, blockchain, and data analytics, we offer our clients cutting-edge marketing solutions that are tailored to the unique demands and opportunities of the Web3 world.</div>
            </div>
            <div className="w-full mx-auto group/card sm:w-[90%] md:w-[48%] bg-primary z-[1] h-[17rem] sm2:h-[16rem] border-[1px] p-4 lg:p-8 flex flex-col gap-4 border-[#0E1435CC] bg-[url('/card-bg.png')] relative overflow-hidden rounded-[10px]  bg-[length:200px_200px] md:bg-[length:300px_300px] bg-no-repeat bg-right-top"> 
            <div className="relative">
            <Image src={img1} width={55} height={55} alt='Onboarding and Strategy illustration' />
            <Image src={img1i} width={55} height={55} className='absolute top-0 left-0 opacity-0 group-hover/card:opacity-[1] transition-all' alt='Onboarding and Strategy illustration' />
            </div>
            
            <div className=" text-xl font-normal">Education and training</div>
            <div className="text-[#FFFFFF99] font-light text-sm">Serve as a source of knowledge for all things blockchain and web3 through our learning platform and other channels.
Our goal is to demystify the complexities of web3 technology and create an informed and skilled community that is ready to lead the charge in the digital future.</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Services