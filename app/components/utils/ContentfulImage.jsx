import React from 'react'
import Image from 'next/image'
const ContentfulImage = ({alt,src,width,height,quality}) => {
  return <Image alt={alt} src={`https:${src}?w=${width}&q=${quality||75}`} width={width} height={height} className='object-cover' />
}


export default ContentfulImage