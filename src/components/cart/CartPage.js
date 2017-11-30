import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'material-ui/Card'

import cartContainer from '../../containers/cart/cartContainer'
import withTracker from '../../containers/google-analytics/withTracker'
import H2 from '../typography/H2'
import CartList from './CartList'
import CartTotal from './CartTotal'
import CheckoutButton from './CheckoutButton'

const CartPage = ({
  canvasColor,
  cart,
  dispatch,
  user
}) => (
  !cart.items.length ?
  <div className="page">
    <section className="section" style={{ backgroundColor: canvasColor }}>
      <H2 className="padding-16px">Nothing in your cart yet</H2>
    </section>
  </div>
  :
  <div className="page">
    <section className="section" style={{ backgroundColor: canvasColor }}>
      <H2 className="padding-16px">Cart</H2>
      <CartList
        cart={cart}
        dispatch={dispatch}
      />
      <CartTotal
        cart={cart}
        dispatch={dispatch}
        user={user}
      />
      <CheckoutButton
        dispatch={dispatch}
        user={user}
      />
    </section>
  </div>
)

CartPage.propTypes = {
  cart: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default withTracker(cartContainer(CartPage))
