import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { validateLogin } from './authActions'


export const Login = ({ validate }) => {
  let fields = {};

  const _validate = () => {
    if (fields && fields.password && fields.username) {
      validate({
        username: fields.username.value,
        password: fields.password.value
      })
    }
  }

  validate();

  return (
    <div className="col-sm-8">
      <div className="panel panel-default">
      <div className="panel panel-heading well">
      <h2> Log In </h2>
      </div>
      <form>
        <div className="form-group row">
            <label className="col-sm-3 form-control-label text-right">
            Username:
          </label>
          <div className="col-sm-8">
            <input
              id='loginUsernameInput'
              className="form-control"
              name="username"
              type="text"
              placeholder="username"
              ref={(node) => fields.username = node} />
          </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-3 form-control-label text-right">
            Password:
          </label>
          <div className="col-sm-8">
            <input
              id='loginPasswordInput'
              className="form-control"
              name="password"
              type="password"
              placeholder="password"
              ref={(node) => fields.password = node} />
          </div>
        </div>
        <div className="form-group row">
          <span className="col-sm-3"></span>
          <div className="col-sm-8">
            <input className="btn btn-success" type="button"
              onClick={_validate} value="Log In" id='loginButton' />
            <a href="https://ricebook-bowen9799.herokuapp.com/auth/google/login/">
              <img alt="Google" src="googleLogin.png" width="191" height="38" />
            </a>
            <a href="https://ricebook-bowen9799.herokuapp.com/auth/facebook/login/">
              <img alt="Facebook" src="facebookLogin.png" width="247" height="34" />
            </a>
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  validate: PropTypes.func.isRequired
}
export default connect(
  (state) => {
    return {
    }
  },
  (dispatch) => ({
    validate: (values) => dispatch(validateLogin(values))
  })
)(Login)