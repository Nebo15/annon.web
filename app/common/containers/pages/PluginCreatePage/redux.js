import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { bindPlugin } from 'redux/plugins';

import { mapServerErrorsToClient } from 'services/validate';

export const onSubmitCreate = (apiId, body) => dispatch => dispatch(
  bindPlugin(apiId, body)
).then((action) => {
  if (action.error) {
    const errors = mapServerErrorsToClient(action.payload.response.error);
    throw new SubmissionError(errors);
  }

  return dispatch(push(`/apis/${apiId}`));
});

export default (state = {}) => state;
