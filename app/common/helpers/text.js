import React from 'react';

export const multiline = (text = '') => text.split(/\r?\n/).map((i, idx) => (
  <p key={idx}>{i}</p>
));
