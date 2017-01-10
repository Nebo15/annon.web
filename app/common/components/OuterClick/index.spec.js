import React from 'react';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import spies from 'chai-spies';

import OuterClick from './index';

chai.use(spies);

describe('OuterClick', function () {
  this.timeout(15000);
  let onClick;
  beforeEach(() => {
    onClick = chai.spy(() => {});
  });

  it('called on outer click', () => {
    mount(<OuterClick onClick={onClick}><div>Test</div></OuterClick>);

    document.body.dispatchEvent(new Event('click', { bubbles: true }));
    expect(onClick).to.have.been.called();
  });

  it('no called on inner click', () => {
    const elem = mount(<OuterClick onClick={onClick}><div>Test</div></OuterClick>);
    elem.find('div').simulate('click');
    expect(onClick).to.not.have.been.called();
  });
});
