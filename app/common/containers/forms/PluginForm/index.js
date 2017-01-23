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
import PluginACLForm from 'containers/forms/PluginACLForm';
import PluginValidatorForm from 'containers/forms/PluginValidatorForm';

import styles from './styles.scss';

const selector = formValueSelector('plugin-form');

const pluginsComponentMap = {
  proxy: PluginProxyForm,
  jwt: PluginJWTForm,
  acl: PluginACLForm,
  validator: PluginValidatorForm,
  idempotency: null,
};

const availablePlugins = Object.keys(pluginsComponentMap);

@withStyles(styles)
@reduxForm({
  form: 'plugin-form',
  initialValues: {
    name: 'validator',
  },
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
      this.props.onSubmit({
        settings: { },
        ...this.props.values,
      });
      return;
    }

    this.pluginForm.submit();

    if (!this.pluginForm.valid) {
      return;
    }

    const { is_enabled } = this.props.values;
    const pluginValues = this.pluginForm.values;

    this.props.onSubmit({
      ...this.props.values,
      ...pluginValues,
      ...{ is_enabled },
    });
  }

  render() {
    const { isEdit, name, existingPlugins = [] } = this.props;
    const pluginsSelectOptions = [
      { name: 'proxy', title: 'Proxy' },
      { name: 'jwt', title: 'JWT Authorization' },
      { name: 'acl', title: 'ACL' },
      { name: 'validator', title: 'Validator' },
      { name: 'idempotency', title: 'Idempotency' },
      { name: 'ip_restriction', title: 'IP Restriction' },
    ].filter(i => availablePlugins.indexOf(i.name) > -1)
    .map(item => ({
      ...item,
      disabled: existingPlugins.indexOf(item.name) > -1,
    }));

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
              options={pluginsSelectOptions}
            />
          </div>

          <div className={styles.row}>
            <Field labelText="Enabled" name="is_enabled" component={FieldCheckbox} />
          </div>
        </form>

        {
          (pluginsComponentMap[name]) && (<div>
            <H3>Plugin settings</H3>
            <Line width="280" />

            <div className={styles.row}>
              { !name && <span style={{ color: '#999' }}>Select plugin type...</span> }
              { name && pluginsComponentMap[name] &&
                React.createElement(pluginsComponentMap[name], {
                  ref: ref => (this.pluginForm = ref),
                  onSubmit: () => {},
                })
              }
            </div>
          </div>)
        }
        <Button onClick={() => this.onSubmit()}>
          {isEdit ? 'Save plugin' : 'Add plugin'}
        </Button>

        {
          isEdit && <div style={{ float: 'right' }}>
            <Button color="red" onClick={() => this.props.onDelete()}>
              Delete plugin
            </Button>
          </div>
        }
      </div>
    );
  }
}
