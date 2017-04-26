import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { submitAndRedirect, checkPWValidity, updateDOBValidity } from './authActions'
import { UserForm, FormTypes } from './formValidation'

export const Register = ({ submit, validatePasswords, validateDOB }) => {

	return (
		<div className="col-sm-8">
			<div className="panel panel-default">
			<div className="panel panel-heading well">
			<h2> Register New Account </h2>
			</div>
			<UserForm
				validatePasswords={validatePasswords}
				validateDOB={validateDOB}
				submit={submit}
				formStyle = {FormTypes.REGISTER}/>
				</div>
		</div>
	)
}

Register.propTypes = {
	submit: PropTypes.func.isRequired,
	validatePasswords: PropTypes.func.isRequired,
	validateDOB: PropTypes.func.isRequired
}

export default connect((state) => {
	return {}
}, (dispatch) => {
	return {
		submit: (values) => dispatch(submitAndRedirect(values)),
		validatePasswords: (values) => dispatch(checkPWValidity(values)),
		validateDOB: (values) => dispatch(updateDOBValidity(values)),
	}
})(Register)