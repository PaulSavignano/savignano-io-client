import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import H2 from '../typography/H2'
import { fetchAdd } from '../../actions/apiConfig'

class ApiConfigAdd extends Component {
  handleApiConfigAdd = () => {
    this.props.dispatch(fetchAdd())
  }
  render() {
    return (
      <section className="section-margin brand-add-page">
        <H2>Let's set up your api config!</H2>
        <RaisedButton
          onTouchTap={this.handleApiConfigAdd}
          label="Add Api Config"
        />
      </section>
    )
  }
}

export default ApiConfigAdd
