import React from 'react'
import FontIcon from 'material-ui/FontIcon'

import './icons.css'

const SearchIcon = ({
  color,
  className
}) => {
  return (
    <FontIcon
      className={`material-icons search-icon ${className}`}
      color={color}
    >
      search
    </FontIcon>
  )
}

export default SearchIcon
