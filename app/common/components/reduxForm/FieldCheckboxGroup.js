import React from 'react';
import Checkbox, { CheckboxGroup as CheckboxGroupWrap } from 'components/Checkbox';
import { Field } from 'redux-form';

import FieldInput from './FieldInput';

const removeFromArray = (arr = [], value) => arr.filter(i => i !== value);
const addToArray = (arr = [], value) => [...arr, value];

const toggleValue = (arr, value) =>
  (containsValue(arr, value) ? removeFromArray(arr, value) : addToArray(arr, value));

const containsValue = (arr, value) => (arr || []).indexOf(value) !== -1;

const FieldCheckboxGroup = ({ checkboxValue, input, ...props }) =>
  <FieldInput
    {...props}
    component={Checkbox}
    input={{
      ...input,
      onChange: () => input.onChange(toggleValue(input.value, checkboxValue)),
      onBlur: () => input.onBlur(input.value),
      onFocus: () => input.onFocus(input.value),
    }}
    checked={containsValue(input.value, checkboxValue)}
  />;

export default FieldCheckboxGroup;

export const CheckboxGroup = ({ options, name, ...rest }) => (
  <CheckboxGroupWrap>
    { options.map(item => (
      <Field
        {...rest}
        key={item.value}
        labelText={item.label}
        name={name}
        checkboxValue={item.value}
        component={FieldCheckboxGroup}
      />
    ))}
  </CheckboxGroupWrap>
);
