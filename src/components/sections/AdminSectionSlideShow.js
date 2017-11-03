import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './section.css'
import sectionContainer from '../../containers/sections/sectionContainer'
import AdminSectionEditButtons from './AdminSectionEditButtons'
import AdminComponentSwitch from './AdminComponentSwitch'
import CrossFade from './CrossFade'
import { startEdit } from '../../actions/editItem'

class AdminSectionSlideShow extends Component {
  state = {
    index: 0,
    intervalId: null
  }
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'SECTION' }))
  }
  componentWillMount() {
    if (this.props.autoplay) {
      this.start()
    }
  }
  componentWillReceiveProps({ autoplay }) {
    if (this.props.autoplay !== autoplay) {
      if (!autoplay) {
        this.stop()
      } else {
        this.start()
      }
    }
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
      dispatch,
      item,
      pageId,
      pageSlug,
      propsForChild,
      propsForParent,
    } = this.props
    const { items } = item
    return (
      <div {...propsForParent}>
        <section {...propsForChild} className="AdminSectionSlideShow">
          <CrossFade key={this.state.index}>
            <AdminComponentSwitch
              component={items[this.state.index]}
              key={items[this.state.index].item._id}
              pageSlug={pageSlug}
            />
          </CrossFade>
        </section>
        <AdminSectionEditButtons
          dispatch={dispatch}
          item={item}
          pageId={pageId}
          pageSlug={pageSlug}
        />
      </div>
    )
  }
}

AdminSectionSlideShow.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
  pageSlug: PropTypes.string.isRequired,
  propsForChild: PropTypes.object.isRequired,
  propsForParent: PropTypes.object.isRequired,
}

export default sectionContainer(AdminSectionSlideShow)
