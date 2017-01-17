import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromRequests from 'redux/requests';

export const showRequests = createAction('apiListPage/SHOW_APIS');

export const fetchRequests = () => dispatch =>
  dispatch(fromRequests.fetchRequests({ limit: 100 }))
  .then(action => dispatch(showRequests(action.payload.result)));

const requests = handleAction(showRequests, (state, action) => action.payload, []);

export default combineReducers({
  requests,
});
