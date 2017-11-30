import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const orderContainer = (ComposedComponent) => {
  class OrderContainer extends Component {
    render() {
      const {
        canvasColor,
        dispatch,
        isFetching,
        order
      } = this.props
      const props = {
        canvasColor,
        dispatch,
        order
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  OrderContainer.propTypes = {
    canvasColor: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    order: PropTypes.object,
  }
  return connect(
    ({
      brand: { palette: { values: { canvasColor }}},
      orders: { isFetching, items },
    }, {
      match: { params: { orderId }}
    }) => ({
      canvasColor,
      isFetching,
      order: items.find(item => item._id === orderId)
    })
  )(OrderContainer)
}

export default orderContainer
