import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import PluginForm from 'containers/forms/PluginForm';

import { getPlugin } from 'reducers';

import { onSubmitEdit, pluginsFetch } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params }) => dispatch(pluginsFetch(params.apiId, params.pluginId)),
})
@connect((state, { params }) => ({
  ...state.pages.PluginEditPage,
  plugin: getPlugin(state, params.pluginId) || {},
}), { onSubmitEdit })
export default class ApiCreatePage extends React.Component {
  render() {
    const { name, api_id } = this.props.plugin;

    return (
      <FormPageWrapper id="plugin-edit-page" title={`Edit ${name} plugin`}>
        <PluginForm
          isEdit
          onSubmit={values => this.props.onSubmitEdit(api_id, name, values)}
        />
      </FormPageWrapper>
    );
  }
}
