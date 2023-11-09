'use client'
import Nav from "./components/Nav"
 import Link from "next/link"
 import Image from "next/image"
 import errorimage from '../public/error.png'
export default function Error({
  error,
  reset,
}) {
  return (
    <>
    <Nav />
    <div className="h-screen flex flex-col justify-center items-center relative text-white font-serif">
        <div className="md:-mt-48 -mt-32 lg::-mt-64 flex flex-col justify-start items-center gap-8">
        <div className="text-[11rem] sm:text-[13rem] md:text-[15rem] lg:text-[18rem] font-bold leading-0">404</div>
        <div className="flex flex-col -mt-16 md:-mt-32 gap-8">
        <div>Oops, something went wrong.</div>
      <div className="flex gap-4 items-center">
      <button className="py-2 w-full rounded-3xl px-6 bg-gradient-to-r transition-all  from-[#40CBFF] to-[#40FFCC] text-primary font-semibold" onClick={() => reset()}>Try again</button>
      <Link href={'/'}><button className="py-2 w-full rounded-3xl px-6 bg-gradient-to-r transition-all  from-[#40CBFF] to-[#40FFCC] text-primary font-semibold">Home</button></Link>
      </div>
        </div>
      
      </div>
    </div>
    </>
  )
}