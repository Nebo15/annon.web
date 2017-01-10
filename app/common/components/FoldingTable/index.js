import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';
import Table from 'components/Table';

import { open, close } from './redux';
import styles from './styles.scss';

const PercentCol = withStyles(styles)(({ data = {} }) => (
  <div className={styles.percent}>
    <div>{data.value}</div>
    {
      data.status && <div className={classnames(styles.arrow, styles[`arrow-${data.status}`])}>
        <Icon name="arrow" />
      </div>
    }
    <div>{data.percent}</div>
  </div>
));

/* eslint-disable jsx-a11y/no-static-element-interactions */

const FoldingRowComponent = ({ columns, data, subData, onOpen, onClose, isOpened, name }) => (
  <tbody className={classnames(styles.row, isOpened && styles.active)}>
    <tr>
      <td
        onClick={() => {
          if (!subData) {
            return;
          }

          if (!isOpened) {
            onOpen(name);
          } else {
            onClose(name);
          }
        }}
      >
        <b>{data.title}</b>
        {subData && <span className={classnames(styles.arrow, isOpened && styles['arrow-active'])}>
          <Icon name="arrow" />
        </span>}
      </td>
      <td className={styles.right}>
        {data.estimated}
      </td>
      <td className={styles.right} width={200}>
        <PercentCol data={data.current} />
      </td>
    </tr>
    {
      subData && <tr hidden={!isOpened} className={styles['row-sub']}>
        <td colSpan={columns.length}>
          <Table
            head={false}
            tbody={false}
            rowComponent={FoldingRow}
            columns={columns}
            data={subData}
          />
        </td>
      </tr>
    }
  </tbody>
);

const FoldingRow = withStyles(styles)(connect(
  (state, { name }) => ({
    isOpened: state.foldingTable[name],
  }), {
    onOpen: open,
    onClose: close,
  }
)(FoldingRowComponent));

const FoldingTable = ({ columns = [], data = [], name }) => (
  <Table tbody={false} columns={columns}>
    {data.map((item, key) => (
      <FoldingRow
        name={`${name}-${key}`}
        key={key}
        data={item}
        subData={item.subData}
      />
    ))}
  </Table>
);

/* eslint-disable react/no-unused-prop-types */

FoldingTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      title: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      align: PropTypes.oneOf(['left', 'center', 'right']),
      colspan: PropTypes.number,
    })
  ),

  data: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
};

export default withStyles(styles)(FoldingTable);
