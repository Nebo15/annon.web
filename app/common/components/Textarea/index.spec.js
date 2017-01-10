
import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import spies from 'chai-spies';

import Textarea from './index';
import styles from './styles.scss';

chai.use(spies);

describe('<Textarea />', () => {
  it('should be render textarea', () => {
    expect(
      shallow(<Textarea />).render().find('textarea')
    ).to.be.ok;
  });

  it('should be pass rows prop', () => {
    expect(
      shallow(<Textarea rows="1" />).render().find('textarea').attr('rows')
    ).to.be.eql('1');

    expect(
      shallow(<Textarea rows={10} />).render().find('textarea').attr('rows')
    ).to.be.eql('10');
  });

  it('should be pass label text', () => {
    expect(
      shallow(
        <Textarea type="text" labelText="Hello world" />
      ).render().find(`.${styles['label-text']}`).text()
    ).to.be.eql('Hello world');

    expect(
      shallow(
        <Textarea type="text" labelText="42" />
      ).render().find(`.${styles['label-text']}`).text()
    ).to.be.eql('42');
  });

  it('should pass disabled prop', () => {
    expect(
      shallow(
        <Textarea disabled />
      ).render().find('textarea').attr('disabled')
    ).to.be.eql('disabled');

    expect(
      shallow(
        <Textarea />
      ).render().find('textarea').attr('disabled')
    ).to.be.not.ok;
  });

  it('should pass required prop', () => {
    expect(
      shallow(
        <Textarea required />
      ).render().find(`.${styles['required-label']}`)
    ).to.be.ok;
  });

  it('should pass errored/required prop', () => {
    expect(
      shallow(
        <Textarea required />
      ).render().find(`.${styles['required-label--error']}`)
    ).to.be.ok;
  });

  it('should pass default value', () => {
    expect(
      shallow(
        <Textarea defaultValue="42" />
      ).render().find('textarea').val()
    ).to.be.eql('42');

    expect(
      shallow(
        <Textarea defaultValue="Hello world" />
      ).render().find('textarea').val()
    ).to.be.eql('Hello world');
  });

  it('should pass error value', () => {
    expect(
      shallow(
        <Textarea error="CRITICAL ERROR" />
      ).render().find(`.${styles['error-label']}`).text()
    ).to.be.eql('CRITICAL ERROR');

    const wrapper = shallow(
      <Textarea required error="CRITICAL ERROR! FTW!" />
    );

    expect(
      wrapper.render().find(`.${styles['error-label']}`).text()
    ).to.be.eql('CRITICAL ERROR! FTW!');

    expect(
      wrapper.render().find(
        `.${styles['required-label']}`
      ).hasClass(styles['required-label--error'])
    ).to.be.ok;
  });
});
