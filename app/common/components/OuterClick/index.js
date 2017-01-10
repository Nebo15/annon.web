import React, { PropTypes } from 'react';

export default class OuterClick extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.callback = (e) => {
      this.handleClick(e);
    };

    document.documentElement.addEventListener('click', this.callback, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.callback, false);
  }

  callback = null;

  handleClick(e) {
    if (!this.node || this.node.contains(e.target)) {
      return;
    }

    this.props.onClick(e);
  }

  render() {
    const children = React.Children.only(this.props.children);

    return React.cloneElement(children, {
      ...children.props,
      ref: (node) => {
        this.node = node;
        children.ref && children.ref(node);
      },
    });
  }
}
