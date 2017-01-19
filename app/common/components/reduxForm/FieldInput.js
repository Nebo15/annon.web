import React from 'react';
import { connect } from 'react-redux';
import { getForm } from 'reducers';

import Input from '../Input';

let Field = ({
  component = Input, input, meta, children,
  // not pass to the input component
  formName, dispatch, // eslint-disable-line
  formSubmitFailed, ...props }) =>
React.createElement(component, {
  ...input,
  active: meta.active,
  error: (formSubmitFailed || (meta.dirty && !meta.active)) && meta.error,
  ...props,
}, children);

Field = connect((state, ownProps) => ({
  formSubmitFailed: getForm(state, ownProps.formName).submitFailed,
}))(Field);

const FieldInput = (props, { _reduxForm }) => <Field {...props} formName={_reduxForm.form} />;

FieldInput.contextTypes = {
  /*
   NOTE: bad bad way. Replace it, when redux-form will
   add submitted field to meta information prop
   */
  _reduxForm: React.PropTypes.object.isRequired,
};

export default FieldInput;
