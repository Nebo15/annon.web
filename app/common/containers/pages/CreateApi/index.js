import React from 'react';
import { connect } from 'react-redux';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import ApiForm from 'containers/forms/ApiForm';

import styles from './styles.scss';

@withStyles(styles)
@connect(null)
export default class CreateApi extends React.Component {
  render() {
    return (
      <div id="create-api">
        <H1>Create API</H1>

        <ApiForm />
      </div>
    );
  }
}
