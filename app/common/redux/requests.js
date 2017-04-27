import { handleActions, combineActions } from 'redux-actions';
import { MANAGEMENT_API_URL } from 'config';
import { normalize, arrayOf } from 'normalizr';
import { invoke } from 'helpers/api';
import { createUrl } from 'helpers/url';
import { requestSchema } from 'schema';

export const fetchRequests = options => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/requests`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['requests/FETCH_LIST_REQUEST', {
    type: 'requests/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, arrayOf(requestSchema))
    ),
  }, 'requests/FETCH_LIST_FAILURE'],
});

export const fetchRequest = (requestId, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/requests/${requestId}`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['requests/FETCH_DETAILS_REQUEST', {
    type: 'requests/FETCH_DETAILS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, requestSchema)
    ),
  }, 'requests/FETCH_DETAILS_FAILURE'],
});

export const deleteRequest = (requestId, body, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/requests/${requestId}`, options),
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  body,
  types: ['requests/DELETE_REQUEST', 'requests/DELETE_SUCCESS', 'requests/DELETE_FAILURE'],
});

export default handleActions({
  [combineActions(
    'requests/FETCH_LIST_SUCCESS',
    'requests/FETCH_DETAILS_SUCCESS'
  )]: (state, action) => ({
    ...state,
    ...action.payload.entities.requests,
  }),
}, {});
