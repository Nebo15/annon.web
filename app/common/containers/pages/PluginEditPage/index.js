import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { Confirm } from 'components/Popup';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import PluginForm from 'containers/forms/PluginForm';

import { getPlugin } from 'reducers';

import { onSubmitEdit, pluginsFetch, onUnbind } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params }) => dispatch(pluginsFetch(params.apiId, params.pluginId)),
})
@connect((state, { params }) => ({
  ...state.pages.PluginEditPage,
  plugin: getPlugin(state, params.pluginId) || {},
}), { onSubmitEdit, onUnbind })
export default class ApiCreatePage extends React.Component {
  state = {
    showConfirm: false,
  };

  onDelete() {
    const { name, api_id } = this.props.plugin;

    this.setState({ showConfirm: false });
    this.props.onUnbind(api_id, name);
  }

  render() {
    const { name, api_id } = this.props.plugin;

    return (
      <FormPageWrapper id="plugin-edit-page" title={`Edit ${name} plugin`}>
        <PluginForm
          isEdit
          onDelete={() => this.setState({ showConfirm: true })}
          onSubmit={values => this.props.onSubmitEdit(api_id, name, values)}
        />

        <Confirm
          title={`Delete ${name} plugin?`}
          active={this.state.showConfirm}
          theme="error"
          onCancel={() => this.setState({ showConfirm: false })}
          onConfirm={() => this.onDelete()}
        />
      </FormPageWrapper>
    );
  }
}
