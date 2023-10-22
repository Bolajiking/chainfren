import Link from 'next/link';
import Background from './Background';

// Hero component
const Hero = () => {
  return (
    <div className="relative bg-primary flex text-white flex-col items-center justify-center gap-6 overflow-hidden xl:h-screen">

      <div className="w-full h-full flex-col items-center justify-center -mt-10  py-[35%] sm:py-[15%] gap-6 flex z-[1]">
        {/* Background component with animation prop */}
        <Background animation={true} />

        {/* Main heading */}
        <div className=" md:text-xlClamp text-mdClamp px-5 md:px-0   sm:leading-[5rem] text-center font-bold mx-auto    font-sans">
         <div className="flex md:w-[750px] lg:w-[800px] xl:w-[900px] flex-wrap justify-center gap-3">
              <span className='sm:leading-[3.2rem] leading-[2.5rem]  sm:ml-10'>Empowering</span>
              <span className='sm:leading-[3.2rem] leading-[2.5rem]  lg:mr-10 '>Creators,</span>
              <span className='sm:leading-[3.2rem] leading-[2.5rem] '>Brands</span>
              <span className='sm:leading-[3.2rem] leading-[2.5rem] '>and</span>
              <span className='sm:leading-[3.2rem] leading-[2.5rem] '>Businesses</span>
              <span className='sm:leading-[3.2rem] leading-[2.5rem] '>in the</span>
         </div>

          <div className="bg-gradient-to-r from-white to-[#40ACFF] bg-clip-text text-transparent">
            Web3 Space
          </div>
        </div>
    
        {/* Subtitle */}
        <div className="text-[#ffffffc1] text-center text-lg  px-4 md:px-0 sm:w-[500px] ">
          We Provide Bespoke Consulting Services To Help You  Embrace The Decentralized Future.
        </div>

        {/* Get Started button */}
        <div>
          <button className="py-[10px] mt-4 rounded-3xl px-8 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
