'use client'
import React from 'react'
import Link from 'next/link'
import ContentfulImage from './ContentfulImage'
import { useGlobalContext } from './Provider'

const SearchOverlay = ({ data, onClose }) => {
    const { searchQuery } = useGlobalContext();

    // Return null if no data or no search query
    if (!data || !searchQuery?.trim()) {
        return null;
    }

    const filteredData = data.filter(item => {
        // Skip invalid items
        if (!item?.fields?.title || !item?.fields?.excerpt) return false;
        
        const searchableFields = [item.fields.title, item.fields.excerpt];
        const searchTerm = searchQuery.toLowerCase().trim();
        
        return searchableFields.some(field => 
            field?.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-[#0A0623] rounded-lg w-full max-w-4xl mt-20 relative">
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Search results */}
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4 dark:text-white">
                        Search Results for "{searchQuery}"
                    </h2>
                    
                    {filteredData.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No lessons found matching your search
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredData.map((item) => {
                                const { title, slug, excerpt, coverImage } = item.fields;
                                // Skip rendering if required fields are missing
                                if (!title || !slug || !excerpt || !coverImage?.fields?.file?.url) {
                                    return null;
                                }
                                
                                return (
                                    <Link 
                                        key={slug} 
                                        href={`/learn/${slug}`}
                                        onClick={onClose}
                                        className="block hover:bg-gray-50 dark:hover:bg-[#0D103099] rounded-lg transition-colors"
                                    >
                                        <div className="p-4 flex gap-4">
                                            <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                                                <ContentfulImage
                                                    alt={`cover image for ${title}`}
                                                    src={coverImage.fields.file.url}
                                                    width={coverImage.fields.file.details.image.width}
                                                    height={96}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg dark:text-white">{title}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{excerpt}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchOverlay 