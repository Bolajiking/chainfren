'use client'
import React,{useState,useEffect} from 'react'
import { useGlobalContext } from './Provider'
const Searchcomponent = ({data}) => {
    const {searchQuery, setSearchQuery}=useGlobalContext()
    const [filteredData, setFilteredData] = useState('');
  
    const handleSearch = (query) => {
        const filtered = data.filter(item =>
          item?.key?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
      };
      
      useEffect(() => {
        
        handleSearch(searchQuery);
       
      }, [searchQuery]);

   if (!filteredData[0]) {
    return(
      <div className="h-[70vh] flex w-full justify-center items-center text-2xl font-bold text-[#ffffff99] dark:text-[#00000099]">COURSE NOT FOUND</div>
    )
   }else{
    return filteredData
   }

}

export default Searchcomponent