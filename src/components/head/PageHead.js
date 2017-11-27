import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from "react-helmet"

const PageHead = ({
  pageName,
  brandImage,
  businessName,
  description,
}) => (
  <Helmet>
    {pageName === 'Home' ? <title>{`${businessName}`}</title> : <title>{`${businessName} - ${pageName}`}</title>}
    {description && <meta name="description" content={description} />}
    {description && <meta property="og:description" content={description} />}
    <meta property="og:title" content={`${businessName} - ${pageName}`} />
    <meta property="og:url" content={window.location.href} />
    <script type="application/ld+json">
      {`{
        "@context": "http://schema.org",
        "@type": "Organization",
        "name": "Wash Me Away",
        "description": "Monsters have a way of following you.",
        "url": "http://wendyowensbooks.com/books/wash-me-away",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "reviewCount": "15"
        }
      }`}
    </script>
  </Helmet>
)

PageHead.propTypes = {

  name: PropTypes.string,
}

export default PageHead
