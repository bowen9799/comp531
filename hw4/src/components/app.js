import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Landing from './auth/landing'
import Main from './main/main'
import Profile from './profile'

export const App = ({ location }) => {
  if (location == 'main') {
    return (<Main /> )
  } else if (location == 'profile') {
    return (<Profile />)
  } else if (location == 'landing') {
    return (<Landing />)
  }
}

App.propTypes = {
  location: PropTypes.string.isRequired
}

export default connect(
  (state) => {
    return {
      location: state.app.location
    }
  }
)(App)