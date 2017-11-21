import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListItem } from 'material-ui/List'

import DrawerSectionLink from './DrawerSectionLink'
import { toggleDrawer } from '../../actions/drawer'

class DrawerPageLink extends Component {
  handleToggleDrawer = () => this.props.dispatch(toggleDrawer())
  render() {
    const {
      dispatch,
      page,
    } = this.props
    const pageSectionLinks = page.sections.filter(section => section.pageLink)
    if (pageSectionLinks.length) {
      return (
        <ListItem
          primaryText={page.name}
          initiallyOpen={true}
          primaryTogglesNestedList={true}
          nestedItems={pageSectionLinks.map(section => (
            <DrawerSectionLink
              dispatch={dispatch}
              key={section.pageLink}
              section={section}
              page={page}
            />
          ))}
        />
      )
    } else {
      return (
        <ListItem
          containerElement={<Link to={`/${page.slug}`}/>}
          onTouchTap={this.handleToggleDrawer}
          primaryText={page.name}
        />
      )
    }
  }
}

DrawerPageLink.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired
}

export default DrawerPageLink
