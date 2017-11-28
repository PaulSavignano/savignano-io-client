import React from 'react'
import PropTypes from 'prop-types'

import './media.css'
import shadows from '../../utils/shadows'

const Media = ({
  border,
  borderRadius,
  className,
  elevation,
  flex,
  iframe,
  image,
  margin,
  padding,
  style,
}) => (
  <div
    style={{ border, flex, margin, padding }}
    className={className}
    id="Media"
  >
    {image && image.src ?
      <img
        src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${image.src}`}
        alt="card"
        style={{ borderRadius, boxShadow: shadows[elevation], ...style }}
        className="media-image"
      />
    :
      iframe &&
      <div>
        <div className="media-iframe-container">
          <iframe
            className="media-iframe"
            title="iframe"
            style={{ borderRadius, boxShadow: shadows[elevation], ...style }}
            src={iframe}
            allowFullScreen
          >
          </iframe>
        </div>
      </div>

    }
  </div>
)

Media.propTypes = {
  image: PropTypes.object,
  iframe: PropTypes.string,
}

export default Media
