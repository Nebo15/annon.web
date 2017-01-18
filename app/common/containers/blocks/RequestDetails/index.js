import React from 'react';
import classnames from 'classnames';
import HttpStatusCode from 'http-status-codes';
import Highlight from 'react-highlight';

import highlight from 'highlight.js/styles/color-brewer.css';

import StatusCode from 'components/StatusCode';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

const headersToArray = headers => headers.map(i => ({
  type: capitalize(Object.keys(i)[0]),
  value: Object.values(i)[0],
}));

const responseToHttp = response =>
  `HTTP/1.1 ${response.status_code} ${HttpStatusCode.getStatusText(response.status_code)}\n` +
  `${headersToArray(response.headers).map(({ type, value }) => `${type}: ${value}`).join('\n')}\n\n` +
  `${JSON.stringify(JSON.parse(response.body), null, 2)}\n`;

const requestToHttp = request =>
  `${request.method} ${request.uri} HTTP/1.1\n` +
  `${headersToArray(request.headers).map(({ type, value }) => `${type}: ${value}`).join('\n')}\n\n` +
  `${JSON.stringify(request.body, null, 2)}\n`;

@withStyles(highlight)
@withStyles(styles)
export default class RequestDetails extends React.Component {
  render() {
    const { request, response } = this.props;
    return (<div className={styles.wrap}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.column__header}>Request</div>
          <div className={styles.column__body}>
            <Highlight className="language-http">
              { requestToHttp(request) }
            </Highlight>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.column__header}>Response</div>
          <div className={styles.column__body}>
            <Highlight className="language-http">
              { responseToHttp(response) }
            </Highlight>
          </div>
        </div>
      </div>
    </div>);
  }
}
