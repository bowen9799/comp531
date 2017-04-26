import React, { PropTypes } from 'react'
import Message from './errMessage'
import Login from './login'
import Register from './register'
import { connect } from 'react-redux'
import Navbar from '../navbar'

export const Landing = () => {
  return (
    <div>
      <Navbar/>
      <div className="row">
        <div className="row">
          <div className="text-center">
            {/*could make this visible; but it looks better as for now*/}
            <h2>Welcome</h2> 
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2"></div>
            <Login />
            <div className="col-sm-2"></div>
          </div>
          <br />
          <div className="row">
            <div className="row">
            <div className="col-sm-2"></div>
            <Message />
            <div className="col-sm-2"></div>
          </div>
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