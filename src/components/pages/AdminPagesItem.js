import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import history from '../../containers/routers/history'
import AdminPagesItemForm from './AdminPagesItemForm'

class AdminPagesItem extends Component {
  state = {
    elevation: 1
  }
  handleNavigation = () => {
    const { item: { slug }} = this.props
    history.push(`/admin/pages/${slug}`)
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  render() {
    const {
      item: {
        values: { name },
        _id,
        slug
      }
    } = this.props
    return (
      <Card
        zDepth={this.state.elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="card"
      >{slug === 'home' ?
        <div className="admin-pages-item-home">
          <div className="admin-pages-item-name">Home</div>
          <div>
            <RaisedButton
              onTouchTap={this.handleNavigation}
              type="button"
              label="Edit"
              style={{ margin: 4 }}
              primary={true}
            />
          </div>
        </div>
      :
      <AdminPagesItemForm
        handleNavigation={this.handleNavigation}
        _id={_id}
        initialValues={{ name }}
        form={`page-${slug}-name-form`}
      />
      }
      </Card>
    )
  }
}

AdminPagesItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default AdminPagesItem
