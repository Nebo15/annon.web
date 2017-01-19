import { trigger } from 'redial';
import Helmet from 'react-helmet';

import Cookies from 'cookies';
import Set from 'core-js/library/fn/set';
import arrayFrom from 'core-js/library/fn/array/from';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import RouterContext from 'react-router/lib/RouterContext';
import match from 'react-router/lib/match';
import Router from 'react-router/lib/Router';

import mobile from 'is-mobile';

import { syncHistoryWithStore } from 'react-router-redux';

import Provider from 'react-redux/lib/components/Provider';

import createMemoryHistory from 'history/lib/createMemoryHistory';
import useQueries from 'history/lib/useQueries';

import { configureStore } from '../common/store';

import { configureRoutes } from '../common/routes';
import WithStylesContext from '../common/WithStylesContext';

export default () => (req, res, next) => {
  const isMobile = mobile(req);
  if (__DEV__) {
    const head = Helmet.rewind();
    return res.render('index', {
      html: null,
      reduxState: null,
      inlineCss: null,
      head,
      isMobile,
    });
  }

  const memoryHistory = useRouterHistory(useQueries(createMemoryHistory))();
  const store = configureStore({
    history: memoryHistory,
    cookies: new Cookies(req, res),
  });
  const { dispatch, getState } = store;
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = configureRoutes({
    store,
  });
  const router = <Router history={history}>{ routes }</Router>;
  const historyLocation = history.createLocation(req.url);

  return match({
    routes: router, location: historyLocation,
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      return res.status(500).send(`Router Math error ${error.message}`);
    } else if (renderProps == null) {
      return res.status(404).send('Not found');
    }

    // Get array of route handler components:
    const { components } = renderProps;

    // Define locals to be provided to all lifecycle hooks:
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,

      // Allow lifecycle hooks to dispatch Redux actions:
      dispatch,
      getState,
    };
    // Wait for async data fetching to complete, then render:
    return Promise.all([
      trigger('fetch', components, locals),
      trigger('server', components, locals),
    ])
      .then(() => {
        const reduxState = escape(JSON.stringify(getState()));
        const css = new Set();
        /* eslint-disable no-underscore-dangle */
        const html = ReactDOMServer.renderToString(
          <WithStylesContext onInsertCss={(styles) => { css.add(styles._getCss()); }}>
            <Provider store={store}>
              { <RouterContext {...renderProps} />}
            </Provider>
          </WithStylesContext>
        );
        const head = Helmet.rewind();
        res.render('index', {
          html,
          reduxState,
          inlineCss: arrayFrom(css).join(''),
          head,
          isMobile,
        });
      })
      .catch(err => next(err));
  });
};
