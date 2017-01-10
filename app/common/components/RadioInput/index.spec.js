import React from 'react';
import chai, { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import spies from 'chai-spies';
import { Component as RadioInput } from './index.js';

chai.use(spies);

describe('RadioInput', () => {
  it('should have radio input element', () => {
    const inst = shallow(<RadioInput />);
    expect(inst.find('input')).to.have.length(1);
    expect(inst.find('input').prop('type')).to.equal('radio');
  });
  describe('selected', () => {
    it('should support selected passing', () => {
      const inst = shallow(<RadioInput selected />);
      expect(inst.find('input').prop('checked')).to.be.true;

      const instFalse = shallow(<RadioInput selected={false} />);
      expect(instFalse.find('input').prop('checked')).to.be.false;

      const instDefault = shallow(<RadioInput />);
      expect(instDefault.find('input').prop('checked')).to.be.false;
    });
  });
  describe('props passing', () => {
    it('should pass name prop', () => {
      const inst = shallow(<RadioInput name="test" />);
      expect(inst.find('input').prop('name')).to.equal('test');
    });
    it('should pass value prop', () => {
      const inst = shallow(<RadioInput value="value" />);
      expect(inst.find('input').prop('value')).to.equal('value');
    });
    it('should pass disabled prop', () => {
      const inst = shallow(<RadioInput disabled />);
      expect(inst.find('input').prop('disabled')).to.be.true;
    });
  });
  describe('onChange', () => {
    it('should return value when click on element', () => {
      const spyCb = chai.spy(() => {});
      expect(spyCb).to.have.not.been.called();
      const inst = shallow(<RadioInput onChange={spyCb} value="test" />);
      inst.find('input').simulate('change');
      expect(spyCb).to.have.been.called.with('test');
    });
    it('should not been called if disabled is passed', () => {
      const spyCb = chai.spy(() => {});
      expect(spyCb).to.have.not.been.called();
      const inst = shallow(<RadioInput onChange={spyCb} value="test" disabled />);
      inst.find('input').simulate('change');
      expect(spyCb).to.have.not.been.called();
    });
  });
  describe('group of inputs', () => {
    class TestGroup extends React.Component {
      state = {
        value: 'a',
      };
      onChange(value) {
        this.setState({
          value,
        });
      }
      render() {
        return (
          <div>
            <RadioInput name="test" value="a" selected={this.state.value === 'a'} onChange={v => this.onChange(v)} />
            <RadioInput name="test" value="b" selected={this.state.value === 'b'} onChange={v => this.onChange(v)} />
            <RadioInput name="test" value="c" selected={this.state.value === 'c'} onChange={v => this.onChange(v)} />
          </div>
        );
      }
    }
    it('should work', () => {
      const wrapper = mount(<TestGroup />);
      const inputA = wrapper.find('input[value="a"]');
      const inputB = wrapper.find('input[value="b"]');
      const inputC = wrapper.find('input[value="c"]');
      expect(inputA.prop('checked')).to.be.true; // from initial state
      inputC.simulate('change');
      expect(inputA.prop('checked')).to.be.false;
      expect(wrapper.state('value')).to.equal('c');
      inputB.simulate('change');
      expect(inputB.prop('checked')).to.be.true;
      expect(inputC.prop('checked')).to.be.false;
      expect(wrapper.state('value')).to.equal('b');
    });
  });
});
