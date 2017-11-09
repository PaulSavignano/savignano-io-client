import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const appRouterContainer = (ComposedComponent) => {
  class AppRouterContainer extends Component {
    render() {
      const {
        isFetching,
      } = this.props
      return (
        isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching: brandIsFetching, appBar, body, footer },
    pages: { isFetching: pagesIsFetching, items },
    search: { value },
    user: { isFetching: userIsFetching, roles }
  }) => ({
    appBar,
    body,
    footer,
    isFetching: brandIsFetching || pagesIsFetching || userIsFetching ? true : false,
    pages: items,
    roles,
    search: value,
  })
  AppRouterContainer.propTypes = {
    appBar: PropTypes.object,
    body: PropTypes.object,
    footer: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    pages: PropTypes.array,
    roles: PropTypes.array,
    search: PropTypes.string.isRequired,
  }
  return connect(mapStateToProps)(AppRouterContainer)
}

export default appRouterContainer
