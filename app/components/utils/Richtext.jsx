'use client'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import ContentfulImage from './ContentfulImage'
import { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from './Provider'
const options = {
  renderMark: {
    [MARKS.CODE]: text => {
      return (
        <pre>
          <code>{text}</code>
        </pre>
      )
    }
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (
        node.content.find(item =>
          item.marks?.find(mark => mark.type === 'code')
        )
      ) {
        return (
          <div>
            <pre>
              <code>{children}</code>
            </pre>
          </div>
        )
      }

      return <p className='dark:text-white text-black text-lg'>{children}</p>
    },
       [BLOCKS.HEADING_4]: (node, children) => {
      if (
        node.content.find(item =>
          item.marks?.find(mark => mark.type === 'code')
        )
      ) {
        return (
          <div>
            <pre>
              <code>{children}</code>
            </pre>
          </div>
        )
      }

      return <h4 id={`${children[0].props.children}`} className='dark:text-white scroll-mt-24  text-black text-lg'>{children}</h4>
    },

    [INLINES.ENTRY_HYPERLINK]: node => {
      if (node.data.target.sys.contentType.sys.id === 'post') {
        return (
          <Link href={`/posts/${node.data.target.fields.slug}`}>
            {node.data.target.fields.title}
          </Link>
        )
      }
    },

    [INLINES.HYPERLINK]: node => {
      const text = node.content.find(item => item.nodeType === 'text')?.value
      return (
        <a href={node.data.uri} target='_blank' rel='noopener noreferrer'>
          {text}
        </a>
      )
    },

    [BLOCKS.EMBEDDED_ENTRY]: node => {
      if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
        return (
          <iframe
            height='400'
            width='100%'
            src={node.data.target.fields.embedUrl}
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        )
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <ContentfulImage
          src={node.data.target.fields.file.url}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.title}
          className='h-20 w-20'
        />
      )
    }
  }
}



const Richtext = ({ content }) => {
const {setHeading,heading}=useGlobalContext()
  useEffect(()=>{
    const h4=content.content.filter((content)=>{
      return content.nodeType==='heading-4'
    }).map((content)=>{
      return content.content[0].value
    })

    setHeading(h4)
  },[content])

  return <div  className=' prose max-w-none  w-full font-serif dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white dark:prose-h4:text-white dark:prose-h5:text-white dark:prose-h6:text-white prose-a:text-blue-300 prose-h6:text-black prose-h5:text-black prose-h4:text-black prose-h3:text-black prose-h2:text-black'>{documentToReactComponents(content, options)}</div>
}

export default Richtext











