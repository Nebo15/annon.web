import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory, Router, match } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import trigger from 'redial/lib/trigger';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';

import { configureStore } from '../common/store';
import { configureRoutes } from '../common/routes';
import WithStylesContext from '../common/WithStylesContext';

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

const trackPage = (route) => {}; // eslint-disable-line

const routes = configureRoutes({ store });
// Listen for route changes on the browser history instance:
history.listen((location) => {
  // Match routes based on location object:
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    // Get array of route handler components:
    if (error || !renderProps) {
      return null;
    }
    if (redirectLocation) {
      return history.replace(redirectLocation);
    }

    const renderedRoute = renderProps.routes[renderProps.routes.length - 1];
    trackPage(renderedRoute);

    const { components } = renderProps || {};
    // Define locals to be provided to all lifecycle hooks:
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,

      // Allow lifecycle hooks to dispatch Redux actions:
      dispatch,
      getState,
    };

    // Don't fetch data for initial route, server has already done the work:
    if (window.__REDUX_STATE__) {
      // Delete initial data so that subsequent data fetches can occur:
      delete window.__REDUX_STATE__;
    } else {
      // Fetch mandatory data dependencies for 2nd route change onwards:
      trigger('fetch', components, locals);
    }

    // Fetch deferred, client-only data dependencies:
    trigger('defer', components, locals);
    return null;
  });
});

/* eslint-disable no-underscore-dangle */
ReactDOM.render((
  <WithStylesContext onInsertCss={styles => styles._insertCss()}>
    <Provider store={store}>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>
  </WithStylesContext>
), document.getElementById('root'));
