import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FormSection } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@reduxForm({
  form: 'plugin-settings-form',
  validate: reduxFormValidate({
    'settings.key_ttl': {
      required: true,
      numeric: true,
      min: 0,
    },
  }),
  initialValues: {
    settings: {
      key_ttl: 0,
    },
  },
})
@withStyles(styles)
export default class PluginIdempotencyForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} id="plugin-acl-form">
        <FormSection name="settings">
          <div style={{ maxWidth: '280px' }} className={styles.row}>
            <Field
              labelText="Key TTL"
              name="key_ttl"
              type="number"
              pattern="\d*"
              min="0"
              component={FieldInput}
            />
          </div>
        </FormSection>
      </form>
    );
  }
}
