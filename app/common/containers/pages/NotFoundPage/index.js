import React from 'react';

import { H1 } from 'components/Title';
import Button from 'components/Button';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div id="not-found-page">
        <H1>Page Not Found</H1>
        <p>Requested page not found. Maybe you are looking for <Button theme="link" to="/apis" >list of APIs</Button>.</p>
      </div>
    );
  }
}
