import { ActionTypes, goto } from '../../actions'

export const checkDoBValidity = (dob) => {
  return (dispatch) => {
    let bd = new Date(dob.value)
    let today = Date.now();
    let age = new Date(today - bd.getTime())
    if ((age.getUTCFullYear() - 1970) >= 18) {
      dob.setCustomValidity('')
    } else {
      dob.setCustomValidity("You must be at least 18 to register.")
    }
  }
}

// validate password and password confirmation 
export const checkPWValidity = (fields) => {
  return (dispatch) => {
    if (fields.pw.value === fields.pwConfirm.value) {
      fields.pwConfirm.setCustomValidity('')
    } else {
      fields.pwConfirm.setCustomValidity("You need to confirm the passwords.")
    }
  }
}

// login username and PW need to be both entered
export const validateLogin = (values) => {
  return (dispatch) => {
    if (values.username && values.password) {
      // login and redirect
      dispatch({ type: ActionTypes.LOGIN, message: '' })
      dispatch(goto('main'))
    }
    else {
      dispatch({ 
        type: ActionTypes.ERROR, 
        message: 'You need to enter BOTH username and password.' 
      })
    }
  }
}