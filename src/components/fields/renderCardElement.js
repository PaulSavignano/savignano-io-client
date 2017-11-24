import React from 'react'
import { CardElement } from 'react-stripe-elements'

const styles = {
  base: {
    fontSize: '18px',
    color: 'rgba(0,0,0,.87)',
    letterSpacing: '0.025em',
    fontWeight: 300,
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#9e2146',
  },
}

const renderCardElement = ({
  input,
  label,
  textColor,
  handleChange,
  handleBlur,
  meta: { touched, error },
  ...custom
}) => (
  <CardElement
    style={styles}
    {...custom}
    {...input}
    onBlur={handleBlur}
    onChange={handleChange}
  />
)

export default renderCardElement
