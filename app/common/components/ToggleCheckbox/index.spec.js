import React from 'react';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import spies from 'chai-spies';
import ToggleCheckbox from './index';

chai.use(spies);

describe('ToggleCheckbox', () => {
  it('should have input element', () => {
    const inst = mount(<ToggleCheckbox />);
    expect(inst.find('input')).to.have.length(1);
  });
  describe('checked', () => {
    it('should support checked passing', () => {
      const inst = mount(<ToggleCheckbox checked />);
      expect(inst.find('input').prop('checked')).to.equal(true);

      const instFalse = mount(<ToggleCheckbox checked={false} />);
      expect(instFalse.find('input').prop('checked')).to.be.false;

      const instDefault = mount(<ToggleCheckbox />);
      expect(instDefault.find('input').prop('checked')).to.be.false;
    });
    it('should not change on click events', () => {
      const inst = mount(<ToggleCheckbox checked />);
      inst.find('input').simulate('change', { target: { checked: false } });
      expect(inst.find('input').prop('checked')).to.equal(true);

      const instFalse = mount(<ToggleCheckbox checked={false} />);
      instFalse.find('input').simulate('change', { target: { checked: true } });
      expect(instFalse.find('input').prop('checked')).to.be.false;

      const instDefault = mount(<ToggleCheckbox />);
      instDefault.find('input').simulate('change', { target: { checked: true } });
      expect(instDefault.find('input').prop('checked')).to.be.false;
    });
  });
});
