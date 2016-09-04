import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { selectSubreddit, fetchPosts } from './actions'
import rootReducer from './reducers'
import App from './containers/App'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
    window.devToolsExtension && window.devToolsExtension()
  )
)

store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState()))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
