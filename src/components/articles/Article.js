import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './article.css'
import articleContainer from '../../containers/articles/articleContainer'
import ArticleSwitch from './ArticleSwitch'

class Article extends Component {
  state = {
    intervalId: null
  }
  componentDidMount() {
    if (window.location.hash.replace('#', '') === this.props.item._id) this.elRef.scrollIntoView()
  }
  render() {
    const {
      item: {
        _id,
        values: { articleFlex: flex }
      }
    } = this.props
    return (
      <article
        id={_id}
        className="Article"
        style={{ flex }}
        ref={el => this.elRef = el}
      >
        <ArticleSwitch {...this.props} />
      </article>
    )
  }
}

Article.propTypes = {
  buttonProps: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  headingProps: PropTypes.object,
  item: PropTypes.object.isRequired,
  mediaProps: PropTypes.object,
  paragraphProps: PropTypes.object,
}

export default articleContainer(Article)
