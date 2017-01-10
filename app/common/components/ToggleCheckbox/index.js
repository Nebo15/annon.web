import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

/* eslint-disable jsx-a11y/label-has-for */
const ToggleCheckbox = ({ checked = false, onChange = e => e, onBlur, onFocus, name, color = 'blue' }) => (
  <label className={classnames(styles.wrap, styles[`color-${color}`])}>
    <input
      type="checkbox"
      checked={checked}
      onChange={() => onChange(checked)}
      {...{
        onBlur,
        onFocus,
        name,
      }}
    />

    <span className={styles.view}>
      <span className={styles.circle} />
    </span>
  </label>
);

ToggleCheckbox.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.oneOf(['blue', 'orange', 'green', 'red']),
  onChange: PropTypes.func,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default withStyles(styles)(ToggleCheckbox);
