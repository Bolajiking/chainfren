import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebar';
import Footer2 from '@/app/components/Footer2';
import { client } from '@/app/contentful/contentful';
import ContentfulImage from '@/app/components/utils/ContentfulImage';
import Search from '@/app/components/utils/Search';
import Chatcomponent from '@/app/components/Chatcomponent';
import Image from 'next/image';
import pic from "../../../public/A4social.png";

const getCourseEntries = async () => {
  const entries = await client.getEntries({ content_type: "courses" });
  return entries;
};

const Page = async () => {
    const courses = await getCourseEntries();
  
    return (
        <div className="h-full relative font-serif">
            <div className="md:w-[22.5%] w-auto border-r-[1px] dark:bg-primary bg-white dark:border-[#40ACFF0F] border-[#F1F5FA] fixed h-[100vh]">
                <Sidebar data={courses.items} />
            </div>

            <div className="md:w-[77.5%] w-full h-full ml-auto px-4 dark:bg-primary bg-[#FBFAFA]">
                <div className="dark:text-white text-black min-h-[70vh] mx-auto prose lg:mb-20 mb-32 flex-col text-left flex justify-center items-end">
                    <h1 className='text-left self-start mt-2 dark:text-white text-black'>Introduction</h1>
                    <Image alt='Intro_img' src={pic} />
                    <p className='mb-3'>The internet began as a research project by the U.S. Department of Defense in the late 1960s. Originally called ARPANET, it was designed to create a decentralized communication network that could withstand partial destruction during wartime. By the 1980s, this network had evolved into a system connecting university and research institutions, before expanding to the general public in the 1990s.</p>
                    <p className='lg:mb-5'>What made the early internet revolutionary was its open architecture and decentralized nature. Built on open protocols like TCP/IP, HTTP, and SMTP, the internet enabled anyone to build on top of its infrastructure without requiring permission from gatekeepers. This openness sparked unprecedented innovation and transformed how humanity communicates, learns, and conducts commerce.</p>
                    <div className='rounded-md p-3 lg:mt-8 mt-12 dark:text-white text-black no-underline'>
                        <Link href={"learn/introduction-to-web3"} className='no-underline dark:text-white text-black'>Next {`>>`}</Link>
                    </div>
                </div>

                <div className="xl:p-16 lg:px-8 lg:pt-12 pt-8 md:pt-0 md2:px-4 md2:pt-10">
                    <div className="md:hidden border-[1px] dark:border-[#262036] border-[#F1F5FA] rounded-3xl px-4 py-[14px] flex justify-center items-center">
                        <Search data={courses.items} />
                    </div>
                    <div className="flex flex-col sm2:flex-row sm2:flex-wrap mx-auto pt-8 md:pt-0 gap-6 pb-8 md:pb-0">
                        {courses.items.map((course) => {
                            const { title, slug, excerpt, coverImage } = course.fields;
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
                                                <div className="text-[0.9rem] dark:text-[#ffffffa3]">{`${excerpt}`}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Footer2 />
            </div>
        </div>
    );
};

export default Page;
