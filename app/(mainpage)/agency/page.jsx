import Nav from "../../components/Nav"
import Link from "next/link"

export default function Agency() {
  const services = [
    {
      title: "Growth Strategy and Consultation",
      description: "We develop comprehensive growth strategies tailored to your web3 objectives. Our expert consultants analyze market trends, identify opportunities, and create actionable roadmaps. Strategic planning sessions help align your vision with onchain realities, ensuring sustainable expansion and measurable results across all growth metrics.",
      backgroundColor: "#5ACDFF" ,// light blue
      grid:'col-span-3'

    },
    {
      title: "Community Management",
      description: "Building and nurturing engaged communities across Discord, Twitter, and Telegram platforms. Our team creates meaningful connections, moderates discussions, and drives active participation. We develop community guidelines, organize events, and maintain consistent communication to foster loyalty and long-term engagement with your brand.",
      backgroundColor: "#8DAAFF" ,// light purple
      grid:'col-span-2'
    },
    {
      title: "Tokenomics and Digital Assets Design",
      description: "Designing sustainable token economics models that balance utility, value, and long-term viability. We create comprehensive token distribution strategies, vesting schedules, and incentive mechanisms. Our digital asset designs integrate seamlessly with your project's goals, ensuring alignment between token functionality and community rewards.",
      backgroundColor: "#C8EB6D" ,// light blue
      grid:'col-span-2'
    },
    {
      title: "Branding",
      description: "Crafting distinctive brand identities that resonate with web3 audiences and traditional markets. We develop visual systems, messaging frameworks, and brand guidelines that communicate your unique value proposition. Our branding approach ensures consistency across all touchpoints while establishing memorable presence in the decentralized ecosystem.",
      backgroundColor: "#A6E1FA" ,// light green
      grid:'col-span-3'
    },
    {
      title: "BD and Partnerships",
      description: "Forging strategic partnerships with key players across DeFi, NFT platforms, and blockchain infrastructure. We identify collaboration opportunities, negotiate terms, and manage relationships that drive mutual growth. Our business development approach connects you with the right partners to expand reach and unlock new market opportunities.",
      backgroundColor: "#4D7AFF" ,// medium blue
      grid:'col-span-3'
    },
    {
      title: "Gtm & Execution",
      description: "Executing comprehensive go-to-market strategies that launch your project successfully into web3 markets. We coordinate launch timelines, manage cross-functional teams, and ensure seamless execution across marketing, technical, and community channels. Our execution framework delivers measurable results from launch day through sustained growth phases.",
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
          Chainfren is your onchain strategy and growth partner we provide the expert knowledge and execution for creators and brands entering web3.
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

