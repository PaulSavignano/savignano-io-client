import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'

import imagesContainer from './imagesContainer'
import flattenArray from '../../utils/flattenArray'

class LoadImages extends Component {
  state = {
    loadingItemImages: true,
    loadingItemBackgroundImages: true
  }
  handleItemImages = (items) => {
    let qty = 0
    let qtyLoaded = 0
    items.forEach(({ image }) => {
      if (image && image.src) {
        qty = qty + 1
        const img = new Image()
        const src = image.src
        img.onload = () => {
          qtyLoaded = qtyLoaded + 1
        }
        img.src = src
      }
    })
    if (qty === qtyLoaded) {
      this.setState({ loadingItemImages: false })
    }
  }
  handleItemBackgroundImages = (items) => {
    let qty = 0
    let qtyLoaded = 0
    items.forEach(({ backgroundImage }) => {
      if (backgroundImage && backgroundImage.src) {
        qty = qty + 1
        const img = new Image()
        const src = backgroundImage.src
        img.onload = () => {
          qtyLoaded = qtyLoaded + 1
        }
        img.src = src
      }
    })
    if (qty === qtyLoaded) {
      this.setState({ loadingItemBackgroundImages: false })
    }
  }
  componentDidMount() {
    const { pages } = this.props
    const itemsArray = pages.map(page => page.sections.map(section => section.items.map(item => item)))
    const items = flattenArray(itemsArray)
    this.handleItemImages(items)
    this.handleItemBackgroundImages(items)
  }
  render() {
    const {
      loadingItemImages,
      loadingItemBackgroundImages
    } = this.state
    const {
      children,
    } = this.props
    const defaultStyle = {
      transition: `opacity ${300}ms ease-in-out`,
      opacity: 0,
    }
    const transitionStyles = {
      entering: { opacity: 0 },
      entered:  { opacity: 1 },
    }
    return (
      <Transition
        in={!loadingItemImages || !loadingItemBackgroundImages}
        timeout={300}
      >
        {(state) => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            {children}
          </div>
        )}
      </Transition>
    )
  }
}

LoadImages.propTypes = {
  pages: PropTypes.array.isRequired,
}


export default imagesContainer(LoadImages)
