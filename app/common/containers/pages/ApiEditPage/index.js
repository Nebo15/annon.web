import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import ApiForm from 'containers/forms/ApiForm';

import { getApi } from 'reducers';

import { onSubmitEdit, fetch } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params }) => dispatch(fetch(params.apiId)),
})
@connect(state => ({
  ...state.pages.ApiEditPage,
  api: getApi(state, state.pages.ApiEditPage.api) || {},
}), { onSubmitEdit })
export default class ApiCreatePage extends React.Component {
  render() {
    const { name, id } = this.props.api;

    return (
      <div id="api-edit-page">
        <H1>Edit {name} API</H1>

        <ApiForm
          isEdit
          onSubmit={values => this.props.onSubmitEdit(id, values)}
        />
      </div>
    );
  }
}
