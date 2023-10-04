import React from 'react'
import { createClient } from "contentful";
import Image from 'next/image';
// const client = createClient({
//     space: process.env.SPACE_ID,
//     accessToken: process.env.ACCESS_TOKEN,
// });

const page = async (prop) => {
    const {params}=prop
    const {slug}=params
    
    // const fetchBlogPost = async (x) => {
    //     const queryOptions = {
    //       content_type: "blog",
    //       "fields.slug[match]": x,
    //     };
    //     const queryResult = await client.getEntries(queryOptions);
    //     return queryResult.items[0];
    //   };

    //   const blogPost= await fetchBlogPost(slug)
    //   const {title,content,image}=blogPost.fields

  return (
    <div>
      {/* <Image src={`https:${image.fields.file.url}`} width={500} height={500} alt={title} />
        <div className="text-4xl text-center">{title}</div>
          
         <p>{content}</p> */}
           
        xxxxx
            
           
      
        </div>
  )
}

export default page

// export async function generateStaticParams() {
//   const queryOptions = {
//     content_type: "blog",
//     select: "fields.slug",
//   };
//   const articles = await client.getEntries(queryOptions)
//   return articles.items.map((article) => ({
//     slug: article.fields.slug,
//   }));
// }