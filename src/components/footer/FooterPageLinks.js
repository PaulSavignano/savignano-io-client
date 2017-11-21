import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import { NavLink } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

import './footer.css'

class FooterPageLinks extends Component {
  state = {
    navClass: null,
    width: 0
  }
  componentDidMount() {
    const width = this.navigation.clientWidth
    const totalWidth = width/.70
    let navClass
    switch(true) {
      case totalWidth < 375:
        navClass = 'largerThanIphone375'
        break
      case totalWidth < 667:
        navClass = 'largerThanIphone667'
        break
      case totalWidth < 768:
        navClass = 'largerThanIpad768'
        break
      case totalWidth < 1024:
        navClass = 'largerThanIpad1024'
        break
      case totalWidth < 1366:
        navClass = 'largerThanIpad1366'
        break
      default:
        navClass = 'largerThan1920'
    }
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
        className="footer-navigation-container"
      >
        <div className="footer-navigation">
          <div
            className={`${navClass} appbar-navigation`}
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
        </div>
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
