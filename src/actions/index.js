import fetch from 'isomorphic-fetch'

import postsBySubreddit from '../reducers/postsBySubreddit'

// user actions
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

// “refresh” button
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

// network requests
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receiveAt: Date.now() // TODO
  }
}

// async actions
export function fetchPosts(subreddit) {
  return function (dispatch) {
    dispatch(requestPosts(subreddit))

    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => {
        if (response.ok) return response.json()
        console.log('fetch not OK. response:', response)
      })
      .then(json => dispatch(receivePosts(subreddit, json)))
      .catch(error => console.log('fetch failed:', error)) // a stub
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }

    return Promise.resolve()
  }
}
