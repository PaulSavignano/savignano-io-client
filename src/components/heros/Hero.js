import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'

import './hero.css'
import heroContainer from '../../containers/heros/heroContainer'
import HeroContent from './HeroContent'

const Hero = ({
  heroStyle,
  dispatch,
  hasButtons,
  hasText,
  hasMedia,
  item,
  propsForParent,
}) => {
  return (
    <div {...propsForParent}>
      <Card
        id={item._id}
        zDepth={0}
        className="hero-child"
      >
        <HeroContent
          dispatch={dispatch}
          heroStyle={heroStyle}
          hasButtons={hasButtons}
          hasText={hasText}
          hasMedia={hasMedia}
          item={item}
        />
      </Card>
    </div>
  )
}

Hero.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  heroStyle: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default heroContainer(Hero)
