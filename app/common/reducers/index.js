import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import apis from 'redux/apis';

const data = combineReducers({
  apis,
});

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  data,
});

export const getForm = (state, formName) => state.form[formName];
