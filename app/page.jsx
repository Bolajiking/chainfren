import Link from "next/link"
import Chatcomponent from "./components/Chatcomponent"




export default function Home() {

  return (
    
    <div>
      Home
      <Link href={'/blog'}>blog</Link>
      <div className="fixed bottom-0 right-0 flex w-1/2  p-24 items-center justify-center">
          <div className="bg-slate-600 p-3 w-4/5 rounded-md mx-auto text-white">
            <h2 className="text-2xl">CHAINFREN CHATBOT(GPT-3.5)</h2>
              <Chatcomponent />
          </div>
        </div>
    </div>
  )
}
{/* 

 */}