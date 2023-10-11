'use client'
import React from 'react'

const Hero = () => {
    function getBlocks(params) {
        const blockSize=window.innerWidth*0.05
        const blockNo=Math.ceil(window.innerHeight/blockSize)

        return [...Array(blockNo).keys()].map((row,index)=>{

                return <div onMouseEnter={e=>boxColor(e)} className="w-full h-[5vw] border border-l-0 border-r-0 border-[#ffffff08] transition-[background] ease-in-out duration-[1000ms] bg-transparent" key={index}></div>
        })
        function boxColor(e) {
            e.target.style.background='#ffffff08'
            setTimeout(()=>{
                e.target.style.background='transparent'
            },700)

            
        }
    }
  return (
    <div className='h-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#083F7A] via-[rgb(8,25,64)] to-[#09011B] flex text-white flex-col items-center justify-center gap-6'>
            <div className="text-[4rem] leading-[5rem] text-center font-bold">Empowering Creators,<br />Brands and Businesses in the<div className='bg-gradient-to-r from-white to-[#40ACFF] bg-clip-text text-transparent'>Web3 Space</div></div>
     <div className="text-[#ffffff43] text-center">We Provide Bespoke Consulting Services To Help You <br /> Embrace The Decentralized Future.</div>
     <div className=""><button className='py-2 mt-4 rounded-3xl px-4 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>Get Started</button></div>
        <div className='absolute w-full h-full flex'>
     {   [...Array(20).keys()].map((cols,index)=>{
        return <div className="w-[5vw] h-full border border-[#ffffff08] " key={index}>
           {
            getBlocks()
           }
        </div>
     })
     
     }

     </div>
 
</div>

  )
}

export default Hero

//background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 30.12%, rgba(255, 255, 255, 0) 99.39%);
