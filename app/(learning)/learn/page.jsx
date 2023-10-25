import React from 'react'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import Sidebar from '@/app/components/Sidebar'
import { client } from '@/app/contentful/contentful'
import ContentfulImage from '@/app/components/utils/ContentfulImage'

const getCourseEntries=async ()=>{
  const entries = await client.getEntries({ content_type: "courses" });
  return entries
}
const page = async () => {
  const courses=await getCourseEntries()

  return (

<div className="h-full relative font-serif ">
<div className="w-[22.5%] border-r-[1px] hidden md:block border-[#40ACFF0F] fixed h-[100vh]">
<Sidebar />
</div>
<div className="md:w-[77.5%] w-full h-full ml-auto px-4">
<div className="xl:p-16 lg:px-8 lg:pt-12 md2:px-4 md2:pt-10">
<div className="md:hidden my-8 border-[1px] border-[#262036] rounded-3xl px-4 py-[14px] flex justify-center items-center"><input type="text" placeholder='Search Courses or lessons' className='w-full bg-transparent text-sm outline-none p-0 leading-none text-[#6B6776]' /></div>

    <div className="flex flex-col sm2:flex-row sm2:flex-wrap mx-auto gap-6 pb-8 md:pb-0 ">
{courses.items.map((course)=>{
  const {title,slug,excerpt,coverImage,date}=course.fields
  return (

            <div className="w-full sm2:w-[47%] lg:w-[31%] ">
            <Link href={`/learn/${slug}`}  >
        <div className="p-3  h-[19rem] flex flex-col gap-3 bg-[#0D103099] rounded-md">
            <div className="rounded-md overflow-hidden flex-1">
              <ContentfulImage
                                      alt={`cover image for ${title}`}
                                      src={coverImage.fields.file.url}
                                      width={coverImage.fields.file.details.image.width}
                                      height={200}   
              />
            </div>
            <div className="flex flex-col flex-1">
                <div className="font-semibold  text-white text-lg">{title}</div>
                <div className="  text-[0.9rem] text-[#ffffffa3]">{excerpt}</div>
            </div>
        </div>
        </Link>
        </div>

      

  )
})   }
    </div>
</div>
    <Footer />
</div>
</div>

  )
}

export default page


