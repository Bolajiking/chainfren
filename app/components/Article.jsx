import React from 'react'
import Image from 'next/image'
import pic from '../../public/blogpic.png'
import Background from './Background'
import { client } from '../contentful/contentful'
import Link from 'next/link'
import ContentfulImage from './utils/ContentfulImage'
import Date from './utils/Date'
const getBlogEntries = async () => {
    const entries = await client.getEntries({ content_type: "blog" });
    return entries;
  };
const Article =async () => {
    const blogEntriesfull = await getBlogEntries();
    const blogEntries=blogEntriesfull.items.slice(0,3)
  return (
    <div className=''>
        
        <div className="border-[#0E1435CC] relative  border-[1px] py-7 bg-[#0A0623]  flex justify-center overflow-hidden">
        <div className="hidden lg:block"><Background animation={false} /></div>
            <div className="xl:w-[1120px] flex justify-center flex-col items-center gap-10 py-8">
            <button className='bg-[#0079D8] px-4 py-1 rounded-2xl text-white'>Latest Articles</button>
            <div className="flex gap-4 md:gap:0 flex-col sm2:flex-row  sm2:flex-wrap w-full px-4  lg:justify-between">
            {
                blogEntries.map((post,index)=>{
                    const {title,slug,excerpt,coverImage,content,date}=post.fields
                    return(
                        <div className='w-full sm:w-[48%] lg:w-[32%] lg:h-full z-10'>
                        <Link href={`./blog/${slug}`}>
                        <div key={index} className=" overflow-hidden h-[25rem]   flex flex-col  rounded-[10px] border-[1px] bg-[#0A0623] z-[1]  border-[#0E1435CC]">
                        <div className=" h-[40%] object-cover"><ContentfulImage
                        alt={`cover image for ${title}`}
                        src={coverImage.fields.file.url}
                        width={coverImage.fields.file.details.image.width}
                        height={200}    
                        /></div>
                        <div className=" p-4 h-[60%] text-white flex  flex-col gap-2 bg-primary">
                            <div className="text-lg font-medium font-serif">{title}</div>
                        <div className="text-[#FFFFFF99] font-serif text-base">{excerpt}</div>
                        <div className="flex items-center font-serif justify-self-end mt-auto  justify-between  ">
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
            <Link href={'/blog'} className='z-[1]'>
            <button className='py-[10px] rounded-3xl px-7 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>View More</button>
            </Link>
            </div>

        </div>
    </div>
  )
}

export default Article