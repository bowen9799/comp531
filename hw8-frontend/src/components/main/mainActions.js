import { Locations } from '../app'
import { ActionTypes, fetchArticles, fetchFollowers, fetchFollowerInfo, putHeadline, putFollower, deleteFollower, postArticle, postArticleWithImg, editArticle,  postComments } from '../../actions'
import { error } from '../auth/authActions'

function setArticles(articles) {
    return {
        type: ActionTypes.SET_ARTICLES,
        articles: articles
    }
}

function updateHeadlineLocally(text) {
    return {
        type: ActionTypes.UPDATE_HEADLINE,
        headline: text
    }
}

function clearFollowers() {
    return {
        type: ActionTypes.CLEAR_FOLLOWERS
    }
}

function addFollowerLocally(follower) {
    return {
        type: ActionTypes.ADD_FOLLOWER,
        follower: follower
    }
}

function removeFollowerLocally(username) {
    return {
        type: ActionTypes.REMOVE_FOLLOWER,
        username: username
    }
}

function clearError() {
    return (dispatch) => {
        setTimeout(() => dispatch(error("")), 3000)
    }
}

export const getArticles = () => {
    return (dispatch) => {
        fetchArticles().then(r => {
            if (!r.message) {
                dispatch(setArticles(r))
            } else {
                throw new Error("Error fetching articles")
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
                    fetchFollowerInfo(id).then(r => dispatch(addFollowerLocally(r)))
                });
            } else {
                throw new Error("Error fetching followers")
            }
        })
    }
}

export const addFollowerAndUpdateArticles = (name) => {

    return (dispatch, getState) => {
        if (getState().main["followers"].some((follower) => {
                return follower.username == name
            })) {
            dispatch(error("User already following"))
            dispatch(clearError())
        } else {
            putFollower(name).then(r => {
                if (r.following && r.following.length > getState().main["followers"].length) {
                    fetchFollowerInfo(name).then(r => {
                        if (!r.message) {
                            dispatch(addFollowerLocally(r))
                            dispatch(getArticles())
                        } else {
                            dispatch(error("Error adding follower"))
                            dispatch(clearError())
                        }
                    })
                } else {
                    dispatch(error("User doesn't exist"))
                    dispatch(clearError())
                }
            })
        }
    }
}

export const removeFollowerAndUpdateArticles = (name) => {
    return (dispatch) => {
        deleteFollower(name).then(r => {
            if (!r.message) {
                dispatch(removeFollowerLocally(name))
                dispatch(getArticles())
            } else {
                dispatch(error("Error removing follower"))
                dispatch(clearError())
            }
        })
    }
}

export const updateHeadlineOnServer = (text) => {
    return (dispatch) => {
        putHeadline(text).then(r => {
            if (!r.message) {
                dispatch(updateHeadlineLocally(text))
            } else {
                throw new Error("Error updating headline")
            }
        })
    }
}

export const addArticleOnServer = (text) => {
    return (dispatch) => {
        postArticle(text).then(r => {
            if (!r.message) {
                dispatch(getArticles())
            } else {
                throw new Error("Error posting article")
            }
        })
    }
}

export const addArticleWithImgOnServer = (data) => {
    return (dispatch) => {
        postArticleWithImg(data).then(r => {
            if (!r.message) {
                dispatch(getArticles())
            } else {
                throw new Error("Error posting article")
            }
        })
    }
}

export const editArticleOnServer = (data) => {
    return (dispatch) => {
        editArticle(data).then(r => {
            if (!r.message) {
                dispatch(getArticles())
            } else {
                throw new Error("Error editing article")
            }
        })
    }
}

export const toggleComments = (id) => {
    return {
        type: ActionTypes.TOGGLE_COMMENTS,
        articleId: id
      }
    
}

export const postCommentsOnServer = (text) => {

}