import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

import './product.css'
import withTracker from '../../containers/google-analytics/withTracker'
import productPageContainer from '../../containers/products/productPageContainer'
import Media from '../media/Media'
import H2 from '../typography/H2'
import P from '../typography/P'
import ProductButtons from './ProductButtons'
import formatPrice from '../../utils/formatPrice'

class ProductPage extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
  }
  render() {
    const {
      canvasColor,
      dispatch,
      item: {
        _id,
        image,
        values: {
          description,
          detail,
          iframe,
          name,
          price,
        }
      },
      primary1Color,
      productStyle: {
        values: {
          descriptionColor,
          detailColor,
          detailPageBackgroundColor,
          mediaBorder,
          mediaElevation,
          nameColor,
          nameTextShadow,
        }
      }
    } = this.props
    return (
      <div className="product-page" id={_id} style={{ backgroundColor: detailPageBackgroundColor }}>
        <section className="product-page-section" style={{ backgroundColor: canvasColor }}>
          <Media
            border={mediaBorder}
            elevation={mediaElevation}
            iframe={iframe}
            image={image}
            flex="1 1 300px"
            margin="8px"
          />
          <div className="product-page-content">
            <div className="product-content">
              <div
                style={{ color: nameColor, textShadow: nameTextShadow }}
                className="product-heading"
              >
                <H2>{name}</H2>
                <H2>{formatPrice(price)}</H2>
              </div>
              {description.length < 10 ? null :
              <div style={{ color: descriptionColor }} className="product-description">
                <P>{renderHTML(description)}</P>
              </div>
              }
              {detail.length < 10 ? null :
              <div style={{ color: detailColor }} className="product-description">
                <P>{renderHTML(detail)}</P>
              </div>
              }
            </div>
            <div className="product-page-buttons">
              <ProductButtons
                dispatch={dispatch}
                form={`addToCard_${_id}`}
                productId={_id}
                primary1Color={primary1Color}
              />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

ProductPage.propTypes = {
  canvasColor: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired
}


export default withTracker(productPageContainer(ProductPage))
