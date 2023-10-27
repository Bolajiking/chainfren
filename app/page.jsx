import Nav from "./components/Nav"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Article from "./components/Article"
import Subscribe from "./components/Subscribe"
import Footer from "./components/Footer"
export default function Home() {

  return (
    
    <div className=" font-fontspring bg-primary">
      <Nav />
     <Hero />
    <About />
    <Services />
    <Article />
    <Subscribe />
    <Footer />
    </div>
  )
}
        