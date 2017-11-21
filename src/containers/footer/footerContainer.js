import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const footerContainer = (ComposedComponent) => {
  class FooterContainer extends Component {
    render() {
      const {
        business,
        isFetching,
        item,
        pages,
        primary1Color,
      } = this.props
      const {
        backgroundImage,
        values: {
          backgroundColor,
          borderBottom,
          borderTop,
          boxShadow,
        }
      } = item
      const propsForParent = {
        style: {
          backgroundColor,
          backgroundImage: backgroundImage && backgroundImage.src && `url(${process.env.REACT_APP_IMAGE_ENDPOINT}${backgroundImage.src})`,
          borderBottom,
          borderTop,
        },
        className: backgroundImage && backgroundImage.src && 'background-image'
      }
      const props = {
        boxShadow,
        business,
        item,
        pages,
        primary1Color,
        propsForParent,
      }
      return (
        !isFetching && item && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: {
      isFetching: brandIsFetching,
      footer: item,
      business,
      palette: {
        values: {
          primary1Color
        }
      }
    },
    pages: { isFetching: pagesIsFetching, items },
  }) => ({
    business,
    isFetching: brandIsFetching || pagesIsFetching ? true : false,
    item,
    pages: items.map(page => {
      return {
         slug: page.slug,
         name: page.values.name
       }
    }),
    primary1Color
  })
  FooterContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    business: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pages: PropTypes.array,
    primary1Color: PropTypes.string,
    propsForParent: PropTypes.object,
  }
  return withRouter(connect(mapStateToProps)(FooterContainer))
}

export default footerContainer
