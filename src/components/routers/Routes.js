import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import AdminOrderPage from '../orders/AdminOrderPage'
import AdminOrderDetailPage from '../orders/AdminOrderDetailPage'
import AdminPage from '../pages/AdminPage'
import AdminPagesListPage from '../pages/AdminPagesListPage'
import AdminUsersPage from '../users/AdminUsersPage'
import AdminUsersEditUserPage from '../../containers/users/AdminUsersEditUserPage'
import ApiConfigPage from '../apiConfig/ApiConfigPage'
import BrandAdminPage from '../brands/BrandAdminPage'
import BrandAdminAddPage from '../brands/BrandAdminAddPage'
import CartPage from '../cart/CartPage'
import NotFoundPage from '../not-found/NotFoundPage'
import OrderAdd from '../orders/OrderAdd'
import OrderConfirmation from '../orders/OrderConfirmation'
import OrderDetailPage from '../orders/OrderDetailPage'
import Page from '../pages/Page'
import ProductPage from '../products/ProductPage'
import Recovery from '../user/Recovery'
import RequestEstimate from '../user/RequestEstimate'
import Reset from '../user/Reset'
import Signin from '../user/Signin'
import Signup from '../user/Signup'
import UserProfilePage from '../../containers/user/UserProfilePage'

const Routes = ({ roles }) => (
  <Switch>
    <Route exact path="/" component={Page} />
    <Route exact path="/:slug" component={Page} />
    <PrivateRoute exact path="/admin/brand/:brandItem" roles={roles} requiredRoles={['admin']} component={BrandAdminPage} />
    <PrivateRoute exact path="/admin/add-brand" roles={roles} requiredRoles={['admin']} component={BrandAdminAddPage} />
    <PrivateRoute exact path="/admin/api-config" roles={roles} requiredRoles={['admin']} component={ApiConfigPage} />

    <PrivateRoute exact path="/admin/orders" roles={roles} requiredRoles={['admin']} component={AdminOrderPage} />
    <PrivateRoute exact path="/admin/orders/:orderId" roles={roles} requiredRoles={['admin']} component={AdminOrderDetailPage} />
    <PrivateRoute exact path="/admin/pages" roles={roles} requiredRoles={['admin']} component={AdminPagesListPage} />
    <PrivateRoute exact path="/admin/pages/:slug" roles={roles} requiredRoles={['admin']} component={AdminPage} />
    <PrivateRoute exact path="/admin/users" roles={roles} requiredRoles={['owner']} component={AdminUsersPage} />
    <PrivateRoute exact path="/admin/users/edit/:userId" roles={roles} requiredRoles={['owner']} component={AdminUsersEditUserPage} />
    <Route exact path="/products/:productSlug/:productId" component={ProductPage} />
    <Route exact path="/user/cart" component={CartPage} />
    <PrivateRoute exact path="/user/order" roles={roles} requiredRoles={['user']} component={OrderAdd} />
    <PrivateRoute exact path="/user/order/:orderId" roles={roles} requiredRoles={['user']} component={OrderConfirmation} />
    <PrivateRoute exact path="/user/orders/:orderId" roles={roles} requiredRoles={['user']} component={OrderDetailPage} />
    <PrivateRoute exact path="/user/profile" roles={roles} requiredRoles={['user', 'admin']} component={UserProfilePage} />
    <Route exact path="/user/recovery" component={Recovery} />
    <Route exact path="/user/request-estimate" component={RequestEstimate} />
    <Route exact path="/user/reset/:resetToken" component={Reset} />
    <Route exact path="/user/signup" component={Signup} />
    <Route exact path="/user/signin" component={Signin} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default Routes
