import React from 'react'
import Footer from '@/app/components/Footer'
import Sidebar2 from '@/app/components/Sidebar2'
import { client } from '@/app/contentful/contentful'
import Richtext from '@/app/components/utils/Richtext'
import ContentfulImage from '@/app/components/utils/ContentfulImage'

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
  console.log(courses);
  const {title,content,coverImage}=courses.fields
  return (
<div className="h-full relative font-serif ">
<div className="w-[22.5%] hidden md:block border-r-[1px] border-[#40ACFF0F] fixed h-[100vh]">
<Sidebar2 />
</div>
<div className="w-full md:w-[77.5%] h-full ml-auto px-4 md:px-12 pt-12 ">
  <div className="lg:w-[700px] md2:min-w-[500px] pb-32">
<div className="text-2xl sm:text-3xl md:text-[42px] font-semibold text-white text-left mb-8 font-serif ">{title}</div>
      <div className="w-full h-full object-cover">
          <ContentfulImage
            alt={`cover image for ${title}`}
            src={coverImage.fields.file.url}
            width={coverImage.fields.file.details.image.width}
            height={coverImage.fields.file.details.image.height}    
          />
          </div>
          <div className="text-white prose  max-w-none mt-8 w-full  block ">
            <Richtext content={content} />
            </div>
          

            </div>
        
            

    <Footer />
</div>
</div>
  )
}

export default page