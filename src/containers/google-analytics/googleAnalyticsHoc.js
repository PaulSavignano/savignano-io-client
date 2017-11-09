import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const googleAnalyticsHoc = (ComposedComponent) => {
  class GoogleAnalyticsHoc extends Component {
    render() {
      const { isFetching } = this.props
      return (
        isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, business: { values: { googleAnalyticsUA }}},
  }) => ({
    googleAnalyticsUA,
    isFetching
  })
  GoogleAnalyticsHoc.propTypes = {
    googleAnalyticsUA: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
  }
  return connect(mapStateToProps)(GoogleAnalyticsHoc)
}

export default googleAnalyticsHoc
