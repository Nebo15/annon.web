import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Icon, { icons } from './index';

describe('Icon', () => {
  describe('icons', () => {
    it('should export all available icons', () => {
      expect(icons).to.exist;
      expect(icons).to.be.array;
    });
  });

  describe('default', () => {
    it('should exists', () => {
      expect(Icon).to.exist;
    });
    describe('render', () => {
      let instance;
      beforeEach(() => {
        instance = mount(<div><Icon name={icons[0]} /></div>);
      });

      it('should render in i tag', () => {
        expect(instance.find('i')).to.have.length(1);
      });
    });
  });
});
