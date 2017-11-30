import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import asyncComponent from '../../containers/routers/asyncComponent'
import PrivateRoute from './PrivateRoute'

import CartPage from '../cart/CartPage'
import CheckoutPage from '../checkout/CheckoutPage'
import NotFoundPage from '../not-found/NotFoundPage'
import OrderConfirmationPage from '../orders/OrderConfirmationPage'
import OrderDetailPage from '../orders/OrderDetailPage'
import Page from '../pages/Page'
import ProductPage from '../products/ProductPage'
import RecoveryPage from '../user/RecoveryPage'
import ResetPage from '../user/ResetPage'
import SigninPage from '../user/SigninPage'
import SignupPage from '../user/SignupPage'
import UserProfilePage from '../user/UserProfilePage'

import RequestEstimate from '../../moverbase/components/RequestEstimate'

const AdminOrderDetailPage = asyncComponent(() => import('../orders/AdminOrderDetailPage'))
const AdminOrderPage = asyncComponent(() => import('../orders/AdminOrderPage'))
const AdminPage = asyncComponent(() => import('../pages/AdminPage'))
const AdminPagesListPage = asyncComponent(() => import('../pages/AdminPagesListPage'))
const AdminUsersEditUserPage = asyncComponent(() => import('../users/AdminUsersEditUserPage'))
const AdminUsersPage = asyncComponent(() => import('../users/AdminUsersPage'))
const ApiConfigPage = asyncComponent(() => import('../apiConfig/ApiConfigPage'))
const BrandAdminAddPage = asyncComponent(() => import('../brands/BrandAdminAddPage'))
const BrandAdminPage = asyncComponent(() => import('../brands/BrandAdminPage'))


const Routes = ({ roles }) => (
  <Switch>
    <PrivateRoute exact path="/admin/add-brand" roles={roles} requiredRoles={['admin']} component={BrandAdminAddPage} />
    <PrivateRoute exact path="/admin/api-config" roles={roles} requiredRoles={['admin']} component={ApiConfigPage} />
    <PrivateRoute exact path="/admin/brand/:brandItem" roles={roles} requiredRoles={['admin']} component={BrandAdminPage} />
    <PrivateRoute exact path="/admin/orders" roles={roles} requiredRoles={['admin']} component={AdminOrderPage} />
    <PrivateRoute exact path="/admin/orders/:orderId" roles={roles} requiredRoles={['admin']} component={AdminOrderDetailPage} />
    <PrivateRoute exact path="/admin/pages" roles={roles} requiredRoles={['admin']} component={AdminPagesListPage} />
    <PrivateRoute exact path="/admin/pages/:slug" roles={roles} requiredRoles={['admin']} component={AdminPage} />
    <PrivateRoute exact path="/admin/users" roles={roles} requiredRoles={['owner']} component={AdminUsersPage} />
    <PrivateRoute exact path="/admin/users/edit/:userId" roles={roles} requiredRoles={['owner']} component={AdminUsersEditUserPage} />
    <PrivateRoute exact path="/user/checkout" roles={roles} requiredRoles={['user']} component={CheckoutPage} />
    <PrivateRoute exact path="/user/order/:orderId" roles={roles} requiredRoles={['user']} component={OrderConfirmationPage} />
    <PrivateRoute exact path="/user/orders/:orderId" roles={roles} requiredRoles={['user']} component={OrderDetailPage} />
    <PrivateRoute exact path="/user/profile" roles={roles} requiredRoles={['user', 'admin']} component={UserProfilePage} />
    <Route exact path="/:slug" component={Page} />
    <Route exact path="/" component={Page} />
    <Route exact path="/products/:productSlug/:productId" component={ProductPage} />
    <Route exact path="/user/cart" component={CartPage} />
    <Route exact path="/user/recovery" component={RecoveryPage} />
    <Route exact path="/user/reset/:resetToken" component={ResetPage} />
    <Route exact path="/user/signin" component={SigninPage} />
    <Route exact path="/user/signup" component={SignupPage} />

    <Route exact path="/user/request-estimate" component={RequestEstimate} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default Routes
