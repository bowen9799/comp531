import React, { Component, PropTypes } from 'react'
import { goto } from '../../actions'
import { connect } from 'react-redux'
import {
  submitAndRedirect, 
  checkPWValidity,
  checkDoBValidity
} from './authActions'
import { UserForm, formTypes } from './formValidation'

// validate -> register -> redirect 
export const Register = ({ submit, validatePasswords, validateDOB }) => {
  return (
    <div className="col-sm-8">
      <div className="panel panel-default">
        <div className="panel panel-heading well">
          <h3> Register New Account </h3>
        </div>
        <UserForm
            validatePasswords={validatePasswords}
            validateDOB={validateDOB}
            submit={submit}
            formType = {formTypes.REGISTER}/>
      </div>
    </div>
  )
}

Register.propTypes = {
  submit: PropTypes.func.isRequired,
  validatePasswords: PropTypes.func.isRequired,
  validateDOB: PropTypes.func.isRequired
}

export default connect((state) => {return {}}, 
(dispatch) => {return {
    validatePasswords: (actions) => dispatch(checkPWValidity(actions)),
    validateDOB: (actions) => dispatch(checkDoBValidity(actions)),
    submit: (actions) => dispatch(goto('main')),
  }
})(Register)