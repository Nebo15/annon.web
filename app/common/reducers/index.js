import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
});

export const getForm = (state, formName) => state.form[formName];
