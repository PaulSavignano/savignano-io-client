import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'

import './checkout.css'
import checkoutContainer from '../../containers/checkout/checkoutContainer'
import CheckoutForm from './CheckoutForm';

const CheckoutPage = (props) => {
  const { stripePkLive, stripePkTest } = props
  return (
    <StripeProvider apiKey={stripePkLive || stripePkTest || 'pk_test_12345'}>
      <Elements>
        <CheckoutForm {...props} />
      </Elements>
    </StripeProvider>
  )
}

export default checkoutContainer(CheckoutPage)
