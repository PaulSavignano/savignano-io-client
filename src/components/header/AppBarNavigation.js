import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'

import './header.css'
import AppBarPageLink from './AppBarPageLink'
import AppBarUser from './AppBarUser'
import CartIcon from './CartIcon'
import { searchToggle } from '../../actions/search'

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
    const totalWidth = width/.75
    let navClass
    switch(true) {
      case totalWidth < 375:
        navClass = 'largerThanIphone375'
        break
      case totalWidth < 667:
        navClass = 'largerThanIphone667'
        break
      case totalWidth < 768:
        navClass = 'largerThanIpad768'
        break
      case totalWidth < 1024:
        navClass = 'largerThanIpad1024'
        break
      case totalWidth < 1366:
        navClass = 'largerThanIpad1366'
        break
      default:
        navClass = 'largerThan1920'
    }
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
      showPhone,
    } = this.props
    return (
      <div
        ref={(navigation) => this.navigation = navigation}
        style={{ fontFamily }}
        className="appbar-navigation-container"
      >
        {showPhone ? showPhone ==='false' ? null :
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
                key={page._id}
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
            iconClassName="fa fa-search"
            iconStyle={{ verticalAlign: 'bottom', fontSize: 16, color }}
            onTouchTap={this.handleSearchToggle}
            style={{ padding: '12px 0', width: 'auto', margin: '0 0 0 16px'}}
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
              dispatch={dispatch}
              color={color}
              style={{ margin: '0 0 0 24px', padding: 0, width: 40 }}
              badgeStyle={{ top: 6, left: 9 }}
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
