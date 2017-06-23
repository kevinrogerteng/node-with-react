import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class LandingPage extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h1>React/Redux with React Router Boilerplate!</h1>
        <h1>This is the Landing Page</h1>
      </div>
    )
  }
}

export default LandingPage