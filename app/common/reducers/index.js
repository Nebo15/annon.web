import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import ApiListPage from 'containers/pages/ApiListPage/redux';
import ApiCreatePage from 'containers/pages/ApiCreatePage/redux';
import ApiEditPage from 'containers/pages/ApiEditPage/redux';

import apis from 'redux/apis';

const data = combineReducers({
  apis,
});
const pages = combineReducers({
  ApiListPage,
  ApiCreatePage,
  ApiEditPage,
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
