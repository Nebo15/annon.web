import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import { configureStore } from '../common/store';
import { configureRoutes } from '../common/routes';
import WithStylesContext from '../common/WithStylesContext';

let reduxState = {};

if (window.__REDUX_STATE__) { // eslint-disable-line no-underscore-dangle
  try {
    reduxState = JSON.parse(unescape(__REDUX_STATE__));
  } catch (e) {} // eslint-disable-line
}

const store = configureStore({
  history: browserHistory,
}, reduxState);
const history = syncHistoryWithStore(browserHistory, store);

/* eslint-disable no-underscore-dangle */
const routes = configureRoutes({ store });
ReactDOM.render((
  <WithStylesContext onInsertCss={styles => styles._insertCss()}>
    <Provider store={store}>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>
  </WithStylesContext>
), document.getElementById('root'));
