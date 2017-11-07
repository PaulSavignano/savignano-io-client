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
        hasBrand,
        dispatch,
        firstName,
        isFetching,
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
            dispatch,
            page,
            propsForParent,
            textColor
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
    pages: { items, isFetching: pagesIsFetching },
    brand: { _id: brandId, isFetching: brandIsFetching, palette: { values: { textColor }}},
    user: { isFetching: userIsFetching, values: { firstName }}
  }, {
    match: { params: { slug }},
  }) => {
    const pageSlug = slug || 'home'
    const page = items.find(page => page.slug === pageSlug)
    return {
      hasBrand: brandId ? true : false,
      firstName,
      isFetching: pagesIsFetching || brandIsFetching || userIsFetching,
      page,
      pageSlug: page ? page.slug : 'notFound',
      textColor,
    }
  }
  PageContainer.propTypes = {
    hasBrand: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    page: PropTypes.object,
    pageSlug: PropTypes.string,
    textColor: PropTypes.string,
  }
  return connect(mapStateToProps)(PageContainer)
}

export default pageContainer
