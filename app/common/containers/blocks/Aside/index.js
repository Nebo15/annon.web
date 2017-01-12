import React from 'react';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';

import Nav from 'containers/blocks/Nav';

import styles from './styles.scss';

@withStyles(styles)
export default class Aside extends React.Component {
  render() {
    return (
      <aside className={styles.aside}>
        { /* eslint-disable jsx-a11y/anchor-has-content */ }
        <Link className={styles.logo} to="/" />
        <hr className={styles.line} />

        <button className={styles.add}>
          <Icon name="add" />
          Create API
        </button>

        <hr className={styles.line} />

        <Nav />
      </aside>
    );
  }
}
