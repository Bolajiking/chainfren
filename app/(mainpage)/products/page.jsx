import Nav from "../../components/Nav"
import Link from "next/link"

export default function Products() {
  const products = [
    {
      name: "Chainfren studio",
      description: "Reclaim your audience from the algorithms. Chainfren Studio gives creators & brands everything they need to deliver live or on-demand video content on their own terms while keeping 100% of revenue.",
      backgroundColor: "#8daaff", // light blue/periwinkle
      buttonText: "GO TO PRODUCT",
      buttonLink: "/products/chainfren-studio"
    },
    {
      name: "TVinBio",
      description: "Transform your social media bio into a powerful media distribution hub that captures attention instantly and converts social followers into your true fans.",
      backgroundColor: "#5acdff", // light teal/aqua blue
      buttonText: "GO TO PRODUCT",
      buttonLink: "https://tvin.bio/"
    },
    {
      name: "Comeownity",
      description: "Comeownity is a decentralized live entertainment platform building the future of digital culture and community on the blockchain.",
      backgroundColor: "#CBF0B8", // light green
      buttonText: "GO TO PRODUCT",
      buttonLink: "https://comeownity.com/"
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
          <p className="text-lg md:text-3xl  text-black">
            Stop building on rented land. Our suite of products gives creators and brands the sovereign tools to launch digital assets, manage community economies, and own their distribution. We build the infrastructure that removes the middlemen, putting power and profit back in your hands.
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
                {product.buttonLink.startsWith('http') ? (
                  <a href={product.buttonLink} target="_blank" rel="noopener noreferrer">
                    <button className="px-6 py-3 bg-white text-black font-semibold rounded-full border-2 border-black hover:opacity-80 transition-opacity uppercase overflow-hidden relative group">
                      <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                        {product.buttonText}
                      </span>
                      <span className="inline-block absolute left-1/2 -translate-x-1/2 w-full transition-transform duration-200 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">
                        {product.buttonText}
                      </span>
                    </button>
                  </a>
                ) : (
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
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

