import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { injectStripe, CardElement } from 'react-stripe-elements'
import { Card, CardText, CardTitle } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import Payment from 'payment'

import './checkout.css'
import H2 from '../typography/H2'
import H3 from '../typography/H3'
import P from '../typography/P'
import renderCardElement from '../fields/renderCardElement'
import withTracker from '../../containers/google-analytics/withTracker'
import validateCheckout from '../../utils/validateCheckout'
import SuccessableButton from '../buttons/SuccessableButton'
import DateField from '../fields/DateField'
import renderTextField from '../fields/renderTextField'
import renderSelectField from '../fields/renderSelectField'
import AddressFields from '../addresses/AddressFields'
import formatPrice from '../../utils/formatPrice'
import { fetchAddOrder } from '../../actions/orders'

class CheckoutForm extends Component {
  state = {
    newAddress: false,
    cardError: null,
    addressComplete: false,
    cardComplete: false,
  }
  handleFormSubmit = async (values) => {
    const { dispatch, cart, history } = this.props
    return this.props.stripe.createToken()
    .then(payload => {
      const { token: { id: stripeToken }} = payload
      return dispatch(fetchAddOrder({ values, cart, history, stripeToken }))
    })
    //return dispatch(fetchAddOrder({ values, cart, history, stripePk }))
  }
  handleChange = ({ complete, error, empty }) => {
    const cardError = error ? error.message : null
    this.setState({ cardError, cardComplete: complete })
    console.log({ complete, error })
  }
  componentWillReceiveProps({ invalid }) {
    if (this.props.invalid !== invalid) this.setState({ addressComplete: !invalid })
  }
  render() {
    const {
      addresses,
      cart,
      error,
      handleSubmit,
      invalid,
      pristine,
      stripePk,
      submitSucceeded,
      submitting,
      textColor,
    } = this.props
    return (
          <div className="page">
            <section className="section-margin">
              <Card className="card">
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                  <div className="checkout-heading">
                    <H2>Checkout</H2>
                  </div>
                  <div className="field-container">
                    <div className="card-number">
                      <Field
                        name="number"
                        label="Card"
                        className="field"
                        textColor={textColor}
                        handleChange={this.handleChange}
                        handleBlur={this.handleBlur}
                        component={renderCardElement}
                      />
                      <div className="card-error">{this.state.cardError}</div>
                    </div>
                    <Field
                      name="fullAddress"
                      component={renderSelectField}
                      label="Address"
                      fullWidth={true}
                      className="field"
                    >
                      {addresses.map(address => (
                        <MenuItem
                          key={address._id}
                          value={address._id}
                          onTouchTap={() => this.setState({ newAddress: false })}
                          primaryText={`
                          ${address.values.name}
                          ${address.values.phone}
                          ${address.values.street}
                          ${address.values.city},
                          ${address.values.state}
                          ${address.values.zip}`
                          }/>
                      ))}
                      <MenuItem value="newAddress" primaryText="Enter new address" onTouchTap={() => this.setState({ newAddress: true })} />
                    </Field>
                  </div>
                  {this.state.newAddress && <AddressFields autoFocus={true} />}
                  <div className="checkout-paragraph">
                    <H3>Subtotal {formatPrice(cart.total)}</H3>
                    <H3>Tax {(cart.tax * 100).toFixed(2)}</H3>
                    <H3>Total {formatPrice(cart.total)}</H3>
                  </div>
                  <div className="button-container">
                    <SuccessableButton
                      disabled={pristine || !this.state.cardComplete || !this.state.addressComplete}
                      error={error}
                      label="Place Order"
                      reset={null}
                      submitSucceeded={submitSucceeded}
                      submitting={submitting}
                      successLabel="Order Placed!"
                    />
                  </div>
                </form>
              </Card>
            </section>
          </div>
    )
  }
}

CheckoutForm.propTypes = {
  addresses: PropTypes.array,
  cart: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'CheckoutForm',
  validate: validateCheckout
})(withRouter(withTracker(injectStripe(CheckoutForm))))
