import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FieldArray } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldSelect from 'components/reduxForm/FieldSelect';

import Button from 'components/Button';
import Line from 'components/Line';
import { H4 } from 'components/Title';

import { reduxFormValidate, collectionOf } from 'react-nebo15-validate';

import FieldsList from 'containers/blocks/FieldsList';

import styles from './styles.scss';

const RuleField = ({ rule, index, fields }) => (
  <div>
    <div className={styles.rule}>
      <H4>
        Rule {index + 1}

        {index > 0 && <span>
          <Button color="red" theme="link" onClick={() => fields.remove(index)}>
              Delete
          </Button>
        </span>}
      </H4>
    </div>
    <div style={{ maxWidth: '280px' }} className={styles.row}>
      <Field
        labelText="Max request count"
        name={`${rule}.max_request_count`}
        min="0"
        type="number"
        component={FieldInput}
      />
    </div>
    <div style={{ maxWidth: '280px' }} className={styles.row}>
      <Field
        labelText="Time"
        min="0"
        type="number"
        name={`${rule}.time`}
        component={FieldInput}
      />
    </div>
    <div style={{ maxWidth: '280px' }} className={styles.row}>
      <Field
        labelText="Time unit"
        name={`${rule}.time_unit`}
        component={FieldSelect}
        options={[
          { name: 'seconds', title: 'Seconds' },
          { name: 'minutes', title: 'Minutes' },
          { name: 'hours', title: 'Hours' },
          { name: 'days', title: 'Days' },
          { name: 'weeks', title: 'Weeks' },
        ]}
      />
    </div>
    <Line width="280" />
  </div>
);

@reduxForm({
  form: 'plugin-settings-form',
  validate: reduxFormValidate({
    'settings.consumer_id_header': {
      required: true,
    },
    'settings.rules': collectionOf({
      max_request_count: {
        required: true,
      },
      time: {
        required: true,
      },
      time_unit: {
        required: true,
      },
    }),
  }),
  initialValues: {
    consumer_id_header: 'X-Consumer-ID',
  },
})
@withStyles(styles)
export default class PluginRateLimitForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} id="plugin-rate-form">
        <div style={{ maxWidth: '280px' }} className={styles.row}>
          <Field labelText="Consumer ID Header" name="consumer_id_header" component={FieldInput} />
        </div>
        <FieldArray name="settings.rules" ruleComponent={RuleField} component={FieldsList} />
      </form>
    );
  }
}
