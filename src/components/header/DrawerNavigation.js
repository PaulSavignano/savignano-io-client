import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'

import CartIcon from '../icons/CartIcon'
import DrawerAdminPageLink from './DrawerAdminPageLink'
import DrawerBrandLinks from './DrawerBrandLinks'
import DrawerPageLink from './DrawerPageLink'
import SearchIcon from '../icons/SearchIcon'
import UserButtons from './UserButtons'
import { toggleDrawer } from '../../actions/drawer'
import { searchToggle } from '../../actions/search'

class DrawerNavigation extends Component {
  handleDrawerClose = () => this.props.dispatch(toggleDrawer())
  handleSearchToggle = () => {
    const { dispatch, searchOpen } = this.props
    dispatch(toggleDrawer())
    return dispatch(searchToggle(!searchOpen))
  }
  render() {
    const {
      cartQty,
      dispatch,
      firstName,
      isAdmin,
      isOwner,
      history,
      pages
    } = this.props
    const adminPages = pages.map(page => (
      <DrawerAdminPageLink
        dispatch={dispatch}
        key={page.name}
        page={page}
      />

    ))
    return (
      <div>
        {pages.filter(page => page.slug !== 'home').map(page => (
          <DrawerPageLink
            dispatch={dispatch}
            key={page.name}
            page={page}
          />
        ))}
        {!isAdmin ? null
        :
        <ListItem
          primaryText="Admin"
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="apiConfig"
              onTouchTap={this.handleDrawerClose}
              containerElement={<Link to="/admin/api-config"/>}
            />,
            <ListItem
              key={2}
              primaryText="Brand"
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <DrawerBrandLinks
                  key={1}
                  handleDrawerClose={this.handleDrawerClose}
                />
              ]}
            />,
            <ListItem
              key={3}
              primaryText="Orders"
              onTouchTap={this.handleDrawerClose}
              containerElement={<Link to="/admin/orders"/>}
            />,
            <ListItem
              key={4}
              primaryText="Pages"
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                ...adminPages,
                <ListItem
                  key={1}
                  primaryText="Edit Pages"
                  onTouchTap={this.handleDrawerClose}
                  containerElement={<Link to="/admin/pages"/>}
                />
              ]}
            />,
            isOwner ?
              <ListItem
                key={5}
                primaryText="Users"
                onTouchTap={this.handleDrawerClose}
                containerElement={<Link to="/admin/users"/>}
              />
            : null
          ]}
        />
        }
        <UserButtons
          dispatch={dispatch}
          firstName={firstName}
          history={history}
          onSelect={this.handleDrawerClose}
        />
        {cartQty &&
          <ListItem
            key={5}
            onTouchTap={this.handleDrawerClose}
            style={{ height: 48}}
            children={
              <CartIcon
                key={1}
                iconButtonClassName="drawer-cart-icon-button"
                badgeClassName="drawer-cart-badge"
                fontIconClassName="drawer-cart-font-icon"
                cartQty={cartQty}
                dispatch={dispatch}
                color={null}
              />
            }
          />
        }
        <ListItem
          key={6}
          className="ListItem"
          onTouchTap={this.handleSearchToggle}
          style={{ height: 48 }}
          innerDivStyle={{ padding: 0 }}
          children={
            <SearchIcon
              key={1}
              iconClassName="drawer-search-icon"
            />
          }
        />

      </div>
    )
  }
}

DrawerNavigation.propTypes = {
  cartQty: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  pages: PropTypes.array
}

export default withRouter(DrawerNavigation)
