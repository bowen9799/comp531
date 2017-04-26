import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const NewArticle = ({ addArticle, currentUser }) => {
  let text;
  let imageSelector;
  // currently do nothing for the img file button...
  const _imgFile = () => {
  }
  // create a new article object
  const _addArticle = () => {
    if (text && text.value) {
      let article = {
        // same format as from dummy server
        _id: Date.now(),
        text: text.value,
        img: null,
        date: new Date().toISOString(),
        comments: [],
        author: currentUser.username
      }
      text.value = ''
      imageSelector.value = ''
      addArticle(article)
    }
  }
  return (
    <div className="row">
      <br />
      <br />
      <br />
      <div className="col-sm-11 well">
        <form>
          <textarea className="form-control"
            placeholder="Type here to post"
            ref={(node) => text = node} />
          <br />
          <div className="form-inline">
            <div className="input-group pull-left">
              <label className="control-label">Select Image</label>
              <input type="file"
                accept="image"
                onChange={_imgFile}
                ref={(node) => imageSelector = node} />
            </div>
            <div className="input-group pull-right">
              <input type="button"
                className="btn btn-primary"
                onClick={_addArticle} value="Post" />
            </div>
            <div className="input-group pull-right">
              <input type="reset"
                className="btn btn-secondary" value="Cancel" />
            </div>
          </div>
        </form>
      </div>
    </div>)
}

NewArticle.propTypes = {
  currentUser: PropTypes.object.isRequired,
  addArticle: PropTypes.func.isRequired,
}

export default connect()(NewArticle)