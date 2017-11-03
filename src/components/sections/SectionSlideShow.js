import React, { Component } from 'react'
import PropTypes from 'prop-types'

import sectionContainer from '../../containers/sections/sectionContainer'
import ComponentSwitch from './ComponentSwitch'
import CrossFade from './CrossFade'

class SectionSlideShow extends Component {
  state = {
    index: 0,
    intervalId: null
  }
  componentDidMount() {
    if (this.props.autoplay) this.start()
  }
  componentWillReceiveProps({ autoplay }) {
    if (!autoplay) this.stop()
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  start = () => {
    const intervalId = setInterval(() => {
      if (this.state.index < this.props.item.items.length - 1) return this.setState({ index: this.state.index + 1 })
      this.setState({ index: 0 })
    }, 4000)
    this.setState({ intervalId })
  }
  stop = () => {
    clearInterval(this.state.intervalId)
    this.setState({ intervalId: null })
  }
  render() {
    const {
      item: {
        _id,
        items,
        values: {
          pageLink
        }
      },
      propsForChild,
      propsForParent,
    } = this.props
    return (
      <div {...propsForParent}>
        <section {...propsForChild} id={pageLink || _id}>
          <CrossFade key={this.state.index}>
            <ComponentSwitch
              component={items[this.state.index]}
              key={items[this.state.index].item._id}
            />
          </CrossFade>
        </section>
      </div>

    )
  }
}

SectionSlideShow.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  propsForChild: PropTypes.object.isRequired,
  propsForParent: PropTypes.object.isRequired,
}

export default sectionContainer(SectionSlideShow)
