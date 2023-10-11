'use client'
import React from 'react'

const About = () => {
    function test(e) {
        e.target.style.backgroundColor='red'
        setTimeout(()=>{
            e.target.style.background='transparent'
        },700)
    }
  return (
    <div className='h-screen flex justify-center items-center '>
        <div onMouseOver={e=>test(e)} className="w-32 h-32 border  border-black  transition-all ease-in-out duration-[1000ms]"></div>
    </div>
  )
}

export default About