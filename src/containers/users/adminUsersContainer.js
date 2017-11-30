import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const adminUsersContainer = (ComposedComponent) => {
  class AdminUsersContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        orders,
        users,
      } = this.props
      const props = {
        dispatch,
        orders,
        users
      }
      return (
        isFetching ? null :  <ComposedComponent {...props} />
      )
    }
  }
  AdminUsersContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    orders: PropTypes.array,
    user: PropTypes.object,
  }
  return connect(
    ({
      orders,
      users
    }, {
      match: {
        params: {
          userId
        }
      }
    }) => ({
      isFetching: orders.isFetching || users.isFetching,
      orders: orders.items.filter(item => item.user === userId),
      user: users.items.find(item => item._id === userId)
    })
  )(AdminUsersContainer)
}

export default adminUsersContainer
