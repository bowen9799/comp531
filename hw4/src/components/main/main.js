import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Article } from '../article/article'
import { NewArticle} from '../article/newArticle'
import { ActionTypes } from '../../actions'
import { FilterArticles } from '../article/articleActions.js'
import Sidebar from './sidebar'
import Navbar from '../navbar'

export const Main = ({ avatars, currentUser, articles, addArticle,
  filterArticles }) => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="col-sm-9 pull-left">
          <NewArticle addArticle={addArticle} currentUser={currentUser} />
          <FilterArticles filterArticles={filterArticles} />
          {articles.map((article) => (
            <Article key={article._id} article={article} currentUser={currentUser}
              avatars={avatars} />
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
  avatars: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
  addArticle: PropTypes.func.isRequired,
  filterArticles: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      avatars: state.main.avatars,
      currentUser: state.main.currentUser,
      articles: state.main.displayArticles,
    }
  },
  (dispatch) => {
    return {
      addArticle: (article) => dispatch({
        type: ActionTypes.ADD_ARTICLE,
        newArticle: article
      }),
      filterArticles: (key) => dispatch({
        type: ActionTypes.FILTER_ARTICLES,
        filter: key
      })
    }
  }
)(Main)