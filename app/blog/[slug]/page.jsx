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
      <div className="w-[850px] px-8 mx-auto flex items-center flex-col">
        <div className="text-[#FFFFFF99] text-sm text-left mt-8 mb-4 self-start">Blog</div>
      <div className="text-5xl  text-white text-left mb-8">{title}</div>
          <ContentfulImage
            alt={`cover image for ${title}`}
            src={coverimage.fields.file.url}
            width={coverimage.fields.file.details.image.width}
            height={coverimage.fields.file.details.image.height}    
          />
          <div className="text-white prose self-start  flex items-center">
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