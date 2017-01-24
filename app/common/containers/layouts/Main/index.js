import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';
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
    <footer className={styles.footer}>
      <Icon name="nebo15" />
    </footer>
  </div>
);
export default withStyles(styles)(App);
