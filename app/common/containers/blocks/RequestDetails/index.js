import React from 'react';
import classnames from 'classnames';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

@withStyles(styles)
export default class RequestDetails extends React.Component {
  render() {
    const { request, response } = this.props;
    const headers = request.headers.map(i => ({
      type: Object.keys(i)[0],
      value: Object.values(i)[0],
    }));
    return (<div className={styles.wrap}>
      <div className={styles.column}>
        <div className={styles.column__header}>Request</div>
        <div className={styles.column__body}>
          <div>{request.method} {request.uri}</div>
          <div>
            {
              headers.map(({ type, value }) => (
                <div key={type}>{type}: {value}</div>
              ))
            }
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.column__header}>Response</div>
        <div className={styles.column__body}></div>
      </div>
    </div>)
  }
}
