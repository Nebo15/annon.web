import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';

import { fetchClusterStatus, fetchRequestsMetrics } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchClusterStatus()),
  defer: ({ dispatch }) => dispatch(fetchRequestsMetrics()),
})
@connect(state => state.pages.StatusPage)
export default class StatusPage extends React.Component {
  render() {
    return (
      <div id="status-page">
        <H1>Status</H1>
      </div>
    );
  }
}
