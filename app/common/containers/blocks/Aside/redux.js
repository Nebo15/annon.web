import { createAction, handleActions, combineActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';

const showMenu = createAction('aside/SHOW_MENU');
const hideMenu = createAction('aside/HIDE_MENU');
export const toggleMenu = createAction('aside/TOGGLE_MENU');

const active = handleActions({
  [showMenu]: () => true,
  [combineActions(hideMenu, LOCATION_CHANGE)]: () => false,
  [toggleMenu]: state => !state,
}, false);

export default combineReducers({
  active,
});
