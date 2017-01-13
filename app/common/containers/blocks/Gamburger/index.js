import React from 'react';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

@withStyles(styles)
export default class Ganburger extends React.Component {
  render() {
    const { isOpen, onToggle } = this.props;

    return (
      <button
        onClick={() => onToggle()}
        className={classnames(styles.control, isOpen && styles.active)}
      >
        <span />
      </button>
    );
  }
}
