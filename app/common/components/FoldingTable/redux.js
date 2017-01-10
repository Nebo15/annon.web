import { handleActions, createAction } from 'redux-actions';

export const open = createAction('foldingTable/OPEN');
export const close = createAction('foldingTable/CLOSE');

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
