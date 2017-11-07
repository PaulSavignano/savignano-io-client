import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import withTracker from '../../containers/google-analytics/withTracker'

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

const Routes = () => (
  <Switch>
    <Route exact path="/" component={withTracker(Page)} />
    <Route exact path="/:slug" component={withTracker(Page)} />
    <PrivateRoute exact path="/admin/brand/:brandItem" requiredRoles={['admin']} component={BrandAdminPage} />
    <PrivateRoute exact path="/admin/add-brand" requiredRoles={['admin']} component={BrandAdminAddPage} />
    <PrivateRoute exact path="/admin/api-config" requiredRoles={['admin']} component={ApiConfigPage} />

    <PrivateRoute exact path="/admin/orders" requiredRoles={['admin']} component={AdminOrderPage} />
    <PrivateRoute exact path="/admin/orders/:orderId" requiredRoles={['admin']} component={AdminOrderDetailPage} />
    <PrivateRoute exact path="/admin/pages" requiredRoles={['admin']} component={AdminPagesListPage} />
    <PrivateRoute exact path="/admin/pages/:slug" requiredRoles={['admin']} component={withRouter(AdminPage)} />
    <PrivateRoute exact path="/admin/users" requiredRoles={['owner']} component={AdminUsersPage} />
    <PrivateRoute exact path="/admin/users/edit/:userId" requiredRoles={['owner']} component={withRouter(AdminUsersEditUserPage)} />
    <Route exact path="/products/:productSlug/:productId" component={withTracker(ProductPage)} />
    <Route exact path="/user/cart" component={withTracker(CartPage)} />
    <PrivateRoute exact path="/user/order" requiredRoles={['user']} component={withTracker(OrderAdd)} />
    <PrivateRoute exact path="/user/order/:orderId" requiredRoles={['user']} component={withRouter(withTracker(OrderConfirmation))} />
    <PrivateRoute exact path="/user/orders/:orderId" requiredRoles={['user']} component={withRouter(OrderDetailPage)} />
    <PrivateRoute exact path="/user/profile" requiredRoles={['user', 'admin']} component={UserProfilePage} />
    <Route exact path="/user/recovery" component={Recovery} />
    <Route exact path="/user/request-estimate" component={withTracker(RequestEstimate)} />
    <Route exact path="/user/reset/:resetToken" component={Reset} />
    <Route exact path="/user/signup" component={withTracker(Signup)} />
    <Route exact path="/user/signin" component={withTracker(Signin)} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default Routes
