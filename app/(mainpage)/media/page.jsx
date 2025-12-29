import Nav from "../../components/Nav"
import Link from "next/link"

export default function Media() {
  const services = [
    {
      title: "Premium video and audio content production",
      description: "Cinematic storytelling for the new age. We produce high-fidelity video and audio content that captures cultural nuances and stands out on any platform",
      backgroundColor: "#5ACDFF", // light blue
      isLarge: true
    },
    {
      title: "Onchain media distribution and strategy",
      description: "Future-proof your content. We leverage smart contracts and decentralized protocols to ensure your message is permanent, ownable, and reaches your audience without platform interference.",
      backgroundColor: "#E6D9FF", // light purple
      isLarge: false
    },
    {
      title: "Audience engagement & syndication",
      description: "We build interactive feedback loops and syndication networks that turn content into conversation, ensuring your message resonates far beyond the initial post.",
      backgroundColor: "#CBF0B8", // light green
      isLarge: false
    }
  ];

  return (
    <div className="font-fontspring min-h-screen bg-white">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:pb-12">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl  text-black uppercase mb-6">
          MEDIA
        </h1>
        
        {/* Descriptive Paragraphs */}
        <div className="mb-12 max-w-7xl">
          <p className="text-lg md:text-3xl  text-black">
            In the new digital age, attention is the most valuable currency. We produce premium, culturally resonant content that bridges the gap between complex technology and the people who use it.
          </p>
        </div>

        {/* Services Grid - 1x2 layout (one large on top, two smaller below) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
          {/* Top Block - Large, spans full width on mobile, 2 columns on desktop */}
          <div
            className="md:col-span-2 rounded-3xl p-8 md:p-12 border border-black"
            style={{ backgroundColor: services[0].backgroundColor }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
              {services[0].title}
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed">
              {services[0].description}
            </p>
          </div>

          {/* Bottom-Left Block */}
          <div
            className="rounded-3xl p-8 md:p-12 border border-black"
            style={{ backgroundColor: services[1].backgroundColor }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
              {services[1].title}
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed">
              {services[1].description}
            </p>
          </div>

          {/* Bottom-Right Block */}
          <div
            className="rounded-3xl p-8 md:p-12 border border-black"
            style={{ backgroundColor: services[2].backgroundColor }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
              Audience engagement <span className="font-serif">&</span> syndication
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed">
              {services[2].description}
            </p>
          </div>
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

