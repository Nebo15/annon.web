import React from 'react';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';

import styles from './styles.scss';

@withStyles(styles)
export default class Nav extends React.Component {
  render() {
    return (
      <nav className={styles.nav}>
        <ul>
          <li className={styles.active}>
            <Link to="/api">API’s</Link>
            <ul>
              <li className={styles.active}>
                <Link to="/api/plugins">Plugins</Link>
              </li>
              <li>
                <Link to="/api/plugins">Plugins</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/requests">Requests</Link>
          </li>
        </ul>
        <ul className={styles.down}>
          <li>
            <Link to="/doc">
              <Icon name="doc" />
              Documentation
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
