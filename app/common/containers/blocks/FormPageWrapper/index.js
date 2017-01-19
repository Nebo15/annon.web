import React from 'react';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Icon from 'components/Icon';

import styles from './styles.scss';

@withStyles(styles)
export default class FormPageWrapper extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  render() {
    const { id, title, children } = this.props;

    return (
      <div id={id}>
        <H1>
          <span onClick={() => this.context.router.goBack()} className={styles.back}>
            <Icon name="arrow-left-large" />
          </span>
          {title}
        </H1>
        {children}
      </div>
    );
  }
}
