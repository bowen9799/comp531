import React, { PropTypes } from 'react'
import Login from './login'
import Register from './register'
import ErrMessage from './errMessage'
import { connect } from 'react-redux'
import Navbar from '../navbar'

export const Landing = () => {
	return (
		<div>
			<Navbar />
			<div className="container-fluid">
				<div className="row">
					<div className="text-center">
						<h3 id="welcomeText"> Welcome! </h3>
					</div>
					<br/>
					<div className="row">
						<div className="col-sm-2"></div>
						<Login />
						<div className="col-sm-2"></div>
					</div>
					<br />
					<div className="row">
						<div className="col-sm-2"></div>
						<ErrMessage />
						<div className="col-sm-2"></div>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-sm-2"></div>
					<Register />
					<div className="col-sm-2"></div>
				</div>
			</div>
		</div>
	)
}

export default connect()(Landing)