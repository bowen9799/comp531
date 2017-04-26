import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { validateLogin } from './authActions'

export const Login = ({ validate }) => {
  let inputs = {};
  const _validate = () => {
      validate({
        username: inputs.username.value, 
        password: inputs.password.value
      })
  }
  return (
    <div className="col-sm-8">
      <div className="panel panel-default panel-primary">
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
              className="form-control"
              name="username"
              type="text"
              placeholder="username"
              ref={(node) => inputs.username = node} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label text-right">
            Password:
          </label>
          <div className="col-sm-8">
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="password"
              ref={(node) => inputs.password = node} />
          </div>
        </div>
        <div className="form-group row">
          <span className="col-sm-3"></span>
          <div className="col-sm-8">
            <input className="btn btn-success" type="button"
              onClick={_validate} value="Log In" />
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

export default connect(() => {return {}},

(dispatch) => ({
    validate: (values) => dispatch(validateLogin(values))
  })
)(Login)