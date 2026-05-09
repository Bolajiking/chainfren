import Nav from "../../components/Nav"
import Link from "next/link"

export const metadata = {
  title: 'Sabi — Africa\'s Onchain Broadcasting Network',
  description: 'Music, fashion, sports, entertainment, and culture — curated daily, published weekly, broadcast live from Lagos, Nigeria. Original programs, live events, and editorial curation by Chainfren.',
}

export default function Media() {
  const services = [
    {
      title: "Daily Curation",
      description: "Sabi Daily, Sabi Selects, Friday Sabi, and Sabi Reads. The most important African creators across music, fashion, sports, and entertainment — surfaced, contextualized, and shared every day. The editorial filter for African culture on the open internet.",
      backgroundColor: "#5ACDFF", // light blue
      isLarge: true
    },
    {
      title: "Original Programs",
      description: "Sabi Sessions, Sabi Sound, Sabi Pitch, Sabi Style — and Sabi presents Star Factor, the flagship onchain reality format. Streamed live on Chainfren-owned infrastructure. The shows the African creator economy has been waiting for.",
      backgroundColor: "#E6D9FF", // light purple
      isLarge: false
    },
    {
      title: "Sabi Live",
      description: "The IRL layer. Recurring events in Lagos — concerts, runway shows, live tapings, summits — where the network's audience meets in person and culture happens in the room. By invitation, by ticket, by the people who show up.",
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
          SABI
        </h1>
        
        {/* Descriptive Paragraphs */}
        <div className="mb-12 max-w-7xl">
          <p className="text-lg md:text-3xl  text-black">
            Sabi is Africa's onchain broadcasting network. Music, fashion, sports, entertainment, culture — curated daily, published weekly, broadcast live from Lagos. Built on infrastructure owned by African creators. Powered by Chainfren. <em>Sabi — Pidgin English: to know, but the kind of knowing that comes from doing.</em>
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
              {services[2].title}
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
                SUBSCRIBE TO SABI
              </span>
              <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                SUBSCRIBE TO SABI
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

