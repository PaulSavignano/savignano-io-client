import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText } from 'material-ui/Card'

import moment from 'moment'
import H2 from '../typography/H2'
import H3 from '../typography/H3'
import P from '../typography/P'
import formatPrice from '../../utils/formatPrice'
import OrderCartList from './OrderCartList'

const styles = {
  orderDetail: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between'
  },
  orderSummary: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between'
  },
  details: {
    margin: '8px 0'
  }
}

const OrderDetail = ({
  dispatch,
  order: {
    _id,
    cart: { items, subTotal, tax, total },
    createdAt,
    address: { name, phone, street, city, state, zip }
  }
}) => (
  <section className="OrderDetail">
    <div className="padding-16px">
      <H2>Order Detail</H2>
      <div style={styles.orderDetail}>
        <P>{`Ordered On ${moment(createdAt).format("dddd, MMMM Do YYYY, h:mm a")}`}</P>
        <P>{`Order #${_id}`}</P>
      </div>
    </div>



    <div className="padding-8px order-address-and-summary">
      <div className="padding-8px">
        <P><strong>Address</strong></P>
        <div className="order-address">
          <P>{name}</P>
          <P>{phone}</P>
          <P>{street}</P>
          <P>{city}, {state} {zip}</P>
        </div>
      </div>
      <div className="padding-8px">
        <P><strong>Order Summary</strong></P>
        <div className="order-summary">
          <div className="order-subtotal">
            <P style={{ marginRight: 16 }}>Subtotal:</P>
            <P>{formatPrice(subTotal)}</P>
          </div>
          <div className="order-tax">
            <P>Tax:</P>
            <P>{(tax * 100).toFixed(2)}</P>
          </div>
        </div>
        <div className="order-summary">
          <div className="order-total">
            <P><strong>Total:</strong></P>
            <P><strong>{formatPrice(total)}</strong></P>
          </div>
        </div>
      </div>
    </div>
    <div>
      <OrderCartList
        dispatch={dispatch}
        items={items}
      />
    </div>
  </section>
)

OrderDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
}

export default OrderDetail
