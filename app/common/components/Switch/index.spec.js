import React from 'react';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import spies from 'chai-spies';

import Switch from './index';

chai.use(spies);

describe('Switch', () => {
  const elem = mount(
    <Switch
      active="all"
      items={[
        { title: 'All', value: 'all' },
        { title: 'Yes', value: 'yes' },
        { title: 'No', value: 'no' },
      ]}
    />);
  describe('props', () => {
    it('items', () => {
      expect(elem.find('input')).to.have.length(3);
    });
    it('active', () => {
      expect(elem.find('input').first().prop('checked')).to.equal(true);
    });
    it('onChange', () => {
      const onChange = chai.spy(() => {});
      elem.setProps({ onChange });
      elem.find('input').at(1).simulate('change');
      expect(onChange).to.have.been.called.with('yes');
    });
  });
});
