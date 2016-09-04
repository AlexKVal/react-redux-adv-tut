import {
  SELECT_SUBREDDIT
} from '../actions'

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      state
  }
}

export default selectedSubreddit
