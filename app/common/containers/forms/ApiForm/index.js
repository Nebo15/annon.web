import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FormSection } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';
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
    const { handleSubmit, onSubmit, isEdit } = this.props;

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
            <Field labelText="Put" name="methods[put]" component={FieldCheckbox} />
            <Field labelText="Post" name="methods[post]" component={FieldCheckbox} />
            <Field labelText="Get" name="methods[get]" component={FieldCheckbox} />
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

        <Button type="submit">
          {isEdit ? 'Edit API' : 'Create API'}
        </Button>
      </form>
    );
  }
}
