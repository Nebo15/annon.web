import React from 'react';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import spies from 'chai-spies';
import Checkbox from './index';

chai.use(spies);

describe('Checkbox', () => {
  it('should have input element', () => {
    const inst = mount(<Checkbox />);
    expect(inst.find('input')).to.have.length(1);
  });
  describe('checked', () => {
    it('should support checked passing', () => {
      const inst = mount(<Checkbox checked="true" />);
      expect(inst.find('input').prop('checked')).to.equal('true');

      const instFalse = mount(<Checkbox checked={false} />);
      expect(instFalse.find('input').prop('checked')).to.be.false;

      const instDefault = mount(<Checkbox />);
      expect(instDefault.find('input').prop('checked')).to.be.false;
    });
    it('should not change on click events', () => {
      const inst = mount(<Checkbox checked="true" />);
      inst.find('input').simulate('change', { target: { checked: false } });
      expect(inst.find('input').prop('checked')).to.equal('true');

      const instFalse = mount(<Checkbox checked={false} />);
      instFalse.find('input').simulate('change', { target: { checked: true } });
      expect(instFalse.find('input').prop('checked')).to.be.false;

      const instDefault = mount(<Checkbox />);
      instDefault.find('input').simulate('change', { target: { checked: true } });
      expect(instDefault.find('input').prop('checked')).to.be.false;
    });
  });
  describe('onChange', () => {
    it('should be invoked on click', () => {
      const spyCb = chai.spy(() => {});
      expect(spyCb).to.not.have.been.called();
      const inst = mount(<Checkbox onChange={spyCb} />);
      inst.find('input').simulate('change', { target: { checked: true } });
      inst.find('input').simulate('change', { target: { checked: false } });
      expect(spyCb).to.have.been.called.with(true);
      expect(spyCb).to.have.been.called.with(false);
    });
  });
});
