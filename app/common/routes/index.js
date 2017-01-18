import React from 'react';
import { Route, IndexRedirect, IndexRoute, Redirect } from 'react-router';

import ApiListPage from 'containers/pages/ApiListPage';
import ApiCreatePage from 'containers/pages/ApiCreatePage';
import ApiEditPage from 'containers/pages/ApiEditPage';

import RequestListPage from 'containers/pages/RequestListPage';

import ExamplePage from 'containers/pages/ExamplePage';
import NotFoundPage from 'containers/pages/NotFoundPage';

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
        <Route path="404" component={NotFoundPage} />
        <Redirect from="*" to="/404" />
      </Route>
    </Route>
  );
};
