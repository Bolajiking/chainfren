import React from 'react';
import Image from 'next/image';
import Nav4 from '../../../components/Nav';
import Footer from '../../../components/Footer';
import Background from '../../../components/Background';
import { FaDollarSign, FaBroadcastTower, FaShareAlt, FaComments, FaQuoteLeft } from 'react-icons/fa';

export default function ChainfrenStudioPage() {
  return (
    <div className="bg-gradient-to-b from-primary to-[#0D1F2D] text-white min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Background animation={true} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Nav4 />

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
          <Image
            src="/CTV.png"
            alt="Chainfren Logo"
            width={200}
            height={50}
            className="w-auto h-auto mb-8"
          />
          <h1 className="md:text-5xl text-4xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-white to-[#40ACFF] bg-clip-text text-transparent">
              Own your Stream
            </span>
          </h1>
          <p className="text-xl mb-8 text-[#ffffffd9] max-w-2xl text-center">
            Broadcast livestreams and deliver content reliably to your audience on your own terms.
          </p>
          <a href="https://tpy68wych80.typeform.com/to/YdKJZhfs" className="py-3 px-8 rounded-full bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold transition duration-300 ease-in-out hover:opacity-80 shadow-lg hover:shadow-xl">
            Get started
          </a>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-5 backdrop-blur-md">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#40ACFF]">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<FaDollarSign className="text-4xl text-[#40ACFF]" />}
              title="Low Cost"
              description="Affordable streaming solutions for creators of all sizes."
            />
            <FeatureCard
              icon={<FaBroadcastTower className="text-4xl text-[#40ACFF]" />}
              title="Live and On demand Video"
              description="Stream live or upload pre recorded content for your audience."
            />
            <FeatureCard
              icon={<FaShareAlt className="text-4xl text-[#40ACFF]" />}
              title="Live ads and monetization"
              description="Integrate ads and monetize your content seamlessly."
            />
            <FeatureCard
              icon={<FaComments className="text-4xl text-[#40ACFF]" />}
              title="Enhanced interactivity"
              description="Engage with your audience through interactive features and chat rooms."
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1F2D] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#40ACFF20] to-[#40FFCC20] opacity-30"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="text-xl md:text-2xl">
              Our cutting edge media and web3 solution allows creators, media brands, events and show organizers to deliver reliable digital streaming content to their audience, 
              <span className="font-bold text-[#40ACFF] text-2xl md:text-3xl"> no matter where they are.</span>
            </p>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-5 backdrop-blur-md">
          <div className="max-w-4xl mx-auto text-center">
            <FaQuoteLeft className="text-5xl text-[#40ACFF] mb-6 mx-auto" />
            <blockquote className="text-2xl mb-6 text-[#ffffffd9] italic">
              Chainfren Studio has revolutionized the way we deliver content to our audience. It is reliable, cheap, and incredibly easy to use.
            </blockquote>
            <p className="text-lg text-[#40ACFF] font-semibold"> Jane Doe, Content Creator</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-[#0D1F2D] to-primary">
          <h2 className="text-3xl font-bold mb-6 text-[#40ACFF]">Ready to take control of your streaming?</h2>
          <p className="text-xl mb-8 text-[#ffffffd9]">Join our waitlist and explore innovative methods to monetize through live-ads and crypto.</p>
          <a href="https://tpy68wych80.typeform.com/to/YdKJZhfs" className="py-3 px-8 rounded-full bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold transition duration-300 ease-in-out hover:opacity-80 shadow-lg hover:shadow-xl">
            Join Waitlist
          </a>
        </section>

        <Footer />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div 
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:bg-opacity-20"
    >
      <div className="mb-4 bg-[#40ACFF] bg-opacity-20 p-4 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-[#40ACFF]">{title}</h3>
      <p className="text-[#ffffffd9]">{description}</p>
    </div>
  );
}
