import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FormSection, getFormValues } from 'redux-form';

import getFn from 'lodash/get';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldSelect from 'components/reduxForm/FieldSelect';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

const getValues = getFormValues('plugin-settings-form');

@reduxForm({
  form: 'plugin-settings-form',
  validate: reduxFormValidate({
    'settings.strategy': {
      required: true,
    },
    'settings.algorithm': {
      required: (formProps, value, values) => {
        const strategy = getFn(values, 'settings.strategy');
        return strategy === 'jwt';
      },
    },
    'settings.secret': {
      required: (formProps, value, values) => {
        const strategy = getFn(values, 'settings.strategy');
        return strategy === 'jwt';
      },
    },
    'settings.url_template': {
      required: (formProps, value, values) => {
        const strategy = getFn(values, 'settings.strategy');
        const third_party_resolver = getFn(values, 'settings.third_party_resolver');
        return strategy === 'oauth' || (strategy === 'jwt' && third_party_resolver);
      },
    },
  }),
})
@withStyles(styles)
@connect(state => ({
  values: getValues(state),
}))
export default class PluginAuthenticationForm extends React.Component {
  renderJWTStrategy() {
    const { values } = this.props;
    const thirdPartyResolver = getFn(values, 'settings.third_party_resolver');
    return (
      <div>
        <div style={{ maxWidth: '280px' }}>
          <div className={styles.row}>
            <Field labelText="JWT Secret" name="secret" component={FieldInput} />
          </div>
          <div className={styles.row}>
            <Field
              labelText="JWT Algorithm"
              name="algorithm"
              component={FieldSelect}
              options={[
                { name: 'HS256', title: 'HS256' },
                { name: 'HS384', title: 'HS384' },
                { name: 'HS512', title: 'HS512' },
              ]}
            />
          </div>
          <div className={styles.row}>
            <Field
              labelText="Use 3rd party resolver"
              name="third_party_resolver"
              component={FieldCheckbox}
            />
          </div>
          <div className={styles.row}>
            <Field
              labelText="3rd party resolver url"
              name="url_template"
              component={FieldInput}
              disabled={!thirdPartyResolver}
            />
          </div>
        </div>
        <div>
          {'Note: You can use {consumer_id} variable in URL. eg. https://example.com/party/{consumer_id}/scopes'}
        </div>
      </div>
    );
  }
  renderOAuthStrategy() {
    return (
      <div>
        <div style={{ maxWidth: '280px' }} className={styles.row}>
          <Field
            labelText="Url"
            name="url_template"
            component={FieldInput}
          />
        </div>
        <div>
          {'Note: You can use {access_token} variable in URL. eg. http://example.com:8081/0/api/party/{access_token}/scopes'}
        </div>
      </div>
    );
  }
  render() {
    const { handleSubmit, values } = this.props;
    const strategy = getFn(values, 'settings.strategy');
    return (
      <form onSubmit={handleSubmit} id="plugin-authentication-form">
        <FormSection name="settings">
          <div style={{ maxWidth: '280px' }} className={styles.row}>
            <Field
              labelText="Strategy"
              name="strategy"
              component={FieldSelect}
              options={[
                { name: 'jwt', title: 'JWT' },
                { name: 'oauth', title: 'OAuth. External system' },
              ]}
            />
          </div>
          {
            strategy === 'oauth' && this.renderOAuthStrategy()
          }
          {
            strategy === 'jwt' && this.renderJWTStrategy()
          }
        </FormSection>
      </form>
    );
  }
}
