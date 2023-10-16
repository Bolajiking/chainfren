import Nav from "./components/Nav"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Article from "./components/Article"
import Subscribe from "./components/Subscribe"

export default function Home() {

  return (
    
    <div className=" font-fontspring bg-primary">

     <Hero />
      <About />
      <Services />
      <Article />
      <Subscribe />
    </div>
  )
}
          {/* <div className="bg-slate-600 p-3 w-4/5 rounded-md mx-auto text-white">
            <h2 className="text-2xl">CHAINFREN CHATBOT(GPT-3.5)</h2>
              <Chatcomponent />
          </div> */}