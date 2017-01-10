import React from 'react';
import DatepickerInput from 'components/DatepickerInput';

import FieldInput from '../FieldInput';

const Component = ({ dateFormat, ...props }) => (
  <FieldInput
    {...props}
    {...{
      component: DatepickerInput,
      dateFormat,
    }}
  />
);

export default Component;
