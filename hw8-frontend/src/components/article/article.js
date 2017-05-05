import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionTypes } from '../../actions'
import { editArticleOnServer } from '../main/mainActions'
import Comment from './comment'

export const Article = ({ currentUser, article, ifShowComments, toggleComments, editArticle }) => {
    let postTime = new Date(article.date)
    // if current user is author then article is editable
    let isEditable = currentUser.username == article.author
    let avatar = null
    let articleText = article.text
    let dateString = postTime.toLocaleDateString('en-US')
    let timeString = postTime.toLocaleTimeString('en-US')
    const _editArticle = () => {
        editArticle(articleText)
    }

    return (
        // source: https://www.w3schools.com/bootstrap/
        <div className="row">
            <div className="col-sm-11">
                <div className="panel panel-default">
                    <div className="panel panel-heading">
                        <h4 className="articleAuthorText">
                            <img className="followingImage" src={avatar} />
                            {article.author} said on {dateString} at {timeString}
                        </h4>
                    </div>
                    <div className="media-left">
                        <img className="postImage" src={article.img} />
                    </div>
                    <div className="media-body"
                        title={isEditable ? "click to edit" : null}
                        suppressContentEditableWarning={true}>
                        {isEditable ?
                            <textarea className="articleBody"
                                onChange={(event) => {
                                    article.text = event.target.value
                                    articleText = article.text
                                }} defaultValue={articleText} />
                            : <textarea className="articleBody" 　readOnly
                                value={articleText} />
                        }
                    </div>
                    <br />
                    <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                            <label className="btn btn-danger"> Comment </label>
                        </div>
                        <div className="btn-group">
                            <label className="btn btn-info" onClick={toggleComments}>
                                {(ifShowComments && ifShowComments[article._id]) ? `Hide comments` : `Comments (${article.comments.length})`}
                            </label>
                        </div>
                        {isEditable &&
                            <div className="btn-group btn-success">
                                <label className="btn editButton" onClick={_editArticle}>
                                    Edit </label>
                            </div>
                        }
                    </div>
                </div>
                {article.comments.length != 0 && (ifShowComments ? ifShowComments[article._id] : false) &&
                    <div id="commentSection" className="row">
                        <div className="col-sm-2" />
                        <div className="col-sm-8 well">
                            {article.comments.map((comment) => (
                                <Comment key={comment.commentId} comment={comment} currentUser={currentUser} />
                            ))}
                        </div>
                    </div>
                }
                <br />
            </div>
        </div>
    )
}

Article.propTypes = {
    currentUser: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    ifShowComments: PropTypes.object,
    toggleComments: PropTypes.func.isRequired,
    editArticle: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            ifShowComments: state.main.showCommentsArticles,
        }
    },
    (dispatch, ownProps) => {
        return {
            toggleComments: () => dispatch({
                type: ActionTypes.TOGGLE_COMMENTS,
                articleId: ownProps.article._id
            }),
            editArticle: (articleText) => dispatch(
                editArticleOnServer({
                    id: ownProps.article._id,
                    text: articleText
                }))
        }
    }
)(Article)