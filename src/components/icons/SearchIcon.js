import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'

import { searchToggle } from '../../actions/search'

const SearchIcon = ({
  className,
  color,
  handleSearchToggle,
  iconClassName,
}) => (
  <IconButton
    iconClassName={`fa fa-search ${iconClassName}`}
    iconStyle={{ color }}
    onTouchTap={handleSearchToggle}
    className={className}
  />
)

SearchIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  handleSearchToggle: PropTypes.func,
  iconClassName: PropTypes.string,
}

export default SearchIcon
