import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import ApiListPage from 'containers/pages/ApiListPage';
import ExamplePage from 'containers/pages/ExamplePage';

import App from 'containers/layouts/App';
import MainLayout from 'containers/layouts/Main';

import ApiCreatePage from 'containers/pages/ApiCreatePage';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route path="/" component={App}>
      <Route component={MainLayout}>
        <IndexRedirect to="apis" />
        <Route path="apis" component={ApiListPage} />
        <Route path="example" component={ExamplePage} />

        <Route path="/apis">
          <Route path="create" component={ApiCreatePage} />
        </Route>
      </Route>
    </Route>
  );
};
