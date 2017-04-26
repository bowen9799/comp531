import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import Reducers from './reducers'
import App from './components/app'

require("bootstrap-webpack")
require('./styles.css')

const store = createStore(Reducers, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)