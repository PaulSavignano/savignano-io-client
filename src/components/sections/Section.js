import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './section.css'
import ScrollToId from '../routers/ScrollToId'
import slugIt from '../../utils/slugIt'
import sectionContainer from '../../containers/sections/sectionContainer'
import ComponentSwitch from './ComponentSwitch'

class Section extends Component {

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
    return (
      <div {...propsForParent}>
        <ScrollToId pageLink={pageLink} hash={hash} />
        <section
          id={pageLink ? slugIt(pageLink) : null}
          {...propsForChild}
          className="Section"
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
