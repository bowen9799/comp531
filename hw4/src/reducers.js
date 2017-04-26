import { combineReducers } from 'redux'
import { ActionTypes } from './actions'
const initialUsers = require('./data/users.json')
const initialArticles = require('./data/articles.json')
const initialFollowers = require('./data/followers.json')

const appReducer = (state = {location: 'landing'}, action) => 
  {switch (action.type) {
    case ActionTypes.GOTO:
      return { ...state, location: action.location }
    default:
      return state
  }
}

const landingReducer = (state = {
  users: initialUsers.users,
  message: '',
  error: false,
}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, message: '', error: false }
    case ActionTypes.REGISTERED:
      return { ...state, message: action.message, error: false }
    case ActionTypes.ERROR:
      return { ...state, message: action.message, error: true }
    default:
      return state
  }
}

const mainReducer = (state = {
  users: initialUsers.users,
  avatars: initialUsers.avatars,
  // current user is the firts in json before any updates
  currentUser: initialUsers.users[0],
  articles: initialArticles.articles,
  // articles filtered to display, which are all shown initially
  displayArticles: initialArticles.articles,
  followers: initialFollowers.followers,
  headline: "Unconventional wisdom."
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ARTICLE:
      // updates article list
      let newArticles = [action.newArticle].concat(state.articles)
      return {
        ...state, displayArticles: newArticles,
        articles: newArticles
      }
    case ActionTypes.UPDATE_HEADLINE:
      return { ...state, headline: action.headline }
    case ActionTypes.FILTER_ARTICLES:
      // if input is empty, reset filter 
      if (action.filter.length == 0 || action.filter == '') {
        return {
          ...state,
          displayArticles: state.articles
        }
      }
      // filters either authors and texts
      else {return {
        ...state,
        displayArticles: state.articles.filter((article) => {
          return (article.author.includes(action.filter) ||
            article.text.includes(action.filter))
        })}
      }
    case ActionTypes.ADD_FOLLOWER:
      let newFollower = { name: action.name, id: state.followers.nextId }
      return {
        ...state,
        followers: {
          nextId: state.followers.nextId + 1,
          followersList: [...state.followers.followersList, newFollower]
        }
      }
    case ActionTypes.REMOVE_FOLLOWER:
      return {
        ...state,
        followers: {
          nextId: state.followers.nextId,
          followersList:
          state.followers.followersList.filter(({ id }) => id != action.id)
        }
      }
    default:
      return state
  }
}

const profileReducer = (state = {currentUser: initialUsers.users[0]}, action) => 
  {switch (action.type) {
    case ActionTypes.UPDATE_USERS:
      let updatedInfo = action.updatedFields
      let updatedUser = {}
      // make sure go through every item of info 
      Object.keys(state.currentUser).map(key => {
        if (key in updatedInfo && key in state.currentUser) {
          updatedUser[key] = updatedInfo[key]
        }
        else if (key in state.currentUser){
          updatedUser[key] = state.currentUser[key]
        }
      })
      return {...state, currentUser: updatedUser}
    default:
      return state
  }
}
const Reducers = combineReducers({
  landing: landingReducer,
  main: mainReducer,
  profile: profileReducer,
  app: appReducer,
})

export default Reducers