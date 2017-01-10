import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import mountWithStore from 'helpers/tests/mount';

import styles from './styles.scss';

import FoldingTable from './index';

const tableData = [
  {
    title: 'Invested',
    estimated: '€32,470',
    current: {
      value: '€0',
      percent: '0,5%',
      status: 'down',
    },
  }, {
    title: 'Returns (all time)',
    estimated: '€32,750 (15%)',
    current: {
      value: '€0',
      percent: '20%',
      status: 'up',
    },
    subData: [
      {
        title: 'Last month',
        estimated: '€1,300 (15%)',
        current: {
          value: '€19,908',
          percent: '20%',
          status: 'up',
        },
      }, {
        title: 'Last quarter',
        estimated: '€568 (5%)',
        current: {
          value: '€19,908',
          percent: '20%',
          status: 'up',
        },
      },
    ],
  }, {
    title: 'Losses',
    estimated: '€732',
    current: {
      value: '€0',
      percent: '3%',
      status: 'up',
    },
    subData: [
      {
        title: 'Last month',
        estimated: '€1,300 (15%)',
        current: {
          value: '€19,908',
          percent: '20%',
          status: 'up',
        },
      },
    ],
  },
];

const tableColumns = [
  { title: 'Title', key: 'title' },
  { title: 'Estimated', key: 'estimated' },
  { title: 'Current', key: 'current' },
];

chai.use(spies);

describe('FoldingTable', () => {
  const elem = mountWithStore(
    <FoldingTable columns={tableColumns} data={tableData} />
  );

  it('render', () => {
    expect(elem.find('tbody')).to.have.length(6);

    expect(elem.find(`.${styles.percent}`)).to.have.length(6);
    expect(elem.find(`.${styles['row-sub']}`)).to.have.length(2);
  });

  it('toggle row', () => {
    elem.find('tbody').at(1)
      .find('tr td').at(0)
      .simulate('click');
    expect(elem.find('tbody').at(1).hasClass(styles.active)).to.equal(true);

    elem.find('tbody').at(1)
      .find('tr td').at(0)
      .simulate('click');
    expect(elem.find('tbody').at(1).hasClass(styles.active)).to.equal(false);
  });
});
