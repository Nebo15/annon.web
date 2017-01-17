import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';
import { format } from 'helpers/date';
// import Pagination from 'components/Pagination';

import { getRequests } from 'reducers';

import { fetchRequests } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchRequests()),
})
@connect(state => ({
  ...state.pages.RequestListPage,
  requests: getRequests(state, state.pages.RequestListPage.requests),
}))
export default class RequestListPage extends React.Component {
  render() {
    const { requests = [] } = this.props;
    return (
      <div id="request-list-page">
        <H1>Requests</H1>
        <p>Select Request to see details.</p>
        <div className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: 'id' },
              { key: 'inserted_at', title: 'Inserted at' },
              { key: 'ip_address', title: 'From' },
              { key: 'url', title: 'Url' },
              { key: 'status_code', title: 'Status code' },
              { key: 'api', title: 'Api' },
            ]}
            data={requests.map(i => ({
              id: i.id,
              inserted_at: format(i.inserted_at),
              ip_address: i.ip_address,
              status_code: String(i.status_code),
              url: i.request && `${i.request.method}: ${i.request.uri}`,
              api: i.api ? <Button theme="link" to={`/apis/${i.api.id}`}>Edit API</Button> : '–',
            }))}
          />
          {
            // <div className={styles.pagination}>
            //   <Pagination
            //     count={20}
            //     current={5}
            //     formatter={v => `/apis?page=${v}`}
            //   />
            // </div>
          }
        </div>
      </div>
    );
  }
}
