import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
	submitAndRedirect, updatePWValidity,
	updateDOBValidity
} from './authActions'
import { FormValidation, FormTypes } from './formValidation'

export const Register = ({ submit, validatePasswords, validateDOB }) => {

	return (
		<div className="col-sm-8">
			<div className="panel panel-default">
			<div className="panel panel-heading well">
			<h2> Register an Account </h2>
			</div>
			<FormValidation
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
		validatePasswords: (values) => dispatch(updatePWValidity(values)),
		validateDOB: (values) => dispatch(updateDOBValidity(values)),
	}
})(Register)