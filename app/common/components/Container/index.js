import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import styles from './styles.scss';

export const Component = ({ children, id }) => (
  <div id={id} className={styles.main}>
    <div className={styles.main__in}>{ children }</div>
  </div>
);

export default withStyles(styles)(Component);
