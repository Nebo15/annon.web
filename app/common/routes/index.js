import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/layouts/App';
import MainLayout from 'containers/layouts/Main';

import ExamplePage from 'containers/pages/ExamplePage';
import ApiCreatePage from 'containers/pages/ApiCreatePage';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route path="/" component={App}>
      <Route component={MainLayout}>
        <IndexRoute component={ExamplePage} />

        <Route path="/apis">
          <Route path="create" component={ApiCreatePage} />
        </Route>
      </Route>
    </Route>
  );
};
