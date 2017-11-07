import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import brandForms from './brandForms'

const brandContainer = (ComposedComponent) => {
  class BrandContainer extends Component {
    render() {
      const {
        brand: {
          _id,
          appBar,
          articleStyle,
          body,
          business,
          cardStyle,
          footer,
          heroStyle,
          isFetching,
          palette,
          productStyle,
          typography,
        },
        dispatch,
        match: { params: { brandItem }}
      } = this.props
      const forms = [
        {appBar},
        {articleStyle},
        {body},
        {business},
        {cardStyle},
        {footer},
        {heroStyle},
        {palette},
        {productStyle},
        {typography},
      ]
      const matchedBrandItem = forms.find(f => f[brandItem])[brandItem]
      const matchedBrandForm = brandForms.find(form => form.name === brandItem)
      const props = {
        _id,
        canvasColor: palette.values.canvasColor,
        fontFamily: typography.values.fontFamily,
        matchedBrandItem,
        matchedBrandForm,
        dispatch
      }
      return (
        isFetching ? null :
        <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ brand }) => ({ brand })
  BrandContainer.propTypes = {
    brand: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(BrandContainer)
}

export default brandContainer
