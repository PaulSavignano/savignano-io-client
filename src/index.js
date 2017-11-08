import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker'
import './index.css'
import configureStore from './store/configureStore'
import SiteHead from './containers/head/SiteHead'
import AppRouter from './components/routers/AppRouter'
import Theme from './containers/theme/Theme'

import { fetchBrand } from './actions/brand'
import { fetchCart } from './actions/cart'
import { fetchPages } from './actions/pages'
import { fetchProducts } from './actions/products'
import { fetchUser } from './actions/user'

const store = configureStore()

const accessToken = localStorage.getItem('x-access-token')
if (accessToken) {
  store.dispatch(fetchUser())
}
const cart = localStorage.getItem('cart')
if (cart) {
  store.dispatch(fetchCart(cart))
}

store.dispatch(fetchBrand())
store.dispatch(fetchPages())
store.dispatch(fetchProducts())

render(
  <Provider store={store}>
    <div>
      <SiteHead/>
      <Theme>
        <AppRouter />
      </Theme>
    </div>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
