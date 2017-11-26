import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import adminBrandForms from '../../utils/adminBrandForms'

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
      const matchedBrandForm = adminBrandForms.find(form => form.name === brandItem)
      const props = {
        _id,
        canvasColor: palette.values.canvasColor,
        dispatch,
        fontFamily: typography.values.fontFamily,
        form: matchedBrandForm.name,
        initialValues: matchedBrandItem.values,
        matchedBrandForm,
        matchedBrandItem,
      }
      return (
        this.props.brand.isFetching ? null :
        <ComposedComponent
          key={this.props.match.params.brandItem}
          {...props}
        />
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
