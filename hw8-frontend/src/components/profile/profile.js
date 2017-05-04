import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updatePWValidity, updateDOBValidity } from '../auth/authActions'
import { FormValidation, FormTypes } from '../auth/formValidation'
import { updateUserOnServer } from './profileActions'
import Navbar from '../navbar'

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
				<div className="col-sm-3">
					<img className="img-responsive center-block"
						src={currentUser.avatar} />
					<div className="input-group">
						<label className="control-label">Select Image</label>
						<input type="file"
							accept="image/*"
							name="image"
							ref={(node) => imageSelector = node} />
					</div>
					<p> If the page didn't update after you clicked "Update", 
						clicking again should do the job. </p>
				</div>
				<div className="col-sm-8">
					<h2> Here's your profile </h2>
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