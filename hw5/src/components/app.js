import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Landing from './auth/landing'
import Main from './main/main'
import Profile from './profile'


export const App = ({ location }) => {
	if (location == Locations.MAIN_PAGE) {
		return (<Main /> )
	} else if (location == Locations.PROFILE_PAGE) {
		return (<Profile />)
	} else if (location == Locations.LANDING_PAGE) {
		return (<Landing />)
	}
}

App.propTypes = {
	location: PropTypes.string.isRequired
}

export const Locations = {
	MAIN_PAGE: 'main',
	PROFILE_PAGE: 'profile',
	LANDING_PAGE: 'landing'
}

export default connect(
	(state) => {
		return {
			location: state.app.location
		}
	}
)(App)