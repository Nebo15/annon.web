import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon, { icons } from 'components/Icon';

import styles from './styles.scss';

const URL_TEST_REG_EXP = /^((?:[a-z]+:)?\/\/)|mailto:/i;

const Button = (props) => {
  const {
    theme = 'fill',
    size = 'middle',
    color = 'orange',
    active = false,
    disabled = false,
    block = false,
    inheritColor = false,
    type = 'button',
    to, children, onClick, id, icon, name,
    ...rest,
  } = props;

  const className = classnames(
    styles.button,
    styles[`theme-${theme}`],
    styles[`color-${color}`],
    styles[`size-${size}`],
    active && styles.active,
    disabled && styles.disabled,
    block && styles.block,
    inheritColor && styles['inherit-color'],
  );

  const content = (
    <div>
      {icon && <span className={styles.icon}><Icon name={icon} /></span>}
      {children}
    </div>
  );

  if (to === undefined) {
    return (
      <button {...rest} name={name} id={id} onClick={onClick} type={type} className={className}>
        {content}
      </button>
    );
  }
  if (URL_TEST_REG_EXP.test(to)) {
    return (
      <a {...rest} id={id} href={to} onClick={onClick} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link {...rest} id={id} to={to} onClick={onClick} className={className}>{content}</Link>
  );
};

Button.propTypes = {
  theme: React.PropTypes.oneOf(['fill', 'border', 'link']),
  size: React.PropTypes.oneOf(['small', 'middle']),
  color: React.PropTypes.oneOf(['orange', 'blue', 'green', 'red']),
  type: React.PropTypes.string,
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  block: React.PropTypes.bool,
  inheritColor: React.PropTypes.bool,
  to: React.PropTypes.string,
  id: React.PropTypes.string,
  icon: React.PropTypes.oneOf(icons),
  onClick: React.PropTypes.func,
};

export default withStyles(styles)(Button);
export const ButtonsGroup = withStyles(styles)(
  ({ children, ...props }) => (<div {...props} className={styles.buttonsGroup}>
    {
      React.Children.toArray(children).map((i, key) =>
        <div className={styles.buttonsGroupItem} key={key}>{i}</div>
      )
    }
  </div>)
);
