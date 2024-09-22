import React from 'react'
import Link from 'next/link';
import { client } from '@/app/contentful/contentful';
import ContentfulImage from '../../components/utils/ContentfulImage';
import Date from '../../components/utils/Date';
import Darkmode from '@/app/components/Darkmode';

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
          <div className="max-w-[1120px] mt-12 pb-32 md:pb-0">
        <div className="flex flex-col flex-wrap w-full  gap-4 mx-auto px-8 font-serif">
            {
                blogEntries.items.map((post,index)=>{
                    const {title,slug,excerpt,coverImage,content,date}=post.fields
                    return(
                        <div className='w-full h-full md:h-[80%]'>
                        <Link href={`./blog/${slug}`}>
                        <div key={index} className=" overflow-hidden h-[15rem] items-center  flex flex-col  rounded-[10px] border-[1px] bg-[#F0F0F0] dark:bg-[#0A0623] z-[1] border:text-[#606060] dark:border-[#0E1435CC]">
{/*                         <div className=" h-[40%] object-cover"><ContentfulImage
                            alt={`cover image for ${title}`}
                            src={coverImage.fields.file.url}
                            width={coverImage.fields.file.details.image.width}
                            height={200}    
                        /></div> */}
                        <div className=" p-4 h-[60%] text-black dark:text-white flex  flex-col gap-2 ">
                            <div className="text-2xl mt-3 font-medium font-serif ">{title}</div>
                        <div className="dark:text-[#FFFFFF99] text-[#606060] text-sm ">{excerpt}</div>
                        <div className="flex items-center font-serif justify-self-end mt-6 md:mt-10  justify-between">
                            <div className="dark:text-[#FFFFFF99] text-[#606060]">Read More</div>
                            <div className="dark:text-[#FFFFFF99] text-[#606060]  text-sm"><Date datestring={date} /></div>
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
