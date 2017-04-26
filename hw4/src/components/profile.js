import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { UserForm, formTypes } from './auth/formValidation'
import Navbar from './navbar'
import { ActionTypes } from '../actions'
import {
  checkPWValidity,
  checkDoBValidity
} from './auth/authActions'
// profille.js is rather simple at the moment, so I temporarily make it a single
// file.
export const Profile = ({ update, currentUser, validatePasswords }) => {
  const _update = (info) => {
    var info = Object.keys(info).reduce(function (previous, current) {
      if (info[current] && info[current].value) {
        previous[current] = info[current].value;
        return previous;
      } else { return previous }
    }, {});
    update(info)
    Object.keys(info).map(key => {
      if (info[key].value) {
          info[key].value = ''
        }
    })
  }
  return (
    <div>
      <Navbar />
      <div className="row">
        <br/>
        <br/>
        <div className="col-sm-4 panel pull-right">
          <img src={currentUser.avatar} />
          <div className="input-group">
              <label className="control-label">Select Image</label>
              <input type="file"
                accept="image" />
            </div>
        </div>
        <br/>
        <div className="col-sm-8 panel panel-default pull-left">
          <div className="panel panel-heading well">
            <h2> Your profile </h2>
          </div>
          <UserForm
            validatePasswords={validatePasswords}
            validateDOB={_ => _}
            submit={_update}
            formType={formTypes.UPDATE}
            currentUser={currentUser} />
        </div>
        <div />
      </div>
    </div>
  )
}

const updateInfo = (info) => {
  return {updatedFields: info, type: ActionTypes.UPDATE_USERS}
}

Profile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  validatePasswords: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
}

export default connect((state) => {
  return {
    currentUser: state.profile.currentUser
  }
}, (dispatch) => {
  return {
    update: (values) => dispatch(updateInfo(values)),
    validatePasswords: (values) => dispatch(checkPWValidity(values)),
  }
})(Profile)