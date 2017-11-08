import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'

class CartIcon extends Component {
  render() {
    const {
      cartQty,
      color,
      iconButtonClassName,
      badgeClassName,
      fontIconClassName,
    } = this.props
    return (
      <IconButton
        className={iconButtonClassName}
        children={
          <Badge
            className={badgeClassName}
            badgeContent={cartQty}
            primary={true}
          >
            <FontIcon
              className={`material-icons ${fontIconClassName}`}
              style={{ color }}
            >
              shopping_cart
            </FontIcon>
          </Badge>
        }
        containerElement={<Link to="/user/cart"/>}
      />
    )
  }
}

CartIcon.propTypes = {
  cartQty: PropTypes.number,
  color: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default CartIcon
