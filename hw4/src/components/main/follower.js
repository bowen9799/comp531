import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionTypes } from '../../actions'

export const Follower = ({ name, id, remove }) => (
  // image is small and only loads once everytime, so did not cache here
  <div className="row media">
    <div className="panel panel-default panel-danger">
    <div className="media-right">
      <img className="followingImage align-self-center"
        src="http://www.columbia.edu/cu/record/archives/vol21/vol21_iss24/record2124.11c.gif" />
    </div>
    <div className="media-body">
      <h5 className="mt-1">{name}</h5>
      <div class="panel-footer panel-danger"> Unconventional wisdom.</div>
    </div>
    <div className="media-left">
      <span className="destroy glyphicon glyphicon-trash" onClick={remove} />
    </div>
    </div>
  </div>
)

Follower.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
}

export default connect(null, (dispatch, ownProps) => {
  return {
    remove: () => dispatch({
      type: ActionTypes.REMOVE_FOLLOWER,
      id: ownProps.id
    }),
  }
})(Follower)
