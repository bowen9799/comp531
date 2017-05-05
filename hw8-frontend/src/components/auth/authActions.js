import { Locations } from '../app'
import { ActionTypes, goto, login, register, fetchLoggedinUserData, isLoggedIn } from '../../actions'

export function error(message) {
	return {
		type: ActionTypes.ERROR,
		message: message
	}
}

function registered() {
	return {
		type: ActionTypes.REGISTERED,
		message: 'Registration successful'
	}
}

function loggedin(username) {
	return {
		type: ActionTypes.LOGIN,
		username: username,
		message: ''
	}
}

function updateLoggedinUser(user) {
	return {
		type: ActionTypes.SET_LOGGEDINUSER,
		user: user
	}
}

export const updateDOBValidity = (dobInput) => {
	return (dispatch) => {
		let bd = new Date(dobInput.value)
		let today = Date.now();
		let diff = new Date(today - bd.getTime())
		let age = diff.getUTCFullYear() - 1970
		if (age >= 18) {
			dobInput.setCustomValidity('')
		} else {
			dobInput.setCustomValidity("You must be at least 18 to register!")
		}
	}
}

export const submitAndRedirect = (fields) => {
	return (dispatch) => {
		register(fields.username.value, fields.email.value, fields.phone.value,
			fields.dob.value, fields.zipcode.value, fields.pw.value).then(r => {
				if (r.result && r.result == 'success') {
					dispatch(registered())
				} else {
					dispatch(error(`"${r.message || 'Error'}" logging in`))
				}
			})
	}
}

export const updatePWValidity = (fields) => {
	return () => {
		if (fields.pw.value !== fields.pwConfirm.value) {
			fields.pwConfirm.setCustomValidity("Passwords don't match!")
		} else {
			fields.pwConfirm.setCustomValidity('')
		}
	}
}

export const getLoggedinUserData = (username) => {
	return (dispatch) => {
		return fetchLoggedinUserData().then(r => {
			if (!r.message) {
				dispatch(updateLoggedinUser(r))
			} else {
				dispatch(error(`${r.message}, Error fetching user data`))
			}
		})
	}
}

export const validateLogin = (values) => {
	return (dispatch) => {
		if (values && values.username) {
			login(values.username.trim(), values.password.trim()).then(r => {
				if (r.result && r.result == 'success' && r.username) {
					dispatch(getLoggedinUserData(r.username)).then(() =>
						dispatch(loggedin(r.username))).then(() =>
							dispatch(goto(Locations.MAIN_PAGE))).catch(r => {
								dispatch(error(r.message))
							})
				} else {
					dispatch(error(`"${r.message || 'Error'}" logging in`))
				}
			})
		}
		else {
			isLoggedIn().then(r => {
				if (r && r.username) {
					dispatch(getLoggedinUserData(r.username)).then(() =>
						dispatch(loggedin(r.username))).then(() =>
							dispatch(goto(Locations.MAIN_PAGE))).catch(r => {
								dispatch(error(r.message))
							})
				}
			})
		}
	}
}