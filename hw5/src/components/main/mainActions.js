import { Locations } from '../app'
import { error } from '../auth/authActions'
import { ActionTypes, fetchArticles, fetchFollowers, fetchFollowerInfo, putHeadline, putFollower, deleteFollower, postArticle, editArticle } from '../../actions'

function clearError() {
    return (dispatch) => {
        setTimeout(() => dispatch(error("")), 5000)
    }
}

function setArticles(articles) {
    return {
        type: ActionTypes.SET_ARTICLES,
        articles: articles
    }
}

function updateHeadline(headline) {
    return {
        type: ActionTypes.UPDATE_HEADLINE,
        headline: headline
    }
}

function addFollower(follower) {
    return {
        type: ActionTypes.ADD_FOLLOWER,
        follower: follower
    }
}

function removeFollower(username) {
    return {
        type: ActionTypes.REMOVE_FOLLOWER,
        username: username
    }
}

export const toggleComments = (id) => {
    return {
        type: ActionTypes.TOGGLE_COMMENTS,
        articleId: id
    }

}

export const getArticles = () => {
    return (dispatch) => {
        fetchArticles().then(r => {
            if (!r.message) {
                dispatch(setArticles(r))
            } else {
                throw new Error("Fetching Articles Failure")
            }
        })
    }
}

export const getFollowers = () => {
    return (dispatch, getState) => {
        fetchFollowers().then(r => {
            if (!r.message) {
                let uniqueFollowers = r.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                })
                uniqueFollowers.forEach(function (id) {
                    fetchFollowerInfo(id).then(r => dispatch(addFollower(r)))
                });
            } else {
                throw new Error("Fetching Followers Failure")
            }
        })
    }
}

export const addFollowerAndUpdate = (name) => {

    return (dispatch, getState) => {
        if (getState().main["followers"].some((follower) => {
                return follower.username == name
            })) {
            dispatch(error("User Exists"))
            dispatch(clearError())
        } else {
            putFollower(name).then(r => {
                if (r.following && r.following.length > getState().main["followers"].length) {
                    fetchFollowerInfo(name).then(r => {
                        if (!r.message) {
                            dispatch(addFollower(r))
                            dispatch(getArticles())
                        } else {
                            dispatch(error("Adding Follower Failure"))
                            dispatch(clearError())
                        }
                    })
                } else {
                    dispatch(error("User Doesn't Exist"))
                    dispatch(clearError())
                }
            })
        }
    }
}

export const removeFollowerAndUpdate = (name) => {
    return (dispatch) => {
        deleteFollower(name).then(r => {
            if (!r.message) {
                dispatch(removeFollower(name))
                dispatch(getArticles())
            } else {
                dispatch(error("Error removing follower"))
                dispatch(clearError())
            }
        })
    }
}

export const putHeadlineToServer = (text) => {
    return (dispatch) => {
        putHeadline(text).then(r => {
            if (!r.message) {
                dispatch(updateHeadline(text))
            } else {
                throw new Error("Updating Headline Failure")
            }
        })
    }
}

export const postArticleToServer = (data) => {
    return (dispatch) => {
        postArticle(data).then(r => {
            if (!r.message) {
                dispatch(getArticles())
            } else {
                throw new Error("Posting Article Failure")
            }
        })
    }
}