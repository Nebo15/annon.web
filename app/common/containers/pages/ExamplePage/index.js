import React from 'react';
import { connect } from 'react-redux';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';

import styles from './styles.scss';

@withStyles(styles)
@connect(null)
export default class ExamplePage extends React.Component {
  render() {
    return (
      <div id="example-page">
        <H1>Example page</H1>
      </div>
    );
  }
}
