import { Locations } from './components/app'
import { ActionTypes } from './actions'
import { combineReducers } from 'redux'

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
        case ActionTypes.LOGIN:
            return {
                ...state,
                loggedinUsername: action.username,
                message: '',
                error: false
            }
        case ActionTypes.REGISTERED:
            return {
                ...state,
                message: action.message,
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
            let newArticles = [action.newArticle].concat(state.allArticles)
            showCommentsArticles[action.newArticle._id] = false;
            return {
                ...state,
                displayArticles: newArticles,
                allArticles: newArticles
            }
        case ActionTypes.SET_ARTICLES:
            var initShowCommentsStates = {}
            action.articles.forEach((art) => {
                initShowCommentsStates[art._id] = false;
            })
            return {
                ...state,
                initializing: false,
                displayArticles: action.articles,
                allArticles: action.articles,
                showCommentsArticles: initShowCommentsStates
            }
        case ActionTypes.TOGGLE_COMMENTS:
            var articleId = action.articleId
            var newShowCommentsState = !state.showCommentsArticles[action.articleId]
            return {
                ...state,
                showCommentsArticles: {
                    ...state.showCommentsArticles,
                    [articleId]: newShowCommentsState
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
            let newFollower = action.follower
            return {
                ...state,
                initializing: false,
                followers: [...state.followers, newFollower]
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

const ProfileReducer = (state = {
}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_USERS:
            let newCurrentUser = {}
            let updates = action.updatedFields
            for (const key of Object.keys(state.currentUser)) {
                if (key in updates && key in state.currentUser) {
                    newCurrentUser[key] = updates[key]
                }
                else if (key in state.currentUser) {
                    newCurrentUser[key] = state.currentUser[key]
                }
            }

            return { ...state, currentUser: newCurrentUser }
        default:
            return state
    }
}

const Reducers = combineReducers({
    app: AppReducer,
    landing: LandingReducer,
    main: MainReducer,
    profile: ProfileReducer
})

export default Reducers