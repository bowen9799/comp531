import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionTypes } from '../../actions'
import Follower from './follower'

// the order of the sidebar: greeting, avatar, headline, 
// updating the headline, adding a follower, and followers.
export const Sidebar = ({ currentUser, headline, updateHeadline,
  followers, addFollower
}) => {
  let newFollower;
  let newHeadline;
  const _updateHeadline = () => {
    if (newHeadline && newHeadline.value) {
      updateHeadline(newHeadline.value)
      newHeadline.value = ''
    }
  }
  const _addFollower = () => {
    if (newFollower && newFollower.value) {
      addFollower(newFollower.value)
      newFollower.value = ''
    }
  }
  return (
    <div>
      <div className="text-center row">
        {/*without <br/> the greeting wont show due to navbar*/}
        <br/>
        <br/>
        <h3> Hello, {currentUser.username}. </h3>
      </div>
      <div className="row">
        <img width="90%" src={currentUser.avatar} />
      </div>
      <div className="text-center row well col-sm-12">
        <label> {headline} </label>
      </div>
      <div className="row">
        <div className="col-sm-11 input-group">
          <input
            className="form-control"
            required
            type="text"
            placeholder="Update the Headline"
            ref={(node) => newHeadline = node} />
          <span className="input-group-btn">
            <input type="button"
              className="btn btn-success" value="Update"
              onClick={_updateHeadline} />
          </span>
        </div>
      </div>
      <br/>
      <div className="row">
        <div className="col-sm-11 input-group">
          <input
            className="form-control"
            required
            type="text"
            placeholder="Add a Follower"
            ref={(node) => newFollower = node} />
          <span className="input-group-btn">
            <input type="button"
              className="btn btn-success" value="Add"
              onClick={_addFollower} />
          </span>
        </div>
      </div>
      <br/>
      <div className="row">
        <div className="col-sm-0" />
        <div className="col-sm-11">
          {followers.map((f) => (
            <Follower key={f.id} id={f.id} name={f.name} />
          ))}
        </div>
        <div className="col-sm-1" />
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  headline: PropTypes.string.isRequired,
  updateHeadline: PropTypes.func.isRequired,
  followers: PropTypes.array.isRequired,
  addFollower: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      followers: state.main.followers.followersList,
      headline: state.main.headline,
    }
  },
  (dispatch) => {
    return {
      addFollower: (name) => dispatch({
        type: ActionTypes.ADD_FOLLOWER, name
      }),
      updateHeadline: (text) => dispatch({
        type: ActionTypes.UPDATE_HEADLINE,
        headline: text
      }),
    }
  }
)(Sidebar)