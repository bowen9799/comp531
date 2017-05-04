import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionTypes } from '../../actions'
import {removeFollowerAndUpdateArticles} from './mainActions'

export const Follower = ({ username, headline, avatar, remove }) => (
  <div className="row media FollowerItem">
    <div className="panel panel-default well">
    <div className="media-left">
      <img className="followingImage align-self-center"
        src={avatar ? avatar : "http://www.columbia.edu/cu/record/archives/vol21/vol21_iss24/record2124.11c.gif"} />
    </div>
    <div className="media-body">
      <h5 className="mt-1 followerName">{username}</h5>
      <em> {headline?headline:'User does not have a headline'} </em>
    </div>
    <div className="media-right">
      <span className="destroy glyphicon glyphicon-trash" onClick={remove} />
    </div>
    <br />
    </div>
  </div>
)

Follower.propTypes = {
  username: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  headline: PropTypes.string,
  avatar: PropTypes.string
}

export default connect(null, (dispatch, ownProps) => {
  return {
    remove: () => dispatch(removeFollowerAndUpdateArticles(ownProps.username)),
  }
})(Follower)
