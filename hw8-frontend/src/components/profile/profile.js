import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { putZipcode, putEmail, putAvatar } from '../../actions'
import { updatePWValidity, updateDOBValidity, getLoggedinUserData } from '../auth/authActions'
import { FormValidation, FormTypes } from '../auth/formValidation'
import Navbar from '../navbar'

export const updateUserOnServer = (fields) => {
	return (dispatch) => {
		putAvatar(fields.avatarFile).
			then(putZipcode(fields.zipcode))
			.then(putEmail(fields.email))
			.then(dispatch(getLoggedinUserData()))
			.catch(r => console.log(`${r.message} Profile update failure`))
	}
}

export const Profile = ({ currentUser, update, validatePasswords }) => {
	let imageSelector;
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
		if (imageSelector.files && imageSelector.files[0]) {
			var img = imageSelector.files[0]
			fieldsValues.avatarFile = img
		}
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
			<br />
			<br />
			<br />
			<div className="row">
				<div className="col-sm-4 panel pull-right">
					<img className="img-responsive center-block"
						src={currentUser.avatar} />
					<div className="input-group">
						<label className="control-label">Select Image</label>
						<input type="file"
							accept="image/*"
							name="image"
							ref={(node) => imageSelector = node} />
					</div>
				</div>
				<div className="col-sm-8 panel panel-default pull-left">
					<div className="panel panel-heading well">
					<h2> Your profile </h2>
					</div>
					<FormValidation
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
		validatePasswords: (values) => dispatch(updatePWValidity(values)),
	}
})(Profile)