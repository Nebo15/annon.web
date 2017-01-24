import React from 'react';

import CodeMirror from 'react-codemirror';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import codeMirrorStyles from 'codemirror/lib/codemirror.css';
import styles from './styles.scss';

import FieldInput from '../FieldInput';

@withStyles(codeMirrorStyles)
@withStyles(styles)
export default class FieldCode extends React.Component {
  render() {
    const { input, ...rest } = this.props;

    return (
      <FieldInput
        {...input}
        value={typeof input.value === 'object' ? JSON.stringify(input.value, null, 2) : input.value}
        {...rest}
        component={CodeMirror}
        options={{
          mode: {
            name: 'javascript',
            json: true,
          },
          readOnly: false,
          lineNumbers: true,
          indentUnit: 2,
          tabSize: 2,
          smartIndent: false,
        }}
      />
    );
  }
}
