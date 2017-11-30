import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'

import './header.css'
import AppBarPageLink from './AppBarPageLink'
import AppBarUser from './AppBarUser'
import CartIcon from '../icons/CartIcon'
import SearchIcon from '../icons/SearchIcon'
import { searchToggle } from '../../actions/search'
import getNavClass from '../../utils/getNavClass'

class AppBarNavigation extends Component {
  state = {
    navClass: null,
    width: 0
  }
  handleSearchToggle = () => {
    const { dispatch, searchOpen } = this.props
    return dispatch(searchToggle(!searchOpen))
  }
  componentDidMount() {
    const width = this.navigation.clientWidth
    const totalWidth = width/.70
    const navClass = getNavClass(totalWidth)
    this.setState({ navClass, width });
  }
  render() {
    const { navClass } = this.state
    const {
      cartQty,
      color,
      dispatch,
      firstName,
      fontFamily,
      fontWeight,
      pages,
      phone,
      phoneSize,
      primary1Color,
      searchOpen,
      showPhone,
    } = this.props
    return (
      <div
        ref={(navigation) => this.navigation = navigation}
        style={{ fontFamily }}
        className="appbar-navigation-container"
      >
        {showPhone ==='false' ? null : phone ?
          <div style={{ color: primary1Color }} className="appbar-phone-container">
            <a
              href={`tel:${phone.replace(/\D+/g, '')}`}
              className="appbar-phone"
              style={{ fontSize: phoneSize, fontWeight }}
            >
              {phone}
            </a>
          </div>
        : null}
        <div className="appbar-navigation">
          <div
            className={`${navClass} appbar-navigation`}
          >
            {pages.length ? pages.filter(page => page.slug !== 'home').map(page => (
              <AppBarPageLink
                key={page.name}
                color={color}
                dispatch={dispatch}
                fontFamily={fontFamily}
                page={page}
              />
            ))
            :
              null
            }
          </div>
          <IconButton
            children={
              <SearchIcon
                color={color}
                className="appbar-search-icon"
              />
            }
            onTouchTap={this.handleSearchToggle}
            className="appbar-search-icon-button"
          />

          <AppBarUser
            cartQty={cartQty}
            color={color}
            dispatch={dispatch}
            firstName={firstName}
            fontFamily={fontFamily}
          />
          {cartQty &&
            <CartIcon
              cartQty={cartQty}
              iconButtonClassName="appbar-cart-icon-button"
              badgeClassName="appbar-cart-badge"
              fontIconClassName="appbar-cart-font-icon"
              dispatch={dispatch}
              color={color}
            />
          }
        </div>
      </div>
    )
  }
}

AppBarNavigation.propTypes = {
  cartQty: PropTypes.number,
  color: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  fontFamily: PropTypes.string,
  pages: PropTypes.array,
  searchOpen: PropTypes.bool.isRequired
}

export default AppBarNavigation
