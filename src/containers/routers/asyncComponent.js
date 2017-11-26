import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'

import './routers.css'

const asyncComponent = (importComponent) => {
  class AsyncComponent extends Component {
    state = {
      component: null
    }
    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({ component })
    }
    render() {
      const C = this.state.component
      return C ?
      <C {...this.props} />
      :
      <div className="AsyncComponent-loading">
        <CircularProgress size={25} style={{ verticalAlign: 'middle' }} />
      </div>
    }
  }
  return AsyncComponent
}

export default asyncComponent
