import React, { Component } from 'react'
import Transition from 'react-transition-group/Transition'

const loadImage = (ComposedComponent) => {
  class LoadImage extends Component {
    state = {
      image: false,
      loading: true
    }
    componentWillMount() {
      const { image } = this.props.item
      if (image && image.src) {
        const img = new Image()
        const src = `${process.env.REACT_APP_IMAGE_ENDPOINT}${image.src}`
        img.onload = () => this.setState({ image: true, loading: false })
        img.src = src
      } else {
        this.setState({ image: false, loading: false })
      }
    }
    render() {
      const { image, loading } = this.state
      const { item } = this.props
      const flex = item.values && item.values.flex ? item.values.flex : '1 1 auto'
      const width = item.values && item.values.width ? item.values.width : '100%'
      const defaultStyle = {
        transition: `opacity ${300}ms ease-in-out`,
        opacity: 0,
      }
      const transitionStyles = {
        entering: { opacity: 0 },
        entered:  { opacity: 1 },
      }
      return (
        image ?
          <Transition
            in={!loading}
            timeout={300}
          >
            {(state) => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state],
                flex,
                width
              }}>
                <ComposedComponent {...this.props} />
              </div>
            )}
          </Transition>
          :
          <div style={{ flex, width }}>
            <ComposedComponent {...this.props} />
          </div>

      )
    }
  }
  return LoadImage
}

export default loadImage
