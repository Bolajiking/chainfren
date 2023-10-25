import React from 'react'

const Sidebar2 = () => {
  return (
    <div className=" h-full flex-col flex px-6  pt-8  top-0 left-0 w-full text-[#6B6776] gap-4 justify-start font-medium">
        <div className="text-white text-lg">Web 3 for Beginners</div>
        <div className="flex flex-col gap-4">
        <div className="">Introduction</div>
        <div className="">What is blockchain technology</div>
        <div className="">how does blockchain work</div>
        <div className="">Use cases</div>
        <div className="">Advantages and challenges</div>
        <div className="">How blockchain is changing industries</div>
        </div>



        <button className=' self-start flex gap-3 items-center bg-[#40ABFF] py-2 px-6 rounded-3xl mt-16'>
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.1666 11.9821C20.1666 17.0447 16.0625 21.1488 10.9999 21.1488C8.26208 21.1488 1.83325 21.1488 1.83325 21.1488C1.83325 21.1488 1.83325 14.3069 1.83325 11.9821C1.83325 6.91949 5.93731 2.81543 10.9999 2.81543C16.0625 2.81543 20.1666 6.91949 20.1666 11.9821Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.41675 9.23242L14.6667 9.23242" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.41675 12.8994H14.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.41675 16.5654H11.0001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div className="text-white text-sm font-sans">ASK AI</div>
        </button>

</div>
  )
}

export default Sidebar2






