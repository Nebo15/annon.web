import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';
// import Pagination from 'components/Pagination';

import { getApis } from 'reducers';

import { fetchApis } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchApis()),
})
@connect(state => ({
  ...state.pages.ApiListPage,
  apis: getApis(state, state.pages.ApiListPage.apis),
}))
export default class ApiListPage extends React.Component {
  render() {
    const { apis = [] } = this.props;
    return (
      <div id="api-list-page">
        <H1>API's</H1>
        <p>Select API to edit API’s plugins</p>
        <div id="api-table" className={styles.table}>
          <Table
            columns={[
              { key: 'name', title: 'Name', width: '150px' },
              { key: 'host', title: 'Host' },
              { key: 'methods', title: 'Methods', width: '190px' },
              { key: 'action', title: 'Action', width: '100px' },
            ]}
            data={apis.map((i, index) => ({
              name: <span className={styles.name}>{i.name}</span>,
              host: <span style={{ wordBreak: 'break-all' }}>{`${i.request.scheme}://${i.request.host}:${i.request.port}${i.request.path}`}</span>,
              methods: i.request.methods.join(', ').toUpperCase(),
              action: (<Button id={`edit-api-button-${index}`} theme="link" to={`apis/${i.id}`}>Edit&nbsp;API</Button>),
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
