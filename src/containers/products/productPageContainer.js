import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import loadImages from '../../utils/loadImages'

const productPageContainer = (ComposedComponent) => {
  class ProductPageContainer extends Component {
    state = {
      loadingImages: true
    }
    componentDidMount() {
      const { image } = this.props.item
      if (image && image.src) {
        return loadImages([image.src]).then(() => this.setState({ loadingImages: false }))
      }
      this.setState({ loadingImages: false })
    }
    render() {
      const { loadingImages } = this.state
      const {
        dispatch,
        isFetching,
        item,
        primary1Color,
        productStyle
      } = this.props
      const props = {
        dispatch,
        item,
        productStyle,
        primary1Color,
      }
      return (
        !isFetching && !loadingImages ?
        <ComposedComponent {...props} />
        :
        null
      )
    }
  }
  const mapStateToProps = ({
    brand: {
      isFetching: brandIsFetching,
      productStyle,
      palette: { values: { primary1Color }}
    },
    products
  }, {
    match: { params: { productId }}
  }) => ({
    isFetching: brandIsFetching || products.isFetching ? true : false,
    productStyle,
    primary1Color,
    item: products.items.find(item => item._id === productId)
  })
  ProductPageContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    item: PropTypes.object,
    primary1Color: PropTypes.string.isRequired,
    productStyle: PropTypes.object
  }
  return connect(mapStateToProps)(ProductPageContainer)
}

export default productPageContainer
