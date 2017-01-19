import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, formValueSelector, getFormValues } from 'redux-form';

import FieldCheckbox from 'components/reduxForm/FieldCheckbox';
import FiledSelect from 'components/reduxForm/FieldSelect';

import Button from 'components/Button';
import Line from 'components/Line';
import { H3 } from 'components/Title';

import validate from 'modules/validate';

import PluginProxyForm from 'containers/forms/PluginProxyForm';
import PluginJWTForm from 'containers/forms/PluginJWTForm';

import styles from './styles.scss';

const selector = formValueSelector('plugin-form');

const pluginsComponentMap = {
  proxy: PluginProxyForm,
  jwt: PluginJWTForm,
};

@withStyles(styles)
@reduxForm({
  form: 'plugin-form',
  validate: validate({
    name: {
      required: true,
    },
  }),
})
@connect(state => ({
  name: selector(state, 'name'),
  values: getFormValues('plugin-form')(state),
}))
export default class PluginForm extends React.Component {
  onSubmit() {
    if (!this.pluginForm) {
      return;
    }

    this.pluginForm.submit();

    if (!this.pluginForm.valid) {
      return;
    }

    const { is_enabled } = this.props.values;

    this.props.onSubmit({
      ...this.props.values,
      ...this.pluginForm.values,
      ...{ is_enabled },
    });
  }

  render() {
    const { isEdit, name } = this.props;

    return (
      <div>
        <form>
          <Line width="280" />

          <div style={{ maxWidth: '280px' }} className={styles.row}>
            <Field
              labelText="Plugin type"
              name="name"
              component={FiledSelect}
              placeholder="Select type..."
              disabled={isEdit}
              options={[
                { name: 'proxy', title: 'Proxy' },
                { name: 'jwt', title: 'JWT Authorization' },
                { name: 'acl', title: 'ACL' },
                { name: 'validator', title: 'Validator' },
                { name: 'idempotency', title: 'Idempotency' },
                { name: 'ip_restriction', title: 'IP Restriction' },
              ]}
            />
          </div>

          <div className={styles.row}>
            <Field labelText="Enabled" name="is_enabled" component={FieldCheckbox} />
          </div>
        </form>

        <H3>Plugin settings</H3>

        <Line width="280" />

        <div className={styles.row}>
          { !name && <span style={{ color: '#999' }}>Select plugin type...</span> }
          { name && React.createElement(pluginsComponentMap[name], {
            ref: ref => (this.pluginForm = ref),
            onSubmit: () => {},
          }) }
        </div>
        <Button onClick={() => this.onSubmit()}>
          {isEdit ? 'Save plugin' : 'Add plugin'}
        </Button>
      </div>
    );
  }
}
