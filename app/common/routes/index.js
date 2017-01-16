import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/layouts/App';
import MainLayout from 'containers/layouts/Main';

import ExamplePage from 'containers/pages/ExamplePage';
import CreateApi from 'containers/pages/CreateApi';


export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route path="/" component={App}>
      <Route component={MainLayout}>
        <IndexRoute component={ExamplePage} />

        <Route path="create-api" component={CreateApi} />
      </Route>
    </Route>
  );
};
