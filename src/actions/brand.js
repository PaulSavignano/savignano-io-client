import { SubmissionError } from 'redux-form'

import handleAuthFetch from '../utils/handleAuthFetch'
import { fetchAddSuccess as fetchApiConfigAddSuccess } from './apiConfig'
import { fetchAddSuccess as fetchAddPageSuccess } from './pages'

const api = process.env.REACT_APP_API_ENDPOINT
const clientName = process.env.REACT_APP_CLIENT_NAME
export const type = 'BRAND'
const route = 'brands'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}S`
const RECEIVE = `RECEIVE_${type}S`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const ERROR = `ERROR_${type}`

// Create
const fetchAddSuccess = (item) => ({ type: ADD, item })
const fetchAddFailure = (error) => ({ type: ERROR, error })
export const fetchAdd = (add) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `${api}/${route}/${clientName}`,
      method: 'POST',
      body: add
    })
    .then(json => {
      const { apiConfig, brand, page } = json
      dispatch(fetchApiConfigAddSuccess(apiConfig))
      dispatch(fetchAddSuccess(brand))
      dispatch(fetchAddPageSuccess(page))
    })
    .catch(error => {
      dispatch(fetchAddFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}



// Read
const fetchBrandRequest = () => ({ type: REQUEST })
const fetchBrandSuccess = (items) => ({ type: RECEIVE, items })
const fetchBrandFailure = (error) => ({ type: ERROR, error })
export const fetchBrand = () => {
  return (dispatch, getState) => {
    dispatch(fetchBrandRequest())
    return fetch(`${api}/${route}/${clientName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.error) return Promise.reject(json.error)
      dispatch(fetchBrandSuccess(json[0]))
    })
    .catch(error => {
      console.error(error)
      dispatch(fetchBrandFailure(error))
    })
  }
}



// Update
const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateFailure = (error) => ({ type: ERROR, error })
export const fetchUpdate = ({ path, update }) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `${api}/${route}/${clientName}/${path}`,
      method: 'PATCH',
      body: update
    })
    .then(json => dispatch(fetchUpdateSuccess(json)))
    .catch(error => {
      console.error(error)
      dispatch(fetchUpdateFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}



// Delete
const fetchDeleteSuccess = (_id) => ({ type: DELETE, _id })
const fetchDeleteFailure = (error) => ({ type: ERROR, error })
export const fetchDelete = (_id) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `${api}/${route}/${clientName}/${_id}`,
      method: 'DELETE',
      body: null
    })
    .then(json => dispatch(fetchDeleteSuccess(json._id)))
    .catch(error => {
      dispatch(fetchDeleteFailure(error))
      throw new SubmissionError({ ...error, _error: 'Delete failed!' })
    })
  }
}
