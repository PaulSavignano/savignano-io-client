import React from 'react'
import PropTypes from 'prop-types'
import { CardTitle } from 'material-ui/Card'

import formatPrice from '../../utils/formatPrice'
import H3 from '../typography/H3'

const CartTotal = ({ dispatch, cart, user }) => (
  cart.total &&
  <div className="padding-16px text-align-right">
    <H3>Subtotal {formatPrice(cart.subTotal)}</H3>
    <H3>Taxes {cart.tax * 100}%</H3>
    <H3>Total {formatPrice(cart.total)}</H3>
  </div>
)

CartTotal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default CartTotal
