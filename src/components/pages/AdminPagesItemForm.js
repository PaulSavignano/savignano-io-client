import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate, fetchDelete } from '../../actions/pages'
import renderSuccessableTextField from '../../components/fields/renderSuccessableTextField'


class AdminPagesItemForm extends Component {
  handleFormSubmit = (values) => {
    const { dirty, dispatch, _id } = this.props
    if (dirty) return dispatch(fetchUpdate({
      path: `${_id}/update-values`,
      update: { values }
    }))
  }
  handleDelete = () => {
    const { dispatch, _id } = this.props
    if (window.confirm('Are you sure you want to delete this page?')) {
      return dispatch(fetchDelete(_id))
    }
  }
  render() {
    const {
      handleNavigation,
      handleSubmit
    } = this.props
    return (
      <form className="admin-pages-item" onBlur={handleSubmit(this.handleFormSubmit)}>
        <Field
          name="name"
          label="Name"
          type="text"
          component={renderSuccessableTextField}
        />
        <div>
          <RaisedButton
            onTouchTap={handleNavigation}
            type="button"
            label="Edit"
            style={{ margin: 4 }}
            primary={true}
          />
          <RaisedButton
            onTouchTap={this.handleDelete}
            type="button"
            label="X"
            className="delete-button"
            style={{ margin: 4 }}
            primary={true}
          />
        </div>
      </form>
    )
  }
}

AdminPagesItemForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default reduxForm({ destroyOnUnmount: false })(AdminPagesItemForm)
