
import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebar';
import Footer2 from '@/app/components/Footer2';
import { client } from '@/app/contentful/contentful';
import ContentfulImage from '@/app/components/utils/ContentfulImage';
import Searchcomponent from '@/app/components/utils/Searchcomponent';
import Search from '@/app/components/utils/Search';
import Chatcomponent from '@/app/components/Chatcomponent';


// Fetch course entries from Contentful
const getCourseEntries = async () => {
  const entries = await client.getEntries({ content_type: "courses" });
  return entries;
};

const Page =async () => {

    const courses = await getCourseEntries();
  
    // render courses 
    const Courses=courses.items.map((course) => {
      const { title, slug, excerpt, coverImage, date } = course.fields;

      return (
        <div key={slug} className="w-full sm2:w-[47%] lg:w-[31%]">
          <Link href={`/learn/${slug}`}>
            <div className="p-3 h-[19rem] flex flex-col gap-3 dark:bg-[#0D103099] bg-[#F0F0F0] rounded-md">
              <div className="rounded-md overflow-hidden flex-1">
                <ContentfulImage
                  alt={`cover image for ${title}`}
                  src={coverImage.fields.file.url}
                  width={coverImage.fields.file.details.image.width}
                  height={200}
                />
              </div>
              <div className="flex flex-col flex-1">
                <div className="font-semibold dark:text-white text-lg">{title}</div>
                <div className="text-[0.9rem] dark:text-[#ffffffa3]">{excerpt}</div>
              </div>
            </div>
          </Link>
        </div>
      );
    })


  return (
    <div className="h-full relative font-serif">
      <div className="md:w-[22.5%] w-auto border-r-[1px] dark:bg-primary bg-white dark:border-[#40ACFF0F]  border-[#F1F5FA]
 fixed h-[100vh]">
        <Sidebar />
      </div>
      <div className="">
      <Chatcomponent />
      </div>

      <div className="md:w-[77.5%] w-full h-full ml-auto px-4 dark:bg-primary bg-[#FBFAFA]">
        <div className="lg:text-7xl text-4xl dark:text-white text-black h-[70vh] flex justify-center items-center">Coming soon...</div>
        {/* <div className="xl:p-16 lg:px-8 lg:pt-12 pt-8 md:pt-0 md2:px-4 md2:pt-10">
        <div className="md:hidden  border-[1px] dark:border-[#262036] border-[#F1F5FA]
 rounded-3xl px-4 py-[14px] flex justify-center items-center">
          <Search />
          </div>
          <div className="flex flex-col sm2:flex-row sm2:flex-wrap mx-auto pt-8 md:pt-0 gap-6 pb-8 md:pb-0">
         <Searchcomponent data={Courses}  />
          </div>
        </div> */}
        <Footer2 />
      </div>
    </div>
  );
};

export default Page;
