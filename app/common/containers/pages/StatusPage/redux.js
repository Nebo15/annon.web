import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromStatuses from 'redux/statuses';

export const setClasterStatus = createAction('statusPage/SET_CLASTER_STATUS');
export const setRequestsMetrics = createAction('statusPage/SET_REQUESTS_METRICS');

export const fetchClusterStatus = () => dispatch =>
  dispatch(fromStatuses.fetchClusterStatus())
  .then((action) => {
    if (action.error) throw action;
    return dispatch(setClasterStatus(action.payload.data));
  });
export const fetchRequestsMetrics = () => dispatch =>
  dispatch(fromStatuses.fetchRequestsMetrics())
  .then((action) => {
    if (action.error) throw action;
    return dispatch(setRequestsMetrics(action.payload.data));
  });


const clasterStatus = handleAction(setClasterStatus, (state, action) => action.payload, {});
const requestsMetrics = handleAction(setRequestsMetrics, (state, action) => action.payload, {});

export default combineReducers({
  clasterStatus,
  requestsMetrics,
});
