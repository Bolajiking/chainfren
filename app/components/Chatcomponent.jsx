'use client'
import React from 'react'
import { useChat} from 'ai/react'
import Image from 'next/image'
import aigpt from '../../public/aigpt.svg'
import aiuser from '../../public/aiuser.svg'
import { useGlobalContext } from './utils/Provider'
const Chatcomponent = () => {
    const {input,handleInputChange,handleSubmit,isLoading,messages}=useChat()
    const{ai,setAi}=useGlobalContext()

  return (
    <div className={`${ai?'flex':'hidden'} fixed bottom-10 left-[50%] md:left-10 w-[90%] md:translate-x-0 translate-x-[-50%] md:w-[30%] border border-black h-[25rem] rounded-2xl overflow-hidden bg-[#40ABFF] flex-col justify-end `}>
  <div className="flex items-center relative justify-center ">
    <div className="dark:text-primary font-semibold self-center">Chainfren AI Chat</div>
    <button onClick={e=>setAi(false)} className=" absolute top-[0.2] right-5">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 13.333L13.3137 2.0193L14.4451 3.15067L3.13137 14.4644L2 13.333Z" fill="#091843"/>
      <path d="M14.6665 13.333L3.3528 2.0193L2.22142 3.15067L13.5351 14.4644L14.6665 13.333Z" fill="#091843"/>
      </svg>
    </button>
  </div>

  <div className="w-full h-[22.9rem] rounded-t-xl relative   bg-white">
  <div className=' relative w-full h-full pt-4  pb-16 overflow-y-auto flex flex-col gap-2 '>
        {
            messages.map((message)=>{
                return(
                    <div className={`${message.role==='assistant'?'bg-[#EFEDEE]':'bg-white'} flex gap-2 px-4 items-start py-1  `} key={message.id}>
                        {
                            message.role==='assistant'
                            ?
                            <div className='text-lg font-semibold mt-2  min-w-[30px] min-h-[30px]'>
                                <Image src={aigpt} width={30} height={30} alt='gpt icon' className='w-full'/>
                            </div>
                            :
                            <div className='text-lg font-semibold  min-w-[30px] min-h-[30px] -mt-1'>
                                <Image src={aiuser} width={30} height={30} alt='user icon' className='w-full' />

                            </div>
                        }
                        <div className="flex flex-col">
                        {
                            message.content.split("\n").map((text,index)=>{
                                if (text==="") {
                                    return <p key={index}>&nbsp;</p>
                                }else{
                                    return <p key={index} className='text-sm'>
                                      {text}
                                    </p>
                                }

                                return
                            })
                        }</div>
                    </div>
                )
            })
        }
        <div className="px-4 pb-4 pt-1 fixed bottom-0  left-0 w-full bg-white">
        <form className='' onSubmit={handleSubmit}>
            <div className="flex border-[1px] bg-[#F4F4F4] border-[#EFEDEE] px-3 py-1 justify-center">
            <input className='w-full  outline-none bg-transparent' placeholder='Ask me anything...' type='text' value={input} onChange={handleInputChange}  />
            <button  className=''>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.15506 0.316017C1.05044 0.263689 0.933228 0.241774 0.816765 0.252765C0.700301 0.263757 0.589259 0.307213 0.496271 0.378191C0.403284 0.449169 0.332082 0.54482 0.290767 0.654262C0.249451 0.763705 0.23968 0.882546 0.262564 0.997267L2.01631 7.05977C2.04902 7.17275 2.11293 7.2742 2.20072 7.35248C2.2885 7.43076 2.39659 7.48268 2.51256 7.50227L9.62506 8.69352C9.96006 8.75977 9.96006 9.23977 9.62506 9.30602L2.51256 10.4973C2.39659 10.5169 2.2885 10.5688 2.20072 10.6471C2.11293 10.7253 2.04902 10.8268 2.01631 10.9398L0.262564 17.0023C0.23968 17.117 0.249451 17.2358 0.290767 17.3453C0.332082 17.4547 0.403284 17.5504 0.496271 17.6213C0.589259 17.6923 0.700301 17.7358 0.816765 17.7468C0.933228 17.7578 1.05044 17.7358 1.15506 17.6835L17.4051 9.55852C17.5087 9.50655 17.5959 9.42677 17.6568 9.3281C17.7178 9.22942 17.75 9.11574 17.75 8.99977C17.75 8.8838 17.7178 8.77012 17.6568 8.67144C17.5959 8.57276 17.5087 8.49298 17.4051 8.44102L1.15506 0.316017Z" fill="#797979"/>
            </svg>

            </button>
            </div>
        </form>
    </div>
    </div>
  </div>
  
</div>

  )
}

export default Chatcomponent