import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import brandForms from './brandForms'

const brandContainer = (ComposedComponent) => {
  class BrandContainer extends Component {
    state = {
      props: null
    }
    handleFormForRoute = ({
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
    }) => {
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
        dispatch,
        fontFamily: typography.values.fontFamily,
        form: matchedBrandForm.name,
        initialValues: matchedBrandItem.values,
        matchedBrandForm,
        matchedBrandItem,
      }
      this.setState({ props })
    }
    componentDidMount() {
      this.handleFormForRoute(this.props)
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.match.params.brandItem !== this.props.match.params.brandItem) {
        console.log('brandItem is different')
        this.handleFormForRoute(nextProps)
      }
    }
    render() {
      return (
        this.props.brand.isFetching ? null : this.state.props ?
        <ComposedComponent
          key={this.props.match.params.brandItem}
          {...this.state.props}
        />
        :
        null
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
