import React from 'react'
import PropTypes from 'prop-types'

import Buttons from '../buttons/Buttons'
import Text from '../typography/Text'
import Media from '../media/Media'

const HeroContent = ({
  heroStyle: {
    values: {
      button1Color,
      button2Color,
      button1BackgroundColor,
      button2BackgroundColor,
      button1Border,
      button2Border,
      h1Align,
      h1Color,
      h1TextShadow,
      h2Align,
      h2Color,
      h2TextShadow,
      h3Align,
      h3Color,
      h3TextShadow,
      pColor,
      minHeight,
    }
  },
  dispatch,
  hasButtons,
  hasText,
  hasMedia,
  item: {
    _id,
    editing,
    image,
    values: {
      backgroundColor,
      backgroundPositionX,
      button1Text,
      button1Link,
      button2Text,
      button2Link,
      h1Text,
      h2Text,
      h3Text,
      iframe,
      mediaBorder,
      mediaBorderRadius,
      mediaElevation,
      mediaFlex,
      pText
    }
  },
}) => {
  return (
    <div>
      {hasMedia &&
        <div className="hero-media">
          <Media
            borderRadius={mediaBorderRadius}
            elevation={mediaElevation}
            flex={mediaFlex}
            image={image}
            iframe={iframe}
          />
        </div>

      }
      {hasText &&
        <Text
          h1Align={h1Align}
          h2Align={h2Align}
          h3Align={h3Align}
          h1Color={h1Color}
          h2Color={h2Color}
          h3Color={h3Color}
          pColor={pColor}
          h1Text={h1Text}
          h2Text={h2Text}
          h3Text={h3Text}
          pText={pText}
          h1TextShadow={h1TextShadow}
          h2TextShadow={h2TextShadow}
          h3TextShadow={h3TextShadow}
        />
      }
      {hasButtons &&
        <Buttons
          button1BackgroundColor={button1BackgroundColor}
          button2BackgroundColor={button2BackgroundColor}
          button1Border={button1Border}
          button2Border={button2Border}
          button1Color={button1Color}
          button2Color={button2Color}
          button1Link={button1Link}
          button2Link={button2Link}
          button1Text={button1Text}
          button2Text={button2Text}
          dispatch={dispatch}
        />
      }
    </div>
  )
}

HeroContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  heroStyle: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default HeroContent
