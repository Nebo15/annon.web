import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const URLPath = ({ children }) => <span>
  { children && String(children).split('/').map((i, index) => <span key={index} className={styles.item}>{index > 0 ? '/' : ''}{i}</span>) }
</span>;

export default withStyles(styles)(URLPath);
