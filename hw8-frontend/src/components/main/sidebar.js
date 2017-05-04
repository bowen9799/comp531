import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionTypes } from '../../actions'
import Follower from './follower'
import {addFollowerAndUpdateArticles, updateHeadlineOnServer} from './mainActions'

export const Sidebar = ({ currentUser, updateHeadline,
  followers, addFollower
}) => {
  let headlineBox;
  let addfollowerBox;
  const _updateHeadline = () => {
    if (headlineBox && headlineBox.value) {
      updateHeadline(headlineBox.value)
      headlineBox.value = ''
    }
  }

  const _addFollower = () => {
    if (addfollowerBox && addfollowerBox.value) {
      addFollower(addfollowerBox.value)
      addfollowerBox.value = ''
    }
  }
  return (
    <div>
      <div className="text-center row">
        <h3 id='greetingText'> Hello! {currentUser.username} </h3>
      </div>
      <div className="row">
        <img className="img-responsive center-block" src={currentUser.avatar} />
      </div>
      <div className="text-center row">
        <label id="myHeadlineText"> {currentUser.headline} </label>
      </div>
      <div className="row">
        <div className="col-sm-12 input-group">
          <input
            id="headlineInput"
            className="form-control"
            required
            type="text"
            placeholder="update headline"
            ref={(node) => headlineBox = node} />
          <span className="input-group-btn">
            <input 
              id="updateHeadlineButton"
              type="button"
              className="btn btn-primary" value="Update"
              onClick={_updateHeadline} />
          </span>
        </div>
        <br />
      </div>
      <div className="row">
        <div className="input-group">
          <input
            id="addFollowerInput"
            className="form-control"
            required
            type="text"
            placeholder="add follower"
            ref={(node) => addfollowerBox = node} />
          <span className="input-group-btn">
            <input
              id="addFollowerButton"
              type="button"
              className="btn btn-primary" value="Add"
              onClick={_addFollower} />
          </span>
        </div>
      </div>
      <br />
      {/*Followers*/}
      <div className="row">
        <div className="col-sm-2" />
        <div className="col-sm-8">
          {followers.map((f) => (
            <Follower key={f.username} username={f.username} headline={f.headline} avatar={f.avatar} />
          ))}
        </div>
        <div className="col-sm-2" />
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateHeadline: PropTypes.func.isRequired,
  followers: PropTypes.array.isRequired,
  addFollower: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      followers: state.main.followers
    }
  },
  (dispatch) => {
    return {
      addFollower: (name) => dispatch(addFollowerAndUpdateArticles(name)),
      updateHeadline: (text) => dispatch(updateHeadlineOnServer(text)),
    }
  }
)(Sidebar)