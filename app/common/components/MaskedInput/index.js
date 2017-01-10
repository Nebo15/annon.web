import React from 'react';
import MaskedInput from 'react-text-mask';
import Input from 'components/Input';

export const formatMask = (mask = '', patterns = { 1: /\d/ }) => mask.split('').map(i => patterns[i] || i);

export default ({ mask, guide = true, ...props }) => (
  <Input
    {...props}
    component={MaskedInput}
    mask={formatMask(mask)}
    guide={guide}
  />
);
