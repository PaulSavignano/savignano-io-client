import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet"

const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT
const brandName = process.env.REACT_APP_BRAND_NAME

class SiteHead extends Component {
  render() {
    const {
      description,
      keywords,
      name,
      image,
      isFetching,
      phone
    } = this.props
    return (
      isFetching ? null :
      <Helmet>
        {image && image.src ? <link rel="apple-touch-icon" sizes="180x180" href={`${imageEndpoint}${image.src}`} /> : null }
        {image && image.src ? <link rel="icon" type="image/png" href={`${imageEndpoint}${image.src}`} sizes="16x16" /> : null }
        {image && image.src ? <link rel="icon" type="image/png" href={`${imageEndpoint}${image.src}`} sizes="32x32" /> : null }
        {image && image.src ? <link rel="shortcut icon" href={`${imageEndpoint}${image.src}`} /> : null }
        {image && image.src ? <meta property="og:image" content={`${imageEndpoint}${image.src}`} /> : null }
        {description && <meta name="description" content={description} />}
        {description && <meta property="og:description" content={description} />}
        <meta name="keywords" content={keywords} />
        <meta property="og:site_name" content={name} />
      </Helmet>
    )
  }
}


const mapStateToProps = ({
  brand: {
    business: {
      image,
      values: {
        description,
        keywords,
        name,
        phone,
      }
    },
    isFetching,
  }
}) => ({
  description,
  keywords,
  image,
  isFetching,
  name
})

SiteHead.propTypes = {
  description: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  image: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  keywords: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
}

export default connect(mapStateToProps)(SiteHead)
