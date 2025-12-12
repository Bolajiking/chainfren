import React from 'react'
import Image from 'next/image'
import pic1 from '../../public/Asset1.png'
import pic2 from '../../public/Asset2.png'
import pic3 from '../../public/Asset3.png'

const About = () => {
  return (
    <div id='about' className='py-4 relative flex flex-col text-white justify-center items-center test bg-black w-full z-20'>
      <div className=" bg-black flex py-8 pb-0 flex-col items-center justify-center w-full px-5 md:px-0 text-center gap-8 lg:gap-0 z-40">
        {/* Removed the "About Us" button from all views */}
        <div className="flex lg:w-[1100px] mx-auto gap-y-36 justify-center items-center">
          <Image src={pic2} className='hidden lg:block' width={150} height={150} alt="Side image 1" />
          <div className="text-2xl text-left my-2 ">
            <div className="text-4xl font-bold mb-6">The current model of the internet is broken.</div>
            
            <div className="mb-4">
              Creators, brands and their audiences drive the value and attention but continue to be exploited by big tech.
            </div>

            <div>
              Web3 provides society with a last chance for building a fair, open and decentralized internet where economic value is widespread and not in the hands of a few.
            </div>
            
            <div className="flex justify-center items-center w-full my-8">
              <Image src={pic1} width={700} height={600} alt="Web3 Icon" />
            </div>

            <div className="mt-3 pt-3">
              At Chainfren, Our mission is to onboard new stakeholders to take part in this global redistribution of wealth and lead the charge in this new paradigm.
            </div>

            <div className="mt-3 pt-3">
              We equip forward thinking creators and brands with the tools and resources to thrive in the onchain economy.
            </div>
          </div>
          <Image src={pic3} className='hidden lg:block' width={200} height={200} alt="Side image 2" />
        </div>
      </div>
    </div>
  )
}

export default About
