import Nav from "../../components/Nav"
import Link from "next/link"

export default function Agency() {
  const services = [
    {
      title: "Growth Strategy and Consultation",
      description: "We build data-backed roadmaps that align your vision with onchain reality, ensuring your entry into Web3 is profitable, sustainable, and scalable.",
      backgroundColor: "#5ACDFF" ,// light blue
      grid:'col-span-3'

    },
    {
      title: "Community Management",
      description: "We manage your Discord and Telegram ecosystems to drive 24/7 engagement, foster deep brand loyalty, and convert passive members into active stakeholders.",
      backgroundColor: "#8DAAFF" ,// light purple
      grid:'col-span-2'
    },
    {
      title: "Tokenomics and Digital Assets Design",
      description: "Build an economy, not just a token. We design sustainable incentive models and digital assets that drive long-term value, prevent inflation, and reward your community for their growth.",
      backgroundColor: "#C8EB6D" ,// light blue
      grid:'col-span-2'
    },
    {
      title: "Branding",
      description: "Stand out in the noise. We craft high-impact visual identities and messaging that bridge the gap between Web2 familiarity and Web3 innovation, making your brand unforgettable.",
      backgroundColor: "#A6E1FA" ,// light green
      grid:'col-span-3'
    },
    {
      title: "BD and Partnerships",
      description: "We open doors to high-value partnerships across DeFi and NFT ecosystems, unlocking new distribution channels and collaborative growth opportunities.",
      backgroundColor: "#4D7AFF" ,// medium blue
      grid:'col-span-3'
    },
    {
      title: "Gtm & Execution",
      description: "Launch with precision. From day one to sustained growth, we handle the heavy lifting of your launch—coordinating marketing, tech, and community to ensure a flawless market entry.",
      backgroundColor: "#CBF0B8" ,// light green
      grid:'col-span-2'
    }
  ];

  return (
    <div className="font-fontspring min-h-screen bg-white">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:pb-12">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-black uppercase mb-12">
          AGENCY
        </h1>
        
        {/* Descriptive Paragraph */}
        <p className="text-lg md:text-3xl  text-black mb-12 md:max-w-7xl">
          Transitioning to Web3 shouldn't be a gamble. We provide the strategic roadmap and technical execution brands and creators need to navigate the onchain economy. From tokenomics to full-scale go-to-market execution, we de-risk your entry into the space and build the infrastructure for your long-term digital growth.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 border-[2px] border-black ${service.grid}`}
              style={{ backgroundColor: service.backgroundColor }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-black mb-4">
                {service.title.includes('&') ? (
                  <>
                    {service.title.split('&')[0]}
                    <span className="font-serif">&</span>
                    {service.title.split('&')[1]}
                  </>
                ) : (
                  service.title
                )}
              </h2>
              <p className="text-black text-sm md:text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center mb-12">
          <Link href="/contact">
            <button className="px-8 py-4 border-2 border-black text-black font-semibold rounded-full hover:opacity-80 transition-opacity uppercase overflow-hidden relative group">
              <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                GET IN TOUCH
              </span>
              <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                GET IN TOUCH
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

