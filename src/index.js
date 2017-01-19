import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/Main';
import reducers from './reducers';

// Install dev tools for redux
var Immutable = require('immutable');
var installDevTools = require('immutable-devtools');
installDevTools(Immutable);

const createStoreWithMiddleware = applyMiddleware()(createStore);

// Render the main component into the dom
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <App />
  </Provider>
  , document.getElementById('app'));
