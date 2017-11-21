import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

const headerContainer = (ComposedComponent) => {
  class HeaderContainer extends Component {
    state = {
      pages: []
    }
    handleNavigation = (items) => {
      const pages = items.map(page => {
        return {
          slug: page.slug,
          name: page.values.name,
          sections: page.sections.filter(section => section.values.pageLink).map(sec => {
            return { pageLink: sec.values.pageLink }
          })
         }
      })
      this.setState({ pages })
    }
    componentDidMount() {
      const { items } = this.props
      this.handleNavigation(items)
    }
    componentWillReceiveProps({ items }) {
      if (this.props.items !== items) {
        this.handleNavigation(items)
      }
    }
    render() {
      const { pages } = this.state
      const {
        appBar,
        cartQty,
        dispatch,
        drawer,
        firstName,
        fontFamily,
        isAdmin,
        isOwner,
        isFetching,
        name,
        phone,
        primary1Color,
        searchOpen
      } = this.props
      const props = {
        appBar,
        cartQty,
        dispatch,
        drawer,
        firstName,
        fontFamily,
        isAdmin,
        isOwner,
        name,
        pages,
        phone,
        primary1Color,
        searchOpen
      }
      return (
        isFetching ? null : pages.length ? <ComposedComponent {...props} /> : null
      )
    }
  }
  const mapStateToProps = ({
    brand: {
      appBar,
      business: { values: { phone }},
      isFetching: brandIsFetching,
      palette: { values: { primary1Color }},
      typography: { values: { fontFamily }},
    },
    carts: { cart: { quantity: cartQty }},
    drawer,
    pages: { isFetching: pagesIsFetching, items },
    search: { open: searchOpen },
    user: { isFetching: userIsFetching, roles, values: { firstName }},
  }) => ({
    appBar,
    cartQty,
    drawer,
    firstName,
    fontFamily,
    isAdmin: roles.some(role => role === 'admin') ? true : false,
    isOwner: roles.some(role => role === 'owner') ? true : false,
    isFetching: brandIsFetching || pagesIsFetching || userIsFetching ? true : false,
    items,
    phone,
    primary1Color,
    searchOpen
  })
  HeaderContainer.propTypes = {
    appBar: PropTypes.object.isRequired,
    cartQty: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    drawer: PropTypes.object.isRequired,
    firstName: PropTypes.string,
    fontFamily: PropTypes.string,
    isAdmin: PropTypes.bool,
    isOwner: PropTypes.bool,
    isFetching: PropTypes.bool.isRequired,
    pages: PropTypes.array,
    phone: PropTypes.string,
    primary1Color: PropTypes.string,
    searchOpen: PropTypes.bool.isRequired
  }
  return withRouter(connect(mapStateToProps)(HeaderContainer))
}

export default headerContainer
