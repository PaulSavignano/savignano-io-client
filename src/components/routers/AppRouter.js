import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router-dom'
import Transition from 'react-transition-group/Transition'

import history from '../../containers/routers/history'
import loadImages from '../../utils/loadImages'
import appRouterContainer from '../../containers/routers/appRouterContainer'
import SearchList from '../search/SearchList'
import Routes from './Routes'
import getPageImages from '../../utils/getPageImages'
import getHeroImages from '../../utils/getHeroImages'
import Header from '../header/Header'
import Footer from '../footer/Footer'

class AppRouter extends Component {
  state = {
    loadingImages: true,
  }
  handleEagerLoadImages = (reqPageHeroImages) => {
    const {
      appBar: { image: appBarImage },
      body: { backgroundImage: bodyBackgroundImage },
      footer: { backgroundImage: footerBackgroundImage, image: footerImage }
    } = this.props
    const brandImage = appBarImage && appBarImage.src ? [appBarImage.src] : []
    const bodyBackgroundImg = bodyBackgroundImage && bodyBackgroundImage.src ? [bodyBackgroundImage.src] : []
    const footerImg = footerImage && footerImage.src ? [footerImage.src] : []
    const footerBackgroundImg = footerBackgroundImage && footerBackgroundImage.src ? [footerBackgroundImage.src] : []
    const heroImages = getHeroImages(reqPageHeroImages)
    if (
      brandImage ||
      bodyBackgroundImg ||
      footerImg ||
      footerBackgroundImg ||
      heroImages
    ) {
      return loadImages([
        ...brandImage,
        ...bodyBackgroundImg,
        ...footerImg,
        ...footerBackgroundImg,
        ...heroImages,
      ]).then(() => {
        this.setState({ loadingImages: false })
      })
    }
    return this.setState({ loadingImages: false })
  }
  handleLazyLoadImages = (allPageImages) => {
    const allImages = getPageImages(allPageImages)
    if (allImages.length) {
      return loadImages(allImages)
    }
    return
  }
  handleBodyStyle = (backgroundColor, backgroundImage, backgroundPosition) => {
    const body = document.querySelector("body")
    if (backgroundImage && backgroundImage.src) {
      body.className = 'background-image'
      body.style.backgroundImage = `url(${`${process.env.REACT_APP_IMAGE_ENDPOINT}${backgroundImage.src}`})`
      body.style.backgroundPosition = backgroundPosition
    } else if (backgroundColor) {
      body.style.backgroundColor = backgroundColor
    }
  }
  componentDidMount() {
    const slug = window.location.pathname.slice(1)
    const reqPageSlug = slug || 'home'
    if (this.props.brand && this.props.brand._id) {
      const {
        body: {
          backgroundImage,
          values: {
            backgroundColor,
            backgroundPosition
          }
        },
        pages
      } = this.props
      const reqPageHeroImages = pages.filter(page => page.slug === reqPageSlug)
      const allPageImages = pages.filter(page => page.slug !== reqPageSlug)
      this.handleEagerLoadImages(reqPageHeroImages)
      this.handleLazyLoadImages(allPageImages)
      this.handleBodyStyle(backgroundColor, backgroundImage, backgroundPosition)
    } else {
      this.setState({ loadingImages: false })
    }
  }
  componentWillReceiveProps({
    body: {
      backgroundImage,
      values: { backgroundColor, backgroundPosition }
    }
  }) {
    if (
      backgroundColor !== this.props.body.values.backgroundColor ||
      backgroundPosition !== this.props.body.values.backgroundPosition ||
      backgroundImage !== this.props.body.backgroundImage
    ) {
    this.handleBodyStyle(backgroundColor, backgroundImage, backgroundPosition)
    }
  }
  render() {
    const { loadingImages } = this.state
    const { search } = this.props
    const defaultStyle = {
      transition: `opacity ${300}ms ease-in-out`,
      opacity: 0,
    }
    const transitionStyles = {
      entering: { opacity: 0 },
      entered:  { opacity: 1 },
    }

    return (
      <Router history={history}>
        <div>
          <Transition
            in={!loadingImages}
            timeout={300}>
            {(state) => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <Header/>
                <main>
                  {search ? <SearchList /> : <Routes roles={this.props.roles} />}
                </main>
                <Footer />
              </div>
            )}
          </Transition>
        </div>
      </Router>
    )
  }
}

AppRouter.propTypes = {
  appBar: PropTypes.object,
  body: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  footer: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  pages: PropTypes.array,
  roles: PropTypes.array,
  search: PropTypes.string.isRequired,
}

export default appRouterContainer(AppRouter)
