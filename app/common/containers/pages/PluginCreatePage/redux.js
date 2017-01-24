import { combineReducers } from 'redux';
import { createAction, handleAction } from 'redux-actions';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { bindPlugin, fetchPlugins } from 'redux/plugins';

import { mapServerErrorsToClient } from 'services/validate';

export const setPlugins = createAction('apiCreatePage/SET_PLUGINS');

export const onSubmitCreate = (apiId, body) => dispatch =>
  dispatch(
    bindPlugin(apiId, body)
  ).then((action) => {
    if (action.error) {
      const errors = mapServerErrorsToClient(action.payload.response.error);
      throw new SubmissionError(errors);
    }

    return dispatch(push(`/apis/${apiId}`));
  });

export const pluginsFetch = apiId => dispatch =>
  dispatch(fetchPlugins(apiId))
  .then((action) => {
    if (action.error) throw action;
    return dispatch(setPlugins(action.payload.result));
  });

const plugins = handleAction(setPlugins, (state, action) => action.payload, []);

export default combineReducers({
  plugins,
});
