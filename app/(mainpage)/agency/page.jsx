import Nav from "../../components/Nav"
import Link from "next/link"

export const metadata = {
  title: 'Web3 Creator Agency in Africa — Strategy & Execution',
  description: 'Done-for-you growth work for African creators and brands. Audience ownership, direct revenue, tokenomics, branding, and go-to-market execution from Lagos, Nigeria.',
}

export default function Agency() {
  const services = [
    {
      title: "Growth Strategy and Consultation",
      description: "Owned audience. Direct revenue. Real fan data. We build the roadmap that turns your existing reach into a business you actually own — and we tell you the truth about what works in African markets, not what works in pitch decks.",
      backgroundColor: "#5ACDFF" ,// light blue
      grid:'col-span-3'

    },
    {
      title: "Community Management",
      description: "Communities, not crowds. We build and run the spaces where your audience becomes your stakeholders — onchain identity, real participation, durable loyalty. Built for African time zones, languages, and culture.",
      backgroundColor: "#8DAAFF" ,// light purple
      grid:'col-span-2'
    },
    {
      title: "Tokenomics and Digital Assets Design",
      description: "Build an economy, not a casino. We design token systems, fan rewards, memberships, and digital assets that turn audiences into participants — and stay sustainable past launch week.",
      backgroundColor: "#C8EB6D" ,// light blue
      grid:'col-span-2'
    },
    {
      title: "Branding",
      description: "The internet is loud. African creators get one shot to land. We build visual identity, messaging, and positioning that makes your brand unmistakable — culturally rooted, globally legible, and built to travel.",
      backgroundColor: "#A6E1FA" ,// light green
      grid:'col-span-3'
    },
    {
      title: "BD and Partnerships",
      description: "The right room. The right introduction. We open doors across the African creator economy, the global Web3 ecosystem, and the brands that want to grow with both — because we're already in the rooms you're trying to reach.",
      backgroundColor: "#4D7AFF" ,// medium blue
      grid:'col-span-3'
    },
    {
      title: "GTM & Execution",
      description: "Launches that ship and grow. We run the full operation — product, marketing, community, partnerships, distribution — from kickoff to scale. Done-for-you delivery, with public case studies as the proof.",
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
          We don't sell consulting. We sell ownership. Most agencies will help you "do Web3." We help you keep your audience, your data, and your revenue. Strategy, infrastructure, and full-scale execution from the team building Africa's onchain creator economy from inside it.
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

