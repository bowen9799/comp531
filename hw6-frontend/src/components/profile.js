import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkPWValidity, updateDOBValidity } from './auth/authActions'
import { UserForm, FormTypes } from './auth/formValidation'
import Navbar from './navbar'
import { ActionTypes } from '../actions'
import { putZipcode, putEmail } from '../actions'
import { getLoggedinUserData } from './auth/authActions'

export const Profile = ({ currentUser, update, validatePasswords }) => {
	const _update = (fields) => {
		var fieldsValues = Object.keys(fields).reduce(function (previous, current) {
			if (fields[current] && fields[current].value) {
				previous[current] = fields[current].value;
				return previous;
			}
			else {
				return previous
			}
		}, {});
		update(fieldsValues)
		for (const key of Object.keys(fields)) {
				if (fields[key].value) {
					fields[key].value = ''
				}
			}
	}

	const _validate = () => {
		if (fields && fields.pw && fields.pwConfirm) {
			validate(fields)
		}
	}

	return (
		<div>
			<Navbar />
			<br/>
			<br />
			<br />
			<div className="row">
				<div className="col-sm-4 panel pull-right">
					<img src={currentUser.avatar} />
					<div className="input-group">
							<label className="control-label">Select Image</label>
							<input type="file"
								accept="image" />
						</div>
				</div>
				<div className="col-sm-8 panel panel-default pull-left">
					<div className="panel panel-heading well">
					<h2> Your profile </h2>
					</div>
					<UserForm
						validatePasswords={validatePasswords}
						validateDOB={_ => _}
						submit={_update}
						formStyle={FormTypes.UPDATE}
						currentUser={currentUser} />
				</div>
				<div className="col-sm-1" />
			</div>
		</div>
	)
}

export const updateUserOnServer = (fields) => {
	return (dispatch) => {
		Promise.all([putZipcode(fields.zipcode), putEmail(fields.email)])
			.then(dispatch(getLoggedinUserData()))
			.catch(r => console.log(`${r.message} Error updating user profile.`))
	}
}

Profile.propTypes = {
	currentUser: PropTypes.object.isRequired,
	validatePasswords: PropTypes.func.isRequired,
	update: PropTypes.func.isRequired
}

export default connect((state) => {
	return {
		currentUser: state.main.currentUser
	}
}, (dispatch) => {
	return {
		update: (values) => dispatch(updateUserOnServer(values)),
		validatePasswords: (values) => dispatch(checkPWValidity(values)),
	}
})(Profile)