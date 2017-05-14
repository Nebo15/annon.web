import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { createApi } from 'redux/apis';

import { mapServerErrorsToClient } from 'services/validate';

export const onSubmitCreate = values => dispatch =>
dispatch(createApi(values)).then((action) => {
  if (action.error) {
    const errors = mapServerErrorsToClient(action.payload.response.error);
    throw new SubmissionError(errors);
  }

  return dispatch(push(`/apis/${action.payload.result}`));
});

export default (state = {}) => state;
