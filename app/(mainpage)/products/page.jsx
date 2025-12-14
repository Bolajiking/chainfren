import Nav from "../../components/Nav"
import Link from "next/link"

export default function Products() {
  const products = [
    {
      name: "Chainfren studio",
      description: "A comprehensive creator studio platform that empowers content creators to build, manage, and monetize their digital presence. Streamline your workflow with integrated tools for content creation, audience engagement, and revenue generation. Take full control of your creative business with analytics, scheduling, and direct fan connections all in one powerful workspace.",
      backgroundColor: "#8daaff", // light blue/periwinkle
      buttonText: "GO TO PRODUCT",
      buttonLink: "/products/chainfren-studio"
    },
    {
      name: "TVinBio",
      description: "Transform your social media bio into a powerful video hub that drives traffic and conversions. Showcase your best content, products, and links in an engaging visual format that captures attention instantly. Connect your audience directly to what matters most with customizable video galleries, clickable links, and seamless integration across all major platforms.",
      backgroundColor: "#5acdff", // light teal/aqua blue
      buttonText: "GO TO PRODUCT",
      buttonLink: "/products/tvinbio"
    },
    {
      name: "Comeownity",
      description: "Build and own your community platform with complete control over data, monetization, and member experience. Create exclusive spaces where your audience can connect, engage, and support your work directly. Break free from platform limitations and establish a sustainable community ecosystem that grows with your brand while keeping you in full ownership.",
      backgroundColor: "#CBF0B8", // light green
      buttonText: "COMING SOOOOON",
      buttonLink: "#"
    }
  ];

  return (
    <div className="font-fontspring min-h-screen bg-white">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:pb-12">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl  text-black uppercase mb-6">
          PRODUCTS
        </h1>
        
        {/* Descriptive Text */}
        <div className="mb-12 max-w-7xl">
          <p className="text-lg md:text-3xl  text-black mb-2">
            We build digital products for the creator economy.
          </p>
          <p className="text-lg md:text-3xl  text-black mb-2">
            products that enable creators <span className="font-serif">&</span> brands to own their audience and distribution.
          </p>
          <p className="text-lg md:text-3xl  text-black">
            our products allow you to break away from big tech and build new revenue streams
          </p>
        </div>

        {/* Product Sections */}
        <div className="space-y-2 mb-12">
          {products.map((product, index) => (
            <div
              key={index}
              className="rounded-3xl p-8 md:p-12 border-[2px] border-black relative"
              style={{ backgroundColor: product.backgroundColor }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
                {product.name}
              </h2>
              <p className="text-black text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
                {product.description}
              </p>
              <div className="flex justify-end">
                <Link href={product.buttonLink}>
                  <button className="px-6 py-3 bg-white text-black font-semibold rounded-full border-2 border-black hover:opacity-80 transition-opacity uppercase overflow-hidden relative group">
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                      {product.buttonText}
                    </span>
                    <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                      {product.buttonText}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

