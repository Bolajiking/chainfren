import React from 'react'
import Image from 'next/image'
import pic from '../../public/blogpic.png'
const Article = () => {
  return (
    <div>
        <div className="border-[#0E1435CC]  border-[1px] bg-primary h-screen flex justify-center">
            <div className="xl:w-[1050px] flex justify-center flex-col items-center gap-10">
            <button className='bg-[#0079D8] px-4 py-1 rounded-2xl text-white'>Latest Articles</button>
            <div className="flex flex-wrap w-full gap-8">
                <div className="flex-1 overflow-hidden flex flex-col h-[25rem] rounded-md border-[1px] border-[#0E1435CC]">
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
                <div className="flex-1 overflow-hidden flex flex-col h-[25rem] rounded-md border-[1px] border-[#0E1435CC]">
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
                <div className="flex-1 overflow-hidden flex flex-col h-[25rem] rounded-md border-[1px] border-[#0E1435CC]">
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
            <button className='py-3 rounded-3xl px-6 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>View More</button>

            </div>

        </div>
    </div>
  )
}

export default Article