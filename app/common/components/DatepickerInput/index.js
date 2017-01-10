
import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import libStyles from './libStyles.css';

import Input from '../Input';

export const Component = ({ onBlur, maxDate, onChange, value, ...rest }) => (
  <DatePicker
    maxDate={maxDate}
    onChange={params => onChange(params.format())}
    onBlur={() => onBlur(value)}
    selected={value ? moment(value) : null}
    {...rest}
  />
);

export const ComponentInput = ({ dateFormat, ...rest }) => (
  <Input
    component={Component}
    {...rest}
    dateFormat={dateFormat}
  />
);

export default withStyles(libStyles)(ComponentInput);
