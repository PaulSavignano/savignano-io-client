import React, { Component } from 'react'

import slugIt from '../../utils/slugIt'

class ScrollIntoView extends Component {
  state = {
    intervalId: null
  }
  componentDidMount() {
    if (window.location.hash) {
      const { pageLink, ref } = this.props

      const hash = window.location.hash.replace('#', '')
      if (pageLink) {
        console.log('pageLink', pageLink)
              console.log('ref', ref)
        if (hash === slugIt(pageLink)) {
          ref.scrollIntoView()
        }
      }

    }
  }
  componentWillUnmount() {
    const { intervalId } = this.state
    if (intervalId) {
      clearInterval(this.state.intervalId)
      this.setState({ intervalId: null })
    }
  }
  render() {
    return null
  }
}

export default ScrollIntoView
