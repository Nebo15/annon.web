import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import { Confirm } from 'components/Popup';
import ApiForm from 'containers/forms/ApiForm';

import { getApi } from 'reducers';

import { onSubmitEdit, fetch, onDelete } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params }) => dispatch(fetch(params.apiId)),
})
@connect(state => ({
  ...state.pages.ApiEditPage,
  api: getApi(state, state.pages.ApiEditPage.api) || {},
}), { onSubmitEdit, onDelete })
export default class ApiCreatePage extends React.Component {
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
        <H1>Edit {name} API</H1>

        <ApiForm
          isEdit
          onSubmit={values => this.props.onSubmitEdit(id, values)}
          onDelete={() => this.setState({ showConfirm: true })}
        />

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
