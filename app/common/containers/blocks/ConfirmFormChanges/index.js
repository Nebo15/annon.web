import React from 'react';
import { withRouter } from 'react-router';

import { Confirm } from 'components/Popup';

@withRouter
export default class ConfirmFormChanges extends React.Component {
  state = {
    isConfirmed: false,
    showConfirm: false,
    location: null,
  };

  componentDidMount() {
    this.removeListener = this.props.router.listenBefore((location) => {
      if (this.state.isConfirmed || !this.props.isChanged || this.props.submitting) {
        return true;
      }

      this.setState({ showConfirm: true, location: location.pathname });

      return false;
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  removeListener = null;

  confirmLocation() {
    this.setState({ showConfirm: false, isConfirmed: true }, () => {
      this.props.router.replace(this.state.location);
    });
  }

  render() {
    return (
      <Confirm
        title="Your changes not saving"
        active={this.state.showConfirm}
        theme="error"
        confirm="Ok"
        onCancel={() => this.setState({ showConfirm: false })}
        onConfirm={() => this.confirmLocation()}
      >Leave this page?</Confirm>
    );
  }
}
