import React from 'react'
import PropTypes from 'prop-types'

import './article.css'
import articleContainer from '../../containers/articles/articleContainer'
import ArticleSwitch from './ArticleSwitch'

const Article = (props) => {
  return (
    <article
      id={props.item._id}
      className="Article"
      style={{ flex: props.item.values.articleFlex }}
    >
      <ArticleSwitch {...props} />
    </article>
  )
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
