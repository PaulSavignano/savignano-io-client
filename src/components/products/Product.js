import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'

import './product.css'
import history from '../../containers/routers/history'
import productContainer from '../../containers/products/productContainer'
import ProductContent from './ProductContent'
import slugIt from '../../utils/slugIt'

class Product extends Component {
  componentDidMount() {
    if (window.location.hash.replace('#', '') === this.props.item._id) this.elRef.scrollIntoView()
  }
  handleNavigation = (e) => {
    const { item: { _id, values: { name }}} = this.props
    e.stopPropagation()
    history.push(`/products/${slugIt(name)}/${_id}`)
  }
  render() {
    const {
      elevation,
      events,
      item: {
        _id
      },
      productStyle: {
        values: {
          flex,
          margin,
        }
      }
    } = this.props
    return (
      <div
        style={{ flex, margin }}
        ref={el => this.elRef = el}
        className="Product"
      >
        <Card
          {...events}
          zDepth={elevation}
          onTouchTap={this.handleNavigation}
        >
          <ProductContent {...this.props} />
        </Card>
      </div>

    )
  }
}

Product.propTypes = {
  dispatch: PropTypes.func.isRequired,
  elevation: PropTypes.number.isRequired,
  events: PropTypes.object,
  item: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired,
}

export default productContainer(Product)
