import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'

import './card.css'
import cardContainer from '../../containers/cards/cardContainer'
import CardContent from './CardContent'
import { startEdit } from '../../actions/editItem'

class AdminCard extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({
      item,
      kind: 'CARD',
    }))
  }
  render() {
    const {
      cardStyle,
      cursor,
      elevation,
      linkEvents,
      item: {
        values: {
          flex: itemFlex,
        }
      },
    } = this.props
    const {
      flex: cardStyleFlex,
      margin,
    } = cardStyle.values
    return (
      <div
        className="AdminCard"
        style={{ cursor, flex: itemFlex || cardStyleFlex, margin }}
      >
        <Card
          {...linkEvents}
          onTouchTap={this.handleStartEdit}
          zDepth={elevation}
        >
          <CardContent {...this.props} />
        </Card>
      </div>

    )
  }
}

AdminCard.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  cursor: PropTypes.string,
  elevation: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  linkEvents: PropTypes.object,
  linkNavigation: PropTypes.object,
}

export default cardContainer(AdminCard)
