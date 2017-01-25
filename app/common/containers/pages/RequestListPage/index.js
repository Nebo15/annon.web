import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import RequestDetails from 'containers/blocks/RequestDetails';

import { H1 } from 'components/Title';
import { Confirm } from 'components/Popup';
import FoldingTable from 'components/FoldingTable';
import StatusCode from 'components/StatusCode';
import Button from 'components/Button';
import { format } from 'helpers/date';

import URLPath from 'components/URLPath';

import { getRequests } from 'reducers';

import { fetchRequests, deleteRequest } from './redux';
import styles from './styles.scss';


@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchRequests()),
})
@connect(state => ({
  ...state.pages.RequestListPage,
  requests: getRequests(state, state.pages.RequestListPage.requests),
}), { deleteRequest })
export default class RequestListPage extends React.Component {
  state = {
    deleteRequestId: null,
  };
  onDeleteRequestClick(deleteRequestId) {
    this.setState({
      deleteRequestId,
    });
  }
  deleteRequest() {
    this.props.deleteRequest(this.state.deleteRequestId).then(() => {
      this.setState({ deleteRequestId: null });
    });
  }
  render() {
    const { requests = [] } = this.props;
    return (
      <div id="request-list-page">
        <H1>Requests</H1>
        <p>Select Request to see details.</p>
        <div className={styles.table}>
          <FoldingTable
            columns={[
              { key: 'status_code', title: 'Status', width: '80px' },
              { key: 'method', title: 'Method', width: '80px' },
              { key: 'path', title: 'Path' },
              { key: 'client_ip', title: 'Client IP', width: '100px' },
              { key: 'date', title: 'Date', width: '130px' },
              { key: 'api', title: 'Api', width: '100px' },
            ]}
            detailsColumn={{
              title: 'Details',
              width: '80px',
            }}
            keyColumn="id"
            data={requests.map(i => ({
              ...i,
              id: i.id,
              status_code: <StatusCode code={i.status_code} />,
              method: i.request.method,
              path: <URLPath>{i.request && i.request.uri}</URLPath>,
              client_ip: i.ip_address,
              date: <span className="nowrap">{format(i.inserted_at, 'DD.MM.YYYY HH:mm:ss')}</span>,
              api: i.api && typeof i.api.id !== 'undefined'
                ? <Button theme="link" to={`/apis/${i.api.id}`}>Edit API</Button>
                : '–',
            }))}
            component={props =>
              <RequestDetails
                {...props}
                onDeleteRequestClick={() => this.onDeleteRequestClick(props.id)}
              />
            }
          />
        </div>
        <Confirm
          title="Are you sure want to delete request?"
          active={this.state.deleteRequestId}
          theme="error"
          onCancel={() => this.setState({ deleteRequestId: null })}
          onConfirm={() => this.deleteRequest()}
        />
      </div>
    );
  }
}
