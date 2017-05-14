import React from 'react';
import ReactDOM from 'react-dom';

import promise from 'es6-promise';

import { browserHistory, Router, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { useRedial } from 'react-router-redial';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';

import { configureStore } from '../common/store';
import { configureRoutes } from '../common/routes';
import WithStylesContext from '../common/WithStylesContext';

promise.polyfill();

window.jsonlint = require('jsonlint').parser;

let reduxState = {};

if (window.__REDUX_STATE__) { // eslint-disable-line no-underscore-dangle
  try {
    reduxState = JSON.parse(unescape(__REDUX_STATE__));
  } catch (e) {} // eslint-disable-line
}

const store = configureStore({
  history: browserHistory,
}, reduxState);
const { dispatch, getState } = store;

const history = syncHistoryWithStore(browserHistory, store);
const routes = configureRoutes({ store });

const locals = {
  dispatch,
  getState,
};

/* eslint-disable no-underscore-dangle */
ReactDOM.render((
  <WithStylesContext onInsertCss={styles => styles._insertCss()}>
    <Provider store={store}>
      <Router
        history={history}
        render={applyRouterMiddleware(
          useRedial({
            locals,
            beforeTransition: ['fetch'],
            afterTransition: ['defer', 'done'],
            parallel: true,
            initialLoading: process.env.NODE_ENV === 'production' ? null : (() => <div>Loading...</div>),
            onStarted: () => {},
            onCompleted: (transition) => {
              if (transition === 'beforeTransition') {
                window.scrollTo(0, 0);
              }
            },
            onAborted: () => {},
            onError: () => {},
          })
        )}
      >
        { routes }
      </Router>
    </Provider>
  </WithStylesContext>
), document.getElementById('root'));
