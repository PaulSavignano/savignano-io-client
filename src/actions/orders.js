/* global Stripe */
import { getStripeToken } from '../utils/getStripeToken'
import { SubmissionError } from 'redux-form'

import handleAuthFetch from '../utils/handleAuthFetch'
import { fetchDeleteCart } from './cart'
import { fetchUpdateSuccess as fetchUpdateUserSuccess } from './user'

const api = process.env.REACT_APP_API_ENDPOINT
const brandName = process.env.REACT_APP_BRAND_NAME
export const type = 'ORDER'
const route = 'orders'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}S`
const RECEIVE = `RECEIVE_${type}S`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}S`
const ERROR = `ERROR_${type}`


const handleErrorField = (fieldError, buttonError) => {
  throw new SubmissionError({ ...fieldError, _error: buttonError })
}

const fetchAddOrderSuccess = (item) => ({ type: ADD, item })
const fetchAddOrderFailure = (error) => ({ type: ERROR, error })
export const fetchAddOrder = ({
  cart,
  history,
  values: {
    fullAddress,
    name,
    phone,
    street,
    city,
    state,
    zip,
  },
  stripeToken
}) => {
  return (dispatch, getState) => {
    const body = {
      stripeToken,
      fullAddress,
      name,
      phone,
      street,
      city,
      state,
      zip,
      cart
    }
    return handleAuthFetch({
      path: `${api}/${route}/${brandName}`,
      method: 'POST',
      body
    })
    .then(json => {
      const { order, user } = json
      dispatch(fetchAddOrderSuccess(order))
      if (user) dispatch(fetchUpdateUserSuccess(user))
      dispatch(fetchDeleteCart())
      return history.push(`/user/order/${order._id}`)
    })
    .catch(error => {
      let fieldError, buttonError
      if (typeof error === 'string') {
        if (error.indexOf('expiration') >= 0) {
          fieldError = { exp: error }
          buttonError = error
        } else if (error.indexOf('security') >= 0) {
          fieldError = { cvc: error }
          buttonError = error
        } else if (error.indexOf('number') >= 0) {
          fieldError = { number: error }
          buttonError = error
        } else {
          fieldError = null
          buttonError = 'Checkout failed'
        }
      } else if (typeof error === 'object') {
        if (error.message) {
          fieldError = { number: error.message }
          buttonError = 'Charge failed'
        }
      }
      dispatch(fetchAddOrderFailure(error))
      return handleErrorField(fieldError, buttonError)
    })
  }
}









const fetchOrdersRequest = () => ({ type: REQUEST })
export const fetchOrdersSuccess = (items) => ({ type: RECEIVE, items })
const fetchOrdersFailure = (error) => ({ type: ERROR, error })
export const fetchOrders = () => {
  return (dispatch, getState) => {
    dispatch(fetchOrdersRequest())
    return handleAuthFetch({
      path: `${api}/${route}/${brandName}`,
      method: 'GET',
      body: null
    })
    .then(json => dispatch(fetchOrdersSuccess(json)))
    .catch(error => dispatch(fetchOrdersFailure(error)))
  }
}



// Update
const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateFailure = (error) => ({ type: ERROR, error })
export const fetchUpdate = (_id, update) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `${api}/${route}/${brandName}/${_id}`,
      method: 'PATCH',
      body: update
    })
    .then(json => dispatch(fetchUpdateSuccess(json)))
    .catch(error => {
      dispatch(fetchUpdateFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}


export const deleteOrders = (items) => {
  return {
    type: DELETE,
  }
}
