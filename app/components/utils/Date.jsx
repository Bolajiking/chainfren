import React from 'react'
import formatDate from '../../tools/formatdate'
const Date = ({datestring,options,...rest}) => {
  return (
    <time dateTime={datestring} {...rest}>
        {formatDate(datestring,options)}
    </time>
  )
}

export default Date