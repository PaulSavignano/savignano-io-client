import React, { Component } from 'react'

import slugIt from '../../utils/slugIt'

class ScrollToId extends Component {
  state = {
    intervalId: null
  }
  componentDidMount() {
    const { hash, pageLink } = this.props
    if (pageLink && hash) {
      const windowHash = hash.replace('#', '')
      const sectionId = slugIt(pageLink)
      if (windowHash === sectionId) {
        const intervalId = setInterval(() => {
          this.scrollToId(windowHash)
          clearInterval(this.state.intervalId)
          this.setState({ intervalId: null })
        }, 200)
        this.setState({ intervalId })
      }
    }
  }
  componentWillReceiveProps({ hash, pageLink }) {
    if (pageLink && hash) {
      const windowHash = hash.replace('#', '')
      const sectionId = slugIt(pageLink)
      if (windowHash === sectionId) {
        return this.scrollToId(windowHash)
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
  scrollToId = (id) => {
    const element = document.getElementById(id)
    if (element) return element.scrollIntoView()
  }
  render() {
    console.log('rendering scrollToId')
    return null
  }
}

export default ScrollToId
