import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const Article = ({ article, currentUser, avatars }) => {
  let date = new Date(article.date).toLocaleDateString('en-US')
  let time = new Date(article.date).toLocaleTimeString('en-US')
  //  text area would be editable if the user posts it
  let editable = currentUser.username == article.author
  let avatar = null
  // assign avatars only when they are defined
  if (avatars && avatars[article.author]) {
      avatar = avatars[article.author]
    }

  return (
    // source: https://www.w3schools.com/bootstrap/
    <div className="row">
      <div className="col-sm-11">
        <div className="panel panel-default panel-info">
          <div className="panel panel-heading">
            <h5>
              <img className="followingImage" src={avatar} />
              {article.author} said on {date} at {time}
            </h5>
          </div>
            <div className="media-left">
              <img className="postImage" src={article.img} />
            </div>
          <div className="media-body"
            contentEditable={editable ? "true" : "false"}
            suppressContentEditableWarning={true}>
            {article.text}
          </div>
          <br />
          <div className="btn-group btn-group-justified">
            <div className="btn-group">
              <label className="btn btn-success"> Comment </label>
            </div>
            <div className="btn-group">
              <label className="btn btn-info"> Show comments </label>
            </div>
              <div className="btn-group btn-danger">
                <label className="btn"> Edit </label>
              </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  )
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  avatars: PropTypes.object
}

export default connect()(Article)