import {
  Locations
} from '../app'
import {
  ActionTypes,
  goto,
  login,
  register,
  fetchLoggedinUserData,
  isLoggedIn
} from '../../actions'

// Tell reducer there's an error and show the error
export function error(msg) {
  return {
    type: ActionTypes.ERROR,
    message: msg
  }
}

// Tell reducer the user is registered and update the message
function registered() {
  return {
    type: ActionTypes.REGISTERED,
    message: 'You can now login'
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

// Validating date of birth
export const updateDOBValidity = (dobInput) => {
  return (dispatch) => {
    let bd = new Date(dobInput.value)
    let today = Date.now();
    let diff = new Date(today - bd.getTime())
    // Somehow 1970 is JS epoch time.
    let age = diff.getUTCFullYear() - 1970
    if (age >= 18) {
      dobInput.setCustomValidity('')
    } else {
      dobInput.setCustomValidity("You must be at least 18 to register!")
    }
  }
}

// Setting timestamp and checking DOB before updating state
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
    // Dispatching registered would have shown the register success message 
    // in landing page, dispatching goto here again is just for this dummy 
    // frontend and redirects to main page directly
    // dispatch(goto(Locations.MAIN_PAGE))
  }
}

// Validate password and confirm password values match
export const checkPWValidity = (fields) => {
  return () => {
    if (fields.pw.value !== fields.pwConfirm.value) {
      fields.pwConfirm.setCustomValidity("Passwords don't match!")
    } else {
      fields.pwConfirm.setCustomValidity('')
    }
  }
}

// Since all the user data are required in the main page, need to fetch all relavent data here before navigating to main
export const getLoggedinUserData = (username) => {
  return (dispatch, getState) => {
    return fetchLoggedinUserData().then(r => {
      if (!r.message) {
        dispatch(updateLoggedinUser(r))
      } else {
        dispatch(error(`${r.message}, Error fetching user data`))
      }
    })
  }
}
// Checks login username and password
export const validateLogin = (values) => {
  return (dispatch) => {
    if (values && values.username) {
      login(values.username.trim(), values.password.trim()).then(r => {
        if (r.result && r.result == 'success' && r.username) {
          // Calling login here will set landing page's state and reset error
          // message
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
        // Some duplication here is necessary just with how the promises calls
        // are setup
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