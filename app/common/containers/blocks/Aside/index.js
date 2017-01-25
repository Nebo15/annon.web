import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';

import Nav from 'containers/blocks/Nav';
import Gamburger from 'containers/blocks/Gamburger';

import { toggleMenu } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@connect(state => state.blocks.Aside, { toggleMenu })
export default class Aside extends React.Component {

  render() {
    return (
      <aside className={styles.aside}>
        { /* eslint-disable jsx-a11y/anchor-has-content */ }
        <Link className={styles.logo} to="/" />
        <hr className={styles.line} />

        <Link to="/apis/create" className={styles.add}>
          <Icon name="add" />
          Create API
        </Link>

        <hr className={styles.line} />

        <Nav isOpen={this.props.active} />

        <div className={styles['menu-control']}>
          <Gamburger isOpen={this.props.active} onToggle={this.props.toggleMenu} />
        </div>
      </aside>
    );
  }
}
