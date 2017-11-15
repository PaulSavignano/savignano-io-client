import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './pages.css'
import NotFoundPage from '../../components/not-found/NotFoundPage'
import BrandAdminAddPage from '../../components/brands/BrandAdminAddPage'

const pageContainer = (ComposedComponent) => {
  class PageContainer extends Component {
    render() {
      const {
        brandImage,
        brandName,
        dispatch,
        firstName,
        hasBrand,
        isFetching,
        location: { hash },
        page,
        pageSlug,
        textColor,
      } = this.props
      switch (true) {
        case (isFetching):
          return null
        case (hasBrand && pageSlug === 'notFound'):
          return <NotFoundPage />
        case (hasBrand):
          const {
            backgroundImage,
            values: { backgroundColor, backgroundPosition }
          } = page
          const propsForParent = page && {
            style: {
              backgroundImage: backgroundImage && backgroundImage.src ? `url(${process.env.REACT_APP_IMAGE_ENDPOINT}${backgroundImage.src})` : null,
              backgroundPosition,
              backgroundColor,
            },
            className: backgroundImage && backgroundImage.src && 'background-image'
          }
          const props = {
            brandImage,
            brandName,
            dispatch,
            page,
            propsForParent,
            textColor,
            hash,
          }
          return <ComposedComponent {...props} />
        case (!hasBrand):
          return <BrandAdminAddPage dispatch={dispatch} firstName={firstName} />
        default:
          return null
      }
    }
  }
  const mapStateToProps = ({
    pages: {
      items,
      isFetching: pagesIsFetching
    },
    brand: {
      _id: brandId,
      business: { image: brandImage, values: { name: brandName } },
      isFetching: brandIsFetching,
      palette: { values: { textColor }},
    },
    user: { isFetching: userIsFetching, values: { firstName }}
  }, {
    match: { params: { slug }},
  }) => {
    const pageSlug = slug || 'home'
    const page = items.find(page => page.slug === pageSlug)
    return {
      brandImage,
      brandName,
      firstName,
      hasBrand: brandId ? true : false,
      isFetching: pagesIsFetching || brandIsFetching || userIsFetching,
      page,
      pageSlug: page ? page.slug : 'notFound',
      textColor,
    }
  }
  PageContainer.propTypes = {
    brandImage: PropTypes.object,
    brandName: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    hasBrand: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    page: PropTypes.object,
    pageSlug: PropTypes.string,
    textColor: PropTypes.string,
  }
  return connect(mapStateToProps)(PageContainer)
}

export default pageContainer
