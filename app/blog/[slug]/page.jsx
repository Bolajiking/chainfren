import React from 'react'
import { client  } from '@/app/contentful/contentful';
import ContentfulImage from '@/app/components/utils/ContentfulImage';
import Richtext from '@/app/components/utils/Richtext';

const page = async (prop) => {
    const {params}=prop
    const {slug}=params
    
    const fetchBlogPost = async (x) => {
        const queryOptions = {
          content_type: "post",
          "fields.slug[match]": x,
        };
        const queryResult = await client.getEntries(queryOptions);
        return queryResult.items[0];
      };

      const blogPost= await fetchBlogPost(slug)
      const {title,content,coverimage}=blogPost.fields
        console.log(content);
  return (
    <div>
      <div className=" px-4 sm:px-8 mx-auto flex items-center md:w-[800px] flex-col">
        <div className="text-[#FFFFFF99] text-sm text-left mt-8 mb-4 self-start">Blog</div>
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  text-white text-left mb-8 font-serif ">{title}</div>
      <div className="w-full h-full object-cover">
          <ContentfulImage
            alt={`cover image for ${title}`}
            src={coverimage.fields.file.url}
            width={coverimage.fields.file.details.image.width}
            height={coverimage.fields.file.details.image.height}    
          />
          </div>
          <div className="text-white prose max-w-none mt-8 w-full  block ">
            <Richtext content={content} />
            </div>
          

           
        
            
        </div>
      
        </div>
  )
}

export default page

export async function generateStaticParams() {
  const queryOptions = {
    content_type: "post",
    select: "fields.slug",
  };
  const articles = await client.getEntries(queryOptions)
  return articles.items.map((article) => ({
    slug: article.fields.slug,
  }));
}