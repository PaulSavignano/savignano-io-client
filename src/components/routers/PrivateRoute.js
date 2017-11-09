import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
  state = {
    hasRoles: false
  }
  componentWillMount() {
    const { roles, requiredRoles } = this.props
    const hasRoles = requiredRoles.some(v => roles.indexOf(v) >= 0)
    this.setState({ hasRoles })
  }
  componentWillReceiveProps({ roles, requiredRoles }) {
    if (roles !== this.props.roles) {
      const hasRoles = requiredRoles.some(v => roles.indexOf(v) >= 0)
      this.setState({ hasRoles })
    }
  }
  render() {
    const {
      component: Component,
      requiredRoles,
      roles,
      ...rest,
    } = this.props
    return (
      this.state.hasRoles ?
      <Route {...rest} component={Component} />

      :
      <Redirect to="/user/signin" />
    )
  }
}

PrivateRoute.propTypes = {
  roles: PropTypes.array.isRequired,
}

export default PrivateRoute
