'use client'
import React,{createContext, useContext, useState} from 'react'
const context=createContext('')
const Provider = ({children}) => {
    const [nav,setNav]=useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [ai,setAi]=useState(false)
    const [dark,setDark]=useState(true)
   return (
    <context.Provider value={{nav,setNav,searchQuery,setSearchQuery,ai,setAi,dark,setDark}}>
            {children}
    </context.Provider>

   )
}
 export const useGlobalContext=()=>useContext(context)
 export default Provider