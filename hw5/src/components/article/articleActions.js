import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const FilterArticles = ({ filterArticles }) => {
	let filter;
	const _filterArticles = () => {
		// if filter input is null it won't work and will re-display all articles
		if (filter && filter.value != undefined) {
		filterArticles(filter.value)
		}
	}
	return (
		<div className="row">
		<form className="col-sm-11">
			<div className="form-group well">
			<input
				id="filterArticlesInput"
				type="text"
				className="form-control"
				placeholder="filter articles"
				onChange={_filterArticles}
				ref={(node) => filter = node} />
			</div>
		</form>
		</div>)
}

FilterArticles.propTypes = {
    filterArticles: PropTypes.func.isRequired
}

export default connect()(FilterArticles)