import { handleActions, createAction } from 'redux-actions';

export const open = createAction('dropDown/OPEN');
export const close = createAction('dropDown/CLOSE');

export default handleActions({
  [open]: (state, { payload }) => ({
    ...state,
    [payload]: true,
  }),
  [close]: (state, { payload }) => ({
    ...state,
    [payload]: false,
  }),
}, { });
