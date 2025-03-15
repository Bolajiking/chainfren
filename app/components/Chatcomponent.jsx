'use client'
import React, { useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import Image from 'next/image'
import aigpt from '../../public/aigpt.svg'
import aiuser from '../../public/aiuser.svg'
import { useGlobalContext } from './utils/Provider'

const Chatcomponent = () => {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
    const { ai, setAi } = useGlobalContext()
    const chatContainerRef = useRef(null)

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages])

    // Welcome message
    useEffect(() => {
        if (messages.length === 0) {
            handleSubmit({ preventDefault: () => {}, target: null }, "Hi! I'm ChainFren AI. How can I help you learn about Web3 today?")
        }
    }, [])

    return (
        <div className={`${ai ? 'flex' : 'hidden'} fixed bottom-10 left-[50%] md:left-10 w-[90%] md:translate-x-0 translate-x-[-50%] md:w-[30%] border border-black h-[25rem] rounded-2xl overflow-hidden bg-[#40ABFF] flex-col justify-end shadow-lg`}>
            <div className="flex items-center relative justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                    <Image src={aigpt} width={24} height={24} alt="AI Icon" className="w-6 h-6" />
                    <div className="dark:text-primary font-semibold">ChainFren AI</div>
                </div>
                <button 
                    onClick={() => setAi(false)}
                    className="hover:opacity-80 transition-opacity"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 13.333L13.3137 2.0193L14.4451 3.15067L3.13137 14.4644L2 13.333Z" fill="#091843"/>
                        <path d="M14.6665 13.333L3.3528 2.0193L2.22142 3.15067L13.5351 14.4644L14.6665 13.333Z" fill="#091843"/>
                    </svg>
                </button>
            </div>

            <div className="w-full h-[22.9rem] rounded-t-xl relative bg-white">
                <div 
                    ref={chatContainerRef}
                    className="relative w-full h-full pt-4 pb-16 overflow-y-auto flex flex-col gap-2 scroll-smooth"
                >
                    {messages.map((message) => (
                        <div 
                            key={message.id}
                            className={`${message.role === 'assistant' ? 'bg-[#EFEDEE]' : 'bg-white'} flex gap-2 px-4 items-start py-2 animate-fadeIn`}
                        >
                            <div className="flex-shrink-0">
                                {message.role === 'assistant' ? (
                                    <Image src={aigpt} width={30} height={30} alt="AI" className="mt-1" />
                                ) : (
                                    <Image src={aiuser} width={30} height={30} alt="User" className="mt-1" />
                                )}
                            </div>
                            <div className="flex flex-col flex-grow">
                                {message.content.split("\n").map((text, index) => (
                                    text === "" ? (
                                        <p key={index}>&nbsp;</p>
                                    ) : (
                                        <p key={index} className="text-sm leading-relaxed">
                                            {text}
                                        </p>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-2 px-4 items-center py-2 bg-[#EFEDEE]">
                            <Image src={aigpt} width={30} height={30} alt="AI typing" />
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-4 pb-4 pt-2 fixed bottom-0 left-0 w-full bg-white border-t border-gray-100">
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="flex items-center gap-2 border border-gray-200 bg-[#F4F4F4] rounded-lg px-3 py-2">
                            <input
                                className="w-full outline-none bg-transparent text-sm"
                                placeholder="Ask me about Web3..."
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="flex-shrink-0 transition-opacity disabled:opacity-50"
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.15506 0.316017C1.05044 0.263689 0.933228 0.241774 0.816765 0.252765C0.700301 0.263757 0.589259 0.307213 0.496271 0.378191C0.403284 0.449169 0.332082 0.54482 0.290767 0.654262C0.249451 0.763705 0.23968 0.882546 0.262564 0.997267L2.01631 7.05977C2.04902 7.17275 2.11293 7.2742 2.20072 7.35248C2.2885 7.43076 2.39659 7.48268 2.51256 7.50227L9.62506 8.69352C9.96006 8.75977 9.96006 9.23977 9.62506 9.30602L2.51256 10.4973C2.39659 10.5169 2.2885 10.5688 2.20072 10.6471C2.11293 10.7253 2.04902 10.8268 2.01631 10.9398L0.262564 17.0023C0.23968 17.117 0.249451 17.2358 0.290767 17.3453C0.332082 17.4547 0.403284 17.5504 0.496271 17.6213C0.589259 17.6923 0.700301 17.7358 0.816765 17.7468C0.933228 17.7578 1.05044 17.7358 1.15506 17.6835L17.4051 9.55852C17.5087 9.50655 17.5959 9.42677 17.6568 9.3281C17.7178 9.22942 17.75 9.11574 17.75 8.99977C17.75 8.8838 17.7178 8.77012 17.6568 8.67144C17.5959 8.57276 17.5087 8.49298 17.4051 8.44102L1.15506 0.316017Z" fill={input.trim() ? '#40ABFF' : '#797979'}/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chatcomponent