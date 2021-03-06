import React from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'

import renderTextField from './renderTextField'
import { normalizePhonePeriods, normalizePhoneParenthesisAndDashes } from '../../utils/normalizePhone'

const PhoneField = ({
  isFetching,
  phoneStyle,
  className,
  fullWidth,
}) => {
  const normalizePhone = phoneStyle === '(###) ###-####' ? normalizePhoneParenthesisAndDashes : normalizePhonePeriods
  return (
    isFetching ? null :
    <Field
      name="phone"
      component={renderTextField}
      label="Phone"
      normalize={normalizePhone}
      className={className}
      fullWidth={fullWidth}
    />
  )
}

export default connect(
  ({ brand: { isFetching, business: { values: { phoneStyle }}}}) => ({
    isFetching,
    phoneStyle
  })
)(PhoneField)
