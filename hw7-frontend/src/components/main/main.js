import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Article from '../article/article'
import { ActionTypes } from '../../actions'
import Sidebar from './sidebar'
import Navbar from '../navbar'
import { getArticles, getFollowers, postArticleToServer } from './mainActions'
import ErrMessage from '../auth/errMessage'
import { FilterArticles } from '../article/articleActions'
import { NewArticle } from '../article/newArticle'

export const Main = ({ currentUser, articles, addArticle,
	filterArticles, getPageData, initializing }) => {
	if (initializing) {
		getPageData()
	}
	return (
		<div>
			<Navbar />
			<br />
			<br />
			<br />
			<div className="container-fluid">
				<div className="col-sm-9">
					<NewArticle addArticle={addArticle} currentUser={currentUser} />
					<ErrMessage />
					<FilterArticles filterArticles={filterArticles} />
					{articles.map((art) => (
						<Article key={art._id} article={art} currentUser={currentUser} />
					))}
				</div>
				<div className="col-sm-3">
					<Sidebar currentUser={currentUser} />
				</div>
			</div>
		</div>
	)
}

Main.propTypes = {
	currentUser: PropTypes.object.isRequired,
	articles: PropTypes.array.isRequired,
	filterArticles: PropTypes.func.isRequired,
	addArticle: PropTypes.func.isRequired,
	getPageData: PropTypes.func.isRequired,
	initializing: PropTypes.bool.isRequired
}

export default connect(
	(state) => {
		return {
			currentUser: state.main.currentUser,
			articles: state.main.displayArticles,
			initializing: state.main.initializing
		}
	},
	(dispatch) => {
		return {
			filterArticles: (key) => dispatch({
				type: ActionTypes.FILTER_ARTICLES,
				filter: key
			}),
			getPageData: () => {
				dispatch(getArticles())
				dispatch(getFollowers())
			},
			addArticle: (data) => {
				dispatch(postArticleToServer(data))
			}
		}
	}
)(Main)