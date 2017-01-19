import { combineReducers } from 'redux';
import { handleActions, createAction } from 'redux-actions';
import * as fromRequests from 'redux/requests';

export const showRequests = createAction('requestListPage/SHOW_REQUESTS');
export const removeRequest = createAction('requestListPage/REMOVE_REQUEST');

export const fetchRequests = () => dispatch =>
  dispatch(fromRequests.fetchRequests({ limit: 100 }))
  .then((action) => {
    if (action.error) throw action;
    return dispatch(showRequests(action.payload.result));
  });

export const deleteRequest = requestId => dispatch =>
  dispatch(fromRequests.deleteRequest(requestId))
  .then((action) => {
    if (action.error) throw action;
    return dispatch(removeRequest(requestId));
  });

const requests = handleActions({
  [showRequests]: (state, action) => action.payload,
  [removeRequest]: (state, action) => state.filter(id => id !== action.payload),
}, []);

export default combineReducers({
  requests,
});
