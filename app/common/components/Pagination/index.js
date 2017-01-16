import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import Icon from 'components/Icon';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

@withStyles(styles)
export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.pages = Array.apply(null, { length: props.count }).map((item, index) => index + 1); // eslint-disable-line
  }

  render() {
    let { current = 1 } = this.props;
    const { count = 1, formatter = p => p } = this.props;

    current = Number(current);

    if (count === 1) {
      return null;
    }

    return (
      <ul className={styles.pagin}>
        <li className={classnames(current === 1 && styles['is-disabled'])}>
          <Link to={formatter(current - 1)}><Icon name="arrow-left" /></Link>
        </li>
        {
          this.pages.map(page => (
            <li className={classnames(current === page && styles['is-active'])} key={page}>
              <Link to={formatter(page)}>{page}</Link>
            </li>
          ))
        }
        <li className={classnames(current === count && styles['is-disabled'])}>
          <Link to={formatter(current + 1)}><Icon name="arrow-right" /></Link>
        </li>
      </ul>
    );
  }
}
