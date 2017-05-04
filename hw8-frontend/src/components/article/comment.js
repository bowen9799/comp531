import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const Comment = ({ currentUser, comment }) => {
    let postTime = new Date(comment.date)
    let dateString = postTime.toLocaleDateString('en-US')
    let timeString = postTime.toLocaleTimeString('en-US')
    // if current user is author of the comment then comment is editable
    let isEditable = currentUser.username == comment.author
    return (
        <div className="row">
            <div className="col-sm-1" />
            <h4>
                {comment.author} commented on {dateString} at {timeString}
            </h4>
            <div className="media-body"
                contentEditable={isEditable ? "true" : "false"}
                title={isEditable ? "click to edit" : null}
                suppressContentEditableWarning={true}>
                {comment.text}
            </div>
        </div>
    )
}
export default connect()(Comment)