import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { format } from 'helpers/date';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1, H3 } from 'components/Title';
import Button from 'components/Button';
import Line from 'components/Line';
import Icon from 'components/Icon';
import { Confirm } from 'components/Popup';
import Checkbox from 'components/Checkbox';
import Table from 'components/Table';

import ApiForm from 'containers/forms/ApiForm';

import { getApi, getPlugins } from 'reducers';

import { onSubmitEdit, fetch, pluginsFetch, onDelete, onEnable } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params }) => dispatch([
    fetch(params.apiId),
    pluginsFetch(params.apiId),
  ]),
})
@connect(state => ({
  ...state.pages.ApiEditPage,
  api: getApi(state, state.pages.ApiEditPage.api) || {},
  plugins: getPlugins(state, state.pages.ApiEditPage.plugins) || [],
}), { onSubmitEdit, onDelete, onEnable })
export default class ApiCreatePage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  state = {
    showConfirm: false,
  };

  onDelete() {
    this.setState({ showConfirm: false });
    this.props.onDelete(this.props.params.apiId);
  }

  render() {
    const { name, id } = this.props.api;

    return (
      <div id="api-edit-page">
        <H1>
          <span onClick={() => this.context.router.goBack()} className={styles.back}>
            <Icon name="arrow-left-large" />
          </span>
          Edit {name} API
        </H1>

        <ApiForm
          isEdit
          onSubmit={values => this.props.onSubmitEdit(id, values)}
          onDelete={() => this.setState({ showConfirm: true })}
        >
          <H3>
            Plugins

            <div className={styles['add-plugin']}>
              <Button to={`/apis/${id}/plugins/add`} theme="link">
                <span><Icon name="add" /></span>
                Add new plugin
              </Button>
            </div>
          </H3>

          <Line width="280" />

          <Table
            columns={[
              { key: 'date', title: 'Date' },
              { key: 'name', title: 'Name' },
              { key: 'active', title: 'Active' },
            ]}
            data={this.props.plugins.map(item => ({
              date: format(item.inserted_at),
              name: item.name,
              active: (
                <Checkbox
                  onChange={checked => this.props.onEnable(
                    item.api_id,
                    item.name,
                    { is_enabled: checked },
                  )}
                  checked={item.is_enabled}
                />
              ),
            }))}
          />
        </ApiForm>

        <Confirm
          title={`Delete ${name} API?`}
          active={this.state.showConfirm}
          theme="error"
          onCancel={() => this.setState({ showConfirm: false })}
          onConfirm={() => this.onDelete()}
        />
      </div>
    );
  }
}
