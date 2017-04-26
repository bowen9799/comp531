export const ActionTypes = {
  GOTO: 'GOTO',
  ERROR: 'ERROR',
  LOGIN: 'LOGIN',
  REGISTERED: 'REGISTERED',
  ADD_ARTICLE: 'ADD_ARTICLE',
  ADD_FOLLOWER: 'ADD_FOLLOWER',
  FILTER_ARTICLES: 'FILTER_ARTICLES',
  UPDATE_HEADLINE: 'UPDATE_HEADLINE',
  REMOVE_FOLLOWER: 'REMOVE_FOLLOWER',
  UPDATE_USERS: 'UPDATE_USERS'
}
export const goto = (target) => {
  return { type: ActionTypes.GOTO, location: target }
}
