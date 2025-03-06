import React from 'react'
import Footer2 from '@/app/components/Footer2'
import Sidebar3 from '@/app/components/Sidebar3'
import { client } from '@/app/contentful/contentful'
import Richtext from '@/app/components/utils/Richtext'
import ContentfulImage from '@/app/components/utils/ContentfulImage'
import Chatcomponent from '@/app/components/Chatcomponent'
import Ai from '@/app/components/Ai'

const page = async (props) => {
  const {params}=props
  const {slug}=params

  const fetchCourse = async (x) => {
    const queryOptions = {
      content_type: "courses",
      "fields.slug[match]": x,
    };
    const queryResult = await client.getEntries(queryOptions);
    return queryResult.items[0];
  };

  const courses=await fetchCourse(slug)

  const {title,content,coverImage}=courses.fields

  // console.log(coverImage.fields.file)

  return (
<div className="h-full relative font-serif ">
<div className="md:w-[22.5%] w-auto border-r-[1px] dark:border-[#40ACFF0F] border-[#F1F5FA]
 fixed h-[100vh]">
<Sidebar3/>
</div>


<Chatcomponent />
<div className="w-full md:w-[77.5%] dark:bg-primary bg-[#FBFAFA] h-full ml-auto px-4 md:px-12 pt-12 ">
  <div className="lg:w-[700px] md2:min-w-[500px] pb-32">
<div className="text-2xl sm:text-3xl md:text-[42px] font-semibold dark:text-white text-black
 text-left mb-8 font-serif ">{title}</div>
      <div className="w-full h-full object-cover">
          <ContentfulImage
            alt={`cover image for ${title}`}
            src={coverImage.fields.file.url}
            width={coverImage.fields.file.details.image.width}
            height={coverImage.fields.file.details.image.height}    
          />
          </div>
          <div className="dark:text-white text-black
 prose  max-w-none mt-8 w-full  block ">
            <Richtext content={content} />
            </div>
          

            </div>
        
            

    <Footer2 />
</div>
<Ai responsive={true} />
</div>
  )
}
export async function generateStaticParams() {
  const queryOptions = {
    content_type: "courses",
    select: "fields.slug",
  };
  const courses = await client.getEntries(queryOptions)
  return courses.items.map((course) => ({
    slug: course.fields.slug,
  }));
}
export default page