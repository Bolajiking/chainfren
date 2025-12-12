import React from 'react'
import Link from 'next/link';
import Nav from '../../../components/Nav';
import { client } from '@/app/contentful/contentful';
import ContentfulImage from '@/app/components/utils/ContentfulImage';
import Richtext from '@/app/components/utils/Richtext';
import WavyTop from '../WavyTop';
import ReadMoreSection from './ReadMoreSection';

const page = async (prop) => {
  const { params } = prop;
  const { slug } = params;

  const fetchBlogPost = async (x) => {
    const queryOptions = {
      content_type: "blog",
      "fields.slug[match]": x,
    };
    const queryResult = await client.getEntries(queryOptions);
    return queryResult.items[0];
  };

  const fetchAllBlogPosts = async () => {
    const entries = await client.getEntries({ content_type: "blog" });
    return entries;
  };

  const blogPost = await fetchBlogPost(slug);
  const allPosts = await fetchAllBlogPosts();
  
  // Get other posts (exclude current one)
  const otherPosts = allPosts.items
    .filter(post => post.fields.slug !== slug)
    .slice(0, 3);

  const { title, content, coverImage } = blogPost.fields;

  return (
    <div className="min-h-screen bg-white font-fontspring">
      <Nav />
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Blog Post Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-black mb-8">
          {title}
        </h1>

        {/* Cover Image */}
        {coverImage && (
          <div className="w-full h-full object-cover mb-8">
            <ContentfulImage
              alt={`cover image for ${title}`}
              src={coverImage.fields.file.url}
              width={coverImage.fields.file.details.image.width}
              height={coverImage.fields.file.details.image.height}
            />
          </div>
        )}

        {/* Blog Content - Force black text on white background, override dark mode */}
        <div className="text-black dark:text-black prose prose-lg max-w-none mt-8 w-full">
          <div className="[&_*]:!text-black [&_*]:dark:!text-black [&_h1]:!text-black [&_h1]:dark:!text-black [&_h2]:!text-black [&_h2]:dark:!text-black [&_h3]:!text-black [&_h3]:dark:!text-black [&_h4]:!text-black [&_h4]:dark:!text-black [&_h5]:!text-black [&_h5]:dark:!text-black [&_h6]:!text-black [&_h6]:dark:!text-black [&_p]:!text-black [&_p]:dark:!text-black [&_li]:!text-black [&_li]:dark:!text-black [&_span]:!text-black [&_span]:dark:!text-black [&_strong]:!text-black [&_strong]:dark:!text-black [&_em]:!text-black [&_em]:dark:!text-black [&_a]:!text-blue-600 [&_a]:dark:!text-blue-600">
            <Richtext content={content} />
          </div>
        </div>

        {/* READ MORE Section */}
        {otherPosts.length > 0 && (
          <ReadMoreSection posts={otherPosts} />
        )}
      </div>
    </div>
  );
};

export default page;

export async function generateStaticParams() {
  const queryOptions = {
    content_type: "blog",
    select: "fields.slug",
  };
  const articles = await client.getEntries(queryOptions);
  return articles.items.map((article) => ({
    slug: article.fields.slug,
  }));
}
