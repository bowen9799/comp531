import { connect } from 'react-redux'
import React, { PropTypes } from 'react'

// if there's no error msg then do not show
// if there is, display with a block of bootstrap alert-warning
export const ErrMessage = ({message, error}) => {
	return (
		<div className={error ? "alert alert-danger" : "alert alert-success"}
			style={{ display: message == '' ? 'none' : 'block' }}>
			<div id="errorMessage" className="text-center"> {message} </div>
		</div>)
}

ErrMessage.propTypes = {
	message: PropTypes.string.isRequired,
	error: PropTypes.bool.isRequired
}

export default connect(
	(state) => ({
		message: state.landing.message,
		error: state.landing.error
	})
)(ErrMessage)
