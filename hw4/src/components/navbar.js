import { ActionTypes, goto } from '../actions'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const NavBar = ({ location, gotoProfile, gotoLanding, gotoMain }) => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
          {/*image is small and only loads once everytime, so did not cache*/}
            <img alt="Brand" src="http://www.e-learningforkids.org/static/img/icons/efk_icon_environmentalskills_30x30.png"></img>
          </a>
          <a className="navbar-brand" href="#">
            Ricebook
          </a>
        </div>
        {location == 'main' &&
          <ul className="nav navbar-nav  navbar-left">
            <li><a href="#" onClick={gotoProfile}>Profile</a></li>
            <li><a href="#" onClick={gotoLanding}>Log Out</a></li>
          </ul>
        }
        {location == 'profile' &&
          <ul className="nav navbar-nav  navbar-left">
            <li><a href="#" onClick={gotoMain}>Main Page</a></li>
          </ul>
        }    
      </div>
    </nav>
  )
}

NavBar.propTypes = {
  location: PropTypes.string.isRequired,
  gotoProfile: PropTypes.func.isRequired,
  gotoLanding: PropTypes.func.isRequired,
  gotoMain: PropTypes.func.isRequired,
}

export default connect(
  (state) => {
    return {
      location: state.app.location,
    }
  },
  (dispatch) => {
    return {
      gotoMain: () => dispatch(goto('main')),
      gotoProfile: () => dispatch(goto('profile')),
      gotoLanding: () => dispatch(goto('landing')),
    }
  }
)(NavBar)