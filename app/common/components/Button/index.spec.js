import React from 'react';
import chai, { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import spies from 'chai-spies';

import Button from './index';
import styles from './styles.scss';

chai.use(spies);

describe('Button', () => {
  it('children', () => {
    const elem = shallow(<Button><span>My button</span></Button>);
    expect(elem.contains(<span>My button</span>)).to.equal(true);
  });

  describe('props', () => {
    const elem = shallow(<Button theme="border" size="small" color="blue" active disabled />);

    it('theme', () => {
      expect(elem.render().find(`button.${styles['theme-border']}`)).to.have.length(1);
    });

    it('size', () => {
      expect(elem.render().find(`button.${styles['size-small']}`)).to.have.length(1);
    });

    it('color', () => {
      expect(elem.render().find(`button.${styles['color-blue']}`)).to.have.length(1);
    });

    it('disabled', () => {
      expect(elem.render().find(`button.${styles.disabled}`)).to.have.length(1);
    });

    it('active', () => {
      expect(elem.render().find(`button.${styles.active}`)).to.have.length(1);
    });

    it('icon', () => {
      const elem = mount(<Button icon="plus" />);
      expect(elem.find('Icon').props().name).to.equal('plus');
    });

    describe('type', () => {
      it('should be undefined by default', () => {
        const wrapper = mount(<Button />);
        expect(wrapper.find('button').prop('type')).to.be.undefined;
      });
      it('should be passed to button', () => {
        const wrapperType = mount(<Button type="test" />);
        expect(wrapperType.find('button').prop('type')).to.equal('test');
      });
    });

    describe('onClick', () => {
      let handleClick;
      beforeEach(() => {
        handleClick = chai.spy(() => {});
      });

      it('should work', () => {
        const elem = shallow(<Button onClick={handleClick} />);
        elem.simulate('click');
        expect(handleClick).to.have.been.called.once;
      });

      it('should not be called if button disabled', () => {
        const elem = shallow(<Button disabled onClick={handleClick} />);
        elem.simulate('click');
        expect(handleClick).to.have.not.been.called;
      });
    });

    describe('to', () => {
      it('should work inner link', () => {
        const elem = mount(<Button to="/" />);
        expect(elem.find('Link')).to.have.length(1);
      });

      it('should work outer link', () => {
        const elem = shallow(<Button to="http://google.com" />);
        expect(elem.render().find('a[href="http://google.com"]')).to.have.length(1);
      });
    });
  });
});
