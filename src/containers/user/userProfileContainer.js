import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const userProfileContainer = (ComposedComponent) => {
  class UserProfileContainer extends Component {
    render() {
      const {
        isFetching
      } = this.props
      return (
        isFetching ? null :  <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { palette: { values: { canvasColor }}},
    user,
    orders
  }) => ({
    canvasColor,
    isFetching: user.isFetching || orders.isFetching ? true : false,
    orders: orders.items.filter(item => item.user === user._id),
    user
  })
  UserProfileContainer.propTypes = {
    canvasColor: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    orders: PropTypes.array,
    user: PropTypes.object
  }
  return connect(mapStateToProps)(UserProfileContainer)
}

export default userProfileContainer
