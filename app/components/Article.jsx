import React from 'react'
import Image from 'next/image'
import pic from '../../public/blogpic.png'
import Background from './Background'
const Article = () => {
  return (
    <div className=''>
        
        <div className="border-[#0E1435CC] relative  border-[1px] py-7 bg-[#0A0623]  flex justify-center overflow-hidden">
        <Background animation={false} />
            <div className="xl:w-[1120px] flex justify-center flex-col items-center gap-10 py-8">
            <button className='bg-[#0079D8] px-4 py-1 rounded-2xl text-white'>Latest Articles</button>
            <div className="flex flex-wrap w-full gap-8 px-8">
                <div className="flex-1 max-w-[22rem] overflow-hidden flex flex-col  rounded-md border-[1px] bg-primary z-[1]  border-[#0E1435CC]">
                    <div className="flex-1 "><Image src={pic}  /></div>
                    <div className="flex-1 p-6 text-white flex flex-col gap-2 ">
                        <div className="text-lg font-medium">Demystifying Blockchain: A Beginner's Guide</div>
                    <div className="text-[#FFFFFF99] text-sm font-HK">Decentralized Finance (DeFi) is reshaping the financial landscape, offering an alternative to traditional banking and financial services. In...</div>
                    <div className="flex items-center justify-between mt-4 ">
                        <div className="">Read More</div>
                        <div className="text-[#FFFFFF99] text-sm">20-09-2023</div>
                    </div>
                    </div>
                    
                </div>
                <div className="hidden max-w-[22rem] flex-1 overflow-hidden sm:flex flex-col  rounded-md border-[1px] bg-primary z-[1] border-[#0E1435CC]">
                    <div className="flex-1 "><Image src={pic}  /></div>
                    <div className="flex-1 p-6 text-white flex flex-col gap-2 ">
                        <div className="text-lg font-medium">Demystifying Blockchain: A Beginner's Guide</div>
                    <div className="text-[#FFFFFF99] text-sm">Decentralized Finance (DeFi) is reshaping the financial landscape, offering an alternative to traditional banking and financial services. In...</div>
                    <div className="flex items-center justify-between mt-4 ">
                        <div className="">Read More</div>
                        <div className="text-[#FFFFFF99] text-sm">20-09-2023</div>
                    </div>
                    </div>
                    
                </div>
                <div className=" hidden flex-1 max-w-[22rem] overflow-hidden lg:flex flex-col  rounded-md border-[1px] bg-primary z-[1] border-[#0E1435CC]">
                    <div className="flex-1 "><Image src={pic}  /></div>
                    <div className="flex-1 p-6 text-white flex flex-col gap-2 ">
                        <div className="text-lg font-medium">Demystifying Blockchain: A Beginner's Guide</div>
                    <div className="text-[#FFFFFF99] text-sm">Decentralized Finance (DeFi) is reshaping the financial landscape, offering an alternative to traditional banking and financial services. In...</div>
                    <div className="flex items-center justify-between mt-4 ">
                        <div className="">Read More</div>
                        <div className="text-[#FFFFFF99] text-sm">20-09-2023</div>
                    </div>
                    </div>
                    
                </div>
            </div>
            <button className='py-[10px] rounded-3xl px-7 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>View More</button>

            </div>

        </div>
    </div>
  )
}

export default Article