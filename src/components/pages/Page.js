import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withTracker from '../../containers/google-analytics/withTracker'

import pageContainer from '../../containers/pages/pageContainer'
import getPageDescription from '../../utils/getPageDescription'
import PageHead from '../head/PageHead'
import SectionSwitch from './SectionSwitch'

class Page extends Component {
  state = {
    description: null,
  }
  getPageMetaData = () => {
    const { page } = this.props
    const description = getPageDescription(page)
    this.setState({ description })
  }
  componentDidMount() {
    const { hash } = window.location
    this.getPageMetaData()
    if (hash) return this.scrollToId(hash)
    window.scrollTo(0, 0)
  }
  componentWillReceiveProps({ page: { _id }}) {
    const { hash } = window.location
    if (this.props.page._id !== _id) {
      if (hash) return this.scrollToId(hash)
      window.scrollTo(0, 0)
    }
  }
  scrollToId = (hash) => {
    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) return element.scrollIntoView({ block: "start", behavior: "smooth" })
  }
  render() {
    const {
      brandImage,
      brandName,
      dispatch,
      page: {
        _id,
        slug,
        sections,
        values: {
          name
         }
      },
      propsForParent
    } = this.props
    return (
      <div>
        <PageHead
          description={this.state.description}
          brandImage={brandImage}
          brandName={brandName}
          pageName={name}
        />
        <div {...propsForParent}>
          {sections.map(section => (
            <SectionSwitch
              dispatch={dispatch}
              key={section._id}
              pageId={_id}
              pageSlug={slug}
              section={section}
            />
          ))}
        </div>
      </div>
    )
  }
}

Page.propTypes = {
  page: PropTypes.object.isRequired,
}

export default withTracker(pageContainer(Page))
