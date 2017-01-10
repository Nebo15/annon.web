import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Input from 'components/Input';
import MaskedInputComponent from 'react-text-mask';
import MaskedInput, { formatMask } from './index';

describe('MaskedInput', () => {
  it('should use Input component', () => {
    const wrapper = shallow(<MaskedInput />);
    expect(wrapper.find(Input)).to.have.length(1);
  });
  it('should pass all not mask, guide props to Input', () => {
    const wrapper = shallow(<MaskedInput value="1" labelText="2" />);
    expect(wrapper.find(Input).prop('value')).to.equal('1');
    expect(wrapper.find(Input).prop('labelText')).to.equal('2');
  });
  it('should use MaskedInput component from react-text-mask', () => {
    const wrapper = mount(<MaskedInput mask="111" />);
    expect(wrapper.find(MaskedInputComponent).prop('mask')).to.deep.equal(formatMask('111'));
  });
});
