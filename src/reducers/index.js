import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import apiConfig from './apiConfig'
import brand from './brand'
import carts from './carts'
import drawer from './drawer'
import editItem from './editItem'
import orders from './orders'
import pages from './pages'
import products from './products'
import search from './search'
import swipeables from './swipeables'
import user from './user'
import users from './users'

const rootReducer = combineReducers({
  apiConfig,
  brand,
  carts,
  drawer,
  editItem,
  form: formReducer,
  orders,
  pages,
  products,
  search,
  swipeables,
  user,
  users
})

export default rootReducer
