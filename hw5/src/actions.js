const url = 'https://webdev-dummy.herokuapp.com'

export const ActionTypes = {
	ERROR: 'ERROR',
	GOTO: 'GOTO',
	REGISTERED: 'REGISTERED',
	LOGIN: 'LOGIN',
	SET_LOGGEDINUSER: 'SET_LOGGEDINUSER',
	ADD_ARTICLE: 'ADD_ARTICLE',
	FILTER_ARTICLES: 'FILTER_ARTICLES',
	SET_ARTICLES: 'SET_ARTICLES',
	TOGGLE_COMMENTS: 'TOGGLE_COMMENTS',
	UPDATE_HEADLINE: 'UPDATE_HEADLINE',
	ADD_FOLLOWER: 'ADD_FOLLOWER',
	REMOVE_FOLLOWER: 'REMOVE_FOLLOWER',
	SET_FOLLOWERS: 'SET_FOLLOWERS',
	UPDATE_PROFILE: 'UPDATE_PROFILE',
	UPDATE_ARTICLE: 'UPDATE_ARTICLE'
}

export const goto = (target) => {
	return {
		type: ActionTypes.GOTO,
		location: target
	}
}

// helper function to communicate with the dummy server
const resource = (method, endpoint, payload, noStringify) => {
	const options = {
		method,
		credentials: 'include',
	}
	if (payload && noStringify) options.body = payload
	else if (payload) {
		options.body = JSON.stringify(payload)
		options.headers = {
			'Content-Type': 'application/json'
		}
	}
	return fetch(`${url}/${endpoint}`, options)
		.then(r => {
			if (r.status === 200) {
				return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
			} else {
				// useful for debugging, but remove in production
				console.error(`${method} ${endpoint} ${r.statusText}`)
				throw new Error(r.statusText)
			}
		})
}

const login = (username, password) => {
	return resource('POST', 'login', {
		username,
		password
	})
		.catch(r => r)
}

const register = (username, email, phone, dob, zipcode, password) => {
	return resource('POST', 'register', {
		username,
		email,
		phone,
		dob,
		zipcode,
		password
	})
		.catch(r => r)
}

const logout = () => {
	const box = document.querySelector("#message")
	return resource('PUT', 'logout')
		.then(r => box.innerHTML = "You Have Logged Out")
		.catch(r => box.innerHTML = `"${r.message}" when logging out`)
}

const fetchLoggedinUserData = () => {
	const user = {
		username: "",
		headline: "",
		dob: "",
		avatar: "",
		email: "",
		zipcode: "",
	}
	return Promise.all(
		[resource('GET', 'headlines').then(r => {
			user.headline = r.headlines[0].headline
			user.username = r.headlines[0].username
		}),
		resource('GET', 'dob').then(r => user.dob = r.dob),
		resource('GET', 'avatars').then(r => user.avatar = r.avatars[0].avatar),
		resource('GET', 'email').then(r => user.email = r.email),
		resource('GET', 'zipcode').then(r => user.zipcode = r.zipcode)]
	).then((r) => {
		return user
	}).catch(r => r)
}

const fetchArticles = () => {
	return resource('GET', 'articles').then(r => {
		return r.articles
	}).catch(r => r)
}

const fetchFollowers = () => {
	return resource('GET', 'following').then(r => {
		return r.following
	}).catch(r => r)
}

const fetchFollowerInfo = (username) => {
	const follower = {
		username: username,
		avatar: "",
		headline: "",
	}
	return resource('GET', `headlines/${username}`).then(r => {
		follower.headline = r.headlines[0].headline
	})
		.then(resource('GET', `avatars/${username}`)
			.then(r => follower.avatar = r.avatars[0].avatar))
		.then(() => {
			return follower
		}).catch(r => r)
}

const putHeadline = (text) => {
	return resource('PUT', `headline`, {
		headline: text
	}).catch(r => r)
}

const putFollower = (username) => {
	return resource('PUT', `following/${username}`).catch(r => r)
}

const deleteFollower = (username) => {
	return resource('DELETE', `following/${username}`).catch(r => r)
}

const postArticle = (article) => {
	const fd = new FormData()
	fd.append('text', article.text)
	fd.append('image', article.image)
	return resource('POST', 'article', fd, true).catch(r => r)
}

const putZipcode = (zipcode) => {
	if (zipcode) {
		return resource('PUT', `zipcode`, {
			zipcode: zipcode
		}).catch(r => r)
	} else {
		return Promise.resolve()
	}
}

const putEmail = (email) => {
	if (email) {
		return resource('PUT', `email`, {
			email: email
		}).catch(r => r)
	} else {
		return Promise.resolve()
	}
}
const editArticle= (article) => {
	let text = article.text
	return resource('PUT', `articles/${article.id}`, {text}).catch(r => r)
}

export { url, resource, login, logout, register, fetchLoggedinUserData, fetchArticles, fetchFollowers, fetchFollowerInfo, putHeadline, putFollower, deleteFollower, postArticle, putZipcode, putEmail, editArticle }