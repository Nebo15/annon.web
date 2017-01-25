import { combineReducers } from 'redux';
import { handleAction, createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { SubmissionError, initialize } from 'redux-form';
import { updateApi, fetchApi, deleteApi } from 'redux/apis';
import { fetchPlugins, updatePlugin } from 'redux/plugins';

import { mapServerErrorsToClient } from 'services/validate';

export const onSubmitEdit = (apiId, { name, request }) => dispatch =>
  dispatch(updateApi(apiId, { name, request }))
  .then((action) => {
    if (action.error) {
      const errors = mapServerErrorsToClient(action.payload.response.error);
      throw new SubmissionError(errors);
    }

    return dispatch(push('/apis'));
  });

export const onDelete = apiId => dispatch => dispatch(deleteApi(apiId))
  .then((action) => {
    if (action.error) {
      return false;
    }

    return dispatch(push('/apis'));
  });

export const setApi = createAction('apiEditPage/SET_API');

export const fetch = apiId => dispatch =>
  dispatch(fetchApi(apiId))
    .then((action) => {
      const apiId = action.payload.result;
      const api = action.payload.entities.apis[apiId];
      return dispatch([
        initialize('api-form', api, true),
        setApi(action.payload.result),
      ]);
    });

const api = handleAction(setApi, (state, action) => action.payload, {});

export const setPlugins = createAction('apiEditPage/SET_PLUGINS');
export const cleanPlugins = createAction('apiEditPage/CLEAN');

export const pluginsFetch = apiId => dispatch =>
  dispatch(fetchPlugins(apiId))
    .then(action => dispatch(setPlugins(action.payload.result)));

const plugins = handleActions({
  [setPlugins]: (state, action) => action.payload,
  [cleanPlugins]: () => [],
}, []);

export const onEnable = (apiId, name, body) => dispatch =>
  dispatch(updatePlugin(apiId, name, body));

export default combineReducers({
  api,
  plugins,
});
