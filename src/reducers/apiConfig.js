import { type } from '../actions/apiConfig'

const apiConfig = (state = {
  isFetching: true,
  _id: null,
  values: {}
}, action) => {
  switch(action.type) {
    case `ADD_${type}`:
      return {
        ...state,
        isFetching: false,
        ...action.item
      }
    case `REQUEST_${type}`:
      return {
        ...state,
        isFetching: true
      }
    case `RECEIVE_${type}`:
      return {
        ...state,
        isFetching: false,
        ...action.item
      }
    case `UPDATE_${type}`:
      return {
        ...state,
        ...action.item
      }
    case `DELETE_${type}`:
      return {
        isFetching: false,
      }
    case `ERROR_${type}`:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      }
    default:
      return state
  }
}

export default apiConfig
