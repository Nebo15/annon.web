
import React from 'react';
import chai, { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import spies from 'chai-spies';

import { Component as Input } from './index';
import styles from './styles.scss';

chai.use(spies);

describe('<Input />', () => {
  it('should be render input', () => {
    expect(
      shallow(<Input />).find('input')
    ).to.be.ok;
  });

  it('should be pass type prop', () => {
    expect(
      shallow(<Input type="text" />).find('input').prop('type')
    ).to.be.eql('text');

    expect(
      shallow(<Input type="number" />).find('input').prop('type')
    ).to.be.eql('number');
  });

  it('should be pass label text', () => {
    expect(
      shallow(
        <Input type="text" labelText="Hello world" />
      ).find(`.${styles['label-text']}`).text()
    ).to.be.eql('Hello world');

    expect(
      shallow(
        <Input type="text" labelText="42" />
      ).find(`.${styles['label-text']}`).text()
    ).to.be.eql('42');
  });

  it('should be pass prefix symbol', () => {
    expect(
      mount(
        <Input
          prefix="$"
        />
      ).find(`.${styles['prefix-wrapper']}`).text()
    ).to.be.eql('$');

    expect(
      mount(
        <Input
          prefix="%"
        />
      ).find(`.${styles['prefix-wrapper']}`).text()
    ).to.be.eql('%');
  });

  it('should be pass postfix symbol', () => {
    expect(
      mount(
        <Input
          postfix="$"
        />
    ).find(`.${styles['postfix-wrapper']}`).text()
    ).to.be.eql('$');

    expect(
      mount(
        <Input
          postfix="%"
        />
      ).find(`.${styles['postfix-wrapper']}`).text()
    ).to.be.eql('%');
  });

  it('should be render prefix and postfix', () => {
    const wrapper = mount(
      <Input
        prefix="$"
        postfix="%"
      />
    );

    expect(
      wrapper.find(`.${styles['postfix-wrapper']}`).text()
    ).to.be.eql('%');

    expect(
      wrapper.find(`.${styles['prefix-wrapper']}`).text()
    ).to.be.eql('$');
  });

  it('should pass disabled prop', () => {
    expect(
      shallow(
        <Input disabled />
      ).find('input').prop('disabled')
    ).to.be.true;

    expect(
      shallow(
        <Input />
      ).find('input').prop('disabled')
    ).to.be.not.ok;
  });

  it('should pass required prop', () => {
    expect(
      shallow(
        <Input required />
      ).find(`.${styles['required-label']}`)
    ).to.be.ok;
  });

  it('should pass value', () => {
    expect(
      shallow(
        <Input value="42" />
      ).render().find('input').val()
    ).to.be.eql('42');

    expect(
      shallow(
        <Input value="Hello world" />
      ).render().find('input').val()
    ).to.be.eql('Hello world');
  });

  it('should pass error value', () => {
    expect(
      shallow(
        <Input error="CRITICAL ERROR" />
      ).find(`.${styles['error-label']}`).text()
    ).to.be.eql('CRITICAL ERROR');

    const wrapper = shallow(
      <Input required error="CRITICAL ERROR! FTW!" />
    );

    expect(
      wrapper.find(`.${styles['error-label']}`).text()
    ).to.be.eql('CRITICAL ERROR! FTW!');
  });

  it('should pass placeholder as prop', () => {
    expect(
      shallow(
        <Input placeholder="42" />
      ).find('input').prop('placeholder')
    ).to.be.eql('42');
  });

  it('should pass name prop', () => {
    const wrapper = shallow(<Input name="test" />);
    expect(wrapper.find('input').prop('name')).to.equal('test');
  });

  it('error styles', () => {
    const wrapper = shallow(<Input error="Error" />);
    expect(wrapper.find(`.${styles['group-input']}`).hasClass(styles.error)).to.be.ok;
  });

  it('theme prop', () => {
    const wrapper = shallow(<Input theme="light" />);
    expect(wrapper.find(`.${styles['group-input']}`).hasClass(styles['theme-light'])).to.be.ok;
  });

  describe('component', () => {
    const Component = () => (<div />);
    it('should support passing custom component', () => {
      const wrapper = shallow(<Input component={Component} />);
      expect(wrapper.find(Component)).to.have.length(1);
    });
    it('should pass input properties to custom component ', () => {
      const wrapper = shallow(<Input component={Component} name="test" value="1" />);
      expect(wrapper.find(Component).prop('name')).to.equal('test');
      expect(wrapper.find(Component).prop('value')).to.equal('1');
    });
    it('should pass rest props to input component ', () => {
      const wrapper = shallow(<Input component={Component} abrabra="somevalue" />);
      expect(wrapper.find(Component).prop('abrabra')).to.equal('somevalue');
    });
  });
});
