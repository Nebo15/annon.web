import React from 'react';
import { Route, IndexRoute } from 'react-router';

import ExamplePage from 'containers/pages/ExamplePage';
import App from 'containers/layouts/App';
import MainLayout from 'containers/layouts/Main';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route path="/" component={App}>
      <Route component={MainLayout}>
        <IndexRoute component={ExamplePage} />
      </Route>
    </Route>
  );
};
