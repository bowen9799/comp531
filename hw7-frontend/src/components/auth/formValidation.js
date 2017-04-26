import React, { Component, PropTypes } from 'react'

export const FormTypes = {
	REGISTER: "FORM_REGISTER",
	UPDATE: "FORM_UPDATE"
}

export const UserForm = ({ submit, validateDOB, validatePasswords, formStyle, currentUser }) => {
	let form
	let fields = {}

	let isRegister = formStyle == FormTypes.REGISTER
	let dateString = ""
	if (!isRegister && !currentUser) {
		console.error("No user info in update form")
		isRegister = true
	}

	if (!isRegister) {
		dateString = new Date(currentUser.dob).toLocaleDateString()
	}

	const _validatePasswords = () => {
		validatePasswords(fields)
	}

	const _submit = (e) => {
		e.preventDefault()
		submit(fields)
	}

	const _validateDOB = () => {
		validateDOB(fields.dob)
	}

	return (
		<form id="form" onSubmit={_submit} ref={(node) => form = node}  >
			<div className="form-group row">
				<label className="col-sm-3 form-control-label text-right">
					Username:
					</label>
				{isRegister ? (
					<div className="col-sm-8">
						<input
							id='inputUsername'
							className="form-control"
							required={isRegister}
							type="text"
							name="username"
							placeholder="Account name"
							pattern="[A-Za-z][A-Za-z0-9]*" 
							ref={(node) => fields.username = node}/>
					</div>
				) : (
						<label className="col-sm-8">
							{currentUser.username}
						</label>
					)
				}

			</div>
			<div className="form-group row">
				<label className="col-sm-3 form-control-label text-right">
					Email Address:
						</label>
						{/*// source: https://www.w3schools.com/bootstrap/*/}
				<div className="col-sm-8">
					<input
						id='inputEmail'
						className="form-control"
						required={isRegister}
						type="email"
						name="email"
						placeholder={isRegister ? 'Email address' : currentUser.email}
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" 
						ref={(node) => fields.email = node}/>
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-3 form-control-label text-right">Phone Number:
						</label>
				<div className="col-sm-8">
					<input
						id='inputPhone'
						className="form-control"
						required={isRegister}
						type="tel"
						name="phone"
						placeholder={isRegister ? '123-123-1234' : currentUser.phone}
						pattern="\d{3}[\-]\d{3}[\-]\d{4}"
						ref={(node) => fields.phone = node}
					/>
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-3 form-control-label text-right">
					Date of Birth:
				</label>
				{/*// source: https://www.w3schools.com/bootstrap/*/}
				<div className="col-sm-8">
					{isRegister ? (
						<input className="form-control"
							required={isRegister}
							type="date" name="dob"
							id="dob" onChange={_validateDOB}
							ref={(node) => fields.dob = node} />
					) : (
							<input className="form-control" type="text"
								id="dob" readOnly value={dateString} />
						)
					}

				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-3 form-control-label text-right">
					Zipcode:
					</label>
				<div className="col-sm-8">
					<input
						id='inputZipcode'
						className="form-control"
						required={isRegister}
						type="text"
						name="zip"
						placeholder={isRegister ? '5 or 9 digits' : currentUser.zipcode}
						pattern="\d{5}-?(\d{4})?"
						ref={(node) => fields.zipcode = node}
					/>
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-3 form-control-label text-right">Password:
						</label>
				<div className="col-sm-8">
					<input
						id='inputPassword'
						className="form-control"
						required={isRegister}
						type="password"
						name="pw"
						onChange={_validatePasswords}
						ref={(node) => fields.pw = node} />
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-3 form-control-label text-right">Confirm Password:
						</label>
				<div className="col-sm-8">
					<input
						id='inputPasswordConfirmation'
						className="form-control"
						required={isRegister}
						type="password"
						name="pwConfirm"
						onKeyUp={_validatePasswords}
						ref={(node) => fields.pwConfirm = node} />
				</div>
			</div>
			<input type="hidden" name="timestamp" value="placeholder" id="ts" />
			<div className="form-group row">
				<span className="col-sm-3"></span>
				<div className="col-sm-8">
					{isRegister ?
						(
							<input className="btn btn-primary" type="submit"
								value="Create an account" id="registerButton"/>
						) : (
							<input className="btn btn-primary" type="submit"
								value="Update" id="updateButton"/>
						)
					}
					<input className="btn btn-secondary" type="reset"
						value="Clear Form" />
				</div>
			</div>
		</form>
	)
}

UserForm.propTypes = {
	submit: PropTypes.func.isRequired,
	validatePasswords: PropTypes.func.isRequired,
	validateDOB: PropTypes.func.isRequired,
	formStyle: PropTypes.string.isRequired,
	currentUser: PropTypes.object
}
