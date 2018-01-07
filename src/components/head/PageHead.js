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
  </Helmet>
)

PageHead.propTypes = {

  name: PropTypes.string,
}

export default PageHead
