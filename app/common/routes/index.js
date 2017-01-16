import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import ApiListPage from 'containers/pages/ApiListPage';

import App from 'containers/layouts/App';
import MainLayout from 'containers/layouts/Main';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route path="/" component={App}>
      <Route component={MainLayout}>
        <IndexRedirect to="apis" />
        <Route path="apis" component={ApiListPage} />
      </Route>
    </Route>
  );
};
