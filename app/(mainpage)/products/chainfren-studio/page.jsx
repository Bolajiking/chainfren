import React from 'react';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import Background from '../../../components/Background'; // Importing Background component
import { FaBroadcastTower, FaShareAlt, FaDollarSign } from 'react-icons/fa'; // Importing icons from react-icons

function ChainfrenStudioPage() {
  return (
    <div className="relative bg-primary text-[#FFFFFF99] min-h-screen">
      {/* Background */}
      <Background animation={true} /> {/* Added Background component with animation prop */}

      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <div className="px-5 md:px-0 py-20 bg-primary font-sans relative z-10">
        <div className="text-center font-bold mx-auto max-w-4xl">
          {/* Headline */}
          <h1 className="md:text-5xl text-4xl mb-4 text-[#40ACFF] font-extrabold">
            Chainfren TV: Empowering Creators to Own Their Streams
          </h1>
          
          {/* Subheadline */}
          <p className="md:text-2xl text-xl mb-8 text-gray-300">
            A comprehensive video platform built on the Livepeer network for seamless streaming and monetization.
          </p>
          
          {/* Call-to-Action Button */}
          <button className="mb-12 px-6 py-3 bg-[#FF5722] text-white text-lg font-semibold rounded hover:bg-[#e64a19] transition duration-300">
            Get First Access
          </button>

          {/* What it is Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">What it is</h2>
            <p className="text-xl text-gray-300">
              A comprehensive video platform built for creators, enabling seamless content creation, distribution, and monetization in a decentralized ecosystem.
            </p>
          </section>

          {/* Key Functionalities Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-8 text-white">Key Functionalities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Functionality 1 */}
              <div className="flex flex-col items-center text-center">
                <FaBroadcastTower className="text-5xl text-[#40ACFF] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Livestreaming & On-Demand</h3>
                <p className="text-gray-300">
                  Seamlessly broadcast live or share on-demand videos built on the robust Livepeer network.
                </p>
              </div>
              {/* Functionality 2 */}
              <div className="flex flex-col items-center text-center">
                <FaShareAlt className="text-5xl text-[#40ACFF] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Onchain Sharing</h3>
                <p className="text-gray-300">
                  Distribute your content securely on the blockchain, ensuring transparency and tamper-proof delivery.
                </p>
              </div>
              {/* Functionality 3 */}
              <div className="flex flex-col items-center text-center">
                <FaDollarSign className="text-5xl text-[#40ACFF] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Monetization Options</h3>
                <p className="text-gray-300">
                  Monetize your streams with live in-ads and exclusive token-gating features for premium content.
                </p>
              </div>
            </div>
          </section>

          {/* Own Your Own Stream Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-[#40ACFF]">OWN YOUR OWN STREAM</h2>
          </section>

          {/* Empowering Decentralized Growth Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Empowering Decentralized Growth</h2>
            <p className="text-xl text-gray-300">
              Chainfren Studio empowers creators to build decentralized products that foster growth and community engagement. By leveraging blockchain technology, creators can maintain ownership, ensure transparency, and unlock new revenue streams, all while expanding their reach in the digital landscape.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ChainfrenStudioPage;