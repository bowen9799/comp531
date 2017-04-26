import { combineReducers } from 'redux'
import { Locations } from './components/app'
import { ActionTypes } from './actions'

const AppReducer = (state = {
	location: Locations.LANDING_PAGE,
}, action) => {
	switch (action.type) {
		case ActionTypes.GOTO:
			return { ...state, location: action.location }
		default:
			return state
	}
}

const LandingReducer = (state = {
	loggedinUsername: '',
	message: '',
	error: false,
}, action) => {
	switch (action.type) {
		case ActionTypes.REGISTERED:
			return {
				...state,
				message: action.message,
				error: false
			}
		case ActionTypes.LOGIN:
			return {
				...state,
				loggedinUsername: action.username,
				message: '',
				error: false
			}
		case ActionTypes.ERROR:
			return {
				...state,
				message: action.message,
				error: true
			}
		default:
			return state
	}
}

const MainReducer = (state = {
	currentUser: {},
	allArticles: [],
	displayArticles: [],
	showCommentsArticles: {},
	followers: [],
	initializing: true
}, action) => {
	switch (action.type) {
		case ActionTypes.ADD_ARTICLE:
			let newAllArticles = [action.newArticle].concat(state.allArticles)
			showCommentsArticles[action.newArticle._id] = false;
			return {
				...state,
				displayArticles: newAllArticles,
				allArticles: newAllArticles
			}
		case ActionTypes.SET_ARTICLES:
			let commentsStates = {}
			action.articles.forEach((art) => {
				commentsStates[art._id] = false;
			})
			return {
				...state,
				initializing: false,
				displayArticles: action.articles,
				allArticles: action.articles,
				showCommentsArticles: commentsStates
			}
		case ActionTypes.TOGGLE_COMMENTS:
			let id = action.articleId
			let commentState = !state.showCommentsArticles[action.articleId]
			return {
				...state,
				showCommentsArticles: {
					...state.showCommentsArticles,
					[id]: commentState
				}
			}

		case ActionTypes.UPDATE_HEADLINE:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					headline: action.headline
				}
			}
		case ActionTypes.FILTER_ARTICLES:
			if (action.filter == '') {
				return {
					...state,
					displayArticles: state.allArticles
				}
			}
			return {
				...state,
				displayArticles: state.allArticles.filter((art) => {
					return (art.author.includes(action.filter) ||
						art.text.includes(action.filter))
				})
			}
		case ActionTypes.CLEAR_FOLLOWERS:
			return {
				...state,
				followers: []
			}
		case ActionTypes.ADD_FOLLOWER:
			let follower = action.follower
			return {
				...state,
				initializing: false,
				followers: [...state.followers, follower]
			}
		case ActionTypes.REMOVE_FOLLOWER:
			return {
				...state,
				followers: state.followers.filter(({
		  username
		}) => username != action.username)
			}
		case ActionTypes.SET_LOGGEDINUSER:
			return {
				...state,
				currentUser: action.user
			}
		default:
			return state
	}
}

// update user profile
const ProfileReducer = (state = {
}, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_PROFILE:
			let newUser = {}
			let update = action.updatedFields
			// make sure go thru updating every info
			Object.keys(state.currentUser).map(key => {
				if (key in update && key in state.currentUser) {
					newUser[key] = update[key]
				}
				else if (key in state.currentUser) {
					newUser[key] = state.currentUser[key]
				}
			})
			return { ...state, currentUser: newUser }
		default:
			return state
	}
}

// combining reducers into one
const Reducers = combineReducers({
	app: AppReducer,
	landing: LandingReducer,
	main: MainReducer,
	profile: ProfileReducer
})

export default Reducers