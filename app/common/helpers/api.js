import { CALL_API } from 'redux-api-middleware';

export const invoke = config => (dispatch) => {
  const result = { ...config };
  if (typeof result.body !== 'string') {
    result.body = JSON.stringify(result.body);
  }
  return dispatch({
    [CALL_API]: result,
  });
};
