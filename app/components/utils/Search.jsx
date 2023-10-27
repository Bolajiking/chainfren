'use client'
import React from 'react'
import { useGlobalContext } from './Provider'
const Search = () => {
    const {setSearchQuery}=useGlobalContext()
  return (
    
    <input type="text" onChange={e=>setSearchQuery(e.target.value)} placeholder='Search Courses or lessons' className='w-full bg-transparent text-sm outline-none p-0 leading-none  text-black
    dark:text-[#6B6776]' />

  )
}

export default Search