import React from 'react';
import { connect } from 'react-redux';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import ApiForm from 'containers/forms/ApiForm';

import { onSubmitCreate } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@connect(null, { onSubmitCreate })
export default class ApiCreatePage extends React.Component {
  render() {
    return (
      <FormPageWrapper id="api-create-page" title="Create API" back="/apis">
        <ApiForm onSubmit={values => this.props.onSubmitCreate(values)} />
      </FormPageWrapper>
    );
  }
}
