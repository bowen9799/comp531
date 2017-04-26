import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const NewArticle = ({ currentUser, addArticle }) => {
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
		}
		addArticle(articleData)
		}
	}

	return (
		<div className="row">
		<div className="col-sm-11 well">
			<form>
			<textarea className="form-control"
				placeholder="Post an article"
				id='addArticleTA'
				ref={(node) => newArticleText = node} />
			<br />
			<div className="form-inline">
				<div className="input-group">
				<label className="control-label">Select Image</label>
				<input type="file"
					accept="image"
					ref={(node) => imageSelector = node} />
				</div>
				<div className="input-group pull-right">
				<input type="reset"
					className="btn btn-secondary" value="Cancel" />
				</div>
				<div className="input-group pull-right">
				<input type="button"
					className="btn btn-primary"
					onClick={_addArticle} value="Add Article"
					id="addArticleButton" />
				</div>
			</div>
			</form>
		</div>
		</div>)
}

export default connect()(NewArticle)