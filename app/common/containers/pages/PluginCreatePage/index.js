import React from 'react';
import { connect } from 'react-redux';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Icon from 'components/Icon';

import PluginForm from 'containers/forms/PluginForm';

import { onSubmitCreate } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@connect(null, { onSubmitCreate })
export default class ApiCreatePage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <div id="plugin-create-page">
        <H1>
          <span onClick={() => this.context.router.goBack()} className={styles.back}>
            <Icon name="arrow-left-large" />
          </span>
          Add new plugin to API
        </H1>

        <PluginForm
          onSubmit={values => this.props.onSubmitCreate(this.props.params.apiId, values)}
        />
      </div>
    );
  }
}
