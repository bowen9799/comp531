import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionTypes } from '../../actions'
import { editArticleOnServer } from '../main/mainActions'
import { Comment } from './articleComment'

export const Article = ({currentUser, article, ifShowComments, toggleComments, editArticle }) => {
	let postTime = new Date(article.date)
	let date = postTime.toLocaleDateString('en-US')
	let time = postTime.toLocaleTimeString('en-US')
	//  text area would be editable if the user posts it
	let isEditable = currentUser.username == article.author
	let articleText = article.text

	const _editArticle = () => {
		editArticle(articleText)
	}

	return (
	// source: https://www.w3schools.com/bootstrap/
	<div className="row">
		<div className="col-sm-11">
		<div className="panel panel-default">
		<div className="panel panel-heading">
		<h4>
			<img className="followingImage" src={article.author.avatar} />
			{article.author} said on {date} at {time}
		</h4>
		</div>
		<div className="media-left">
		<img className="postImage" src={article.img} />
		</div>
		<div className="media-body"
			contentEditable={isEditable ? "true" : "false"}
			suppressContentEditableWarning={true}>
			{articleText}
		</div>
		<br />
		<div className="btn-group btn-group-justified">
		<div className="btn-group">
			<label className="btn btn-primary"> Comment </label>
		</div>
		<div className="btn-group">
			<label className="btn btn-info" onClick={toggleComments}>
			{(ifShowComments && ifShowComments[article._id]) ? `Hide comments` : `Show comments (${article.comments.length})`}
			</label>
		</div>
		{isEditable &&
			<div className="btn-group btn-success">
			<label className="btn editButton" onClick = {_editArticle}>
			Edit </label>
			</div>
		}
		</div>
		</div>
		{article.comments.length!=0 && (ifShowComments?ifShowComments[article._id]:false) &&
		<div id="commentSection" className="row">
		<div className= "col-sm-0" />
		<div className= "col-sm-12 panel panel-info">
			{article.comments.map((comment)=> (
			<Comment key={comment.commentId} comment={comment} currentUser={currentUser}/>
			))}
		</div>
		</div>
		}
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