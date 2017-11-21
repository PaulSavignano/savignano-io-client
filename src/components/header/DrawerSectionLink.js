import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListItem } from 'material-ui/List'

import slugIt from '../../utils/slugIt'
import history from '../../containers/routers/history'
import { toggleDrawer } from '../../actions/drawer'

class DrawerSectionLink extends Component {
  state = {
    intervalId: null
  }
  handleNavigation = () => {
    const { dispatch, page, section: { pageLink }} = this.props
    history.push(`/${page.slug}`)
    dispatch(toggleDrawer())
    const intervalId = setInterval(() => {
      history.push(`/${page.slug}#${slugIt(pageLink)}`)
      clearInterval(this.state.intervalId)
      this.setState({ intervalId: null })
    }, 3)
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
      section,
      page
    } = this.props
    return (
      <ListItem
        key={section.pageLink}
        primaryText={section.pageLink}
        onTouchTap={this.handleNavigation}
        innerDivStyle={{ marginLeft: 16 }}
      />
    )
  }
}

DrawerSectionLink.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired
}

export default DrawerSectionLink
