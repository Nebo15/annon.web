import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Input from 'components/Input';
import DatepickerComponent from 'react-datepicker';
import { ComponentInput as DatepickerInput } from './index';

describe('DatepickerInput', () => {
  it('should use Input component', () => {
    const wrapper = shallow(<DatepickerInput />);
    expect(wrapper.find(Input)).to.have.length(1);
  });
  it('should pass all not mask, guide props to Input', () => {
    const wrapper = shallow(<DatepickerInput value="1" labelText="2" />);
    expect(wrapper.find(Input).prop('value')).to.equal('1');
    expect(wrapper.find(Input).prop('labelText')).to.equal('2');
  });
  it('should pass dateFormat property to DatepickerComponent', () => {
    const wrapper = mount(<DatepickerInput dateFormat="DD/MM/YY" />);
    expect(wrapper.find(DatepickerComponent).prop('dateFormat')).to.equal('DD/MM/YY');
  });
});
