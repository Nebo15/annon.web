import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FormSection } from 'redux-form';
import uniq from 'lodash/uniq';

import FieldInput from 'components/reduxForm/FieldInput';
import { CheckboxGroup } from 'components/reduxForm/FieldCheckboxGroup';
import FiledSelect from 'components/reduxForm/FieldSelect';

import Button from 'components/Button';
import Line from 'components/Line';
import { H3 } from 'components/Title';

import validate from 'modules/validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'api-form',
  initialValues: {
    request: {
      scheme: 'http',
    },
  },
  validate: validate({
    name: {
      required: true,
    },
    'request.host': {
      required: true,
    },
    'request.path': {
      required: true,
    },
  }),
})
export default class ApiForm extends React.Component {
  render() {
    const { handleSubmit, onSubmit, onDelete, isEdit, children } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Line width="280" />

        <div style={{ maxWidth: '280px' }} className={styles.row}>
          <Field name="name" labelText="Name" component={FieldInput} />
        </div>

        <H3>Request</H3>

        <Line width="280" />

        <div style={{ marginBottom: 10 }}>
          Methods
        </div>

        <FormSection name="request">
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

          <div className={styles.columns}>
            <div>
              <Field
                labelText="Scheme"
                name="scheme"
                component={FiledSelect}
                options={[
                  { name: 'http', title: 'http' },
                  { name: 'https', title: 'https' },
                ]}
              />
            </div>
            <div>
              <Field labelText="Host" name="host" component={FieldInput} />
            </div>
          </div>

          <div className={styles.columns}>
            <div>
              <Field labelText="Port" name="port" component={FieldInput} />
            </div>
            <div>
              <Field labelText="Path" name="path" component={FieldInput} />
            </div>
          </div>
        </FormSection>

        {
          children && <div className={styles.row}>
            {children}
          </div>
        }

        <Button type="submit">
          {isEdit ? 'Save API' : 'Create API'}
        </Button>

        <div style={{ float: 'right' }}>
          {isEdit && <Button type="button" onClick={onDelete} color="red">Delete API</Button>}
        </div>
      </form>
    );
  }
}
