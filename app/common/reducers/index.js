import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import ApiListPage from 'containers/pages/ApiListPage/redux';
import ApiCreatePage from 'containers/pages/ApiCreatePage/redux';
import ApiEditPage from 'containers/pages/ApiEditPage/redux';

import RequestListPage from 'containers/pages/RequestListPage/redux';


import apis from 'redux/apis';
import requests from 'redux/requests';

const data = combineReducers({
  apis,
  requests,
});

const pages = combineReducers({
  ApiListPage,
  ApiCreatePage,
  ApiEditPage,
  RequestListPage,
});

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  data,
  pages,
});

export const getForm = (state, formName) => state.form[formName];

export const getApi = (state, apiId) => state.data.apis[apiId];
export const getApis = (state, apis) => apis.map(id => getApi(state, id));

export const getRequest = (state, requestId) => state.data.requests[requestId];
export const getRequests = (state, requests) => requests.map(id => getRequest(state, id));
