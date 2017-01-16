import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromApis from 'redux/apis';

export const showApis = createAction('apiListPage/SHOW_APIS');

export const fetchApis = () => dispatch =>
  dispatch(fromApis.fetchApis({ limit: 100 }))
  .then(action => dispatch(showApis(action.payload.result)));

const apis = handleAction(showApis, (state, action) => action.payload, []);

export default combineReducers({
  apis,
});
