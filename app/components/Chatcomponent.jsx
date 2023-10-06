'use client'
import React from 'react'
import { useChat} from 'ai/react'
const Chatcomponent = () => {
    const {input,handleInputChange,handleSubmit,isLoading,messages}=useChat()
    console.log(messages,input);
  return (
    <div>
        {
            messages.map((message)=>{
                return(
                    <div className="" key={message.id}>
                        {
                            message.role==='assistant'
                            ?
                            <h3 className='text-lg font-semibold mt-2'>GPT-4</h3>
                            :
                            <h3 className='text-lg font-semibold mt-2'>user</h3>
                        }
                        {
                            message.content.split("\n").map((text,index)=>{
                                if (text==="") {
                                    return <p key={index}>&nbsp;</p>
                                }else{
                                    return <p key={index}>{text}</p>
                                }
                                return
                            })
                        }
                    </div>
                )
            })
        }
        <div className="">
           

        </div>
        <form className='mt-12' onSubmit={handleSubmit}>
            <p>User message</p>
            <textarea className='mt-2 w-full bg-slate-500 p-2' id="" cols="30" rows="10" value={input} onChange={handleInputChange}></textarea>
            <button className='px-3 py-1 bg-green-500 rounded-md'>Send</button>
        </form>
    </div>
  )
}

export default Chatcomponent