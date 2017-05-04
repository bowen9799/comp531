import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionTypes, goto } from '../actions'
import { Locations } from './app'
import { logoutRedirect } from './navbarActions'

export const Navbar = ({ location, gotoProfile, gotoLanding, gotoMain,
  logout }) => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            {/*image is small and only loads once everytime, so did not cache*/}
            <img alt="Brand" src="http://www.e-learningforkids.org/static/img/icons/efk_icon_environmentalskills_30x30.png"></img>
          </a>
        </div>
        {location == Locations.MAIN_PAGE &&
          <ul className="nav navbar-nav  navbar-left">
            <li><a href="#" id="profilePageLink" onClick={gotoProfile}>Edit Profile</a></li>
            <li><a href="#" onClick={logout} id="logoutButton">Log Out</a></li>
          </ul>
        }
        {location == Locations.PROFILE_PAGE &&
          <ul className="nav navbar-nav  navbar-left">
            <li><a href="#" onClick={gotoMain}>Main Page</a></li>
          </ul>
        }
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  location: PropTypes.string.isRequired,
  gotoProfile: PropTypes.func.isRequired,
  gotoLanding: PropTypes.func.isRequired,
  gotoMain: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      location: state.app.location,
    }
  },
  (dispatch) => {
    return {
      gotoProfile: () => dispatch(goto(Locations.PROFILE_PAGE)),
      gotoLanding: () => dispatch(goto(Locations.LANDING_PAGE)),
      gotoMain: () => dispatch(goto(Locations.MAIN_PAGE)),
      logout: ()=>dispatch(logoutRedirect())
    }
  }
)(Navbar)