import { Locations } from './app'
import { ActionTypes, goto, logout } from '../actions'

export const logoutRedirect = () => {
	return (dispatch) => {
		return logout().then(r => {
			if (!r.message) {
				dispatch(goto(Locations.LANDING_PAGE))
			} else {
				dispatch(error(`${r.message}, Error logging out`))
			}
		})
	}
}