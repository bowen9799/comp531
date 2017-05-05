import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const AddArticle = ({ currentUser, addArticleWithImg, addArticle }) => {
    let newArticleText;
    let newArticleImageURL;
    let imageSelector;
    let articleData = {};

    const _addArticle = () => {
        if (newArticleText && newArticleText.value) {
            articleData.text = newArticleText.value
            if (imageSelector.files && imageSelector.files[0]) {
                var img = imageSelector.files[0]
                articleData.image = img;
                addArticleWithImg(articleData)
            }
            else {
                addArticle(articleData.text)
            }
        }
    }

    return (
        <div className="row">
            <div className="col-sm-11 well">
                <form encType="multipart/form-data" id="postArticleForm">
                    <textarea className="form-control"
                        placeholder="post an article here"
                        id='addArticleTA'
                        name="text"
                        ref={(node) => newArticleText = node} />
                    <br />
                    <div className="form-inline">
                        <div className="input-group">
                            <label className="control-label">Select Image</label>
                            <input type="file"
                                accept="image/*"
                                name="image"
                                ref={(node) => imageSelector = node} />
                        </div>
                        <div className="input-group pull-right">
                            <input type="reset"
                                className="btn btn-secondary" value="Cancel" />
                        </div>
                        <div className="input-group pull-right">
                            <input type="button"
                                className="btn btn-success"
                                onClick={_addArticle} value="Post"
                                id="addArticleButton" />
                        </div>
                    </div>
                </form>
            </div>
        </div>)
}

export default connect()(AddArticle)