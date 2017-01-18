import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import ApiListPage from 'containers/pages/ApiListPage';
import ApiCreatePage from 'containers/pages/ApiCreatePage';
import ApiEditPage from 'containers/pages/ApiEditPage';

import RequestListPage from 'containers/pages/RequestListPage';
import ExamplePage from 'containers/pages/ExamplePage';

import App from 'containers/layouts/App';
import MainLayout from 'containers/layouts/Main';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route path="/" component={App}>
      <Route component={MainLayout}>
        <IndexRedirect to="apis" />
        <Route path="/apis">
          <IndexRoute component={ApiListPage} />
          <Route path="create" component={ApiCreatePage} />
          <Route path=":apiId" component={ApiEditPage} />
        </Route>
        <Route path="requests" component={RequestListPage} />
        <Route path="example" component={ExamplePage} />
      </Route>
    </Route>
  );
};
