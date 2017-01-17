import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';

import styles from './styles.scss';

@withStyles(styles)
export default class Nav extends React.Component {
  render() {
    const { isOpen } = this.props;

    return (
      <nav className={classnames(styles.nav, isOpen && styles.open)}>
        <ul>
          <li className={styles.active}>
            <Link to="/api">API’s</Link>
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
