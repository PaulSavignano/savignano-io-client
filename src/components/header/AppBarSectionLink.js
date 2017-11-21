import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'

import slugIt from '../../utils/slugIt'
import history from '../../containers/routers/history'

class AppBarSectionLink extends Component {
  state = {
    intervalId: null
  }
  handleNavigation = () => {
    const { page, pageLink } = this.props
    this.props.onCloseMenu()
    history.push(`/${page.slug}`)
    const intervalId = setInterval(() => {
      history.push(`/${page.slug}#${slugIt(pageLink)}`)
      clearInterval(this.state.intervalId)
      this.setState({ intervalId: null })
    }, 9)
    this.setState({ intervalId })
  }
  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
      this.setState({ intervalId: null })
    }
  }
  render() {
    const {
      pageLink,
      onCloseMenu,
      page
    } = this.props
    return (
      <MenuItem
        primaryText={pageLink}
        onTouchTap={this.handleNavigation}
      />
    )
  }
}

AppBarSectionLink.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageLink: PropTypes.string,
  page: PropTypes.object.isRequired
}

export default AppBarSectionLink
