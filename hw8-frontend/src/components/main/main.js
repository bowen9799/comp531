import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Article from '../article/article'
import { ActionTypes } from '../../actions'
import Sidebar from './sidebar'
import Navbar from '../navbar'
import { getArticles, getFollowers, addArticleOnServer, addArticleWithImgOnServer }  from './mainActions'
import ErrMessage from '../auth/errMessage'
import { FilterArticles } from '../article/articleActions'
import { AddArticle } from '../article/newArticle'

export const Main = ({ currentUser, articles, addArticle, addArticleWithImg,
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
          <AddArticle addArticle={addArticle}
            addArticleWithImg={addArticleWithImg} currentUser={currentUser} />
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
  addArticleWithImg: PropTypes.func.isRequired,
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
      addArticle: (text) => {
        dispatch(addArticleOnServer(text))
      },
      addArticleWithImg: (data) => {
        dispatch(addArticleWithImgOnServer(data))
      }
    }
  }
)(Main)