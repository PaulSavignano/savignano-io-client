import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

import './footer.css'
import footerContainer from '../../containers/footer/footerContainer'
import FooterPageLinks from './FooterPageLinks'
import Media from '../media/Media'
import GithubIcon from '../icons/GithubIcon'
import GoogleplusIcon from '../icons/GoogleplusIcon'
import FacebookIcon from '../icons/FacebookIcon'
import InstagramIcon from '../icons/InstagramIcon'
import LinkedinIcon from '../icons/LinkedinIcon'
import TwitterIcon from '../icons/TwitterIcon'
import YelpIcon from '../icons/YelpIcon'
import YoutubeIcon from '../icons/YoutubeIcon'


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
  propsForParent,
  socialMedia: {
    values: {
      facebook,
      github,
      googleplus,
      instagram,
      linkedin,
      twitter,
      yelp,
      youtube
    }
  }
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
          { github && <a href={github}><GithubIcon color={color}/></a> }
          { googleplus && <a href={googleplus}><GoogleplusIcon color={color} /></a> }
          { instagram && <a href={instagram}><InstagramIcon color={color} /></a> }
          { linkedin && <a href={linkedin}><LinkedinIcon color={color} /></a> }
          { twitter && <a href={twitter}><TwitterIcon color={color} /></a> }
          { yelp && <a href={yelp}><YelpIcon color={color} /></a> }
          { youtube && <a href={youtube}><YoutubeIcon color={color} /></a> }
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
