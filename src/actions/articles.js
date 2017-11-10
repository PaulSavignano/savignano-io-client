import { SubmissionError } from 'redux-form'

import handleAuthFetch from '../utils/handleAuthFetch'
import * as pageActions from './pages'
import { startEdit, stopEdit } from './editItem'

const api = process.env.REACT_APP_API_ENDPOINT
const brandName = process.env.REACT_APP_BRAND_NAME
export const type = 'ARTICLE'
const route = 'articles'
const ERROR = `ERROR_${type}`

// Create
export const fetchAdd = (add) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `${api}/${route}/${brandName}`,
      method: 'POST',
      body: add
    })
    .then(json => {
      const { editItem, page } = json
      dispatch(pageActions.fetchUpdateSuccess(page))
      return dispatch(startEdit({ item: editItem, kind: 'ARTICLE' }))
    })
    .catch(error => {
      console.error(error)
      dispatch({ type: ERROR, error })
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}

export const fetchUpdate = ({ path, update }) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `${api}/${route}/${brandName}/${path}`,
      method: 'PATCH',
      body: update
    })
    .then(json => {
      const { page } = json
      dispatch(pageActions.fetchUpdateSuccess(page))
      dispatch(stopEdit())
    })
    .catch(error => {
      console.error(error)
      dispatch({ type: ERROR, error })
      throw new SubmissionError({ ...error, _error: 'Update failed!' })
    })
  }
}



// Delete
export const fetchDelete = (_id) => {
  return (dispatch, getState) => {
    return handleAuthFetch({
      path: `${api}/${route}/${brandName}/${_id}`,
      method: 'DELETE',
      body: null
    })
    .then(json => {
      const { page } = json
      dispatch(pageActions.fetchUpdateSuccess(page))
      dispatch(stopEdit())
    })
    .catch(error => {
      dispatch({ type: ERROR, error })
      throw new SubmissionError({ ...error, _error: 'Delete failed!' })
    })
  }
}
