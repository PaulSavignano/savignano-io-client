import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import SuccessableButton from '../buttons/SuccessableButton'
import renderTextField from '../fields/renderTextField'
import apiConfigContainer from '../../containers/apiConfig/apiConfigContainer'
import ApiConfigAdd from './ApiConfigAdd'

const apiKey1 = process.env.REACT_APP_API_1
const apiKey2 = process.env.REACT_APP_API_2
const apiKey3 = process.env.REACT_APP_API_3

const fields = [
  'gmailUser',
  'oauthAccessToken',
  'oauthClientId',
  'oauthClientSecret',
  'oauthRefreshToken',
  'stripeSkLive',
  'stripeSkTest',
  apiKey1,
  apiKey2,
  apiKey3
]


const ApiConfigPage = ({
  _id,
  dispatch,
  error,
  handleFormSubmit,
  handleSubmit,
  pristine,
  reset,
  submitSucceeded,
  submitting,
}) => (
  <div className="page">
    <section className="section-margin">
      <Card className="brand-form">
        <CardTitle title="apiConfig" />
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="field-container">
            {fields.filter(name => name && name).map(name =>
              <Field
                className="field"
                component={renderTextField}
                key={name}
                label={name}
                name={name}
              />
            )}
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              disabled={pristine}
              error={error}
              label={`update apiConfig`}
              reset={reset}
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              successLabel={`apiConfig updated!`}
            />
          </div>
        </form>
      </Card>
    </section>
  </div>
)

export default apiConfigContainer(reduxForm({
  form: 'apiConfigForm',
  enableReinitialize: true,
})(ApiConfigPage))
