import React from 'react'

const formatdate = (datestring,options) => {
    const {format}=new Intl.DateTimeFormat('en-us',options)
  return format(new Date(datestring))
}

export default formatdate