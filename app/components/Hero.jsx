import Link from 'next/link';


// Hero component
const Hero = () => {
  return (
    <div className="relative bg-slate-50 flex text-black flex-col items-center justify-center gap-6 overflow-hidden xl:h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-20"
        style={{
          backgroundImage: 'url(/img9.jpg)',
          filter: '',
        }}
      />
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="bg-slate-50/80   w-full h-full flex-col items-center justify-center  py-[35%] sm:py-[15%] gap-8 flex z-40 relative ">
        {/* Background component with animation prop */}
     

        {/* Updated main heading with animations */}
        <div className="md:text-2xlClamp text-xlClamp text-gray-900 px-5 md:px-0 sm:leading-[5.5rem] text-center font-bold mx-auto font-sans">
          <div className="flex md:w-[800px] lg:w-[850px] xl:w-[950px] flex-wrap justify-center gap-3 animate-fadeIn">
            <span className='sm:leading-[3.5rem] leading-[2.8rem] text-[#40ACFF]  animate-slideUp'>Unlocking</span>
          </div>
          <div className=" text-[#40ACFF] animate-fadeIn animation-delay-300">
            Digital Wealth
          </div>
          <div className="flex md:w-[800px] lg:w-[850px] xl:w-[950px] flex-col sm:flex-row justify-center gap-0 sm:gap-3 mt-2 animate-fadeIn animation-delay-500">
            <span className='sm:leading-[3.5rem] leading-[2.8rem] text-[#40ACFF] block'>for</span>
            <div className="flex flex-nowrap justify-center gap-1 sm:gap-3">
              <span className='sm:leading-[3.5rem] leading-[2.8rem] text-[#08153C]'>Creators</span>
              <span className='sm:leading-[3.5rem] font-serif leading-[2.8rem] md:mt-2 mt-1 text-[#08153C]'>&</span>
              <span className='sm:leading-[3.5rem] leading-[2.8rem] text-[#08153C]'>Brands</span>
            </div>
          </div>
        </div>
    
        {/* Updated subtitle with animation */}
        <div className="text-gray-900 text-center text-lg px-4 md:px-0 sm:w-[750px] mt-4 animate-fadeIn animation-delay-700">
          We are a web3 company enabling the power of crypto and digital assets to build products and experiences that drive valuable growth in the digital age
        </div>

        {/* Get Started button with animation */}
        <div className='z-10 animate-fadeIn animation-delay-1000'>
          <Link href={'/contact'}>
          <button className="py-[10px] mt-4 rounded-3xl px-8 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold">
            Get Started
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;


<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="70" height="70" rx="7" fill="url(#paint0_linear_522_4814)" fill-opacity="0.4"/>
<path d="M43.75 21.875H26.25" stroke="#0D3758" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M43.75 48.125H26.25" stroke="#0D3758" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.875 43.75V26.25" stroke="#0D3758" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M48.125 43.75V26.25" stroke="#0D3758" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M48.125 26.25C50.5412 26.25 52.5 24.2912 52.5 21.875C52.5 19.4588 50.5412 17.5 48.125 17.5C45.7088 17.5 43.75 19.4588 43.75 21.875C43.75 24.2912 45.7088 26.25 48.125 26.25Z" fill="#40ABFF" stroke="#40ABFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.875 52.5C24.2912 52.5 26.25 50.5412 26.25 48.125C26.25 45.7088 24.2912 43.75 21.875 43.75C19.4588 43.75 17.5 45.7088 17.5 48.125C17.5 50.5412 19.4588 52.5 21.875 52.5Z" fill="#40ABFF" stroke="#40ABFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.25 17.5H17.5V26.25H26.25V17.5Z" fill="#40ABFF" stroke="#40ABFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M52.5 43.75H43.75V52.5H52.5V43.75Z" fill="#40ABFF" stroke="#40ABFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="0.5" y="0.5" width="69" height="69" rx="6.5" stroke="#40ABFF" stroke-opacity="0.4"/>
<defs>
<linearGradient id="paint0_linear_522_4814" x1="70" y1="0" x2="2.1875" y2="70" gradientUnits="userSpaceOnUse">
<stop stop-color="#40ABFF" stop-opacity="0.6"/>
<stop offset="0.59375" stop-color="#40ABFF" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
