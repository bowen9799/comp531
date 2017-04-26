import React, { Component, PropTypes } from 'react'

// validates form when registering and profile updating
export const formTypes = {
  REGISTER: "FORM_REGISTER",
  UPDATE: "FORM_UPDATE"
}

export const UserForm = ({ formType, submit, validateDOB, currentUser, validatePasswords }) => {
  let info = {};
  let form;
  let isFormRegister = formType == formTypes.REGISTER
  const _validatePW = () => {
    validatePasswords(info)
  }
  const _validateDOB = () => {
    validateDOB(info.dob)
  }
  const _submit = (e) => {
    e.preventDefault()
    submit(info)
  }
  return (
    <form id="form" onSubmit={_submit} ref={(node) => form = node}  >
      <div className="form-group row">
        <label className="col-sm-3 form-control-label text-right">
          Username:
          </label>
        {isFormRegister ? (
          <div className="col-sm-8">
            <input
              className="form-control"
              required={isFormRegister}
              type="text"
              name="username"
              placeholder="Account name"
              // source: https://www.w3schools.com/
              pattern="[A-Za-z][A-Za-z0-9]*" 
              ref={(node) => info.username = node}/>
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
        <div className="col-sm-8">
          <input
            className="form-control"
            required={isFormRegister}
            type="email"
            name="email"
            placeholder={isFormRegister ? 'Email address' : currentUser.email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" 
            // source: https://www.w3schools.com/
            ref={(node) => info.email = node}/>
        </div>
      </div>
      <div className="form-group row text-right">
        <label className="col-sm-3 form-control-label">Phone Number:
            </label>
        <div className="col-sm-8">
          <input
            className="form-control"
            required={isFormRegister}
            type="tel"
            name="phone"
            placeholder={isFormRegister ? '123-123-1234' : currentUser.phone}
            pattern="\d{3}[\-]\d{3}[\-]\d{4}"
            ref={(node) => info.phone = node}
          />
        </div>
      </div>
      <div className="form-group row text-right">
        <label className="col-sm-3 form-control-label">
          Date of Birth:
        </label>
        <div className="col-sm-8">
          {isFormRegister ? (
            <input className="form-control"
              required={isFormRegister}
              type="date" name="dob"
              id="dob" onChange={_validateDOB}
              ref={(node) => info.dob = node} />
          ) : (
              <input className="form-control" type="text"
                id="dob" readOnly value={currentUser.dob} />
            )
          }
        </div>
      </div>
      <div className="form-group row text-right">
        <label className="col-sm-3 form-control-label">
          Zipcode:
          </label>
        <div className="col-sm-8">
          <input
            className="form-control"
            required={isFormRegister}
            type="text"
            name="zipcode"
            placeholder={isFormRegister ? '12345 / 12345-6789' : 
            currentUser.zipcode}
            pattern="\d{5}-?(\d{4})?"
            // source: https://www.w3schools.com/bootstrap/
            ref={(node) => info.zipcode = node}
          />
        </div>
      </div>
      <div className="form-group row text-right">
        <label className="col-sm-3 form-control-label">Password:
            </label>
        <div className="col-sm-8">
          <input
            className="form-control"
            required={isFormRegister}
            type="password"
            name="pw"
            onChange={_validatePW}
            ref={(node) => info.pw = node} />
        </div>
      </div>
      <div className="form-group row text-right">
        <label className="col-sm-3 form-control-label">Confirm Password:
            </label>
        <div className="col-sm-8">
          <input
            className="form-control"
            required={isFormRegister}
            type="password"
            name="pwConfirm"
            onKeyUp={_validatePW}
            ref={(node) => info.pwConfirm = node} />
        </div>
      </div>
      <input type="hidden" name="timestamp" value="placeholder" id="ts" />
      <div className="form-group row">
        <span className="col-sm-3"></span>
        <div className="col-sm-8">
         <input className="btn btn-primary" type="submit"
          value={isFormRegister ? "Create an account" : "Update"} />
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
  formType: PropTypes.string.isRequired,
  currentUser: PropTypes.object
}