import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import { NavLink } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

import './footer.css'
import getNavClass from '../../utils/getNavClass'

class FooterPageLinks extends Component {
  state = {
    navClass: null,
    width: 0
  }
  componentDidMount() {
    const width = this.navigation.clientWidth
    const totalWidth = width/.50
    const navClass = getNavClass(totalWidth)
    this.setState({ navClass, width });
  }
  render() {
    const { navClass } = this.state
    const {
      color,
      dispatch,
      fontFamily,
      pages,
      primary1Color,
    } = this.props
    return (
      <div
        ref={(navigation) => this.navigation = navigation}
        style={{ fontFamily }}
        className={`${navClass} footer-page-navigation`}
      >
        {pages.length ? pages.filter(page => page.slug !== 'home').map(page => (
          <FlatButton
            key={page.name}
            style={{ color, minWidth: 'none', margin: '0 16px' }}
            labelStyle={{ padding: '0 0 2px 0', fontFamily }}
            label={page.name}
            hoverColor="none"
            containerElement={
              <NavLink to={`/${page.slug}`} activeClassName="active-nav" />
            }
          />
        ))
        :
          null
        }
      </div>
    )
  }
}

FooterPageLinks.propTypes = {
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  pages: PropTypes.array,
}

export default FooterPageLinks
