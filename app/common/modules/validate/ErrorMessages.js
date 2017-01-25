import React from 'react';
import templateFn from 'lodash/template';

const errors = {
  array: 'Must be an array',
  object: 'Must be an object',
  integer: 'Must be a number',
  float: 'Must be a decimal',
  boolean: 'Must be a boolean',
  string: 'Must be a string',

  required: 'Required field',
  min: 'Minimal value is <%= params %>',
  max: 'Maximum value is <%= params %>',
  equals: 'Must equal to <%= params %>',
  length: 'Lenght must be <%= params %>',
  minLength: 'Length must be more than <%= params %>',
  maxLength: 'Length must be less than <%= params %>',
  maxDate: 'Date must be less than <%= params.format("MM/DD/YYYY") %>',
  minDate: 'Date must be more than <%= params.format("MM/DD/YYYY") %>',
  format: 'Invalid format: <%= params %>',
  cast: 'Value has not type of <%= params %>',
  inclusion: 'Value must be included in <%= params %>',
  exclusion: 'Value mustn\'t be included in <%= params %>',
  subset: 'Values must be <%= params %>',
  number: 'Number must be from <%= params.min %> to <%= params.max %>',
  confirmation: 'Value must equal <%= params %>',
  acceptance: 'Must be choosen',
  email: 'Invalid email format',
  phone_number: 'Invalid phone number format',
  card_number: 'Invalid card number format',
  unique: 'Values must be unique',
  dependency: 'Related field <%= params %> is not filled',
  alphanumeric: 'Value must contain only latin letters and digits',
  metadata: 'Invalid metadata format',
  password: 'Password must contain at least 6 chars, one char in uppercase and one digit',
  ip: 'Invalid IP address',
};

export class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
    this.updateTemplate(props.children);
  }
  componentWillReceiveProps(props) {
    if (props.children !== this.props.children) {
      this.updateTemplate(props.children);
    }
  }
  template = null;
  updateTemplate(message) {
    this.template = templateFn(message);
  }
  render() {
    const { when, params } = this.props;
    return <span data-error-type={when}>{this.template({ params })}</span>;
  }
}
ErrorMessage.propTypes = {
  when: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired,
  params: React.PropTypes.any, // eslint-disable-line
};

export const ErrorMessagesComponent = ({ error, children }) => {
  if (!errors) return null;
  const [errorKey, errorParams] = Object.entries(error)[0];
  const messages = React.Children.toArray(children).filter(i => i.props.when === errorKey);
  if (!messages) return null;
  return React.cloneElement(messages[0], { ...messages[0].props, params: errorParams });
};

// dictionary of predefined errors
export default ({ error, children }) => (
  <ErrorMessagesComponent error={error}>
    { /* map default messages */ }
    { children }
    { Object.keys(errors).map(
      key => <ErrorMessage key={key} when={key}>{errors[key]}</ErrorMessage>
    )}
  </ErrorMessagesComponent>
);
