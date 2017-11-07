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
  render() {
    const { firstName } = this.props
    return (
      <section className="section-margin brand-add-page">
        <H2>Hi {firstName}, let's set up your brand!</H2>
        <RaisedButton
          onTouchTap={this.handleBrandAdd}
          label="Add Brand"
        />
      </section>
    )
  }
}

BrandAdminAddPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
}

export default BrandAdminAddPage
