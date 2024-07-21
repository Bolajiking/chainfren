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
              <span className='sm:leading-[3.2rem] leading-[2.5rem]  sm:ml-10'>Enabling</span>
              <span className='sm:leading-[3.2rem] leading-[2.5rem]  '>Digital</span>
              <span className='sm:leading-[3.2rem] leading-[2.5rem] '>Wealth</span>
           <span className='sm:leading-[3.2rem] leading-[2.5rem] '>for</span>
             
         </div>

           <div className="bg-gradient-to-r from-white to-[#40ACFF] bg-clip-text text-transparent">Creators, Brands and Startups</div>
        </div>
    
        {/* Subtitle */}
        <div className="text-[#ffffffc1] text-center text-lg  px-4 md:px-0 sm:w-[500px] ">
          We provide bespoke web3 ideation and consulting services to help you thrive in the digital age
        </div>

        {/* Get Started button */}
        <div className='  z-10'>
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
