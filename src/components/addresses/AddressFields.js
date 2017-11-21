import React from 'react'
import { Field } from 'redux-form'

import normalizePhone from '../../utils/normalizePhone'
import normalizeZip from '../../utils/normalizeZip'
import normalizeState from '../../utils/normalizeState'

import renderTextField from '../fields/renderTextField'
import PhoneField from '../fields/PhoneField'

const AddressFields = ({ initialValues }) => {
  return (
    <div className="field-container">
      <Field
        name="name"
        label="Name"
        type="text"
        className="field"
        component={renderTextField}
      />
      <PhoneField />
      <Field
        name="street"
        label="Street"
        type="text"
        className="field"
        component={renderTextField}
      />
      <Field
        name="city"
        label="City"
        type="text"
        className="field"
        component={renderTextField}
      />
      <Field
        name="state"
        label="State"
        type="text"
        className="field"
        component={renderTextField}
        normalize={normalizeState}
      />
      <Field
        name="zip"
        label="Zip"
        type="text"
        className="field"
        component={renderTextField}
        normalize={normalizeZip}
      />
    </div>
  )
}

export default AddressFields
