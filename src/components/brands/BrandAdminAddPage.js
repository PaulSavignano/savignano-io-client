import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import history from '../../containers/routers/history'
import H2 from '../typography/H2'
import { fetchAdd } from '../../actions/brand'

class BrandAdminAddPage extends Component {
  handleBrandAdd = () => {
    return this.props.dispatch(fetchAdd()).then(() => history.push('/admin/brand/business'))
  }
  handleSignup = () => {
    const { dispatch } = this.props
    dispatch({ type: 'REDIRECT_USER', path: '/admin/add-brand'})
    return history.push('/user/signup')
  }
  render() {
    const { firstName } = this.props
    return (
      <section className="section-margin brand-add-page">
        <H2>
          {firstName ?
            `Hi ${firstName}, let's set up your brand!`
          :
            `Welcome to your app!  Please signin to continue.`
          }
        </H2>
        <RaisedButton
          onTouchTap={firstName ? this.handleBrandAdd : this.handleSignup }
          label={firstName ? `Add Brand` : `Signup`}
        />
      </section>
    )
  }
}

BrandAdminAddPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  firstName: PropTypes.string,
}

export default BrandAdminAddPage
