import React from 'react'
import Link from 'next/link';
import pic from '../../public/blogpic.png'
import Image from 'next/image';
import { client } from '../contentful/contentful';
import ContentfulImage from '../components/utils/ContentfulImage';
import Date from '../components/utils/Date';
const getBlogEntries = async () => {
    const entries = await client.getEntries({ content_type: "post" });
    return entries;
  };
const page = async  () => {
    const blogEntries = await getBlogEntries();
    
  return (
    <div className=' flex justify-center items-center gap-12  flex-col relative'>
        <div className="text-center text-5xl text-white">Blog</div>
          <div className="max-w-[1120px]">
        <div className="flex flex-wrap w-full gap-4 mx-auto px-8">
            {
                blogEntries.items.map((post,index)=>{
                    const {title,slug,excerpt,coverimage,content,date}=post.fields
                    return(
                        <div className='w-[32%]'>
                        <Link href={`./blog/${slug}`}>
                        <div key={index} className=" overflow-hidden flex flex-col h-[25rem] rounded-md border-[1px] bg-primary z-[1]  border-[#0E1435CC]">
                        <div className="flex-1 "><ContentfulImage
                        alt={`cover image for ${title}`}
                        src={coverimage.fields.file.url}
                        width={coverimage.fields.file.details.image.width}
                        height={coverimage.fields.file.details.image.height}    
                        /></div>
                        <div className="flex-1 p-6 text-white flex flex-col gap-2 ">
                            <div className="text-lg font-medium">{title}</div>
                        <div className="text-[#FFFFFF99] text-sm font-HK">{excerpt}</div>
                        <div className="flex items-center justify-between mt-4 ">
                            <div className="">Read More</div>
                            <div className="text-[#FFFFFF99] text-sm"><Date datestring={date} /></div>
                        </div>
                        </div>
                        
                    </div>
                    </Link>
                    </div>
                    )
                })
            }


            </div>
            </div>
    </div>
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