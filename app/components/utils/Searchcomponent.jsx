'use client'
import React,{useState,useEffect} from 'react'
import { useGlobalContext } from './Provider'
import Link from 'next/link'
import ContentfulImage from './ContentfulImage'
import Date from './Date'

const Searchcomponent = ({data}) => {
    const {searchQuery, setSearchQuery}=useGlobalContext()
    const [filteredData, setFilteredData] = useState([]);
  
    const handleSearch = (query) => {
        if (!query?.trim()) {
            setFilteredData([]);
            return;
        }

        const searchTerm = query.toLowerCase().trim();
        const filtered = data.filter(item => {
            if (!item?.fields) return false;
            
            const searchableFields = [item?.fields?.title, item?.fields?.excerpt];
            
            return searchableFields.some(field => 
                field?.toLowerCase().includes(searchTerm)
            );
        });
        setFilteredData(filtered);
    };
      
    useEffect(() => {
        handleSearch(searchQuery);
    }, [searchQuery, data]);

    // If there's no search query, show all items
    if (!searchQuery?.trim()) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {data.map((item) => {
                    const { title, slug, excerpt, coverImage } = item?.fields;
                    return (
                        <Link key={slug} href={`/learn/${slug}`}>
                            <div className="p-3 h-[19rem] flex flex-col gap-3 dark:bg-[#0D103099] bg-[#F0F0F0] rounded-md">
                                <div className="rounded-md overflow-hidden flex-1">
                                    <ContentfulImage
                                        alt={`cover image for ${title}`}
                                        src={coverImage.fields.file.url}
                                        width={coverImage.fields.file.details.image.width}
                                        height={200}
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="font-semibold dark:text-white text-lg">{title}</div>
                                    <div className="text-[0.9rem] dark:text-[#ffffffa3]">{excerpt}</div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }

    // If there's a search query but no results
    if (!filteredData.length) {
        return (
            <div className="h-[70vh] flex w-full justify-center items-center text-2xl font-bold text-[#ffffff99] dark:text-[#00000099]">
                No lessons found
            </div>
        );
    }

    // If there are search results
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredData.map((item) => {
                const { title, slug, excerpt, coverImage } = item.fields;
                return (
                    <Link key={slug} href={`/learn/${slug}`}>
                        <div className="p-3 h-[19rem] flex flex-col gap-3 dark:bg-[#0D103099] bg-[#F0F0F0] rounded-md">
                            <div className="rounded-md overflow-hidden flex-1">
                                <ContentfulImage
                                    alt={`cover image for ${title}`}
                                    src={coverImage.fields.file.url}
                                    width={coverImage.fields.file.details.image.width}
                                    height={200}
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="font-semibold dark:text-white text-lg">{title}</div>
                                <div className="text-[0.9rem] dark:text-[#ffffffa3]">{excerpt}</div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default Searchcomponent