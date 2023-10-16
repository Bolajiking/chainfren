import React from 'react'

const Subscribe = () => {
  return (
    <div className=' bg-primary h-[110vh] flex justify-center items-center text-white'>
        <div className="rounded-xl w-[1050px] h-[27rem] border-[1px] subscribe-card border-[#0E1435CC] flex flex-col justify-center items-center gap-10">
            <div className=" text-5xl text-center font-bold">Get the latest Chainfren articles <br /> 
                            delivered to your inbox</div>
            <div className="text-2xl text-[#FFFFFF99]">Join our Newsletter</div>
            <div className="w-[750px] flex justify-center items-center pl-8 py-2 pr-2 bg-white h-16 rounded-[2rem] text-black"><input type="text" className=' outline-none  w-full h-[8]' placeholder='Enter your email address' /><button className="bg-primary px-6 py-3 rounded-3xl text-white">Subscribe</button></div>
        </div>
    </div>
  )
}

export default Subscribe