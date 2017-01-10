import React from 'react';
import Checkbox from 'components/Checkbox';

import FieldInput from './FieldInput';

export default props => <FieldInput component={Checkbox} {...props} checked={props.input.value} />;
