import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Aside from 'containers/blocks/Aside';

import styles from './styles.scss';

const App = ({ children }) => (
  <div className={styles.main}>
    <main>
      <Aside />
      <div className={styles.content}>
        { children }
      </div>
    </main>
  </div>
);
export default withStyles(styles)(App);
