import React from 'react';
import chai, { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import spies from 'chai-spies';

import { Component, DropDownControl, DropDownItem } from './index';
import styles from './styles.scss';

chai.use(spies);

describe('DropDownControl', () => {
  const elem = shallow(
    <DropDownControl>
      <span>Control</span>
    </DropDownControl>
  );

  it('children', () => {
    expect(elem.contains(<span>Control</span>)).to.equal(true);
  });

  it('render', () => {
    expect(elem.render().find(`div.${styles.control}`)).to.have.length(1);
  });
});

describe('DropDownItem', () => {
  const elem = shallow(
    <DropDownItem>
      <span>Item</span>
    </DropDownItem>
  );

  it('children', () => {
    expect(elem.contains(<span>Item</span>)).to.equal(true);
  });

  it('render', () => {
    expect(elem.render().find(`li.${styles.item}`)).to.have.length(1);
  });
});

describe('DropDown', () => {
  describe('render', () => {
    const elem = mount(
      <Component onClose={() => {}}>
        <DropDownControl>
          <span>Control</span>
        </DropDownControl>

        <DropDownItem>
          <span>Item 1</span>
        </DropDownItem>
        <DropDownItem>
          <span>Item 2</span>
        </DropDownItem>
      </Component>
    );

    it('control', () => {
      expect(elem.find(`.${styles.control}`)).to.have.length(1);
    });

    it('list container', () => {
      expect(elem.find('ul')).to.have.length(1);
    });

    it('list items', () => {
      expect(elem.find('li')).to.have.length(2);
    });
  });
});
