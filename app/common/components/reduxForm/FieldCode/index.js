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
    const { input: { value } } = this.props;

    return (
      <FieldInput
        component={CodeMirror}
        value={typeof value !== 'string' ? JSON.stringify(value, null, 2) : value}
        options={{
          mode: 'javascript',
          readOnly: false,
          lineNumbers: true,
          indentUnit: 2,
          tabSize: 2,
          smartIndent: false,
        }}
        {...this.props}
      />
    );
  }
}
