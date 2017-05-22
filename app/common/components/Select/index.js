import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { ErrorMessages } from 'react-nebo15-validate';

import Icon from 'components/Icon';
import OuterClick from 'components/OuterClick';

import styles from './styles.scss';

const LIST_HEIGHT_PADDING = 32;

class Select extends React.Component {
  static propTypes = {
    active: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    labelText: PropTypes.string,
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        name: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        disabled: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
      })
    ).isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    open: false,
  };

  state = {
    open: this.props.open,
    active: (() => this.props.options.filter(item => item.name === this.props.active)[0])(),
  };

  componentWillReceiveProps(props) {
    if (props.active) {
      this.setState({
        active: this.props.options.filter(item => item.name === props.active)[0],
      });
    }
  }

  onSelect(item = {}) {
    this.setState({ active: item, open: false });
    this.props.onChange && this.props.onChange(item.name);
  }

  /**
   * Calculate open drop down popup position
   * @returns {String<'top'|'bottom'>}
   */
  get position() {
    if (!this.selectNode) {
      return 'bottom';
    }

    const selectSize = this.selectNode.getBoundingClientRect();
    const screenHeight = document.documentElement.clientHeight;
    const selectHeight = this.listNode.clientHeight;

    if (screenHeight - selectSize.bottom > selectHeight + LIST_HEIGHT_PADDING) {
      return 'bottom';
    }

    return 'top';
  }

  get value() {
    return this.state.active;
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    const {
      options = [],
      placeholder,
      disabled,
      labelText,
      error,
      children,
    } = this.props;

    const activeItem = this.state.active || {};
    const classNames = classnames(
      styles.select,
      this.state.open && styles[this.position],
      this.state.open && styles.open,
      disabled && styles.disabled,
      error && styles.error
    );

    return (
      <OuterClick onClick={() => this.setState({ open: false })}>
        <section ref={ref => (this.selectNode = ref)} className={classNames}>
          <div className={styles.label}>{labelText}</div>
          <div onClick={() => this.setState({ open: !this.state.open })} className={styles.control}>
            <span hidden={activeItem.title} className={styles.placeholder}>{placeholder}</span>
            <span hidden={!activeItem.title}>
              {activeItem && activeItem.title}
            </span>
            <span className={styles.arrow} />
            { error &&
              <div className={styles['error-label']}>
                { typeof error === 'string' ? error : <ErrorMessages error={error}>{children}</ErrorMessages> }
              </div>
            }
          </div>
          <ul ref={ref => (this.listNode = ref)} className={styles.list}>
            {
              options.map(item => (
                <li
                  onClick={() => !item.disabled && this.onSelect(item)}
                  className={classnames(
                    item.name === activeItem.name && styles.active,
                    item.disabled && styles.disabled
                  )}
                  data-select-name={item.name}
                  key={item.name}
                >
                  {item.title}
                  {item.name === activeItem.name && <span className={styles.icon}><Icon name="check-right" /></span>}
                </li>
              ))
            }
          </ul>
        </section>
      </OuterClick>
    );
  }
}

export default withStyles(styles)(Select);
