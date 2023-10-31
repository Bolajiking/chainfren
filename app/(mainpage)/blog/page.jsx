import React from 'react'
import Link from 'next/link';
import { client } from '@/app/contentful/contentful';
import ContentfulImage from '../../components/utils/ContentfulImage';
import Date from '../../components/utils/Date';
import Nav from '@/app/components/Nav';
import Subscribe from '@/app/components/Subscribe';
import Footer from '@/app/components/Footer';

const getBlogEntries = async () => {
    const entries = await client.getEntries({ content_type: "blog" });
    return entries;
  };
const page = async  () => {
    const blogEntries = await getBlogEntries();
    
  return (
    <>
    <Nav />
    <div className=' flex justify-center items-center   flex-col relative'>
        <div className="text-center text-3xl  md:text-5xl mt-8 text-white">Blog</div>
          <div className="max-w-[1120px] mt-12">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between w-full  gap-4 mx-auto px-8 font-serif">
            {
                blogEntries.items.map((post,index)=>{
                    const {title,slug,excerpt,coverImage,content,date}=post.fields
                    return(
                        <div className='w-full sm:w-[48%] lg:w-[32%] h-full'>
                        <Link href={`./blog/${slug}`}>
                        <div key={index} className=" overflow-hidden h-[25rem]   flex flex-col  rounded-md border-[1px] bg-[#0A0623] z-[1]  border-[#0E1435CC]">
                        <div className=" h-[40%] object-cover"><ContentfulImage
                            alt={`cover image for ${title}`}
                            src={coverImage.fields.file.url}
                            width={coverImage.fields.file.details.image.width}
                            height={200}    
                        /></div>
                        <div className=" p-4 h-[60%] text-white flex  flex-col gap-2 ">
                            <div className="text-lg font-medium font-serif">{title}</div>
                        <div className="text-[#FFFFFF99] text-sm font-serif ">{excerpt}</div>
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
            </div>
    </div>
    <Subscribe />
    <Footer />
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