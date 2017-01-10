
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import multiMiddleware from 'redux-multi';
import effectsMiddleware from 'redux-effects';
import cookiesMiddleware from 'redux-effects-universal-cookie';
import { apiMiddleware } from 'redux-api-middleware';

import rootReducer from '../reducers';

const middlewares = [
  effectsMiddleware, multiMiddleware, thunkMiddleware,
  promiseMiddleware, apiMiddleware,
];

if (process.NODE_ENV !== 'production') {
  middlewares.push(require('redux-freeze')); // eslint-disable-line global-require
}

export function configureStore ({ history, cookies }, initialState) { // eslint-disable-line
  const createStoreWithMiddleware = compose(
    applyMiddleware.apply(this, middlewares.concat([
      cookies ? cookiesMiddleware(cookies) : cookiesMiddleware(),
      routerMiddleware(history),
    ])),
    (process.NODE_ENV !== 'production') && global.window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers'); // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
