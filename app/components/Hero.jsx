
import Test from './Test'


const Hero = () => {

      
     
  return (
    <div className='relative bg-primary pt-[6vw]   flex text-white flex-col items-center justify-center gap-6 overflow-hidden lg:h-screen '>

      <div className="w-full h-full flex-col items-center justify-center gap-6 flex z-[1]">
            <Test blog={true} />
            <div className="text-[4rem] leading-[5rem] text-center font-bold">Empowering Creators,<br />Brands and Businesses in the<div className='bg-gradient-to-r from-white to-[#40ACFF] bg-clip-text text-transparent'>Web3 Space</div></div>
     <div className="text-[#ffffff43] text-center">We Provide Bespoke Consulting Services To Help You <br /> Embrace The Decentralized Future.</div>
     <div className=""><button className='py-2 mt-4 rounded-3xl px-4 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>Get Started</button></div>
     </div>
 
</div>

  )
}

export default Hero

//bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#083f7ad3] from-10% via-[rgb(8,23,59)] via-50% to-[#09011B] to-80%
