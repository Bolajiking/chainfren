import Nav from "../../components/Nav"
import Link from "next/link"

export default function Media() {
  const services = [
    {
      title: "Premium video and audio content production",
      description: "Lorem ipsum dolor sit amet consectetur. Vitae platea arcu habitant ut suspendisse adipiscing urna. Sem rhoncus adipiscing vitae leo montes. Gravida nec ultricies rutrum donec lacus proin eget. Rutrum a eu ultrices metus amet.",
      backgroundColor: "#5ACDFF", // light blue
      isLarge: true
    },
    {
      title: "Onchain media distribution and strategy",
      description: "Lorem ipsum dolor sit amet consectetur. Vitae platea arcu habitant ut suspendisse adipiscing urna. Sem rhoncus adipiscing vitae leo montes. Gravida nec ultricies rutrum donec lacus proin eget. Rutrum a eu ultrices metus amet.",
      backgroundColor: "#E6D9FF", // light purple
      isLarge: false
    },
    {
      title: "Audience engagement & syndication",
      description: "Lorem ipsum dolor sit amet consectetur. Vitae platea arcu habitant ut suspendisse adipiscing urna. Sem rhoncus adipiscing vitae leo montes. Gravida nec ultricies rutrum donec lacus.",
      backgroundColor: "#CBF0B8", // light green
      isLarge: false
    }
  ];

  return (
    <div className="font-fontspring min-h-screen bg-white">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl  text-black uppercase mb-6">
          MEDIA
        </h1>
        
        {/* Descriptive Paragraphs */}
        <div className="mb-12 max-w-7xl">
          <p className="text-lg md:text-3xl  text-black mb-4">
            Chainfren Media arm is a production engine dedicated to empowering marginalized voices through high quality, professional, and culturally resonant content that is built for decentralized distribution.
          </p>
          <p className="text-lg md:text-3xl  text-black">
            This directly addresses the need for sophisticated media infrastructure and global visibility.
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

