import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import './orders.css'
import H2 from '../typography/H2'
import P from '../typography/P'
import withTracker from '../../containers/google-analytics/withTracker'
import ScrollToTopOnMount from '../routers/ScrollToTopOnMount'
import orderContainer from '../../containers/orders/orderContainer'
import OrderDetail from './OrderDetail'

const OrderConfirmationPage = ({ dispatch, order }) => {
  return (
    <div className="page">
      <ScrollToTopOnMount/>
      <section>
        <div className="page-text">
          <H2 className="page-heading">Order {order._id}</H2>
          <P className="page-paragraph">Hi {order.firstName}, thank you for your order {order._id}!</P>
        </div>
        <OrderDetail
          dispatch={dispatch}
          order={order}
        />
      </section>
    </div>
  )
}

OrderConfirmationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
}

export default withTracker(orderContainer(OrderConfirmationPage))
