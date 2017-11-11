import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Transition from 'react-transition-group/Transition'

import getSectionImages from '../../utils/getSectionImages'
import loadImages from '../../utils/loadImages'

const sectionContainer = (ComposedComponent) => {
  class SectionContainer extends Component {
    state = {
      imagesLoaded: true,
      loadingImages: true
    }
    componentDidMount() {
      const { item } = this.props
      const sectionImages = getSectionImages(item)
      if (sectionImages.length) {
        return loadImages(sectionImages).then((result) => {
          const imagesLoaded = result.some(r => !r.loaded)
          this.setState({ imagesLoaded, loadingImages: false })
        })
      }
      return this.setState({ loadingImages: false })
    }

    render() {
      const {
        imagesLoaded,
        loadingImages
      } = this.state
      const {
        autoplay,
        dispatch,
        item,
        pageId,
        pageSlug,
        textColor
      } = this.props
      const {
        backgroundImage,
        values: {
          alignItems,
          backgroundPosition,
          backgroundColor,
          flexFlow,
          justifyContent,
          margin,
          maxWidth,
          minHeight,
          padding,
        }
      } = item
      const props = {
        autoplay,
        dispatch,
        item,
        pageId,
        pageSlug,
        propsForParent: {
          style: {
            backgroundImage: backgroundImage.src && `url(${process.env.REACT_APP_IMAGE_ENDPOINT}${backgroundImage.src})`,
            backgroundColor,
            backgroundPosition
          },
          className: backgroundImage.src ? 'section-container background-image' : 'section-container'
        },
        propsForChild: {
          style: {
            alignItems,
            flexFlow,
            justifyContent,
            maxWidth,
            minHeight,
            margin,
            padding
          }
        },
        textColor
      }
      const defaultStyle = {
        transition: `opacity ${300}ms ease-in-out`,
        opacity: 0,
      }
      const transitionStyles = {
        entering: { opacity: 0 },
        entered:  { opacity: 1 },
      }
      return (
        imagesLoaded ?
          <ComposedComponent key={item.updatedAt} {...props} />
          :
          <Transition
            in={!loadingImages}
            timeout={300}
          >
            {(state) => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <ComposedComponent key={item.updatedAt} {...props} />
              </div>
            )}
          </Transition>
      )
    }
  }
  const mapStateToProps = ({
    swipeables: { autoplay },
    brand: { palette: { values: { textColor }}}
  }, {
    item, pageId, pageSlug
  }) => ({
    autoplay,
    item,
    pageId,
    pageSlug,
    textColor
  })
  SectionContainer.propTypes = {
    autoplay: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    pageId: PropTypes.string.isRequired,
    pageSlug: PropTypes.string.isRequired,
    textColor: PropTypes.string,
  }
  return connect(mapStateToProps)(SectionContainer)
}

export default sectionContainer
