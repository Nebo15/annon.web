import React from 'react';
import classnames from 'classnames';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const StatusCode = ({ code }) => (<span
  className={classnames(
    code < 300 && styles.success,
    code >= 300 && code < 400 && styles.warning,
    code >= 400 && styles.danger,
  )}
>{code}</span>);

export default withStyles(styles)(StatusCode);
