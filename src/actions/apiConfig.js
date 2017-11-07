import { SubmissionError } from 'redux-form'

import handleAuthFetch from '../utils/handleAuthFetch'

const api = process.env.REACT_APP_API_ENDPOINT
const clientName = process.env.REACT_APP_CLIENT_NAME
export const type = 'API_CONFIG'
const route = 'api-configs'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}`
const RECEIVE = `RECEIVE_${type}`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const ERROR = `ERROR_${type}`

const fetchFailure = (error) => ({ type: ERROR, error })

// Create
export const fetchAddSuccess = (item) => ({ type: ADD, item })
export const fetchAdd = (add) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `${api}/${route}/${clientName}`,
      method: 'POST',
      body: add
    })
    .then(json => dispatch(fetchAddSuccess(json)))
    .catch(error => {
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}



// Read
const fetchApiConfigRequest = () => ({ type: REQUEST })
const fetchApiConfigSuccess = (item) => ({ type: RECEIVE, item })
export const fetchApiConfig = () => {
  return (dispatch, getState) => {
    dispatch(fetchApiConfigRequest())
    return handleAuthFetch({
      path: `${api}/${route}/${clientName}`,
      method: 'GET',
      body: null
    })
    .then(json => {
      dispatch(fetchApiConfigSuccess(json))
    })
    .catch(error => {
      console.error(error)
      dispatch(fetchFailure(error))
    })
  }
}



// Update
export const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
export const fetchUpdate = ({ _id, values }) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `${api}/${route}/${clientName}/${_id}`,
      method: 'PATCH',
      body: { values }
    })
    .then(json => {
      dispatch(fetchUpdateSuccess(json))
    })
    .catch(error => {
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}



// Delete
export const deleteState = () => ({ type: DELETE })
const fetchDeleteSuccess = (_id) => ({ type: DELETE })
export const fetchDelete = (_id) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `${api}/${route}/${clientName}/${_id}`,
      method: 'DELETE',
      body: null
    })
    .then(json => {
      dispatch(fetchDeleteSuccess(json._id))
    })
    .catch(error => {
      dispatch(fetchFailure(error))
      throw new SubmissionError({ ...error, _error: 'Delete failed!' })
    })
  }
}
