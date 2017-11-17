import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './section.css'
import ScrollIntoView from '../routers/ScrollIntoView'
import slugIt from '../../utils/slugIt'
import sectionContainer from '../../containers/sections/sectionContainer'
import ComponentSwitch from './ComponentSwitch'

class Section extends Component {
  state = {
    intervalId: null
  }
  componentDidMount() {
    const { hash, item: { values: { pageLink }}} = this.props
    if (hash && pageLink && hash) {
      if (hash.replace('#', '') === slugIt(pageLink)) {
        const intervalId = setInterval(() => {
          this.elRef.scrollIntoView()
          clearInterval(this.state.intervalId)
          this.setState({ intervalId: null })
        }, 300)
        this.setState({ intervalId })
      }
    }
  }
  componentWillReceiveProps({ hash, item: { values: { pageLink }}}) {
    if (this.props.hash !== hash && pageLink && hash) {
      if (hash.replace('#', '') === slugIt(pageLink)) {
        this.elRef.scrollIntoView()
      }
    }
  }
  render() {
    const {
      hash,
      item: {
        _id,
        items,
        values: {
          pageLink
        }
      },
      propsForChild,
      propsForParent
    } = this.props
    console.log()

    return (
      <div
        {...propsForParent}
        ref={el => this.elRef = el}>
        <section
          {...propsForChild}
          className="Section"
          id={pageLink ? slugIt(pageLink) : _id}
        >
          {items.map(component => {
            return (
              <ComponentSwitch
                component={component}
                key={component.item._id}
              />
            )
          })}
        </section>
      </div>
    )
  }
}

Section.propTypes = {
  item: PropTypes.object.isRequired,
  propsForChild: PropTypes.object.isRequired,
  propsForParent: PropTypes.object.isRequired,
}

export default sectionContainer(Section)
