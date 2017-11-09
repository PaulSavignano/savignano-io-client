import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet"

class SiteHead extends Component {
  render() {
    const {
      keywords,
      name,
      image,
      isFetching,
      phone
    } = this.props
    return (
      isFetching ? null :
      <Helmet>
        <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.REACT_APP_IMAGE_ENDPOINT}${image.src}`} />
        <link rel="canonical" href={window.location.hostname} />
        <link rel="icon" type="image/png" href={`${process.env.REACT_APP_IMAGE_ENDPOINT}${image.src}`} sizes="16x16" />
        <link rel="icon" type="image/png" href={`${process.env.REACT_APP_IMAGE_ENDPOINT}${image.src}`} sizes="16x16" />
        <link rel="icon" type="image/png" href={`${process.env.REACT_APP_IMAGE_ENDPOINT}${image.src}`} sizes="32x32" />
        <link rel="icon" type="image/png" href={`${process.env.REACT_APP_IMAGE_ENDPOINT}${image.src}`} sizes="32x32" />
        <meta name="keywords" content={keywords} />
        <meta property="og:image" content={`${process.env.REACT_APP_IMAGE_ENDPOINT}${image.src}`} />
        <meta property="og:site_name" content={name} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {`{
            "@context": "http://schema.org",
            "@type": "Product",
            "name": "${name}",
            "url": "${window.location.pathname}",
            "image": "${process.env.REACT_APP_IMAGE_ENDPOINT}${image.src}",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.5",
              "reviewCount": "15"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "${phone}",
              "contactType": "Customer service"
            }
          }`}
        </script>
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
