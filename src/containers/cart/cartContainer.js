import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const cartContainer = (ComposedComponent) => {
  class CartContainer extends Component {
    render() {
      const {
        canvasColor,
        cart,
        dispatch,
        isFetching,
        user
      } = this.props
      const props = {
        canvasColor,
        cart,
        dispatch,
        user
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { palette: { values: { canvasColor }}},
    carts: { cart, isFetching },
    user
  }) => ({
    canvasColor,
    cart,
    isFetching: isFetching || user.isFetching ? true : false,
    user
  })
  CartContainer.propTypes = {
    canvasColor: PropTypes.string,
    cart: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  }
  return connect(mapStateToProps)(CartContainer)
}

export default cartContainer
