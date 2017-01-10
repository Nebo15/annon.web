import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import Button from 'components/Button';
import FormRow from 'components/FormRow';
import FormCaption from 'components/FormCaption';
import Icon from 'components/Icon';

import validate from 'modules/validate';

import styles from './styles.scss';

export const Component = ({ handleSubmit = () => {}, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <FormRow>
      <Field
        component={FieldInput}
        prefix={<span style={{ fontSize: 10 }}><Icon name="mail" /></span>}
        type="email"
        name="email"
        autoComplete="off"
        placeholder="yourname@mail.com"
        labelText="Email"
      />
    </FormRow>
    <FormRow>
      <Field
        component={FieldInput}
        prefix={<Icon name="lock" />}
        type="password"
        name="password"
        autoComplete="off"
        placeholder="password (min 8 characters)"
        labelText="Password"
      />
      <FormCaption>
        <Button theme="link" size="small" to="/forgot">Forgot Password?</Button>
      </FormCaption>
    </FormRow>
    <div className={styles.submit}>
      <div className={styles.submit__button}>
        <Button type="submit" size="middle" block>Sign in</Button>
      </div>
      <FormCaption>
        Don’t have an account? <Button theme="link" size="small" to="/sign-up">Sign Up</Button>
      </FormCaption>
    </div>
  </form>
);

export default withStyles(styles)(
  reduxForm({
    form: 'signin',
    validate: validate({
      email: {
        required: true,
        email: true,
      },
      password: {
        password: true,
        required: true,
      },
    }),
  })(Component)
);
