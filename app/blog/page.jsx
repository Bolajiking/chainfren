import React from 'react'
import { createClient } from "contentful";
import Link from 'next/link';

const client =  createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});
const getBlogEntries = async () => {
    const entries = await client.getEntries({ content_type: "blog" });
    return entries;
  };
const page = async  () => {
    const blogEntries = await getBlogEntries();
    
  return (
    <div className='w-screen flex justify-center items-center gap-12 flex-col relative'>
        <div className="text-center text-5xl">Blog</div>
        <div className=" flex flex-col gap-8 w-[50%]">
        {blogEntries.items.map((post)=>{
           
            const {title,slug,image,content} =post.fields
            
           return(
            <div className=" h-24 rounded bg-blue-300" key={slug}>
                <Link href={`/blog/${slug}`}>
                <div className="text-2xl">{title}</div>
                </Link>
               
            </div>
           )
        })}
        </div>
     
    </div>
  )
}

export default page