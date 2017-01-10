import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Component as Container } from './index';

describe('Container', () => {
  describe('children', () => {
    it('should pass children', () => {
      const wrapper = shallow(<Container><h1>Title</h1></Container>);
      expect(wrapper.contains(<h1>Title</h1>)).to.be.true;
    });
  });
});
