import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  fetchApiConfig,
  fetchUpdate,
  deleteState
} from '../../actions/apiConfig'

const apiConfigContainer = (ComposedComponent) => {
  class ApiConfigContainer extends Component {
    handleFormSubmit = (values) => {
      const { apiConfig: { _id }, dispatch } = this.props
      dispatch(fetchUpdate({ _id, values }))
    }
    componentDidMount() {
      this.props.dispatch(fetchApiConfig())
    }
    componentWillUnmount() {
      this.props.dispatch(deleteState())
    }
    render() {
      const {
        apiConfig: {
          _id,
          isFetching,
          values,
        },
        dispatch
      } = this.props
      const props = {
        _id,
        dispatch,
        handleFormSubmit: this.handleFormSubmit,
        initialValues: values,
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ apiConfig }) => ({ apiConfig })
  apiConfigContainer.propTypes = {
    apiConfig: PropTypes.object,
    dispatch: PropTypes.func,
  }
  return connect(mapStateToProps)(ApiConfigContainer)
}

export default apiConfigContainer
