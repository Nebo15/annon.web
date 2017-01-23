import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FieldArray } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';

import Button from 'components/Button';
import Line from 'components/Line';
import { H4 } from 'components/Title';

import FieldsList from 'containers/blocks/FieldsList';

import styles from './styles.scss';

const RuleField = ({ rule, index, fields }) => (
  <div>
    <div className={styles.rule}>
      <H4>
        <span>
          <Button color="red" theme="link" onClick={() => fields.remove(index)}>
              Delete
          </Button>
        </span>
      </H4>
    </div>
    <div style={{ maxWidth: '280px' }} className={styles.row}>
      <Field labelText="IP" name={`${rule}`} component={FieldInput} />
    </div>
    <Line width="280" />
  </div>
);

@reduxForm({
  form: 'plugin-settings-form',
})
@withStyles(styles)
export default class PluginIPRestrictionForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} id="plugin-ip-restriction-form">
        <div className={styles.row}>
          <H4>Whitelist</H4>
          <Line width="280" />

          <FieldArray notAddOnMount name="settings.whitelist" ruleComponent={RuleField} addText="Add IP" component={FieldsList} />
        </div>

        <div className={styles.row}>
          <H4>Blacklist</H4>
          <Line width="280" />
        </div>

        <FieldArray notAddOnMount name="settings.blacklist" ruleComponent={RuleField} addText="Add IP" component={FieldsList} />
      </form>
    );
  }
}
