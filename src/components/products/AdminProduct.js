import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'

import './product.css'
import productContainer from '../../containers/products/productContainer'
import ProductContent from './ProductContent'
import { startEdit } from '../../actions/editItem'

class AdminProduct extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'PRODUCT' }))
  }
  render() {
    const {
      elevation,
      events,
      productStyle: {
        values: {
          flex,
          margin,
        }
      }
    } = this.props
    return (
      <div
        className="AdminProduct"
        style={{ flex, margin }}
      >
        <Card
          {...events}
          zDepth={elevation}
          onTouchTap={this.handleStartEdit}
        >
          <ProductContent {...this.props} />
        </Card>
      </div>
    )
  }
}

AdminProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
  elevation: PropTypes.number.isRequired,
  events: PropTypes.object,
  item: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired,
}

export default productContainer(AdminProduct)
