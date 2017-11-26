import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

import './footer.css'
import footerContainer from '../../containers/footer/footerContainer'
import FooterPageLinks from './FooterPageLinks'
import Media from '../media/Media'

const Footer = ({
  business: {
    values: {
      name,
      license,
      phone,
      email,
      street,
      city,
      state,
      zip,
      facebook,
      github,
      google,
      instagram,
      linkedin,
      twitter,
      yelp,
      youtube
    }
  },
  item: {
    image,
    values: {
      alignItems,
      backgroundColor,
      borderBottom,
      borderTop,
      boxShadow,
      color,
      flexFlow,
      imageBorderRadius,
      imageElevation,
      imageMargin,
      imagePadding,
      justifyContent,
      textAlignItems,
    }
  },
  pages,
  primary1Color,
  propsForParent
}) => (
  <footer {...propsForParent}>
    <Paper
      className="footer-paper"
      style={{
        alignItems,
        backgroundColor,
        color,
        flexFlow,
        justifyContent,
        boxShadow
      }}
    >
      {image && image.src ?
        <div className="footer-image">
          <Media
            image={image}
            borderRadius={imageBorderRadius}
            elevation={imageElevation}
            margin={imageMargin}
            padding={imagePadding}
          />
        </div>
      : null
      }
      <div className="Footer-text" style={{ alignItems: textAlignItems }}>
        <FooterPageLinks
          pages={pages}
        />
        <div className="footer-social-media">
          { facebook && <a href={facebook}><FontIcon className="fa fa-facebook-square" /></a> }
          { github && <a href={github}><FontIcon className="fa fa-github-square" /></a> }
          { google && <a href={google}><FontIcon className="fa fa-google-plus-square" /></a> }
          { instagram && <a href={instagram}><FontIcon className="fa fa-instagram" /></a> }
          { linkedin && <a href={linkedin}><FontIcon className="fa fa-linkedin-square" /></a> }
          { twitter && <a href={twitter}><FontIcon className="fa fa-twitter-square" /></a> }
          { yelp && <a href={yelp}><FontIcon className="fa fa-yelp" /></a> }
          { youtube && <a href={youtube}><FontIcon className="fa fa-youtube-play" /></a> }
        </div>
        <div className="footer-brand">
          <Link to="/">
            <div>&copy; {name || 'Brand'} {new Date().getFullYear()}</div>
          </Link>
          { license && <div>{license}</div>}
          { phone && <div><a href={`tel:${phone.replace(/\D+/g, '')}`}>{phone}</a></div> }
          { email && <div>{email}</div> }
          { street && <div>{street}</div> }
          { city && <div>{city}, {state} {zip}</div> }
        </div>
      </div>

    </Paper>
  </footer>
)

Footer.propTypes = {
  business: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  propsForParent: PropTypes.object,
}

export default footerContainer(Footer)
