import React from 'react';
import { connect } from 'react-redux';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H2 } from 'components/Title';
import Container from 'components/Container';

import styles from './styles.scss';

@withStyles(styles)
@connect(null)
export default class ExamplePage extends React.Component {
  render() {
    return (
      <Container id="example-page">
        <H2>Example page</H2>
      </Container>
    );
  }
}
