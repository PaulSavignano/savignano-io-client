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
  getPageMetaData = (page) => {
    const description = getPageDescription(page)
    this.setState({ description })
  }
  componentDidMount() {
    const { hash } = this.props
    this.getPageMetaData(this.props.page)
    if (hash) return
    window.scrollTo(0, 0)
  }
  componentWillReceiveProps({ hash, page }) {
    if (this.props.page._id !== page._id) {
      window.scrollTo(0, 0)
      this.getPageMetaData(page)
    }
  }
  render() {
    const {
      brandImage,
      brandName,
      dispatch,
      hash,
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
              hash={hash}
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
