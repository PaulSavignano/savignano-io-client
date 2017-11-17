import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'

import './card.css'
import cardContainer from '../../containers/cards/cardContainer'
import CardContent from './CardContent'

class CardItem extends Component {
  componentDidMount() {
    if (window.location.hash.replace('#', '') === this.props.item._id) this.elRef.scrollIntoView()
  }
  render() {
    const {
      cardStyle,
      cursor,
      elevation,
      item: {
        _id,
        values: {
          flex: itemFlex
        }
      },
      linkEvents,
      linkNavigation
    } = this.props
    const {
      flex: cardStyleFlex,
      margin,
    } = cardStyle.values
    return (
      <div
        style={{ cursor, flex: itemFlex || cardStyleFlex, margin }}
        ref={el => this.elRef = el}
      >
        <Card
          {...linkEvents}
          {...linkNavigation}
          zDepth={elevation}
          id={_id}
          className="CardItem"
        >
          <CardContent {...this.props} />
        </Card>
      </div>
    )
  }
}

CardItem.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  cursor: PropTypes.string,
  elevation: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  linkEvents: PropTypes.object,
  linkNavigation: PropTypes.object,
}

export default cardContainer(CardItem)
