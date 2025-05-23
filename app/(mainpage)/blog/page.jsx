import React from 'react'
import Link from 'next/link';
import { client } from '@/app/contentful/contentful';
import ContentfulImage from '../../components/utils/ContentfulImage';
import Date from '../../components/utils/Date';
import Darkmode from '@/app/components/Darkmode';
import ShareButton from '../../components/utils/ShareButton';
import Search from '@/app/components/utils/Search';
import Searchcomponent from '@/app/components/utils/Searchcomponent';

// Define your base URL (adjust this to your actual site URL)
const BASE_URL = 'https://www.chainfren.com/'; // Replace with your actual website URL

const getBlogEntries = async () => {
    const entries = await client.getEntries({ content_type: "blog" });
    return entries;
  };
const page = async  () => {
    const blogEntries = await getBlogEntries();
    
  return (
    <>
    <div className=' flex justify-center items-center   flex-col relative dark:bg-primary bg-white'>
        <div className="flex items-center justify-center relative md:w-[600px] lg:w-[1025px] ">
        <div className="text-center text-3xl  md:text-5xl mt-8 text-black dark:text-white">Blog</div>
        <div className="hidden md:block absolute right-0 top-12"><Darkmode /></div>
        </div>
        
        {/* Search Section */}
        <div className="w-full max-w-[600px] px-4 mt-8">
            <div className="border-[1px] dark:bg-transparent bg-[#F1F5FA] dark:border-[#262036] border-[#F1F5FA] rounded-3xl px-4 py-[9px]">
                <Search />
            </div>
        </div>

        <div className="max-w-[1120px] mt-12 pb-32 md:pb-0">
            <Searchcomponent data={blogEntries.items} type="blog" />
            
            {!blogEntries.items.length && (
                <div className="text-center text-2xl font-bold text-[#ffffff99] dark:text-[#00000099]">
                    No blog posts found
                </div>
            )}
            
            {blogEntries.items.map((post, index) => {
                const { title, slug, excerpt, coverImage, content, date } = post.fields;
                const fullUrl = `${BASE_URL}/blog/${slug}`; // Construct the full URL for the blog entry
                return (
                    <div className='w-full h-full md:h-[80%]' key={index}> {/* Moved key to the parent div */}
                        <Link href={`./blog/${slug}`}>
                            <div className="overflow-hidden h-[15rem] items-center flex flex-col rounded-[10px] border-[1px] hover:border-[2px] hover:border-[#000] bg-[#F0F0F0] dark:bg-[#0A0623] z-[1] border:text-[#606060] dark:border-[#09011bce] hover:dark:border-[#40CBFF] relative"> {/* Added relative positioning */}
                                {/* ShareButton positioned absolutely in the top right corner */}
                                <div className="absolute top-2 right-2"> {/* Positioning for the ShareButton */}
                                    <ShareButton url={fullUrl} /> {/* Pass the full URL to the ShareButton */}
                                </div>
                                {/* Removed any previous ShareButton from the bottom left */}
                                <div className="p-4 h-[60%] text-black dark:text-white flex flex-col gap-2">
                                    <div className="flex items-center font-serif justify-self-end mt-2 md:mt-10 justify-between">
                                        <div className="dark:text-[#FFFFFF99] text-[#606060] text-sm"><Date datestring={date} /></div>
                                    </div>
                                    <div className="text-lg md:text-2xl lg:text-3xl md:mt-3 md:font-bold font-medium font-serif">{title}</div>
                                    <div className="dark:text-[#FFFFFF99] text-[#606060] text-sm md:text-base lg:mt-3">{`${excerpt}..`}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    </div>

    </>
  )
}

export default page

        {/* {blogEntries.items.map((post)=>{
           
            const {title,slug,image,content} =post.fields
            
           return(
            <div className=" h-24 rounded bg-blue-300" key={slug}>
                <Link href={`/blog/${slug}`}>
                <div className="text-2xl">{title}</div>
                </Link>
               
            </div>
           )
        })} */}
