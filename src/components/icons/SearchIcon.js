import React from 'react'
import FontIcon from 'material-ui/FontIcon'

const SearchIcon = ({
  color,
  className
}) => {
  return (
    <FontIcon
      className={`material-icons ${className}`}
      color={color}
    >
      search
    </FontIcon>
  )
}

export default SearchIcon
