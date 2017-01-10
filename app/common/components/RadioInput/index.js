import React, { PropTypes } from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

export const Component = ({ selected = false, onChange = e => e, disabled, value, name }) => (
  <label className={styles.wrap}>
    <input
      type="radio"
      {...{
        onChange: () => !disabled && onChange(value),
        checked: selected,
        value,
        name,
        disabled,
      }}
    />
    <span className={styles.view} />
  </label>
);

Component.PropTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.isReqiored,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
};

export default withStyles(styles)(Component);
