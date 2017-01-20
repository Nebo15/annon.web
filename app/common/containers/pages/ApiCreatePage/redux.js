import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { createApi } from 'redux/apis';

import { mapServerErrorsToClient } from 'services/validate';

export const onSubmitCreate = ({ name, request }) => dispatch => dispatch(
  createApi({
    name,
    request,
  })
).then((action) => {
  if (action.error) {
    const errors = mapServerErrorsToClient(action.payload.response.error);
    throw new SubmissionError(errors);
  }

  return dispatch(push('/apis'));
});

export default (state = {}) => state;
