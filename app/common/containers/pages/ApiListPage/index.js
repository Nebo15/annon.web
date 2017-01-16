import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

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
    const { apis } = this.props;
    return (
      <div id="api-list-page">
        <H1>API's</H1>
        <p>Select API to edit API’s plugins</p>
        <div className={styles.table}>
          <Table
            columns={[
              { key: 'name', title: 'Name' },
              { key: 'host', title: 'Host' },
              { key: 'methods', title: 'Methods' },
              { key: 'action', title: 'Action' },
            ]}
            data={apis.map(i => ({
              name: i.name,
              host: `${i.request.scheme}://${i.request.host}:${i.request.port}${i.request.path}`,
              methods: i.request.methods.join('/').toLowerCase(),
              action: (<Button theme="link" to={`apis/${i.id}`}>Edit&nbsp;API</Button>),
            }))}
          />
        </div>
      </div>
    );
  }
}
