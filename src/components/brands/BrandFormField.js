import React, { Component } from 'react'
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'

import renderSelectField from '../fields/renderSelectField'
import renderTextField from '../fields/renderTextField'
import normalizeZip from '../../utils/normalizeZip'
import normalizeState from '../../utils/normalizeState'
import PhoneField from '../fields/PhoneField'

class BrandFormField extends Component {
  handleNumberField = (value, previousValue) => {
    const { max, min } = this.props
    if (value < min || value > max) {
      return previousValue
    }
    return value
  }
  render() {
    const {
      fontFamily,
      name,
      options,
      type
    } = this.props
    switch(type) {
      case 'number':
        return (
          <Field
            key={name}
            name={name}
            label={name}
            type={type}
            component={renderTextField}
            className="field"
            style={{ fontFamily }}
            normalize={this.handleNumberField}
          />
        )
      case 'phone':
        return (
          <PhoneField
            key={name}
            className="field"
          />
        )
      case 'select':
        return (
          <Field
            key={name}
            name={name}
            component={renderSelectField}
            label={name}
            className="field"
          >
            {options.map(option => (
              <MenuItem
                key={option}
                value={option}
                primaryText={option}
              />
            ))}
          </Field>
        )
      case 'state':
        return (
          <Field
            key={name}
            name={name}
            label={name}
            component={renderTextField}
            className="field"
            style={{ fontFamily }}
            normalize={normalizeState}
          />
        )
      case 'text':
        return (
          <Field
            key={name}
            name={name}
            label={name}
            value='rgb(1,2,3)'
            component={renderTextField}
            className="field"
            style={{ fontFamily }}
          />
        )
      case 'zip':
        return (
          <Field
            key={name}
            name={name}
            label={name}
            component={renderTextField}
            className="field"
            style={{ fontFamily }}
            normalize={normalizeZip}
          />
        )
      default:
        return null
    }
  }
}

export default BrandFormField
