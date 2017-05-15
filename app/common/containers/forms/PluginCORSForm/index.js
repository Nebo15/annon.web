import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FieldArray, FormSection } from 'redux-form';
import uniq from 'lodash/uniq';

import { reduxFormValidate } from 'react-nebo15-validate';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';
import { CheckboxGroup } from 'components/reduxForm/FieldCheckboxGroup';

import Button from 'components/Button';
import Icon from 'components/Icon';
import Line from 'components/Line';
import { H4 } from 'components/Title';

import FieldsList from 'containers/blocks/FieldsList';

import styles from './styles.scss';

const RuleField = ({ rule, index, fields, placeholder }) => (
  <div>
    <div style={{ maxWidth: '280px' }} className={styles['delete-row']}>
      <div>
        <Field placeholder={placeholder} name={`${rule}`} component={FieldInput} />
      </div>
      <div className={styles.delete}>
        <Button color="red" theme="link" onClick={() => fields.remove(index)}>
          <Icon name="trash" />
        </Button>
      </div>
    </div>
    <Line width="280" />
  </div>
);

@reduxForm({
  form: 'plugin-settings-form',
  validate: reduxFormValidate({
  }),
})
@withStyles(styles)
export default class PluginCORSForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} id="plugin-cors-form">
        <FormSection name="settings">
          <div className={styles.row}>
            <Field
              labelText="Credentials"
              name="credentials"
              component={FieldCheckbox}
            />
          </div>
          <div className={styles.row} style={{ maxWidth: '280px' }}>
            <Field
              labelText="Max age"
              name="max_age"
              component={FieldInput}
            />
          </div>
          <div className={styles.row}>
            <H4>Headers</H4>

            <FieldArray
              notAddOnMount
              name="settings.headers"
              ruleComponent={RuleField}
              addText="Add Header"
              placeholder="eg. Content-Cache"
              component={FieldsList}
            />
          </div>
          <div className={styles.row}>
            <H4>Expose headers in response</H4>

            <FieldArray
              notAddOnMount
              name="settings.expose"
              ruleComponent={RuleField}
              addText="Add Header"
              placeholder="eg. Content-Cache"
              component={FieldsList}
            />
          </div>
          <div className={styles.row} style={{ maxWidth: '280px' }}>
            <Field
              labelText="Allow origins"
              name="origin"
              placeholder=""
              component={FieldInput}
            />
          </div>

          <div className={styles.row}>
            <H4>Methods</H4>
            <div className={styles.row}>
              <CheckboxGroup
                name="methods"
                options={[
                  { label: 'POST', value: 'POST' },
                  { label: 'PUT', value: 'PUT' },
                  { label: 'GET', value: 'GET' },
                  { label: 'DELETE', value: 'DELETE' },
                ]}
                format={value => uniq((value || []).map(i => i.toUpperCase()))}
                normalize={value => uniq(value.map(i => i.toUpperCase()))}
              />
            </div>
          </div>
        </FormSection>
      </form>
    );
  }
}
