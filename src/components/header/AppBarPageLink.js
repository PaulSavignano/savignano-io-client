import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import AppBarSectionLink from './AppBarSectionLink'

class AppBarPageLink extends Component {
  state = {
    anchorEl: null,
    openMenu: false,
    timeoutId: null,
    usingMenu: false,
  }
  handleButtonMouseEnter = (e) => {
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget
    })
  }
  handleButtonMouseLeave = () => {
    if (this.state.usingMenu) return
    const timeoutId = setTimeout(() => {
      if (this.state.usingMenu) return
      this.setState({ openMenu: false, anchorEl: null })
    }, 100)
    this.setState({ timeoutId })
  }
  handleMenuMouseEnter = () => this.setState({ usingMenu: true })
  handleMenuMouseLeave = () => {
    this.setState({ openMenu: false, anchorEl: null, usingMenu: false })
  }
  handleCloseMenu = () => this.setState({ openMenu: false })
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }
  render() {
    const {
      color,
      dispatch,
      fontFamily,
      page,
    } = this.props
    return (
      <FlatButton
        onMouseEnter={this.handleButtonMouseEnter}
        onMouseLeave={this.handleButtonMouseLeave}
        style={{ color, minWidth: 'none', margin: '0 16px' }}
        labelStyle={{ padding: '0 0 2px 0', fontFamily }}
        label={page.name}
        hoverColor="none"
        containerElement={<NavLink to={`/${page.slug}`} activeClassName="active-nav" />}
        children={
          page.sections.length ?
            <Popover
              key={1}
              useLayerForClickAway={false}
              open={this.state.openMenu}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={() => this.setState({ openMenu: false })}
              animation={PopoverAnimationVertical}
            >
              <Menu
                onMouseEnter={this.handleMenuMouseEnter}
                onMouseLeave={this.handleMenuMouseLeave}
              >
                {page.sections.map(section => (
                  <AppBarSectionLink
                    dispatch={dispatch}
                    key={section.pageLink}
                    pageLink={section.pageLink}
                    page={page}
                    onCloseMenu={this.handleCloseMenu}
                  />
                ))}
              </Menu>
            </Popover>
          : null
        }/>
      )
    }
  }


AppBarPageLink.propTypes = {
  color: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  fontFamily: PropTypes.string.isRequired,
  page: PropTypes.object,
}

export default AppBarPageLink
