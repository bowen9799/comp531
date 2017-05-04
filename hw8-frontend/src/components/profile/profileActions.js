import { Locations } from '../app'
import { ActionTypes, goto, putZipcode, putEmail, putAvatar } from '../../actions'
import { getLoggedinUserData } from '../auth/authActions'

export const updateUser = (fields) => {
	return {
		type: ActionTypes.UPDATE_USERS,
		updatedFields: fields
	}
}

export const updateUserOnServer = (fields) => {
	return (dispatch) => {
		putAvatar(fields.avatarFile).
			then(putZipcode(fields.zipcode))
			.then(putEmail(fields.email))
			.then(dispatch(getLoggedinUserData()))
			.catch(r => console.log(`${r.message} Profile update failure`))
	}
}