import React from 'react';
import classnames from 'classnames';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const generateName = () => (`switch-${(Math.random() * Math.pow(10, 4)).toFixed()}`);

const Switch = ({ items = [], active, disabled = false, onChange = e => e }) => {
  const name = generateName();

  return (
    <section className={classnames(styles.switch, disabled && styles.disabled)}>
      {
        items.map(item => (
          <div className={styles.item} key={item.value}>
            <input onChange={e => onChange(e.target.value)} checked={active === item.value} id={`${name}-${item.value}`} type="radio" name={name} value={item.value} />
            <label htmlFor={`${name}-${item.value}`}>{item.title}</label>
          </div>
        ))
      }
    </section>
  );
};

Switch.propTypes = {
  active: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  disabled: React.PropTypes.bool,
  items: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      title: React.PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
      value: React.PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    })
  ).isRequired,
  onChange: React.PropTypes.func,
};

export default withStyles(styles)(Switch);
