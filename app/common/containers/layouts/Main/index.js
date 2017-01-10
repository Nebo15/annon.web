import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const App = ({ children }) => (
  <div className={styles.main}>
    <main>{ children }</main>
  </div>
);
export default withStyles(styles)(App);
