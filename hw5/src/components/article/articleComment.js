import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const Comment = ({ currentUser, comment }) => {
    let postTime = new Date(comment.date)
    let date = postTime.toLocaleDateString('en-US')
    let time = postTime.toLocaleTimeString('en-US')
    let isEditable = currentUser.username == comment.author
    return (
        <div className="panel panel-info">
            <div className="panel-heading">
            <h4 className="panel-title">
                {comment.author} commented on {date} at {time}
            </h4>
            </div>
            <div className="panel-body"
                contentEditable={isEditable ? "true" : "false"}
                title={isEditable ? "click to edit" : null}
                suppressContentEditableWarning={true}>
                {comment.text}
            </div>
        </div>
    )
}

export default connect()(Comment)