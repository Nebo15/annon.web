
import Cookies from 'cookies';
import Set from 'core-js/library/fn/set';
import arrayFrom from 'core-js/library/fn/array/from';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import RouterContext from 'react-router/lib/RouterContext';
import match from 'react-router/lib/match';
import Router from 'react-router/lib/Router';

import { syncHistoryWithStore } from 'react-router-redux';

import Provider from 'react-redux/lib/components/Provider';

import createMemoryHistory from 'history/lib/createMemoryHistory';
import useQueries from 'history/lib/useQueries';

import { configureStore } from '../common/store';

import { configureRoutes } from '../common/routes';
import WithStylesContext from '../common/WithStylesContext';

export default () => (req, res, next) => {
  if (__DEV__) {
    return res.render('index', {
      html: null,
      reduxState: null,
      inlineCss: null,
    });
  }

  const memoryHistory = useRouterHistory(useQueries(createMemoryHistory))();
  const store = configureStore({
    history: memoryHistory,
    cookies: new Cookies(req, res),
  });
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = configureRoutes({
    store,
  });
  const router = <Router history={history}>{ routes }</Router>;
  const location = req.url;

  return match({ routes: router, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps == null) {
      res.status(404).send('Not found');
    } else {
      const [getCurrentUrl, unsubscribe] = subscribeUrl();
      const reqUrl = location.pathname + location.search;
      getReduxPromise().then(() => {
        const reduxState = escape(JSON.stringify(store.getState()));
        const css = new Set(); // CSS for all rendered React components
        /* eslint-disable no-underscore-dangle */
        const html = ReactDOMServer.renderToString(
          <WithStylesContext onInsertCss={(styles) => { css.add(styles._getCss()); }}>
            <Provider store={store}>
              { <RouterContext {...renderProps} />}
            </Provider>
          </WithStylesContext>
        );

        if (getCurrentUrl() === reqUrl) {
          res.render('index', { html, reduxState, inlineCss: arrayFrom(css).join('') });
        } else {
          res.redirect(302, getCurrentUrl());
        }
        unsubscribe();
      }).catch((err) => {
        unsubscribe();
        next(err);
      });

      function getReduxPromise() {
        const { query, params } = renderProps;

        const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
        const promise = (comp && comp.fetchData && comp.fetchData({
          query, params, store, history,
        })) || Promise.resolve();

        return promise;
      }
    }
  });

  function subscribeUrl() {
    let currentUrl = location.pathname + location.search;
    const unsubscribe = history.listen((newLoc) => {
      if (newLoc && newLoc.action === 'PUSH') {
        currentUrl = newLoc.pathname + newLoc.search;
      }
    });

    return [
      () => currentUrl,
      unsubscribe,
    ];
  }
};
