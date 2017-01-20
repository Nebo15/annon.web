import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Button from 'components/Button';
import Icon from 'components/Icon';

import styles from './styles.scss';

@withStyles(styles)
export default class FieldsList extends React.Component {
  componentDidMount() {
    this.props.fields.push();
  }

  render() {
    const { fields, ruleComponent } = this.props;

    return (
      <div>
        {
          fields.map((rule, index) => React.createElement(ruleComponent, {
            key: index, rule, fields, index,
          }))
        }
        <div className={styles['add-rule']}>
          <Button theme="link" onClick={() => fields.push()}>
            <span><Icon name="add" /></span>
            Add rule
          </Button>
        </div>
      </div>
    );
  }
}
