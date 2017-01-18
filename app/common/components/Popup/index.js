import React from 'react';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H2 } from '../Title';
import Button from '../Button';

import styles from './styles.scss';

const DEFAULT_CONFIRM_BTN_TEXT = 'Confirm';
const DEFAULT_CANCEL_BTN_TEXT = 'Cancel';
const DEFAULT_ALERT_BTN_TEXT = 'Done';

const THEMES_COLOR = {
  error: 'red',
  success: 'blue',
};

const PopupComponent = ({ children, title, active = false, theme, onClose, bgCloser = true }) => (
  <section className={classnames(styles.popup, active && styles.active, theme && styles[`theme-${theme}`])}>
    <div className={styles.content}>
      {
        title && <header>
          <H2 color={THEMES_COLOR[theme]}>{title}</H2>
        </header>
      }
      {children}
    </div>
    { // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      bgCloser && <div className={styles.closer} onClick={onClose} />
    }
  </section>
);

PopupComponent.propTypes = {
  title: React.PropTypes.string,
  active: React.PropTypes.bool,
  theme: React.PropTypes.oneOf(['error', 'success']),
  onClose: React.PropTypes.func,
  bgCloser: React.PropTypes.bool,
};

PopupComponent.defaultProps = {
  active: false,
  bgCloser: true,
};

const AlertComponent = (props) => {
  const { children, title, ok = DEFAULT_ALERT_BTN_TEXT, theme, active, onClose } = props;

  return (
    <Popup active={active} title={title} theme={theme} bgCloser={false}>
      <article>
        {children}
      </article>
      <footer>
        <Button onClick={onClose}>{ok}</Button>
      </footer>
    </Popup>
  );
};

AlertComponent.propTypes = {
  title: React.PropTypes.string,
  ok: React.PropTypes.string,
  active: React.PropTypes.bool,
  theme: React.PropTypes.oneOf(['error', 'success']),
  onClose: React.PropTypes.func,
};

AlertComponent.defaultProps = {
  active: false,
  ok: DEFAULT_ALERT_BTN_TEXT,
};

const ConfirmComponent = (props) => {
  const {
    confirm = DEFAULT_CONFIRM_BTN_TEXT,
    cancel = DEFAULT_CANCEL_BTN_TEXT,
    title, theme, active, children,
    onCancel, onConfirm,
  } = props;

  return (
    <Popup active={active} title={title} theme={theme} bgCloser={false}>
      <article>
        {children}
      </article>
      <footer>
        <Button type="border" onClick={onCancel}>{cancel}</Button>
        <Button onClick={onConfirm}>{confirm}</Button>
      </footer>
    </Popup>
  );
};

ConfirmComponent.propTypes = {
  title: React.PropTypes.string,
  confirm: React.PropTypes.string,
  cancel: React.PropTypes.string,
  active: React.PropTypes.bool,
  theme: React.PropTypes.oneOf(['error', 'success']),
  onCancel: React.PropTypes.func,
  onConfirm: React.PropTypes.func,
};

ConfirmComponent.defaultProps = {
  active: false,
  confirm: DEFAULT_CONFIRM_BTN_TEXT,
  cancel: DEFAULT_CANCEL_BTN_TEXT,
};

export const Popup = withStyles(styles)(PopupComponent);
export const Alert = withStyles(styles)(AlertComponent);
export const Confirm = withStyles(styles)(ConfirmComponent);
