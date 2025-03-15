'use client'
import React, { useState } from 'react'
import { useGlobalContext } from './Provider'
import SearchOverlay from './SearchOverlay'

const Search = ({ data }) => {
    const {searchQuery, setSearchQuery} = useGlobalContext()
    const [showOverlay, setShowOverlay] = useState(false)

    // Ensure data is valid
    const validData = Array.isArray(data) ? data : [];

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchValue = formData.get('search') || '';
        setSearchQuery(searchValue);
        setShowOverlay(true);
    }

    const handleChange = (e) => {
        const value = e.target.value || '';
        setSearchQuery(value);
        setShowOverlay(true);
    }

    const handleClose = () => {
        setShowOverlay(false);
        setSearchQuery('');
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input 
                        type="text" 
                        name="search"
                        value={searchQuery || ''}
                        onChange={handleChange}
                        placeholder='Search lessons' 
                        className='w-full bg-transparent text-sm outline-none p-0 leading-none text-black dark:text-[#6B6776]' 
                    />
                    <button 
                        type="submit"
                        className="text-black dark:text-[#6B6776] hover:opacity-80"
                    >
                        Search
                    </button>
                </div>
            </form>

            {showOverlay && (
                <SearchOverlay 
                    data={validData} 
                    onClose={handleClose}
                />
            )}
        </>
    )
}

export default Search