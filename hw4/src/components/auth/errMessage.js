import { connect } from 'react-redux'
import React, { PropTypes } from 'react'

// if there's no error msg then do not show
// if there is, display with a block of bootstrap alert-warning
export const Message = ({message, error}) => {
  return (
    <div className={error = "alert alert-warning"}
      style={{ display: message == '' ? 'none' : 'block' }}>
      <div id="errorMessage" className="text-center"> 
        {message} 
      </div>
    </div>)
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired
}

export default connect(
  (state) => ({
    message: state.landing.message,
    error: state.landing.error
  })
)(Message)